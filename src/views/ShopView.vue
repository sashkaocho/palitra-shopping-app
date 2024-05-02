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
  const nextPageStartIndex = currentPage.value * 6;
  if (nextPageStartIndex >= productStore.products.length) {
    return;
  }
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
      <button
        class="w-12 h-12 flex justify-center items-center bg-primary rounded-full cursor-pointer transition-all hover:bg-light-blue"
        @click.left="goPreviousPage"
      >
        <i class="fa-solid fa-angle-left text-white text-xl"></i>
      </button>
      <button
        class="w-12 h-12 flex justify-center items-center bg-primary rounded-full cursor-pointer transition-all hover:bg-light-blue"
        @click.left="goNextPage"
      >
        <i class="fa-solid fa-angle-right text-white text-xl"></i>
      </button>
    </section>
  </main>
</template>
