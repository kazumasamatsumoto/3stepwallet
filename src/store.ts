import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      count: "kazumasa",
    };
  },
  actions: {
    changeTo({ commit }, payload) {
      commit("changeTo", payload);
    },
  },
  mutations: {
    changeTo(state: any, payload: any) {
      state.count = payload.value;
    },
  },
});
