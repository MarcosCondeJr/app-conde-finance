import type { Bank } from "@/types/bank/Bank";
import type { BankListProps } from "@/types/bank/BankListProps";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function BankList({ data, onEdit, onDelete }: BankListProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo<ColumnDef<Bank>[]>(
    () => [
      {
        accessorKey: "code",
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="-ml-3"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Code <ArrowUpDown className="ml-2 h-2 w-4 opacity-70" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="font-medium"> {row.getValue("code")}</div>
        ),
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="-ml-3"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name <ArrowUpDown className="ml-2 h-4 w-4 opacity-70" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="truncate max-w-[520px]">{row.getValue("name")}</div>
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(row.original.code)}
              >
                Copy code
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(row.original)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete?.(row.original)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [onDelete, onEdit],
  )

//   const filteredData = useMemo(() => {
//     const q = globalFilter.trim().toLocaleLowerCase()
//     if (!q) return data

//     return data.filter((b) => b.code.toLowerCase().includes(q) || b.name.toLowerCase().includes(q))
//   })



}
