<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>送信ページ</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-label>
        送信ページ
      </ion-label>
      <ion-button href="/tabs/calling">電話確認</ion-button>
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
  name: "Sending",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonPage,
    IonContent
  }
};
</script>
