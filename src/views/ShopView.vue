<script lang="ts" setup>
import { useProductStore } from "../pinia/products.pinia.ts";
import ProductCard from "../components/shop/ProductCard.vue";

const productStore = useProductStore();

const products = productStore.products;
</script>

<template>
  <main class="grid grid-cols-3 gap-y-3 gap-x-4 px-16 py-5">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :name="product.name"
      :photo="product.photo"
      :price="product.price"
    />
  </main>
</template>
