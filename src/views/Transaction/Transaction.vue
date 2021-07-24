<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>トランザクションページ</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-label> こんにちは{{ name }}さん </ion-label>
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
  import { ref } from "@vue/reactivity";

  import { Plugins } from "@capacitor/core";
  const { Storage } = Plugins;

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
    setup() {
      const name = ref("");

      return { name };
    },
    create(this: { name: any }) {
      console.log(this.name);
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.getUserId();
    },
    methods: {
      sampleFunction: function() {
        multisigTransaction().then();
      },
      async getUserId() {
        console.log("getUserId");
        const ret = await Storage.get({ key: "user" });
        console.log(ret);
      },
    },
  };
</script>
