<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useProductStore } from "../../pinia/products.pinia.ts";

const props = defineProps<{
  id: string;
  name: string;
  price: number;
  image?: string;
}>();

const router = useRouter();

const productStore = useProductStore();

const goToProductPage = (): void => {
  router.push({ name: "product", params: { id: props.id } });
  productStore.setSelectedProduct(props.id);
};
</script>

<template>
  <article
    class="h-96 rounded-lg cursor-pointer box-shadow-all-sides"
    @click="goToProductPage"
  >
    <div v-if="!props.image" class="w-full h-72 bg-blue-500 rounded-t-lg"></div>
    <img v-else :src="image" alt="not found" class="w-full h-72 rounded-t-lg" />
    <section class="flex flex-col p-3 gap-2">
      <p>{{ props.name }}</p>
      <h3 class="font-semibold">{{ props.price }}$</h3>
    </section>
  </article>
</template>
