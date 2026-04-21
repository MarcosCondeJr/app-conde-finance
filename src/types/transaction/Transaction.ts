
import type { Account } from "../account/Account";
import type { Category } from "../category/Category";
import type { PaymentMethod } from "./paymentMethod";
import type { TransactionType } from "./TransactionType";

export interface Transaction {
    id: string,
    account: Account,
    category: Category
    transactionDate: string,
    description: string,
    transactionType: TransactionType,
    paymentMethod: PaymentMethod,
    amount: string
}