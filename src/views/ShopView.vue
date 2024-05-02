<script lang="ts" setup>
import ProductCard from "../components/shop/ProductCard.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "../pinia/products.pinia.ts";
import { IProduct } from "../ts/interfaces/product.interface.ts";
import axios from "axios";
import BaseNavButton from "../components/base/BaseNavButton.vue";
import { ENavArrow } from "../ts/enums/application.enum.ts";

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
  const nextPageStartIndex = currentPage.value * 6;
  if (nextPageStartIndex >= productStore.products.length) {
    return;
  }

  window.scrollTo(0, 0);
  router.push({ name: "shop", query: { page: currentPage.value + 1 } });
};

const goPreviousPage = (): void => {
  if (currentPage.value === 1) return;

  window.scrollTo(0, 0);
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
  <main class="flex flex-col justify-center gap-12">
    <section class="grid grid-cols-3 gap-y-5 gap-x-5">
      <ProductCard
        v-for="product in currentPageProducts"
        :id="product._id"
        :key="product._id"
        :image="product.gallery[0]"
        :name="product.name"
        :price="product.price"
      />
    </section>
    <section class="flex items-center justify-center gap-8">
      <BaseNavButton
        :arrow="ENavArrow.left"
        :height="12"
        :width="12"
        rounded="full"
        @click.left="goPreviousPage"
      />
      <BaseNavButton
        :arrow="ENavArrow.right"
        :height="12"
        :width="12"
        rounded="full"
        @click.left="goNextPage"
      />
    </section>
  </main>
</template>
