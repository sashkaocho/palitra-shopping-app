export interface IProduct {
  _id: string;
  name: string;
  price: number;
  gallery: string[];
  quantity?: number;
  cart_id?: string;
}
