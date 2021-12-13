import { createRouter, createWebHashHistory } from "vue-router";
import Star from "../views/star/index.vue";
const routes = [
  {
    path: "/",
    redirect: "/star",
  },
  {
    path: "/star",
    name: "Star",
    component: Star,
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;