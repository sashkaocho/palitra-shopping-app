import { IProduct } from "../product.interface.ts";

export interface IProductState {
  products: IProduct[];
  selectedProduct: IProduct | null;
}
