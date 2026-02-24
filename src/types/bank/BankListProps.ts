import type { Bank } from "./Bank"

export interface BankListProps {
  data: Bank[]
  onEdit?: (bank: Bank) => void
  onDelete?: (bank: Bank) => void
}