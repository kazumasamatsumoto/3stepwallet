<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>カメラ</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="state">
      <ion-grid>
        <ion-row><div class="height"></div></ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col>
            <ion-button @click="openScanner" class="round"
              ><img src="../../images/smartphone_qr_code_man.png"
            /></ion-button>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-content v-else>
      <ion-grid>
        <ion-row><div class="height_2"></div></ion-row>
        <ion-row>
          <ion-col>
            <p class="text_center">そうしんちゅう。。。</p>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <img src="../../images/11750.gif" class="gif_size text_center" />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { BarcodeScanner } from "@ionic-native/barcode-scanner";
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
  } from "@ionic/vue";
  import { multisigTransaction } from "@/util/symbol";

  export default {
    name: "Sending",
    components: {
      IonHeader,
      IonToolbar,
      IonTitle,
      IonPage,
      IonContent,
      IonButton,
      IonGrid,
      IonRow,
      IonCol,
    },
    data() {
      return {
        state: true,
      };
    },
    methods: {
      async openScanner(this: { state: boolean }) {
        BarcodeScanner.scan()
          .then((barcodeData) => {
            const sampleData = barcodeData.text;
            const obj = JSON.parse(sampleData);
            console.log(obj.title);
            console.log(obj.price);
            multisigTransaction(9, +obj.price, obj.title).then((v) => {
              this.state = !this.state;
              console.log(v, "test");
            });
          })
          .catch((err) => {
            console.log("Error", err);
          });
      },
    },
  };
</script>

<style>
  .round {
    width: 150px;
    height: 150px;
  }
  .height {
    height: 8em;
  }
  .height_2 {
    height: 5em;
  }
  .text_center {
    text-align: center;
  }
  .gif_size {
    width: 150px;
    height: 200px;
    display: block;
    margin: auto;
  }
</style>
