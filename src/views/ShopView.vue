<script lang="ts" setup>
import ProductCard from "../components/shop/ProductCard.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "../pinia/products.pinia.ts";
import { IProduct } from "../ts/interfaces/product.interface.ts";
import axios from "axios";

const router = useRouter();
const route = useRoute();

const productStore = useProductStore();

const currentPage = ref<number>(1);

const currentPageProducts = computed<IProduct[]>(() => {
  const startIndex = (currentPage.value - 1) * 6;
  const endIndex = startIndex + 6;
  return productStore.products.slice(startIndex, endIndex);
});

onMounted(async (): Promise<void> => {
  try {
    const response = axios.get("http://localhost:3000/products");

    productStore.setProducts((await response).data);
  } catch (err) {
    console.log(err);
  }
});

const goNextPage = (): void => {
  router.push({ name: "shop", query: { page: currentPage.value + 1 } });
};

const goPreviousPage = (): void => {
  if (currentPage.value === 1) return;

  router.push({ name: "shop", query: { page: currentPage.value - 1 } });
};

watch(
  () => route.query,
  (value): void => {
    if (!value) return;
    currentPage.value = Number(route.query?.page) || 1;
  },
  { immediate: true },
);
</script>

<template>
  <main class="grid grid-cols-3 gap-y-3 gap-x-4">
    <ProductCard
      v-for="product in currentPageProducts"
      :id="product._id"
      :key="product._id"
      :image="product.gallery[0]"
      :name="product.name"
      :price="product.price"
    />
  </main>
  <section class="flex items-center justify-center gap-3 pb-8">
    <div class="cursor-pointer" @click.left="goPreviousPage">previous page</div>
    <div class="cursor-pointer" @click.left="goNextPage">next page</div>
  </section>
</template>
