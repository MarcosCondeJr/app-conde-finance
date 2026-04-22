import type { Transaction } from "./Transaction";
import type { TransactionRequest } from "./TransactionRequest";

export interface TransactionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction?: Transaction
  onSave: (payload: Transaction) => Promise<void>;
  onEdit: (id: string, payload: TransactionRequest) => Promise<void>;
}