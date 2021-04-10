<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>トランザクションページ</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-label>
        トランザクションページ
      </ion-label>
      <ion-button href="/tabs/sending">送信</ion-button>
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
  name: "Tab1",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonPage,
    IonContent
  }
};
</script>
