<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
  import { IonApp, IonRouterOutlet } from "@ionic/vue";
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "App",
    components: {
      IonApp,
      IonRouterOutlet,
    },
  });
</script>

<style>
  @font-face {
    font-family: neko;
    src: url("./font/NuKinakoMochi-BarHrE-1.otf");
  }
</style>
