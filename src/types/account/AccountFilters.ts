export type AccountFilters = {
  bankId: string;
  description: string;
  active?: string | boolean | "";
  page: number;
  size: number;
  sort: string;
  direction: string | "asc" | "desc";
};
