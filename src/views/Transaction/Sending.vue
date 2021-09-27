<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>カメラ</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="state && !modalState">
      <ion-grid>
        <ion-row><div class="height"></div></ion-row>
        <ion-row>
          <ion-col size="1"></ion-col>
          <ion-col>
            <p class="text_center nes-balloon from-right anime_text_center">
              QRをよみこもう
            </p>
          </ion-col>
          <ion-col size="1"></ion-col>
        </ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col>
            <ion-button @click="openScanner" class="round nes-btn is-primary"
              ><img src="../../images/smartphone_qr_code_man.png"
            /></ion-button>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-content v-if="state && modalState">
      <ion-grid>
        <ion-row><div class="height_2"></div></ion-row>
        <ion-row>
          <ion-col>
            <p class="text_center anime_text_center">購入しますか？</p>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <p class="text_center anime_text_center">商品名 {{ title }}</p>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <p class="text_center anime_text_center">値段 {{ price }} xym</p>
          </ion-col>
        </ion-row>
        <ion-row><div class="height_2"></div></ion-row>
        <ion-row>
          <ion-col>
            <ion-button
              color="danger"
              @click="denialMultisigTransaction"
              class="button_chice anime_text_center"
              >いいえ</ion-button
            >
          </ion-col>
          <ion-col>
            <ion-button
              color="success"
              @click="confirmMultisigTransaction"
              class="button_chice anime_text_center"
              >はい</ion-button
            >
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-content v-if="!state && modalState">
      <ion-grid>
        <ion-row><div class="height_2"></div></ion-row>
        <ion-row>
          <ion-col>
            <p class="text_center anime_text_center">そうしんちゅう。。。</p>
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
        price: "",
        title: "",
        modalState: false,
      };
    },
    methods: {
      denialMultisigTransaction() {
        location.href = "/tabs/sending";
      },
      confirmMultisigTransaction(this: {
        price: any;
        title: any;
        state: boolean;
      }) {
        multisigTransaction(+this.price, this.title).then((v) => {
          this.state = !this.state;
          console.log(v, "test");
        });
      },

      async openScanner(this: {
        state: boolean;
        title: any;
        price: any;
        modalState: boolean;
      }) {
        BarcodeScanner.scan()
          .then((barcodeData) => {
            const sampleData = barcodeData.text;
            const obj = JSON.parse(sampleData);
            this.title = obj.title;
            this.price = obj.price;
            this.modalState = !this.modalState;
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
    height: 4em;
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
  .button_chice {
    width: 100px;
    height: 80px;
    display: block;
    margin: auto;
  }
  .anime_text_center {
    font-family: neko;
  }
</style>
