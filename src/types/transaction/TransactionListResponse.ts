import type { PageInfo } from "../pagination/PageInfo";
import type { Transaction } from "./Transaction";

export interface CategoryListResponse {
  content: Transaction[];
  page: PageInfo;
}
