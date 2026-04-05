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
import { Skeleton } from "../ui/skeleton";
import { Spinner } from "../ui/spinner";
import { Building2 } from "lucide-react";

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

function AccountListSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-40" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-6 w-20 rounded-full" />
          </TableCell>

          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Skeleton className="h-9 w-20 rounded-md" />
              <Skeleton className="h-9 w-20 rounded-md" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
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
            <TableHead className="text-right">Saldo</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="flex items-center">
                <Spinner />
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Nenhuma conta encontrada.
              </TableCell>
            </TableRow>
          ) : (
            data.map((account) => (
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
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      Ativo
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-gray-200 text-gray-600"
                    >
                      Inativo
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={`font-medium ${
                      account.balance >= 0 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {formatCurrency(account.balance)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit?.(account)}
                    >
                      Editar
                    </Button>

                    <Button
                      type="button"
                      variant="default"
                      size="sm"
                      onClick={() => onDelete?.(account)}
                    >
                      Excluir
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
