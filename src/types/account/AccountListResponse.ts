import type { PageInfo } from "../pagination/PageInfo";
import type { Account } from "./Account";

export interface AccountListResponse {
  content: Account[];
  page: PageInfo;
}
