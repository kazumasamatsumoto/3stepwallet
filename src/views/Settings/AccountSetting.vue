<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>アカウント設定</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button href="/tabs/tab3">設定画面へ</ion-button>
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
  name: "AccountSetting",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage
  }
};
</script>
