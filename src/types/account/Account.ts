import type { Bank } from "../bank/Bank";

export interface Account {
  id: string;
  description?: string;
  bank: Bank;
  initialBalance: string;
  balance: string;
  active: boolean;
}