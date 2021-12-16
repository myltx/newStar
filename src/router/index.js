import { createRouter, createWebHashHistory } from "vue-router";
import Star from "../views/star/index.vue";
import NewStar from "../views/star/newStar.vue";
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
  {
    path: "/newStar",
    name: "NewStar",
    component: NewStar,
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
