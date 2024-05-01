<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { IProduct } from "../ts/interfaces/product.interface.ts";

const route = useRoute();

const quantity = ref<number>(1);

const selectedProduct = ref<IProduct>();

onMounted(async (): Promise<void> => {
  try {
    const response = axios.get(
      `http://localhost:3000/products/${route.params.id}`,
    );

    selectedProduct.value = (await response).data;
  } catch (err) {
    console.log(err);
  }
});

const increaseQuantity = (): void => {
  quantity.value++;
};

const decreaseQuantity = (): void => {
  if (quantity.value === 1) return;

  quantity.value--;
};

const addToCart = async (): Promise<void> => {
  try {
    const cartItem = {
      product_id: selectedProduct.value?._id,
      quantity: quantity.value,
    };

    await axios.post(
      `http://localhost:3000/products/${route.params.id}`,
      cartItem,
    );
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <main class="flex items-center justify-start gap-24">
    <section class="flex items-center gap-4">
      <div class="bg-black px-3 py-4 rounded-md cursor-pointer">
        <i class="fa-solid fa-angle-left text-white text-xl"></i>
      </div>
      <div class="w-80 h-80 bg-primary rounded-md"></div>
      <div class="bg-black px-3 py-4 rounded-md cursor-pointer">
        <i class="fa-solid fa-angle-right text-white text-xl"></i>
      </div>
    </section>
    <section class="flex flex-col gap-10">
      <h1>{{ selectedProduct?.name }}</h1>
      <div
        class="w-28 bg-gray-200 rounded-md flex items-center justify-center gap-5 py-2"
      >
        <i
          class="fa-solid fa-minus text-sm cursor-pointer"
          @click.left="decreaseQuantity"
        ></i>
        <p>{{ quantity }}</p>
        <i
          class="fa-solid fa-plus text-sm cursor-pointer"
          @click.left="increaseQuantity"
        ></i>
      </div>
      <button
        class="w-64 bg-light-blue text-white border border-light-blue rounded-md px-8 py-2 cursor-pointer transition-all hover:bg-white hover:text-light-blue"
        @click.left="addToCart"
      >
        Add to cart
      </button>
    </section>
  </main>
</template>
