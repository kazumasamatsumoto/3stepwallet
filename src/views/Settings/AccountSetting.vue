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
    },
    setup() {
      const name = ref("");

      // eslint-disable-next-line vue/no-dupe-keys
      return { name };
    },
    methods: {
      async createFunction(name: string) {
        await API.graphql(
          graphqlOperation(createTodo, {
            input: {
              name: name,
              count: 10,
            },
          })
        );
        location.href = "/tabs/tab3";
      },
    },
  };
</script>
