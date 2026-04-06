import type { Bank } from "../bank/Bank";
import type { Account } from "./Account";
import type { AccountRequest } from "./AccountRequest";

export interface AccountFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account?: Account
  onSave: (payload: AccountRequest) => Promise<void>;
  onEdit: (id: string, payload: AccountRequest) => Promise<void>;
  banksOptions: Bank[]
}