import { createRouter, createWebHistory, Router } from "vue-router";

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/shop" },
    {
      path: "/shop",
      name: "shop",
      component: () => import("../views/ShopView.vue"),
    },
  ],
});

export default router;
