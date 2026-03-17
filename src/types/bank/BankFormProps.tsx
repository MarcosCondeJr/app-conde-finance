import type { Bank } from "./Bank";
import type { BankRequest } from "./BankRequest";

export interface BankFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bank?: Bank;
  onSave: (payload: BankRequest) => Promise<void>;
  onEdit: (id: string, payload: BankRequest) => Promise<void>;
}