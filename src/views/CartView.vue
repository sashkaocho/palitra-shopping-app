<script lang="ts" setup>
import { computed, onMounted } from "vue";
import axios from "axios";
import { useCartStore } from "../pinia/cart.pinia.ts";
import { ECartActions, ECartGetters } from "../ts/enums/pinia/cart.enum.ts";
import { IProduct } from "../ts/interfaces/product.interface.ts";

const cartStore = useCartStore();

const cart = computed<IProduct[]>(() => cartStore[ECartGetters.GetCart]);

onMounted(async (): Promise<void> => {
  try {
    const response = axios.get("http://localhost:3000/cart");

    cartStore[ECartActions.SetCart]((await response).data);

    console.log((await response).data);
  } catch (err) {
    console.log(err);
  }
  console.log(cartStore.cart);
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
</script>

<template>
  <div v-for="cartItem in cart" :key="cartItem._id">
    <h1>{{ cartItem?.name }}</h1>
    <div
      class="w-28 bg-gray-200 rounded-md flex items-center justify-center gap-5 py-2"
    >
      <i
        class="fa-solid fa-minus text-sm cursor-pointer"
        @click.left="decreaseQuantity(cartItem.cart_id ?? null)"
      ></i>
      <p>{{ cartItem?.quantity }}</p>
      <i
        class="fa-solid fa-plus text-sm cursor-pointer"
        @click.left="increaseQuantity(cartItem.cart_id ?? null)"
      ></i>
    </div>
    <h1
      class="cursor-pointer"
      @click.left="removeProductFromCart(cartItem.cart_id ?? null)"
    >
      remove
    </h1>
  </div>
</template>
