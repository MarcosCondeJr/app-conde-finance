import type { PageInfo } from "./PageInfo";

export type PaginatedResponse<T> = {
  content: T[];
  page: PageInfo;
};