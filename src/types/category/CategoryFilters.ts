import type { CategoryType } from "./CategoryType";

export type CategoryFilters = {
  description: string;
  categoryType: CategoryType | string;
  active?: string | boolean | "";
  page: number;
  size: number;
  sort: string;
  direction: string | "asc" | "desc";
};
