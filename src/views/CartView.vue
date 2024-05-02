<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { useCartStore } from "../pinia/cart.pinia.ts";
import { ECartActions, ECartGetters } from "../ts/enums/pinia/cart.enum.ts";
import { IProduct } from "../ts/interfaces/product.interface.ts";
import { useRouter } from "vue-router";
import BaseButton from "../components/base/BaseButton.vue";

const router = useRouter();

const cartStore = useCartStore();

const cartIsEmpty = ref<boolean>(false);

const cart = computed<IProduct[]>(() => cartStore[ECartGetters.GetCart]);

onMounted(async (): Promise<void> => {
  try {
    const response = axios.get("http://localhost:3000/cart");

    cartStore[ECartActions.SetCart]((await response).data);
  } catch (err) {
    console.log(err);
  }
});

const increaseQuantity = (id: string | null): void => {
  if (!id) return;

  try {
    axios.patch(`http://localhost:3000/cart/${id}`, {
      operation: "increment",
    });

    cartStore[ECartActions.IncreaseQuantity](id);
  } catch (err) {
    console.log(err);
  }
};

const decreaseQuantity = (id: string | null): void => {
  if (!id) return;

  try {
    axios.patch(`http://localhost:3000/cart/${id}`, {
      operation: "decrement",
    });

    cartStore[ECartActions.DecreaseQuantity](id);
  } catch (err) {
    console.log(err);
  }
};

const removeProductFromCart = (id: string | null) => {
  try {
    axios.delete(`http://localhost:3000/cart/${id}`);

    cartStore[ECartActions.RemoveProductFromCart](id);
  } catch (err) {
    console.log(err);
  }
};

const goToCheckout = (): void => {
  if (cart.value.length < 1) {
    cartIsEmpty.value = true;
    return;
  }
  router.push({ name: "checkout" });
};
</script>

<template>
  <main class="flex flex-col gap-10">
    <h1>Cart</h1>
    <section
      v-for="cartItem in cart"
      :key="cartItem._id"
      class="w-fit flex items-center gap-10"
    >
      <img
        :src="cartItem?.gallery[0]"
        alt=""
        class="w-[150px] h-[150px] rounded-md box-shadow-all-sides"
      />
      <div class="flex flex-col gap-6">
        <h2 class="text-lg">{{ cartItem?.name }}</h2>

        <div class="flex items-center gap-12">
          <div
            class="w-20 bg-gray-200 rounded-md flex items-center justify-center gap-3 py-1"
          >
            <i
              class="fa-solid fa-minus text-xs cursor-pointer"
              @click.left="decreaseQuantity(cartItem.cart_id ?? null)"
            ></i>
            <p class="text-sm">{{ cartItem?.quantity }}</p>
            <i
              class="fa-solid fa-plus text-xs cursor-pointer"
              @click.left="increaseQuantity(cartItem.cart_id ?? null)"
            ></i>
          </div>
          <h2>{{ cartItem.price * cartItem.quantity }}$</h2>
        </div>

        <h2
          class="text-light-blue cursor-pointer transition-all hover:text-black"
          @click.left="removeProductFromCart(cartItem.cart_id ?? null)"
        >
          Remove
        </h2>
      </div>
    </section>
    <BaseButton :width="40" content="Checkout" @click="goToCheckout" />
    <p v-if="cartIsEmpty" class="text-red-700">add products to cart</p>
  </main>
</template>
