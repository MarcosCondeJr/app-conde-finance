import type { TableProps } from "@/types/common/TableProps";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import type { Transaction } from "@/types/transaction/Transaction";
import { TransactionListSkeleton } from "./TransactionListSkeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Building2, MoreHorizontalIcon, Pen, Trash2 } from "lucide-react";
import { formatDateBr, formatCurrency } from "@/utils/masks";
import { TransactionType } from "@/types/transaction/TransactionType";

function parseAmount(value: string) {
  const parsedValue = Number(value);
  return Number.isNaN(parsedValue) ? 0 : parsedValue;
}

export function TransactionList({
  data,
  isLoading,
  onEdit,
  onDelete,
}: TableProps<Transaction>) {
  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Conta</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Método</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TransactionListSkeleton />
        ) : data.length === 0 ? (
          <TableCell colSpan={6} className="h-15 text-center">
            Nenhuma categoria encontrada.
          </TableCell>
        ) : (
          data.map((transaction) => {
            return (
              <TableRow key={transaction.id} className="h-14">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium leading-none">
                        {transaction.account.bank.name}
                      </span>
                      <span className="mt-1 text-xs text-muted-foreground">
                        Código: {transaction.account.bank.code}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell>{transaction.category.name}</TableCell>

                <TableCell>{transaction.paymentMethod}</TableCell>

                <TableCell>{formatDateBr(transaction.transactionDate)}</TableCell>

                <TableCell>
                  <span
                    className={`font-medium ${
                      transaction.transactionType == TransactionType.REVENUE ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {formatCurrency(parseAmount(transaction.amount))}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontalIcon />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit?.(transaction)}>
                        <Pen />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => onDelete?.(transaction)}
                      >
                        <Trash2 />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })
        )}
        <TableBody></TableBody>
      </Table>
    </div>
  );
}
