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
      <ion-button @click="sampleFunction">
        サンプル
      </ion-button>
      <ion-button @click="sampleFunction2">
        サンプル2
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
import {
  getTransactionList,
  getUnConfirmTransactionList
} from "../../util/symbol";

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
    sampleFunction: async function() {
      getTransactionList().then();
    },
    sampleFunction2: async function() {
      const sample = getUnConfirmTransactionList();
    }
  }
};
</script>
