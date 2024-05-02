<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { IProduct } from "../ts/interfaces/product.interface.ts";
import BaseButton from "../components/base/BaseButton.vue";
import BaseNavButton from "../components/base/BaseNavButton.vue";
import { ENavArrow } from "../ts/enums/application.enum.ts";

const route = useRoute();

const quantity = ref<number>(1);

const selectedProduct = ref<IProduct>();
const currentImage = ref<number>(0);

const itemExistsInCart = ref<boolean>(false);

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
    itemExistsInCart.value = true;
    console.log(err);
  }
};
const nextPhoto = (): void => {
  if (currentImage.value === 2) {
    currentImage.value = 0;
    return;
  }
  currentImage.value++;
};

const previousPhoto = (): void => {
  if (currentImage.value === 0) {
    currentImage.value = 2;
    return;
  }
  currentImage.value--;
};
</script>

<template>
  <main class="flex items-center justify-start gap-24">
    <section class="flex items-center gap-8">
      <BaseNavButton
        :arrow="ENavArrow.left"
        :height="20"
        :width="12"
        rounded="md"
        @click.left="previousPhoto"
      />
      <img
        :src="selectedProduct?.gallery[currentImage]"
        alt=""
        class="w-[500px] h-[500px] rounded-md box-shadow-all-sides"
      />
      <BaseNavButton
        :arrow="ENavArrow.right"
        :height="20"
        :width="12"
        rounded="md"
        @click.left="nextPhoto"
      />
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
      <BaseButton :width="64" content="Add to cart" @click.left="addToCart" />
      <p v-if="itemExistsInCart" class="text-red-700">
        this item is already added in cart
      </p>
    </section>
  </main>
</template>
