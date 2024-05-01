<script lang="ts" setup>
import { useProductStore } from "../pinia/products.pinia.ts";
import ProductCard from "../components/shop/ProductCard.vue";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const productStore = useProductStore();

const currentPage = ref<number>(1);

const currentPageProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * 6;
  const endIndex = startIndex + 6;
  return productStore.products.slice(startIndex, endIndex);
});

const goNextPage = () => {
  router.push({ name: "shop", query: { page: currentPage.value + 1 } });
};

const goPreviousPage = () => {
  if (currentPage.value === 1) return;

  router.push({ name: "shop", query: { page: currentPage.value - 1 } });
};

watch(
  () => route.query,
  (value) => {
    if (!value) return;
    currentPage.value = Number(route.query?.page) || 1;
    console.log(currentPage.value);
  },
  { immediate: true },
);
</script>

<template>
  <main class="grid grid-cols-3 gap-y-3 gap-x-4 px-16 py-5">
    <ProductCard
      v-for="product in currentPageProducts"
      :id="product.id"
      :key="product.id"
      :name="product.name"
      :photo="product.photo"
      :price="product.price"
    />
  </main>
  <section class="flex items-center justify-center gap-3 pb-8">
    <div class="cursor-pointer" @click.left="goPreviousPage">previous page</div>
    <div class="cursor-pointer" @click.left="goNextPage">next page</div>
  </section>
</template>
