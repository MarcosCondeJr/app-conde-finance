export type BankFilters = {
  name: string;
  code: string;
  active?: string | boolean | "";
  page: number;
  size: number;
  sort: string;
  direction: string | "asc" | "desc" ;
};