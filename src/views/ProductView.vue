<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useProductStore } from "../pinia/products.pinia.ts";
import { useRoute } from "vue-router";
import { IProduct } from "../ts/interfaces/product.interface.ts";

const route = useRoute();

const productStore = useProductStore();

const quantity = ref<number>(1);

const selectedProduct = computed<IProduct | null>(
  () => productStore.selectedProduct,
);

onMounted(() => {
  productStore.setSelectedProduct(+route.params.id);
});
</script>

<template>
  <h1>{{ selectedProduct?.name }}</h1>
  <div class="w-20 border border-amber-950 flex items-center justify-center">
    + {{ quantity }} -
  </div>
  <button>Add to cart</button>
</template>
