<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>設定ページ</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button href="/tabs/account-setting">アカウント設定</ion-button>
    </ion-content>
    <ion-content>
      <ion-button @click="testFunction">テスト</ion-button>
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
  } from "@ionic/vue";
  import { createTodo } from "@/graphql/mutations";
  import { API, graphqlOperation } from "aws-amplify";

  export default {
    name: "Tab3",
    components: {
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonPage,
      IonButton,
    },
    methods: {
      testFunction: async () => {
        await API.graphql(
          graphqlOperation(createTodo, {
            input: {
              id: "test",
              name: "matsumoto",
              count: 10,
            },
          })
        );
      },
    },
  };
</script>
