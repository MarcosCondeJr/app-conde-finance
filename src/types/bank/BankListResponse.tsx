import type { Bank } from "./Bank";

export type BankListResponse = {
  content: Bank[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
};