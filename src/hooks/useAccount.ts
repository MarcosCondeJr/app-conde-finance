import { AccountService } from "@/services/account.service";
import type { AccountFilters } from "@/types/account/AccountFilters";
import type { AccountListResponse } from "@/types/account/AccountListResponse";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const initialFilters: AccountFilters = {
  bankId: "",
  description: "",
  active: "",
  page: 0,
  size: 10,
  sort: "id",
  direction: "asc",
};

export function useAccount() {
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = Number(searchParams.get("page") || "1");
  const page = Math.max(pageParam - 1, 0);

  const size = Number(searchParams.get("size") || 10);
  const bankId = searchParams.get("bankId") || "";
  const description = searchParams.get("description") || "";
  const active = searchParams.get("active") || "";

  const filters = {
    ...initialFilters,
    page,
    size,
    bankId,
    description,
    active,
  };

  const { data, isLoading } = useQuery<AccountListResponse>({
    queryKey: ["get-accounts", filters],
    queryFn: async () => {
      return AccountService.getAccounts(initialFilters);
    },
  });

  return {
    accounts: data?.content ?? [],
    page: pageParam,
    totalPages: data?.page.totalPages ?? 0,
    totalElements: data?.page.totalElements ?? 0,
    isLoading,
    filters,
  };
}
