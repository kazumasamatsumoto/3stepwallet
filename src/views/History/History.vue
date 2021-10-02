<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>トランザクション履歴</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-button expand="block" @click="reload"
              >リロード</ion-button
            >
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="1"></ion-col>
          <ion-col><span class="text_center">未承認</span></ion-col>
          <ion-col size="1"></ion-col>
        </ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col
            ><ul id="example-1" style="list-style: none;">
              <li
                v-for="item in sample"
                :key="item.transactionInfo.aggregateHash"
              >
                <ion-card>
                  <ion-card-content>
                    メッセージ: {{ item.message.payload }} <br />
                    ハッシュ値: {{ item.transactionInfo.aggregateHash }} <br />
                  </ion-card-content>
                  <ion-button expand="block" @click="presentAlert(item)">承認する</ion-button>
                </ion-card>
              </li>
            </ul></ion-col
          >
          <ion-col></ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="1"></ion-col>
          <ion-col><span class="text_center">承認済み</span></ion-col>
          <ion-col size="1"></ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="1"></ion-col>
          <ion-col
            ><ul id="example-1" style="list-style: none;">
              <li
                v-for="item in confirmtransaction"
                :key="item.transactionInfo.aggregateHash"
              >
                <ion-card>
                  <ion-card-content>
                    送金金額: {{ item.mosaics[0].amount.lower / 1000000 }} xym
                    <br />
                    message: {{ item.message.payload }}
                  </ion-card-content>
                </ion-card>
              </li>
            </ul></ion-col
          >
          <ion-col size="1"></ion-col>
        </ion-row>
      </ion-grid>
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
    IonCard,
    IonCardContent,
    alertController,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
  } from "@ionic/vue";
  import {
    getTransactionList,
    getUnConfirmTransactionList,
  } from "@/util/symbol";
  import { testCosign } from "@/util/cosign";
  import {
    AggregateTransaction,
    RepositoryFactoryHttp,
    TransactionGroup,
  } from "symbol-sdk";

  export default {
    name: "Tab2",
    components: {
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonPage,
      IonCard,
      IonCardContent,
      IonButton,
      IonGrid,
      IonRow,
      IonCol,
    },
    data: function() {
      return {
        confirmtransaction: "",
        sample: "",
      };
    },
    async created(this: {
      confirmtransaction: Array<any>;
      sample: Array<any>;
    }) {
      const test = await getTransactionList();
      const sample = test?.reverse();
      if (sample !== undefined) {
        this.confirmtransaction = sample;
      }
      const test2 = await getUnConfirmTransactionList();
      const unConfirmTransactionInfo: any[] = [];
      if (test2 !== undefined) {
        for (let i = 0; i < test2.length; i++) {
          const hash = test2[i].transactionInfo?.hash as string;
          const nodeUrl = process.env.VUE_APP_WEB_SOCKET_URL;
          if (nodeUrl) {
            const repositoryFactory = new RepositoryFactoryHttp(nodeUrl, {
              websocketUrl:
                "ws://ngl-dual-601.testnet.symboldev.network:3000/ws",
              websocketInjected: WebSocket,
            });
            const transactionHttp = repositoryFactory.createTransactionRepository();

            transactionHttp
              .getTransaction(hash, TransactionGroup.Partial)
              .subscribe((x) => {
                const test = x as AggregateTransaction;
                unConfirmTransactionInfo.push(test.innerTransactions[0]);
                this.sample = unConfirmTransactionInfo;
              });
          }
        }
      }
    },
    methods: {
      reload() {
        location.reload();
      },
      async presentAlert(item: any) {
        const alert = await alertController.create({
          cssClass: "my-custom-class",
          header: "承認しますか？",
          subHeader: "",
          message: item.message.payload,
          buttons: [
            {
              text: "拒否",
              role: "cancel",
              cssClass: "secondary",
              handler: () => {
                console.log("Confirm Cancel");
              },
            },
            {
              text: "OK",
              handler: () => {
                testCosign(item.transactionInfo.aggregateHash);
              },
            },
          ],
        });
        return alert.present();
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
  .text_center {
    text-align: center;
    z-index: 2;
  }
</style>
