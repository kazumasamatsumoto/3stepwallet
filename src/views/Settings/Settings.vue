<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>設定ページ</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button href="/tabs/account-setting">アカウント設定</ion-button>
      <ion-button @click="createFunction(message)"
        >アカウント作成テスト</ion-button
      >
      <ion-button @click="updateFunction">アップデートテスト</ion-button>
    </ion-content>
    <ion-content>
      <ion-item>
        <ion-label position="floating">名前を入力してください</ion-label>
        <ion-input v-model="message"></ion-input>
      </ion-item>
    </ion-content>
    <ion-content>
      <ion-button @click="getDatas">ローカル呼び出しテスト</ion-button>
      {{ testlocal }}
    </ion-content>
    <ion-content>
      <ul id="example-1" style="list-style: none;">
        <li v-for="item in test" :key="item.id">
          <ion-card>
            <ion-card-content>
              id: {{ item.id }} <br />
              名前: {{ item.name }} <br />
              残り回数: {{ item.count }} <br />
              <ion-button @click="setData(item.name, item.id, item.count - 1)"
                >データ格納テスト</ion-button
              >
              <ion-button @click="getDatas">ローカル取得動作確認</ion-button>
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
    IonInput,
    IonItem,
    IonLabel,
  } from "@ionic/vue";
  import { createTodo, updateTodo } from "@/graphql/mutations";
  import { API, graphqlOperation } from "aws-amplify";
  import { listTodos } from "@/graphql/queries";
  import { ListTodosQuery } from "@/API";
  import { Plugins } from "@capacitor/core";
  import { ref } from "vue";
  import Test from "../../types/testInterface";
  const { Storage } = Plugins;

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
      IonInput,
      IonItem,
      IonLabel,
    },
    data: function() {
      return {
        storageData: null,
      };
    },
    setup() {
      const test = ref("");
      const message = ref("");
      const id = ref(0);
      const name = ref("");

      // eslint-disable-next-line vue/no-dupe-keys
      return { test, message, id, name };
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
      async createFunction(message: string) {
        await API.graphql(
          graphqlOperation(createTodo, {
            input: {
              name: message,
              count: 10,
            },
          })
        );
      },
      async updateFunction() {
        await API.graphql(
          graphqlOperation(updateTodo, {
            input: {
              id: "test",
              name: "matsumoto kazumasa",
            },
          })
        );
      },
      async setDatas(user: string, id: string, count: number) {
        await Storage.set({
          key: id,
          value: JSON.stringify({
            name: user,
            count: count,
          }),
        });
      },
      async getDatas() {
        const ret = await Storage.get({ key: "test" });
        const testlocal = JSON.parse(ret.value!) as Test;
        console.log(testlocal);
        return testlocal;
      },
      async setData() {
        const date = new Date();
        await Storage.set({
          key: "user",
          value: JSON.stringify({
            id: 1,
            time: date,
          }),
        });
      },
      async getData() {
        const ret = await Storage.get({ key: "user" });
        this.storageData = JSON.parse(ret.value!);
      },
    },
  };
</script>
