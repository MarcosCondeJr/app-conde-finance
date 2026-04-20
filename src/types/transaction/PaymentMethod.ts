export const PaymentMethod = {
    PIX: "PIX",
    DEBIT: "DEBIT",
    CREDIT: "CREDIT"
} as const

export type PaymentMethod = typeof PaymentMethod[keyof typeof PaymentMethod];