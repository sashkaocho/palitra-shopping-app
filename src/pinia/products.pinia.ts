import { defineStore } from "pinia";
import { IProduct } from "../ts/interfaces/product.interface.ts";
import { IProductState } from "../ts/interfaces/pinia/product.interface.ts";
import {
  EProductActions,
  EProductGetters,
} from "../ts/enums/pinia/product.enum.ts";

export const useProductStore = defineStore("products", {
  state: (): IProductState => ({
    products: [],
    selectedProduct: null,
  }),
  actions: {
    [EProductActions.SetProducts](products: IProduct[]): void {
      this.products = products;
    },
    [EProductActions.SetSelectedProduct](productId: string): void {
      const product = this.products.find(
        (product: IProduct) => product?._id === productId,
      ) as IProduct;

      if (!product) return;

      this.selectedProduct = product;
    },
  },
  getters: {
    [EProductGetters.GetProducts]: (
      state: IProductState,
    ): IProductState["products"] => {
      return state.products;
    },
    [EProductGetters.GetSelectedProduct]: (
      state: IProductState,
    ): IProductState["selectedProduct"] => {
      return state.selectedProduct;
    },
  },
});
