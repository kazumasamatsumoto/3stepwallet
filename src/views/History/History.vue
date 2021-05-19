<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>トランザクション履歴</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-label>
        履歴ページ
      </ion-label>
      <ion-button @click="testFunction">
        サンプル
      </ion-button>
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
  IonButton
} from "@ionic/vue";
import { Account, NetworkType } from "symbol-sdk";

export default {
  name: "Tab2",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonLabel,
    IonButton
  },
  methods: {
    sampleFunction: function() {
      console.log("test");
    },

    testFunction: function() {
      const privateKey =
        "0000000000000000000000000000000000000000000000000000000000000000";

      const account = Account.createFromPrivateKey(
        privateKey,
        NetworkType.TEST_NET
      );
      console.log(
        "Your account address is:",
        account.address.pretty(),
        "and its private key",
        account.privateKey
      );
    }
  }
};
</script>
