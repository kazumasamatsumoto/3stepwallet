<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>QRコード動作確認ページ</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-label>
        QRコード動作確認ページ
      </ion-label>
      <ion-button href="/tabs/tab1">トップページへ</ion-button>
      <ion-button @click="openScanner">トップページへ</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
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
  name: "Sending",
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
    async openScanner () {
      const data = await BarcodeScanner.scan();
      console.log(`Barcode data: ${data.text}`)
    }
  }
};
</script>
