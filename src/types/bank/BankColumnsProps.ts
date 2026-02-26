import type { Bank } from "./Bank";

export interface BankColumnsProps {
  onEdit?: (bank: Bank) => void;
  onDelete?: (bank: Bank) => void;
}