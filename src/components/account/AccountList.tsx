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

type AccountTableProps = {
  data: Account[];
  isLoading: boolean;
  onEdit?: (account: Account) => void;
  onDelete?: (account: Account) => void;
};

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
            <TableHead>Saldo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Nenhuma conta encontrada.
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
                  {account.bank.code} - {account.bank.name}
                </TableCell>
                <TableCell>{account.description}</TableCell>
                <TableCell>{account.balance}</TableCell>
                <TableCell>{account.active ? "Ativo" : "Inativo"}</TableCell>
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
                      variant="destructive"
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
