import type { CategoryType } from "./CategoryType";

export interface Category {
  id: string;
  name: string;
  categoryType: CategoryType
  active: boolean;
}
