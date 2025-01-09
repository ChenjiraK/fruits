import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Test from '../views/Test.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/test",
    name: "test",
    component: Test,
  },
  {
    path: "/group",
    name: "group",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/GroupData.vue"),
  },
];

const router = createRouter({
  history: createWebHistory('/fruits'),
  routes,
});

export default router;
