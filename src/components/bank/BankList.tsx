import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { getBankColumns } from "./BankColumns";
import { useBank } from "@/hooks/useBank";

export function BankList() {
  const {
    banks,
    pageInfo,
    search,
    setSearch,
    isLoading,
    nextPage,
    previousPage,
    updateBank,
    removeBank,
  } = useBank();

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () => getBankColumns({ updateBank, removeBank }),
    [updateBank, removeBank]
  );

  const table = useReactTable({
    data: banks,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    manualPagination: true,
    pageCount: pageInfo?.totalPages ?? 0
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filtrar bancos..."
          className="w-full max-w-sm"
        />
      </div>

      <div className="rounded-xl border overflow-hidden">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhum resultado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">
          Total: {pageInfo?.totalElements ?? 0} registro(s)
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">
            Página {(pageInfo?.number ?? 0) + 1} de {pageInfo?.totalPages ?? 1}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={previousPage}
              disabled={(pageInfo?.number ?? 0) === 0 || isLoading}
            >
              Prev
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={
                (pageInfo?.number ?? 0) + 1 >= (pageInfo?.totalPages ?? 0) ||
                isLoading
              }
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
