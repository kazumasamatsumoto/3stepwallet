<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>かいものをする</ion-title>
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
            <p class="text_center">あなたのざんだかは{{ count }}円です</p>
            <div class="health-bar" data-total="1000" data-value="1000">
              <div class="bar">
                <div class="hit"></div>
              </div>
            </div>
          </ion-col>
          <ion-col size="0.5"></ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="1"></ion-col>
          <ion-col>
            <p class="text_center anime_text_center">かいものをする</p>
          </ion-col>
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
        width: "100%",
      };
    },
    methods: {
      shoppingStart() {
        console.log("shopping start");
        location.href = "/tabs/sending";
      },
      async getTodo(this: { name: any; count: any; width: any }) {
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
            const newWidth =
              (this.count / Number(process.env.VUE_APP_COUNT)) * 100;
            this.width = `${newWidth}%`;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const el = document.querySelector<HTMLElement>(".bar")!;
            el.style.setProperty("width", this.width);
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
    z-index: 2;
  }
  .anime_text_center {
    font-family: neko;
    z-index: 0;
  }
  .health-bar {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 200px;
    height: 20px;
    padding: 5px;
    background: #ddd;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    position: relative;
    margin: auto;
  }
  .bar {
    background: #00cc66;
    width: 100%;
    height: 10px;
    position: relative;

    transition: width 0.5s linear;
  }

  .hit {
    background: rgba(255, 255, 255, 0.6);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 0px;

    transition: width 0.5s linear;
  }
</style>
