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

      // eslint-disable-next-line vue/no-dupe-keys
      return { name, contact };
    },
    methods: {
      sample(value: any) {
        console.log(value);
      },
      async createFunction(this: { name: string; contact: string }) {
        console.log(this.name, this.contact);
        await API.graphql(
          graphqlOperation(createTodo, {
            input: {
              name: this.name,
              count: 1000,
              contact: this.contact,
            },
          })
        );
        location.href = "/tabs/tab3";
      },
    },
  };
</script>
