<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

const categories = ["Phone", "Laptop", "Tablet", "TV", "Watch", "Earphones"];
const goToShopPage = (): void => {
  router.push({ name: "shop" });
};

const goToCartPage = (): void => {
  router.push({ name: "cart" });
};
</script>

<template>
  <header
    class="w-full h-20 bg-primary text-white flex items-center justify-between px-24"
  >
    <h1 class="cursor-pointer" @click.left="goToShopPage">Shop</h1>
    <nav>
      <ul class="flex items-center gap-14">
        <li
          v-for="(category, index) in categories"
          :key="index"
          class="transition-all cursor-pointer hover:text-light-blue"
        >
          {{ category }}
        </li>
      </ul>
    </nav>
    <div
      class="relative flex items-center gap-2 cursor-pointer transition-all hover:text-light-purple"
      @click="goToCartPage"
    >
      <i class="fa-solid fa-cart-shopping text-2xl"></i>
      <h2>Cart</h2>
      <h4 class="absolute text-lg text-light-blue font-bold bottom-3 left-2.5">
        0
      </h4>
    </div>
  </header>
</template>

<style lang="scss" scoped></style>
