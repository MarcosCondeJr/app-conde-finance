import type { Transaction } from "./Transaction";
import type { TransactionRequest } from "./TransactionRequest";
import type { Account } from "../account/Account";
import type { Category } from "../category/Category";

export interface TransactionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction?: Transaction
  onSave: (payload: TransactionRequest) => Promise<void>;
  onEdit: (id: string, payload: TransactionRequest) => Promise<void>;
  accountsOptions?: Account[];
  categoriesOptions?: Category[];
}
