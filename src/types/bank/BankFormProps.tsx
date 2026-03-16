import type { Bank } from "./Bank";
import type { BankRequest } from "./BankRequest";

export interface BankFormProps {
  bank?: Bank;
  trigger?: React.ReactNode;
  onSave: (payload: BankRequest) => Promise<void> | void;
}