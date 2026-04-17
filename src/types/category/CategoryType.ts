export const CategoryType = {
  REVENUE: "REVENUE",
  EXPENSE: "EXPENSE",
} as const;

export type CategoryType = typeof CategoryType[keyof typeof CategoryType];
