<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>電話確認</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <br>
      <ion-label>
        電話確認
      </ion-label>
      <br>
      <br>
      <ion-button href="/tabs/tab1">トランザクションページ</ion-button>
      <br>
      <br>
      <ion-button @click="testCall">電話する</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
// Call Number Plugin
import { CallNumber } from "@ionic-native/call-number";

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonButton
} from "@ionic/vue";

export default {
  name: "Calling",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonPage,
    IonContent,
    IonLabel,
    IonButton
  },
  methods: {
    testCall() {
      CallNumber.callNumber("08061341310", false)
        .then((res) => console.log("Launched dialer!", res))
        .catch((err) => console.log("Error launching dialer", err));
    }
  }
};
</script>
