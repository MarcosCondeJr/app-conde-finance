import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import type { Account } from "@/types/account/Account";
import { Badge } from "../ui/badge";
import { Building2, MoreHorizontalIcon, Pen, PowerIcon, Trash2 } from "lucide-react";
import { AccountListSkeleton } from "./AccountListSkeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

type AccountTableProps = {
  data: Account[];
  isLoading: boolean;
  onEdit?: (account: Account) => void;
  onDelete?: (account: Account) => void;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function parseAmount(value: string) {
  const parsedValue = Number(value);
  return Number.isNaN(parsedValue) ? 0 : parsedValue;
}

export function AccountList({
  data,
  isLoading,
  onEdit,
  onDelete,
}: AccountTableProps) {
  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Banco</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Saldo</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <AccountListSkeleton />
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-15 text-center">
                Nenhuma conta encontrada.
              </TableCell>
            </TableRow>
          ) : (
            data.map((account) => {
              const balance = parseAmount(account.balance);

              return (
              <TableRow key={account.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                      </div>

                      <div className="flex flex-col">
                        <span className="font-medium leading-none">
                          {account.bank.name}
                        </span>
                        <span className="mt-1 text-xs text-muted-foreground">
                          Código: {account.bank.code}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                <TableCell>{account.description}</TableCell>

                <TableCell>
                  {account.active ? (
                    <Badge className="border border-green-200 bg-green-50 text-green-700 hover:bg-green-50">
                      Ativo
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="border border-zinc-200 bg-zinc-100 text-zinc-600 hover:bg-zinc-100"
                    >
                      Inativo
                    </Badge>
                  )}
                </TableCell>

                <TableCell>
                  <span
                    className={`font-medium ${
                      balance >= 0 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {formatCurrency(balance)}
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
                      <DropdownMenuItem onClick={() => onEdit?.(account)}>
                        <Pen />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <PowerIcon />
                        {account.active ? "Desativar" : "Ativar"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => onDelete?.(account)}
                      >
                        <Trash2 />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )})
          )}
        </TableBody>
      </Table>
    </div>
  );
}
