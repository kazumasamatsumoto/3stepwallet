<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>トランザクションページ</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-label> こんにちは{{ name }}さん </ion-label><br />
      <ion-label> あなたの残り買い物回数は{{ count }}回です </ion-label>
      <br />
      <ion-button @click="sampleFunction">送信</ion-button>
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
  IonButton,
} from "@ionic/vue";
import { multisigTransaction } from "../../util/symbol";
import { API, graphqlOperation } from "aws-amplify";
import { getTodo } from "@/graphql/queries";
import { GetTodoQuery } from "@/API";

export default {
  name: "Tab1",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonPage,
    IonContent,
    IonLabel,
    IonButton,
  },
  created() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.getTodo();
  },
  data() {
    return {
      name: "",
      count: 0,
    };
  },
  methods: {
    sampleFunction(this: { count: any }): void {
      multisigTransaction(this.count).then();
    },
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
  },
};
</script>
