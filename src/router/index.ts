import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Tabs from "../views/Tabs.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/tab1",
  },
  {
    path: "/tabs/",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "/tabs/tab1",
      },
      {
        path: "tab1",
        component: () => import("@/views/Transaction/Transaction.vue"),
      },
      {
        path: "tab2",
        component: () => import("@/views/History/History.vue"),
      },
      {
        path: "tab3",
        component: () => import("@/views/Settings/Settings.vue"),
      },
      {
        path: "account-setting",
        component: () => import("@/views/Settings/AccountSetting.vue"),
      },
      {
        path: "calling",
        component: () => import("@/views/Transaction/Calling.vue"),
      },
      {
        path: "sending",
        component: () => import("@/views/Transaction/Sending.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
