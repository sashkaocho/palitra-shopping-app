import { defineStore } from "pinia";

export const useProductStore = defineStore("cart", {
  state: () => ({
    cart: [],
  }),
});
