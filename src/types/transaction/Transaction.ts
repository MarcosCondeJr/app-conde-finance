import type { PaymentMethod } from "./paymentMethod";
import type { TransactionType } from "./TransactionType";

export interface Transaction {
    id: string,
    accountId: string,
    categoryId: string,
    transactionDate: string,
    description: string,
    transactionType: TransactionType,
    paymentMethod: PaymentMethod,
    amount: string
}