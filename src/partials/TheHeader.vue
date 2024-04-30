<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goToShopPage = (): void => {
  router.push({ name: "shop" });
};
</script>

<template>
  <header
    class="w-full h-20 bg-primary text-white flex items-center justify-between px-24"
  >
    <h1 class="cursor-pointer" @click.left="goToShopPage">Shop</h1>
    <i
      class="fa-solid fa-cart-shopping text-xl transition-all cursor-pointer hover:text-secondary"
    ></i>
  </header>
</template>

<style lang="scss" scoped></style>
