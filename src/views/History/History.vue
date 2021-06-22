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
      <p>{{ transaction }}</p>
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
