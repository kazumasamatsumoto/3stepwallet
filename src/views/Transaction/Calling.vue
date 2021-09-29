<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title v-if="contact === 'call'">電話をする</ion-title>
        <ion-title v-if="contact === 'mail'">メールをする</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="contact === 'call'">
      <ion-grid>
        <ion-row><div class="height"></div></ion-row>
        <ion-row>
          <ion-col size="1"></ion-col>
          <ion-col>
            <p class="text_center nes-balloon from-right anime_text_center">
              でんわをしよう
            </p>
          </ion-col>
          <ion-col size="1"></ion-col>
        </ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col>
            <ion-button @click="testCall" class="round nes-btn is-primary"
              ><img src="../../images/keitai_mukashi.png"
            /></ion-button>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-content v-else-if="contact === 'mail'">
      <ion-grid>
        <ion-row><div class="height"></div></ion-row>
        <ion-row>
          <ion-col size="1"></ion-col>
          <ion-col>
            <p class="text_center nes-balloon from-right anime_text_center">
              メールをしよう
            </p>
          </ion-col>
          <ion-col size="1"></ion-col>
        </ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col>
            <ion-button @click="testSend" class="round nes-btn is-primary"
              ><img src="../../images/mail_man.png"
            /></ion-button>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  // Call Number Plugin
  import { CallNumber } from "@ionic-native/call-number";
  import { SMS } from "@ionic-native/sms";

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
  import { API, graphqlOperation } from "aws-amplify";
  import { getTodo } from "@/graphql/queries";
  import { GetTodoQuery } from "@/API";

  export default {
    name: "Calling",
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
        contact: "",
        phoneNumber: "",
      };
    },
    methods: {
      testCall(this: { phoneNumber: any }) {
        CallNumber.callNumber(this.phoneNumber, false)
          .then((res) => {
            console.log("Launched dialer!", res);
            location.href = "/tabs/tab1";
          })
          .catch((err) => console.log("Error launching dialer", err));
      },
      testSend(this: { phoneNumber: any }) {
        const number = this.phoneNumber;
        const message = "Hello world";

        //CONFIGURATION
        const options = {
          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          android: {
            intent: "INTENT", // send SMS with the native android SMS messaging
            //intent: '' // send SMS without opening any other app, require : android.permission.SEND_SMS and android.permission.READ_PHONE_STATE
          },
        };
        SMS.send(number, message, options);
        location.href = "/tabs/tab1";
      },
      async getTodo(this: { contact: any; email: any; phoneNumber: any }) {
        const userId = localStorage.getItem("userId");
        this.phoneNumber = localStorage.getItem("phoneNumber");
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
            this.contact = userData!.contact;
          }
        }
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
  .text_center {
    text-align: center;
  }
  .anime_text_center {
    font-family: neko;
  }
</style>
