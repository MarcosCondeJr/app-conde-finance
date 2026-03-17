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

type BankTableProps = {
  data: Bank[];
  isLoading: boolean;
  sortBy: string;
  direction: "asc" | "desc";
  onSort: (field: string) => void;
  onEdit?: (bank: Bank) => void;
  onDelete?: (id: string) => void;
};
export function BankList({
  data,
  isLoading,
  sortBy,
  direction,
  onSort,
  onEdit,
  onDelete,
}: BankTableProps) {
  function renderSortIcon(field: string) {
    if (sortBy !== field) return "↕";
    return direction === "asc" ? "↑" : "↓";
  }

  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <button
                type="button"
                className="flex items-center gap-1"
                onClick={() => onSort("code")}
              >
                Código {renderSortIcon("code")}
              </button>
            </TableHead>

            <TableHead>
              <button
                type="button"
                className="flex items-center gap-1"
                onClick={() => onSort("name")}
              >
                Nome {renderSortIcon("name")}
              </button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Carregando...
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Nenhum banco encontrado.
              </TableCell>
            </TableRow>
          ) : (
            data.map((bank) => (
              <TableRow key={bank.id}>
                <TableCell>{bank.code}</TableCell>
                <TableCell>{bank.name}</TableCell>
                <TableCell>{bank.active ? "Ativo" : "Inativo"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit?.(bank)}
                    >
                      Editar
                    </Button>

                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete?.(bank.id)}
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
