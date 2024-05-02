<script lang="ts" setup>
import { useCartStore } from "../pinia/cart.pinia.ts";
import { computed, onMounted } from "vue";
import { IProduct } from "../ts/interfaces/product.interface.ts";
import { ECartActions, ECartGetters } from "../ts/enums/pinia/cart.enum.ts";
import axios from "axios";
import router from "../router";

const cartStore = useCartStore();

const cart = computed<IProduct[]>(() => cartStore[ECartGetters.GetCart]);

const totalPrice = computed<number>(() => {
  let totalPrice = 0;
  for (let i = 0; i < cart.value.length; i++) {
    console.log(cart.value[i].price);
    totalPrice += cart.value[i].price * cart.value[i]?.quantity;
  }
  return totalPrice;
});

onMounted(async (): Promise<void> => {
  try {
    const response = axios.get("http://localhost:3000/cart");

    cartStore[ECartActions.SetCart]((await response).data);
  } catch (err) {
    console.log(err);
  }
});

const emptyCart = (): void => {
  try {
    axios.delete("http://localhost:3000/checkout");
    cartStore[ECartActions.SetCart]([]);
  } catch (err) {
    console.log(err);
  }

  router.push({ name: "shop" });
};
</script>

<template>
  <main class="flex flex-col gap-10">
    <h1>Checkout</h1>
    <section
      v-for="cartItem in cart"
      :key="cartItem._id"
      class="w-fit flex items-center gap-10"
    >
      <img
        :src="cartItem?.gallery[0]"
        alt="not found"
        class="w-[100px] h-[100px] rounded-md box-shadow-all-sides"
      />
      <div class="flex flex-col gap-6">
        <h2 class="text-lg">{{ cartItem?.name }}</h2>
        <p class="text-sm">{{ cartItem?.quantity }}x</p>
      </div>
    </section>
    <h1>Total: {{ totalPrice }}$</h1>
    <button
      class="w-40 text-white rounded-xl bg-light-blue px-5 py-2"
      @click.left="emptyCart"
    >
      Buy
    </button>
  </main>
</template>
