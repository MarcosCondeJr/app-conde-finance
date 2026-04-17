import type { CategoryType } from "./CategoryType";

export type CategoryFilters = {
  name: string;
  categoryType: CategoryType | string;
  page: number;
  size: number;
  sort: string;
  direction: string | "asc" | "desc";
};
