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
            <p class="text_center anime_text_center">QRをよみこもう</p>
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
            <p class="text_center anime_text_center">こうにゅうしますか？</p>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <p class="text_center anime_text_center">
              しょうひんのなまえ {{ title }}
            </p>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <p class="text_center anime_text_center">ねだん {{ price }} えん</p>
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
    alertController,
  } from "@ionic/vue";
  import { multisigTransaction } from "@/util/symbol";
  import { API, graphqlOperation } from "aws-amplify";
  import { getTodo } from "@/graphql/queries";
  import { GetTodoQuery } from "@/API";

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
    created() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.getTodo();
    },
    data() {
      return {
        state: true,
        price: "",
        title: "",
        count: 0,
        modalState: false,
        name: ""
      };
    },
    methods: {
      async getTodo(this: { name: any; count: any }) {
        const userId = localStorage.getItem("userId");
        const sample = await API.graphql(
          graphqlOperation(getTodo, {
            id: userId,
          })
        );
        if ("data" in sample && sample.data) {
          const post = sample.data as GetTodoQuery;
          if (post !== undefined) {
            const userData = post.getTodo;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.name = userData!.name;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.count = userData!.count;
          }
        }
      },

      denialMultisigTransaction() {
        location.href = "/tabs/sending";
      },
      async confirmMultisigTransaction(this: {
        price: any;
        title: any;
        count: any;
        state: boolean;
        name: string;
      }) {
        if (+this.price < +this.count) {
          multisigTransaction(+this.price, this.title, +this.count, this.name).then(
            (v) => {
              this.state = !this.state;
              console.log(v)
            }
          );
        } else {
          const alert = await alertController.create({
            cssClass: "my-custom-class",
            header: "あらーと",
            subHeader: "こうにゅうえらー",
            message: "おかねがたりません",
            buttons: [
              {
                text: "もどる",
                handler: () => {
                  location.href = "/tabs/tab1";
                },
              },
            ],
          });
          return alert.present();
        }
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
  .my-custom-class {
    --background: #ffffff;
  }
</style>
