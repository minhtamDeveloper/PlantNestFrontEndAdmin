import { Category } from "./category.model";
import { Image } from "./image.model";

export class Product{
  id: number ;
  productName?: string;
  description?: string;
  costPrice?: number;
  sellPrice?: number;
  quantity?: number;
  createdDate?: Date;
  supplierId?: number;
  categoryId?: number;
  status?: boolean;



   category?: Category;
  // comments?: Comment[] = [];
   images?: Image[] = [];
  // orderDetails?: OrderDetail[] = [];
  // supplier?: Supplier;
}
