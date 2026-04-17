import { api } from "@/lib/api";
import type { Category } from "@/types/category/Category";
import type { CategoryFilters } from "@/types/category/CategoryFilters";
import type { CategoryListResponse } from "@/types/category/CategoryListResponse";
import type { CategoryRequest } from "@/types/category/CategoryRequest";

export const categoryService = {
  async getCategories(filters: CategoryFilters): Promise<CategoryListResponse> {
    const params = new URLSearchParams();

    if (filters.description) {
      params.append("description", filters.description);
    }

    if (filters.categoryType) {
      params.append("categoryType", filters.categoryType);
    }

    if (filters.active !== "" && filters.active !== undefined) {
      params.append("active", String(filters.active));
    }

    params.append("page", String(filters.page));
    params.append("size", String(filters.size));
    params.append("sort", `${filters.sort},${filters.direction}`);

    return api.get(`/api/category?${params.toString()}`).then((res) => res.data);
  },

  async saveCategory(payload: CategoryRequest): Promise<Category> {
    return api.post("/api/category", payload).then((res) => res.data);
  },

  async editCategory(
    id: string,
    payload: Partial<CategoryRequest>,
  ): Promise<Category> {
    return api.patch(`/api/category/${id}`, payload).then((res) => res.data);
  },

  async deleteCategory(id: string): Promise<void> {
    await api.delete(`/api/category/${id}`);
  },
};
