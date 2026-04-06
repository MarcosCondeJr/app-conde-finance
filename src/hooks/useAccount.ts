import { AccountService } from "@/services/account.service";
import type { AccountFilters } from "@/types/account/AccountFilters";
import type { AccountListResponse } from "@/types/account/AccountListResponse";
import type { AccountRequest } from "@/types/account/AccountRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
      return AccountService.getAccounts(filters);
    },
  });

  function clearFilters() {
    setSearchParams((params) => {
      const next = new URLSearchParams(params);
      next.delete("bankId");
      next.delete("description");
      next.delete("active");
      next.set("page", "1");
      return next;
    });
  }

  const createAccount = useMutation({
    mutationFn: async (payload: AccountRequest) => {
      return await AccountService.saveAccount(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-accounts"] });
    },
    onError: (error) => {
      console.error("Erro ao cadastrar conta:", error);
    },
  });

  const updateAccount = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<AccountRequest>;
    }) => {
      return await AccountService.updateAccount(id, payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-accounts"] });
    },
    onError: (error) => {
      console.error("Erro ao editar a conta:", error);
    },
  });

  const removeAccount = useMutation({
    mutationFn: async (id: string) => {
      return await AccountService.deleteAccount(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-accounts"] });
    },
    onError: (error) => {
      console.error("Erro ao remover a conta:", error);
    },
  });

  return {
    accounts: data?.content ?? [],
    page: pageParam,
    totalPages: data?.page.totalPages ?? 0,
    totalElements: data?.page.totalElements ?? 0,
    isLoading,
    filters,
    clearFilters,
    createAccount: createAccount.mutateAsync,
    updateAccount: updateAccount.mutateAsync,
    removeAccount: removeAccount.mutateAsync,
  };
}
