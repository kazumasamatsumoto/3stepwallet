<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>電話をする</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row><div class="height"></div></ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col>
            <ion-button @click="testCall" class="round"
              ><img src="../../images/keitai_mukashi.png"
            /></ion-button>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
      </ion-grid>
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
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
  } from "@ionic/vue";

  export default {
    name: "Calling",
    components: {
      IonHeader,
      IonToolbar,
      IonTitle,
      IonPage,
      IonContent,
      IonButton,
      IonGrid,
      IonRow,
      IonCol,
    },
    methods: {
      testCall() {
        CallNumber.callNumber("08061341310", false)
          .then((res) => {
            console.log("Launched dialer!", res);
            location.href = "/tabs/tab1";
          })
          .catch((err) => console.log("Error launching dialer", err));
      },
    },
  };
</script>

<style>
  .round {
    width: 150px;
    height: 150px;
  }
  .height {
    height: 8em;
  }
  .text_center {
    text-align: center;
  }
</style>
