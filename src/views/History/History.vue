<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>トランザクション履歴</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-label> トランザクションの履歴 </ion-label>
      <ion-button @click="getTransactionList"> サンプル </ion-button>
      <ion-button @click="getUnConfirmTransactionList"> サンプル2 </ion-button>
      <ul id="example-1" style="list-style: none;">
        <li v-for="item in transaction" :key="item.transactionInfo.hash">
          <ion-card>
            <ion-card-content>
              type: {{ item.type }} <br />
              version: {{ item.version }} <br />
              transactionHash: {{ item.transactionInfo.hash }} <br />
            </ion-card-content>
          </ion-card>
        </li>
      </ul>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonButton,
    IonCard,
    IonCardContent,
  } from "@ionic/vue";
  import { Address, RepositoryFactoryHttp, TransactionGroup } from "symbol-sdk";

  export default {
    name: "Tab2",
    components: {
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonPage,
      IonLabel,
      IonButton,
      IonCard,
      IonCardContent,
    },
    data: function() {
      return {
        message: "not updated",
        transaction: "",
      };
    },

    methods: {
      sample: function(this: { message: string }) {
        this.message = "updated";
      },
      getTransactionList: async function(this: { transaction: Array<any> }) {
        try {
          const rawAddress = "TBHZV7LHG4PIM5GJS6QPFHLR47IRTP5I6USRN3Y";
          const address = Address.createFromRawAddress(rawAddress);
          /* end block 01 */

          /* start block 02 */
          // replace with node endpoint
          const nodeUrl = process.env.VUE_APP_WEB_SOCKET_URL;
          const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
          const transactionHttp = repositoryFactory.createTransactionRepository();

          const searchCriteria = {
            group: TransactionGroup.Confirmed,
            address,
            pageNumber: 1,
            pageSize: 100,
          };
          const page = await transactionHttp.search(searchCriteria).toPromise();
          this.transaction = page.data;
          console.log("承認済み", page.data);
        } catch (error) {
          console.log(error);
        }
      },
      getUnConfirmTransactionList: async function() {
        try {
          const rawAddress = "TBHZV7LHG4PIM5GJS6QPFHLR47IRTP5I6USRN3Y";
          const address = Address.createFromRawAddress(rawAddress);
          /* end block 01 */

          /* start block 02 */
          // replace with node endpoint
          const nodeUrl = process.env.VUE_APP_WEB_SOCKET_URL;
          const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
          const transactionHttp = repositoryFactory.createTransactionRepository();

          const searchCriteria = {
            group: TransactionGroup.Partial,
            address,
            pageNumber: 1,
            pageSize: 100,
          };
          const page2 = await transactionHttp
            .search(searchCriteria)
            .toPromise();
          console.log("未承認", page2.data);
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
</script>

<style>
  ul,
  ol {
    padding: 0;
    position: relative;
  }
</style>
