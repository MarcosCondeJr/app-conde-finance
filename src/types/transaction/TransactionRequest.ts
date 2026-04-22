import type { PaymentMethod } from "./paymentMethod";
import type { TransactionType } from "./TransactionType";

export type TransactionRequest = {
    accountId: string;
    categoryId: string;
    transactionDate: string;
    description: string;
    transactionType: TransactionType | string;
    paymentMethod: PaymentMethod | string;
    amount: string;
}