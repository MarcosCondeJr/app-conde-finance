import type { ColumnDef } from "@tanstack/react-table";
import type { Bank } from "@/types/bank/Bank";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import type { BankColumnsProps } from "@/types/bank/BankColumnsProps";

export function getBankColumns({
  onEdit,
  onDelete,
}: BankColumnsProps): ColumnDef<Bank>[] {
  return [
    {
      accessorKey: "code",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="-ml-3"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Code
          <ArrowUpDown className="ml-2 h-4 w-4 opacity-70" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("code")}</div>
      ),
      size: 120,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="-ml-3"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4 opacity-70" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="truncate max-w-[520px]">
          {row.getValue("name")}
        </div>
      ),
      size: 600,
    },
    {
      id: "actions",
      header: () => (
        <div className="w-[96px] text-right">Ações</div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            title="Editar"
            onClick={() => onEdit?.(row.original)}
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            variant="destructive"
            size="icon"
            title="Excluir"
            onClick={() => onDelete?.(row.original)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
      enableSorting: false,
      size: 96,
    },
  ];
}