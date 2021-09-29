<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>送信設定</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button href="/tabs/tab3">設定画面へ</ion-button>
      <ion-item>
        <ion-label position="floating">電話送信先設定</ion-label>
        <ion-input v-model="phoneNumber"></ion-input>
      </ion-item>
      <ion-button @click="settingContactInfo">登録</ion-button>
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
    IonButton,
    IonLabel,
    IonInput,
    IonItem,
  } from "@ionic/vue";
  import { ref } from "vue";

  export default {
    name: "ContactSetting",
    components: {
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonPage,
      IonButton,
      IonLabel,
      IonInput,
      IonItem,
    },
    setup() {
      const phoneNumber = ref("");

      // eslint-disable-next-line vue/no-dupe-keys
      return { phoneNumber };
    },
    methods: {
      settingContactInfo(this: { phoneNumber: string }) {
        console.log(this.phoneNumber);
        localStorage.setItem("phoneNumber", this.phoneNumber);
        location.href = "/tabs/tab1";
      },
    },
  };
</script>
