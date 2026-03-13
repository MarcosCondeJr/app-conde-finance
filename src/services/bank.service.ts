import { api } from "@/lib/api";
import type { PaginatedResponse } from "@/types/pagination/PaginatedResponse";
import type { Bank } from "@/types/bank/Bank";
import type { BankRequest } from "@/types/bank/BankRequest";

export const bankService = {
  async getBanks(parameters: any): Promise<PaginatedResponse<Bank>> {
    return api
      .get("/api/bank", {
        params: parameters,
      })
      .then((res) => res.data);
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
