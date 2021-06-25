<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>トランザクション履歴</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-label> 未承認トランザクション </ion-label>
      <ul id="example-1" style="list-style: none;">
        <li v-for="item in sample" :key="item.transactionInfo.hash">
          <ion-card>
            <ion-card-content>
              type: {{ item.type }} <br />
              version: {{ item.version }} <br />
              transactionHash: {{ item.transactionInfo.hash }} <br />
            </ion-card-content>
            <ion-button @click="presentAlert(item)">Show Alert</ion-button>
          </ion-card>
        </li>
      </ul>
      <ion-label> 承認済みトランザクション </ion-label>
      <ul id="example-1" style="list-style: none;">
        <li v-for="item in confirmtransaction" :key="item.transactionInfo.hash">
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
    IonCard,
    IonCardContent,
    alertController,
    IonButton,
  } from "@ionic/vue";
  import {
    getTransactionList,
    getUnConfirmTransactionList,
  } from "@/util/symbol";

  export default {
    name: "Tab2",
    components: {
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonPage,
      IonLabel,
      IonCard,
      IonCardContent,
      IonButton,
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
      if (test !== undefined) {
        this.confirmtransaction = test;
      }
      const test2 = await getUnConfirmTransactionList();
      if (test2 !== undefined) {
        this.sample = test2;
      }
    },
    methods: {
      async presentAlert(item: any) {
        const alert = await alertController.create({
          cssClass: "my-custom-class",
          header: "Alert",
          subHeader: "Subtitle",
          message: item.transactionInfo.hash,
          buttons: ["OK", "NG"],
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
</style>
