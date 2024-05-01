import { defineStore } from "pinia";
import { ICartState } from "../ts/interfaces/pinia/cart.interface.ts";
import { IProduct } from "../ts/interfaces/product.interface.ts";
import { ECartActions, ECartGetters } from "../ts/enums/pinia/cart.enum.ts";

export const useCartStore = defineStore("cart", {
  state: (): ICartState => ({
    cart: [],
  }),
  actions: {
    [ECartActions.SetCart](cart: IProduct[]): void {
      this.cart = cart;
    },
    [ECartActions.IncreaseQuantity](cart_id: string): void {
      const cartItem = this.cart.find(
        (cartItem) => cartItem.cart_id === cart_id,
      );

      if (!cartItem || !cartItem.quantity) return;

      cartItem.quantity++;
    },
    [ECartActions.DecreaseQuantity](cart_id: string): void {
      const cartItem = this.cart.find(
        (cartItem) => cartItem.cart_id === cart_id,
      );

      if (!cartItem || !cartItem.quantity || cartItem.quantity === 1) return;

      cartItem.quantity--;
    },
    [ECartActions.RemoveProductFromCart](cart_id: string): void {
      const cartItemIndex = this.cart.findIndex(
        (cartItem) => cartItem.cart_id === cart_id,
      );

      if (cartItemIndex !== -1) {
        this.cart.splice(cartItemIndex, 1);
      }
    },
  },
  getters: {
    [ECartGetters.GetCart]: (state: ICartState): ICartState["cart"] => {
      return state.cart;
    },
  },
});
