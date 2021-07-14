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
      <ul id="example-1" style="list-style: none;">
        <li v-for="item in test" :key="item.id">
          <ion-card>
            <ion-card-content>
              id: {{ item.id }} <br />
              名前: {{ item.name }} <br />
              残り回数: {{ item.count }} <br />
            </ion-card-content>
          </ion-card>
        </li>
      </ul>
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
    IonCardContent,
    IonCard,
  } from "@ionic/vue";
  import { createTodo } from "@/graphql/mutations";
  import { API, graphqlOperation } from "aws-amplify";
  import { listTodos } from "@/graphql/queries";
  import { ListTodosQuery } from "@/API";

  export default {
    name: "Tab3",
    components: {
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonPage,
      IonButton,
      IonCardContent,
      IonCard,
    },
    data: function() {
      return {
        test: "",
      };
    },
    async created(this: { test: any }) {
      const sample = await API.graphql(graphqlOperation(listTodos));
      if ("data" in sample && sample.data) {
        const post = sample.data as ListTodosQuery;
        if (post !== undefined) {
          this.test = post.listTodos?.items;
        }
      }
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
