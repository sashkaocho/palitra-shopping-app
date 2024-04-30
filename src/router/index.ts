import { createRouter, createWebHistory, Router } from "vue-router";

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
  ],
});

export default router;
