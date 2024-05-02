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
    {
      path: "/product/:id",
      name: "product",
      component: () => import("../views/ProductView.vue"),
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/CartView.vue"),
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("../views/CheckoutView.vue"),
    },
  ],
});

export default router;
