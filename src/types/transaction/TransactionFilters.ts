import type { CategoryType } from "../category/CategoryType";
import type { PaymentMethod } from "./paymentMethod";

export type TransactionFilters = {
  accountId: string;
  categoryId: string;
  transactionDate: string;
  categoryType: CategoryType | string;
  paymentMethod: PaymentMethod | string;
  page: number;
  size: number;
  sort: string;
  direction: string | "asc" | "desc";
};