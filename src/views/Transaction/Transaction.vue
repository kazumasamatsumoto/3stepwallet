<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>トランザクションページ</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-label> こんにちは{{ value }}さん </ion-label>
      <br />
      <ion-button @click="sampleFunction">送信</ion-button>
      <ion-card>
        <ion-card-header>
          State management of the store by dispatching action to change value in
          store, using the payload passed in my the component
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-input type="string" v-model="newValue"></ion-input>
          </ion-item>
          <ion-button @click="onChangeTo">Change To</ion-button>
        </ion-card-content>
      </ion-card>
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
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonItem,
  IonInput,
} from "@ionic/vue";
import { multisigTransaction } from "../../util/symbol";
import { ref } from "@vue/reactivity";

import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";

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
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonItem,
    IonInput,
  },
  setup() {
    const store = useStore();
    const newValue = ref<string>("test");
    return {
      newValue,
      value: computed(() => store.state.count),
      onChangeTo: () => store.dispatch("changeTo", { value: newValue.value }),
    };
  },
  methods: {
    sampleFunction: function() {
      multisigTransaction().then();
    },
  },
};
</script>
