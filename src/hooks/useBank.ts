import { bankService } from "@/services/bank.service";
import type { BankRequest } from "@/types/bank/BankRequest";
import { useSearchParams } from "react-router-dom";
import type { BankFilters } from "@/types/bank/BankFilters";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { BankListResponse } from "@/types/bank/BankListResponse";

const initialFilters: BankFilters = {
  name: "",
  code: "",
  active: "",
  page: 0,
  size: 10,
  sort: "code",
  direction: "asc",
};

export function useBank() {
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = Number(searchParams.get("page") || "1");
  const page = Math.max(pageParam - 1, 0);

  const size = Number(searchParams.get("size") || 10);
  const name = searchParams.get("name") || "";
  const code = searchParams.get("code") || "";
  const active = searchParams.get("active") || "";

  const filters = {
    ...initialFilters,
    page,
    size,
    name,
    code,
    active,
  };

  const { data, isLoading } = useQuery<BankListResponse>({
    queryKey: ["get-banks", filters],
    queryFn: async () => {
      const response = await bankService.getBanks(filters);

      await new Promise((resolve) => setTimeout(resolve, 500));

      return response;
    },
    placeholderData: keepPreviousData,
  });

  const createBank = useMutation({
    mutationFn: async (payload: BankRequest) => {
      return await bankService.saveBank(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-banks"] });
    },
    onError: (error) => {
      console.log("Erro ao cadastrar banco:", error);
    },
  });

  const updateBank = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<BankRequest>;
    }) => {
      return await bankService.editBank(id, payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-banks"] });
    },
    onError: (err) => {
      console.error("Erro ao editar banco:", err);
    },
  });

  const removeBank = useMutation({
    mutationFn: async (id: string) => {
      return await bankService.deleteBank(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-banks"] });
    },
    onError: (err) => {
      console.error("Erro ao remover banco:", err);
    },
  });

  function clearFilters() {
    setSearchParams((params) => {
      const next = new URLSearchParams(params);
      next.delete("code");
      next.delete("name");
      next.delete("active");
      next.set("page", "1");
      return next;
    });
  }

  return {
    banks: data?.content ?? [],
    page: pageParam,
    totalPages: data?.page.totalPages ?? 0,
    totalElements: data?.page.totalElements ?? 0,
    isLoading,
    filters,
    clearFilters,
    createBank: createBank.mutateAsync,
    updateBank: updateBank.mutateAsync,
    removeBank: removeBank.mutateAsync,
  };
}
