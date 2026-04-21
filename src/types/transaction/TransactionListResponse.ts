import type { PageInfo } from "../pagination/PageInfo";
import type { Transaction } from "./Transaction";

export interface TransactionListResponse {
  content: Transaction[];
  page: PageInfo;
}
