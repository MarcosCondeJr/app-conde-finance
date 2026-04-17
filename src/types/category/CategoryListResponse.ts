import type { PageInfo } from "../pagination/PageInfo";
import type { Category } from "./Category";

export interface CategoryListResponse {
  content: Category[];
  page: PageInfo;
}
