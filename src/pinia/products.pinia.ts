import { defineStore } from "pinia";

export const useProductStore = defineStore("products", {
  state: () => ({
    selectedProduct: null,
    products: [
      {
        id: 1,
        name: "MacBook Pro with M1 pro chip",
        price: 1500,
        photo:
          "https://static.itechnics.ge/uploads/products/120ee780c8b548718edd2d705072645077562a6c11b78fb4f20b279da6219b15.png",
      },
      {
        id: 2,
        name: "MacBook Air with M1 chip",
        price: 1000,
      },
      {
        id: 3,
        name: "MacBook Pro with M2 pro chip",
        price: 1900,
      },
      {
        id: 4,
        name: "MacBook Pro with M2 chip",
        price: 1200,
      },
      {
        id: 5,
        name: "MacBook Pro with M3 pro chip",
        price: 2000,
      },
      {
        id: 6,
        name: "MacBook Pro with M1 pro chip",
        price: 3000,
      },
      {
        id: 7,
        name: "MacBook Pro with M2 pro chip",
        price: 1600,
      },
    ],
  }),
  actions: {
    setSelectedProduct(productId: number) {
      const product = this.products.find((product) => product.id === productId);
      if (!product) return;
      console.log(product);
      this.selectedProduct = product;
    },
  },
  getters: {
    getSelectedProduct: (state) => {
      return state.selectedProduct;
    },
  },
});
