import type { Bank } from "./Bank";

export interface BankListResponse {
  content: Bank[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
};