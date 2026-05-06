import { categoryService } from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";

export function useCategoryOptions() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["get-categoryoptions"],
    queryFn: async () => await categoryService.getCategoriesOptions(),
    staleTime: 1000 * 60 * 5,
  });

  return {
    categoriesOptions: data,
    isLoading,
  }
}
