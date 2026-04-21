import { Building2, MoreHorizontalIcon, Pen, PowerIcon, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import type { Bank } from "@/types/bank/Bank";
import { BankListSkeleton } from "./BankListSkeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ActiveBadge } from "../common/ActiveBadge";
import type { TableProps } from "@/types/common/TableProps";

export function BankList({
  data,
  isLoading,
  onEdit,
  onDelete,
}: TableProps<Bank>) {
  return (
    <div className="rounded-xl border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-30">
              <button
                type="button"
                className="flex items-center gap-1 font-medium text-foreground"
              >
                Código
              </button>
            </TableHead>

            <TableHead>
              <button
                type="button"
                className="flex items-center gap-1 font-medium text-foreground"
              >
                Nome
              </button>
            </TableHead>

            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <BankListSkeleton />
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="h-15 text-center text-muted-foreground"
              >
                Nenhum banco encontrado.
              </TableCell>
            </TableRow>
          ) : (
            data.map((bank) => (
              <TableRow
                key={bank.id}
                className="transition-colors hover:bg-muted/40"
              >
                <TableCell>
                  <span className="font-semibold text-foreground/90">
                    {bank.code}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium leading-none">
                        {bank.name}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <ActiveBadge active={bank.active} />
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
                      <DropdownMenuItem onClick={() => onEdit?.(bank)}>
                        <Pen />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <PowerIcon />
                        {bank.active ? "Desativar" : "Ativar"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => onDelete?.(bank)}
                      >
                        <Trash2 />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
