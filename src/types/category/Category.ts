import type { CategoryType } from "./CategoryType";

export interface Category {
  id: string;
  description: string;
  categoryType: CategoryType
  active: boolean;
}
