import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { categoryService } from "@/services/category.service";
import type { CategoryFilters } from "@/types/category/CategoryFilters";
import type { CategoryListResponse } from "@/types/category/CategoryListResponse";
import type { CategoryRequest } from "@/types/category/CategoryRequest";

const initialFilters: CategoryFilters = {
  description: "",
  categoryType: "",
  active: "",
  page: 0,
  size: 10,
  sort: "id",
  direction: "asc",
};

export function useCategory() {
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = Number(searchParams.get("page") || "1");
  const page = Math.max(pageParam - 1, 0);

  const size = Number(searchParams.get("size") || 10);
  const categoryType = searchParams.get("categoryType") || "";
  const description = searchParams.get("description") || "";
  const active = searchParams.get("active") || "";

  const filters = {
    ...initialFilters,
    page,
    size,
    categoryType,
    description,
    active,
  };

  const { data, isLoading } = useQuery<CategoryListResponse>({
    queryKey: ["get-categories", filters],
    queryFn: async () => {
      return categoryService.getCategories(filters);
    },
    placeholderData: keepPreviousData,
  });

  const createCategory = useMutation({
    mutationFn: async (payload: CategoryRequest) => {
      return await categoryService.saveCategory(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-categories"] });
    },
    onError: (error) => {
      console.error("Erro ao cadastrar categoria:", error);
    },
  });

  const updateCategory = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<CategoryRequest>;
    }) => {
      return await categoryService.editCategory(id, payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-categories"] });
    },
    onError: (error) => {
      console.error("Erro ao editar categoria:", error);
    },
  });

  const removeCategory = useMutation({
    mutationFn: async (id: string) => {
      return await categoryService.deleteCategory(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-categories"] });
    },
    onError: (error) => {
      console.error("Erro ao remover categoria:", error);
    },
  });

  function clearFilters() {
    setSearchParams((params) => {
      const next = new URLSearchParams(params);
      next.delete("description");
      next.delete("active");
      next.set("page", "1");
      return next;
    });
  }

  return {
    categories: data?.content ?? [],
    page: pageParam,
    totalPages: data?.page.totalPages ?? 0,
    totalElements: data?.page.totalElements ?? 0,
    isLoading,
    filters,
    clearFilters,
    createCategory: createCategory.mutateAsync,
    updateCategory: updateCategory.mutateAsync,
    removeCategory: removeCategory.mutateAsync,
  };
}
