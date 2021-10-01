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
          <ion-col></ion-col>
          <ion-col>
            <ion-button @click="reload">リロード</ion-button>
          </ion-col>
          <ion-col></ion-col>
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
              <li v-for="item in sample" :key="item.transactionInfo.hash">
                <ion-card>
                  <ion-card-content>
                    type: {{ item.type }} <br />
                    version: {{ item.version }} <br />
                    transactionHash: {{ item.transactionInfo.hash }} <br />
                  </ion-card-content>
                  <ion-button @click="presentAlert(item)">承認する</ion-button>
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
        console.log(sample);
        this.confirmtransaction = sample;
      }
      const test2 = await getUnConfirmTransactionList();
      if (test2 !== undefined) {
        console.log(test2[0].transactionInfo);
        this.sample = test2;
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
          message: item.transactionInfo.hash,
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
                testCosign(item.transactionInfo.hash);
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
