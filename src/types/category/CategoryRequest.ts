import type { CategoryType } from "./CategoryType";

export type CategoryRequest = {
  name: string;
  categoryType: CategoryType | string;
};
