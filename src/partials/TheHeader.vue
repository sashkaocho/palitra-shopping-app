<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToShopPage = (): void => {
  router.push({ name: "shop" });
};

const goToCartPage = (): void => {
  router.push({ name: "cart" });
};
</script>

<template>
  <header
    class="w-full h-20 bg-primary text-white flex items-center justify-around px-24"
  >
    <h1 class="cursor-pointer" @click.left="goToShopPage">Shop</h1>
    <div
      class="relative flex items-center gap-2 cursor-pointer transition-all hover:text-light-purple"
      @click="goToCartPage"
    >
      <i class="fa-solid fa-cart-shopping text-2xl"></i>
      <h2>Cart</h2>
    </div>
  </header>
</template>

<style lang="scss" scoped></style>
