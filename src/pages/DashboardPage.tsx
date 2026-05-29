import { useMemo } from "react";
import { BalanceAccountChart } from "@/components/dashboard/BalanceAccountChart";
import { ChartContainar } from "@/components/dashboard/ChartContainar";
import { DashboardTotalsCard } from "@/components/dashboard/DashboardTotalsCard";
import { ExpenseCategoriesChart } from "@/components/dashboard/ExpenseCategories";
import { RevenueExpenseChart } from "@/components/dashboard/RevenueExpenseChart";
import { useAccount } from "@/hooks/useAccount";
import { useCategory } from "@/hooks/useCategory";
import { useTransaction } from "@/hooks/useTransaction";
import { TransactionType } from "@/types/transaction/TransactionType";

function parseCurrencyNumber(value?: string) {
  const normalizedValue = String(value ?? "0")
    .replace(/\./g, "")
    .replace(",", ".");
  const parsedValue = Number(normalizedValue);
  return Number.isNaN(parsedValue) ? 0 : parsedValue;
}

export default function DashboardPage() {
  const { accounts, isLoading: isLoadingAccounts } = useAccount();
  const { categories, isLoading: isLoadingCategories } = useCategory();
  const { transactions, isLoading: isLoadingTransactions } = useTransaction();

  const accountChartData = useMemo(
    () =>
      accounts.map((account) => ({
        id: account.id,
        name: account.description || account.bank.name,
        balance: parseCurrencyNumber(account.balance),
      })),
    [accounts]
  );

  const categoryChartData = useMemo(
    () =>
      categories.map((category) => ({
        id: category.id,
        name: category.name,
      })),
    [categories]
  );

  const transactionChartData = useMemo(
    () =>
      transactions.map((transaction) => ({
        id: transaction.id,
        amount: parseCurrencyNumber(transaction.amount),
        type:
          transaction.transactionType === TransactionType.REVENUE
            ? "receita"
            : "despesa" as "receita" | "despesa",
        date: transaction.transactionDate,
        categoryId: transaction.category.id,
      })),
    [transactions]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Acompanhe suas receitas, despesas e saldos por conta.
        </p>
      </div>

      <DashboardTotalsCard />

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartContainar
          title="Receitas x despesas"
          description="Evolução mensal das movimentações cadastradas."
          isLoading={isLoadingTransactions}
        >
          <RevenueExpenseChart transactions={transactionChartData} />
        </ChartContainar>

        <ChartContainar
          title="Saldo por conta"
          description="Comparativo de saldo atual entre suas contas."
          isLoading={isLoadingAccounts}
        >
          <BalanceAccountChart accounts={accountChartData} />
        </ChartContainar>
      </div>

      <ChartContainar
        title="Despesas por categoria"
        description="Top 5 categorias com maior volume de despesas."
        isLoading={isLoadingTransactions || isLoadingCategories}
      >
        <ExpenseCategoriesChart
          transactions={transactionChartData}
          categories={categoryChartData}
        />
      </ChartContainar>
    </div>
  );
}
