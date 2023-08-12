import { Product } from "./product.model";

export class Image {
  id?: number;
  imageUrl?: string;
  productId?: number;

  product?: Product;
}
