import { api } from "@/lib/api";
import type { Account } from "@/types/account/Account";
import type { AccountFilters } from "@/types/account/AccountFilters";
import type { AccountListResponse } from "@/types/account/AccountListResponse";
import type { AccountRequest } from "@/types/account/AccountRequest";

export const AccountService = {
  async getAccounts(filters: AccountFilters): Promise<AccountListResponse> {
    const params = new URLSearchParams();

    if (filters.bankId) params.append("bankId", filters.bankId);
    if (filters.description) params.append("description", filters.description);

    if (filters.active !== "" && filters.active !== undefined) {
      params.append("active", String(filters.active));
    }

    params.append("page", String(filters.page));
    params.append("size", String(filters.size));
    params.append("sort", `${filters.sort},${filters.direction}`);

    return api.get(`/api/account?${params.toString()}`).then((res) => res.data);
  },

  async saveAccount(payload:AccountRequest ): Promise<Account> {
    return api.post('/api/account', payload).then((res) => res.data);
  },

  async updateAccount(id: string, payload: Partial<AccountRequest>): Promise<Account> {
    return api.patch(`/api/account/${id}`, payload).then((res) => res.data);
  },

  async deleteAccount(id: string): Promise<void> {
    return api.delete(`/api/account/${id}`);
  }
};
// 