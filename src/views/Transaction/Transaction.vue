<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>買い物をする</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row><div class="blank"></div></ion-row>
        <ion-row>
          <ion-col size="1"></ion-col>
          <ion-col>
            <p class="text_center">{{ name }}さん</p>
          </ion-col>
          <ion-col size="1"></ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="0.5"></ion-col>
          <ion-col>
            <p class="text_center">あなたの残り買い物回数は{{ count }}回です</p>
          </ion-col>
          <ion-col size="0.5"></ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="1"></ion-col>
          <ion-col
            ><p class="text_center nes-balloon from-right anime_text_center">
              かいものをする
            </p></ion-col
          >
          <ion-col size="1"></ion-col>
        </ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col>
            <ion-button class="round nes-btn is-primary" @click="shoppingStart"
              ><img src="../../images/shopping.png"
            /></ion-button>
          </ion-col>
          <ion-col></ion-col>
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
    IonGrid,
    IonRow,
    IonCol,
  } from "@ionic/vue";
  import { API, graphqlOperation } from "aws-amplify";
  import { getTodo } from "@/graphql/queries";
  import { GetTodoQuery } from "@/API";
  import { updateFunction } from "@/util/amplifyMethods";
  import "nes.css/css/nes.min.css";
  export default {
    name: "Tab1",
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
        name: "",
        count: 0,
      };
    },
    methods: {
      shoppingStart(this: { count: any }) {
        console.log("shopping start");
        updateFunction(this.count);
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

<style>
  .round {
    width: 150px;
    height: 150px;
  }
  .blank {
    height: 30px;
  }
  .text_center {
    text-align: center;
  }
  .anime_text_center {
    font-family: neko;
  }
</style>
