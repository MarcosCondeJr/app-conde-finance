import { api } from "@/lib/api";
import type { Bank } from "@/types/bank/Bank";
import type { BankRequest } from "@/types/bank/BankRequest";
import type { BankFilters } from "@/types/bank/BankFilters";
import type { BankListResponse } from "@/types/bank/BankListResponse";

export const bankService = {
  async getBanks(filters: BankFilters): Promise<BankListResponse> {
    const params = new URLSearchParams();

    if (filters.code) params.append("code", filters.code);
    if (filters.name) params.append("name", filters.name);

    if (filters.active !== "" && filters.active !== undefined) {
      params.append("active", String(filters.active));
    }

    console.log(filters)

    params.append("page", String(filters.page));
    params.append("size", String(filters.size));
    params.append("sort", `${filters.sort},${filters.direction}`);

    return api.get(`/api/bank?${params.toString()}`).then((res) => res.data);
  },

  async saveBank(payload: BankRequest): Promise<Bank> {
    return api.post("/api/bank", payload).then((res) => res.data);
  },

  async editBank(id: string, payload: Partial<BankRequest>): Promise<Bank> {
    return api.patch(`/api/bank/${id}`, payload).then((res) => res.data);
  },

  async deleteBank(id: string): Promise<void> {
    await api.delete(`/api/bank/${id}`);
  },
};
