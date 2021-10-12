<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>設定ページ</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-button href="/tabs/account-setting"
            >アカウント作成ページへ</ion-button
          >
        </ion-row>
        <ion-row>
          <ion-card>
          <ion-card-title>
          ユーザー一覧
          </ion-card-title>
            <ul style="display: contents;">
              <li v-for="item in test" :key="item.id">
                <ion-card color="success">
                  <ion-card-content>
                    {{ item.name + "さん" }} 残高{{ item.count + "円" }}
                    <ion-button @click="updateFunction(item.id)"
                      >残高リセット</ion-button
                    >
                    <ion-button @click="setDatas(item.id)"
                      >買い物するユーザーを選択します</ion-button
                    >
                  </ion-card-content>
                </ion-card>
              </li>
            </ul>
          </ion-card>
        </ion-row>
      </ion-grid>
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
    IonCard,
    IonCardContent,
    IonGrid,
    IonCardTitle,
  } from "@ionic/vue";
  import { createTodo, updateTodo } from "@/graphql/mutations";
  import { API, graphqlOperation } from "aws-amplify";
  import { listTodos } from "@/graphql/queries";
  import { ListTodosQuery } from "@/API";
  import { ref } from "vue";

  export default {
    name: "Tab3",
    components: {
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonPage,
      IonButton,
      IonGrid,
      IonCardTitle,
      IonCard,
      IonCardContent,
    },
    data: function() {
      return {
        storageData: "",
      };
    },
    setup() {
      const test = ref([]);
      const name = ref("");

      // eslint-disable-next-line vue/no-dupe-keys
      return { test, name };
    },
    created() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.getTodos();
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
      async updateFunction(id: string) {
        await API.graphql(
          graphqlOperation(updateTodo, {
            input: {
              id: id,
              count: process.env.VUE_APP_COUNT,
            },
          })
        );
        location.href = "/tabs/tab3";
      },
      async getTodos(this: { test: any }) {
        console.log("test");
        const sample = await API.graphql(graphqlOperation(listTodos));
        if ("data" in sample && sample.data) {
          const post = sample.data as ListTodosQuery;
          if (post !== undefined) {
            this.test = post.listTodos?.items;
          }
        }
      },
      async setDatas(id: string) {
        console.log(id);
        localStorage.setItem("userId", id);
        location.href = "/tabs/tab1";
      },
    },
  };
</script>
