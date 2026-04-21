import type { PaymentMethod } from "./paymentMethod";
import type { TransactionType } from "./TransactionType";

export type TransactionFilters = {
  categoryId: string;
  startDate: string;
  endDate: string;
  description: string;
  transactionType: TransactionType | string;
  paymentMethod: PaymentMethod | string;
  page: number;
  size: number;
  sort: string;
  direction: string | "asc" | "desc";
};