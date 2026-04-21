import { api } from "@/lib/api";
import type { CategoryListResponse } from "@/types/category/CategoryListResponse";
import type { Transaction } from "@/types/transaction/Transaction";
import type { TransactionFilters } from "@/types/transaction/TransactionFilters";
import type { TransactionRequest } from "@/types/transaction/TransactionRequest";

export const TransactionService = {
  async getTransactions(filters: TransactionFilters): Promise<CategoryListResponse> {
    const params = new URLSearchParams();

    if (filters.categoryId) params.append("categoryId", filters.categoryId);
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);
    if (filters.description) params.append("description", filters.description);
    if (filters.transactionType) params.append("transactionType", filters.transactionType);
    if (filters.paymentMethod) params.append("paymentMethod", filters.paymentMethod);

    params.append("page", String(filters.page));
    params.append("size", String(filters.size));
    params.append("sort", `${filters.sort},${filters.direction}`);

    return api.get(`/api/transaction?${params.toString()}`).then((res) => res.data);
  },

  async saveTransaction(payload: TransactionRequest): Promise<Transaction> {
    return api.post("/api/transaction", payload).then((res) => res.data);
  },

  async editTransaction(id: string, payload: Partial<TransactionRequest>): Promise<Transaction> {
    return api.patch(`/api/transaction/${id}`, payload).then((res) => res.data);
  },

  async deleteTransaction(id: string): Promise<void> {
    await api.delete(`/api/transaction/${id}`);
  },
};
