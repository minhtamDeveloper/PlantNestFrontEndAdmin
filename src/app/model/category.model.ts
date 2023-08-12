import { Product } from "./product.model";

export class Category {
  id?: number;
  categoryId?: number;
  categoryImage?: string;
  categoryName?: string;
  created?: Date;
  status?: boolean;

  categoryNavigation?: Category;
  inverseCategoryNavigation: Category[] = [];
  products: Product[] = [];
}
