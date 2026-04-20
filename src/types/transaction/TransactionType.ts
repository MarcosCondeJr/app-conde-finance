export const TransactionType = {
  REVENUE: "REVENUE",
  EXPENSE: "EXPENSE",
} as const;

export type TransactionType = typeof TransactionType[keyof typeof TransactionType];