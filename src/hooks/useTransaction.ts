import { TransactionService } from "@/services/transaction.service";
import type { TransactionFilters } from "@/types/transaction/TransactionFilters";
import type { TransactionListResponse } from "@/types/transaction/TransactionListResponse";
import type { TransactionRequest } from "@/types/transaction/TransactionRequest";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const initialFilters: TransactionFilters = {
  description: "",
  startDate: "",
  endDate: "",
  categoryId: "",
  paymentMethod: "",
  transactionType: "",
  page: 0,
  size: 10,
  sort: "id",
  direction: "asc",
};

export function useTransaction() {
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = Number(searchParams.get("page") || "1");
  const page = Math.max(pageParam - 1, 0);
  const size = Number(searchParams.get("size") || 10);

  const filters = {
    ...initialFilters,
    page,
    size,
  };

  const { data, isLoading } = useQuery<TransactionListResponse>({
    queryKey: ["get-transactions"],
    queryFn: async () => {
      return TransactionService.getTransactions(filters);
    },
    placeholderData: keepPreviousData,
  });

  const createTransaction = useMutation({
    mutationFn: async (payload: TransactionRequest) => {
      return await TransactionService.saveTransaction(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-transactions"] });
    },
    onError: (error) => {
      console.error("Erro ao cadastrar transação:", error);
    },
  });

  const updateTransaction = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<TransactionRequest>;
    }) => {
      return await TransactionService.editTransaction(id, payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-transactions"] });
    },
    onError: (error) => {
      console.error("Erro ao editar transação:", error);
    },
  });

  const removeTransaction = useMutation({
    mutationFn: async (id: string) => {
      return await TransactionService.deleteTransaction(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-transactions"] });
    },
    onError: (error) => {
      console.error("Erro ao remover transação:", error);
    },
  });

  function clearFilters() {
    setSearchParams((params) => {
      const next = new URLSearchParams(params);
      next.set("page", "1");
      return next;
    });
  }

  return {
    transactions: data?.content ?? [],
    page: pageParam,
    totalPages: data?.page.totalPages ?? 0,
    totalElements: data?.page.totalElements ?? 0,
    isLoading,
    filters,
    clearFilters,
    createTransaction: createTransaction.mutateAsync,
    updateTransaction: updateTransaction.mutateAsync,
    removeTransaction: removeTransaction.mutateAsync
  };
}
