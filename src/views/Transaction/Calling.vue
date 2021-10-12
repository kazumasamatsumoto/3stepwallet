<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title v-if="contact === 'call'">でんわをする</ion-title>
        <ion-title v-if="contact === 'mail'">メールをする</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="contact === 'call'">
      <ion-grid>
        <ion-row><div class="height"></div></ion-row>
        <ion-row>
          <ion-col size="1"></ion-col>
          <ion-col>
            <p class="text_center anime_text_center">でんわをしよう</p>
          </ion-col>
          <ion-col size="1"></ion-col>
        </ion-row>
        <ion-row>
          <div style="height: 100px;"></div>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-text class="user_font_size">{{ this.callUser1 }}</ion-text>
            <ion-button
              @click="testCall(this.callNumber1)"
              class="round nes-btn is-primary"
              ><img src="../../images/keitai_mukashi.png"/></ion-button
          ></ion-col>
          <ion-col>
            <ion-text class="user_font_size">{{ this.callUser2 }}</ion-text>

            <ion-button
              @click="testCall(this.callNumber2)"
              class="round nes-btn is-primary"
              ><img src="../../images/keitai_mukashi.png"
            /></ion-button>
          </ion-col>
          <ion-col>
            <ion-text class="user_font_size">{{ this.callUser3 }}</ion-text>

            <ion-button
              @click="testCall(this.callNumber3)"
              class="round nes-btn is-primary"
              ><img src="../../images/keitai_mukashi.png"/></ion-button
          ></ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-content v-else-if="contact === 'mail'">
      <ion-grid>
        <ion-row><div class="height"></div></ion-row>
        <ion-row>
          <ion-col size="1"></ion-col>
          <ion-col>
            <p class="text_center anime_text_center">メールをしよう</p>
          </ion-col>
          <ion-col size="1"></ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-text class="user_font_size">{{ this.callUser1 }}</ion-text>

            <ion-button
              @click="testSend(this.callNumber1)"
              class="round nes-btn is-primary"
              ><img src="../../images/mail_man.png"/></ion-button
          ></ion-col>
          <ion-col>
            <ion-text class="user_font_size">{{ this.callUser2 }}</ion-text>

            <ion-button
              @click="testSend(this.callNumber2)"
              class="round nes-btn is-primary"
              ><img src="../../images/mail_man.png"
            /></ion-button>
          </ion-col>
          <ion-col>
            <ion-text class="user_font_size">{{ this.callUser3 }}</ion-text>

            <ion-button
              @click="testSend(this.callNumber3)"
              class="round nes-btn is-primary"
              ><img src="../../images/mail_man.png"/></ion-button
          ></ion-col>
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
    IonText,
  } from "@ionic/vue";
  import { API, graphqlOperation } from "aws-amplify";
  import { getTodo } from "@/graphql/queries";
  import { GetTodoQuery } from "@/API";
  import { ref } from "vue";

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
      IonText,
    },
    created() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.getTodo();
    },
    setup() {
      const name = ref("");
      const contact = ref("call");
      const callNumber1 = ref("");
      const callNumber2 = ref("");
      const callNumber3 = ref("");
      const callUser1 = ref("");
      const callUser2 = ref("");
      const callUser3 = ref("");

      function testCall(callNumber: any) {
        console.log(callNumber);
        CallNumber.callNumber(callNumber, false)
          .then((res) => {
            console.log("Launched dialer!", res);
            location.href = "/tabs/tab1";
          })
          .catch((err) => console.log("Error launching dialer", err));
      }

      function testSend(callNumber: any) {
        console.log(callNumber);
        const number = callNumber;
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
      }

      // eslint-disable-next-line vue/no-dupe-keys
      return {
        name,
        contact,
        callNumber1,
        callNumber2,
        callNumber3,
        callUser1,
        callUser2,
        callUser3,
        testCall,
        testSend,
      };
    },
    methods: {
      async getTodo(this: {
        contact: any;
        callNumber1: any;
        callNumber2: any;
        callNumber3: any;
        callUser1: any;
        callUser2: any;
        callUser3: any;
      }) {
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
            this.contact = userData!.contact;
            this.callNumber1 = userData?.callNumber1;
            this.callNumber2 = userData?.callNumber2;
            this.callNumber3 = userData?.callNumber3;
            this.callUser1 = userData?.callUser1;
            this.callUser2 = userData?.callUser2;
            this.callUser3 = userData?.callUser3;
          }
        }
      },
    },
  };
</script>

<style>
  .round {
    width: 100px;
    height: 100px;
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
  .user_font_size {
    font-size: 12px;
  }
</style>
