<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>電話確認</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-label>
        電話確認
      </ion-label>
      <ion-button href="/tabs/tab1">トランザクションページ</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from "@ionic/vue";

export default {
  name: "Calling",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonPage,
    IonContent
  }
};
</script>
