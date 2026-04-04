import type { PageInfo } from "../pagination/PageInfo";
import type { Bank } from "./Bank";

export interface BankListResponse {
  content: Bank[];
  page: PageInfo;
};