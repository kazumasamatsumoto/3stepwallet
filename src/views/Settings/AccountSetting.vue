<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>アカウント設定</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button href="/tabs/tab3">設定画面へ</ion-button>
      <ion-item>
        <ion-label position="floating">名前を入力してください</ion-label>
        <ion-input v-model="name"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">連絡先1</ion-label>
        <ion-input v-model="callNumber1"></ion-input>
        <ion-label position="floating">名前1</ion-label>
        <ion-input v-model="callUser1"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">連絡先2</ion-label>
        <ion-input v-model="callNumber2"></ion-input>
        <ion-label position="floating">名前2</ion-label>
        <ion-input v-model="callUser2"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">連絡先3</ion-label>
        <ion-input v-model="callNumber3"></ion-input>
        <ion-label position="floating">名前3</ion-label>
        <ion-input v-model="callUser3"></ion-input>
      </ion-item>
      <ion-radio-group v-model="contact" value="griff">
        <ion-item>
          <ion-label>電話</ion-label>
          <ion-radio
            slot="start"
            @change="sample(value)"
            value="call"
          ></ion-radio>
        </ion-item>

        <ion-item>
          <ion-label>メール</ion-label>
          <ion-radio
            slot="start"
            @change="sample(value)"
            value="mail"
          ></ion-radio>
        </ion-item>
      </ion-radio-group>
      <ion-button @click="createFunction(name)">アカウント作成</ion-button>
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
    IonButton,
    IonLabel,
    IonInput,
    IonItem,
    IonRadio,
    IonRadioGroup,
  } from "@ionic/vue";
  import { API, graphqlOperation } from "aws-amplify";
  import { createTodo } from "@/graphql/mutations";
  import { ref } from "vue";

  export default {
    name: "AccountSetting",
    components: {
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonPage,
      IonButton,
      IonLabel,
      IonInput,
      IonItem,
      IonRadio,
      IonRadioGroup,
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
      };
    },
    methods: {
      async createFunction(this: {
        name: string;
        contact: string;
        callNumber1: string;
        callUser1: string;
        callNumber2: string;
        callUser2: string;
        callNumber3: string;
        callUser3: string;
      }) {
        console.log(this.name, this.contact);
        await API.graphql(
          graphqlOperation(createTodo, {
            input: {
              name: this.name,
              count: process.env.VUE_APP_COUNT,
              contact: this.contact,
              callNumber1: this.callNumber1,
              callUser1: this.callUser1,
              callNumber2: this.callNumber2,
              callUser2: this.callUser2,
              callNumber3: this.callNumber3,
              callUser3: this.callUser3,
            },
          })
        );
        location.href = "/tabs/tab3";
      },
    },
  };
</script>
