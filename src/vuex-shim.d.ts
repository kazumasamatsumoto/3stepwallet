import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

declare module "@vue/runtime-core" {
  interface State {
    count: string;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
