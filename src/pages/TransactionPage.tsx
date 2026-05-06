import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import { Pagination } from "@/components/common/Pagination";
import { TransactionForm } from "@/components/transaction/TransactionForm";
import { TransactionList } from "@/components/transaction/TransactionList";
import { Button } from "@/components/ui/button";
import { useTransaction } from "@/hooks/useTransaction";
import type { ApiError } from "@/types/api/ApiError";
import type { Transaction } from "@/types/transaction/Transaction";
import type { TransactionRequest } from "@/types/transaction/TransactionRequest";
import { applyErrors } from "@/utils/applyErrors";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function TransactionPage() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | undefined
  >(undefined);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [transactionToDelete, setTransactionToDelete] =
    useState<Transaction | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    transactions,
    page,
    totalPages,
    totalElements,
    isLoading,
    createTransaction,
    updateTransaction,
    removeTransaction,
  } = useTransaction();

  async function handleSubmit(payload: TransactionRequest) {
    await createTransaction(payload);
  }

  async function handleEdit(id: string, payload: TransactionRequest) {
    await updateTransaction({ id, payload });
  }

  function handleOpenCreate() {
    setSelectedTransaction(undefined);
    setOpenForm(true);
  }

  function handleOpenEdit(transaction: Transaction) {
    setSelectedTransaction(transaction);
    setOpenForm(true);
  }

  function handleDelete(transaction: Transaction) {
    setTransactionToDelete(transaction);
    setOpenDeleteDialog(true);
  }

  async function confirmDelete() {
    if (!transactionToDelete) return;

    try {
      setIsDeleting(true);
      await removeTransaction(transactionToDelete.id);
      toast.success("Transacao excluida com sucesso!");
      setOpenDeleteDialog(false);
      setTransactionToDelete(null);
    } catch (error) {
      applyErrors(error as ApiError);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Transacoes</h1>
          <p className="text-muted-foreground">Gerencie suas transacoes</p>
        </div>
        <div>
          <Button onClick={handleOpenCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Transacao
          </Button>
        </div>
      </div>

      <TransactionForm
        open={openForm}
        onOpenChange={setOpenForm}
        transaction={selectedTransaction}
        onSave={handleSubmit}
        onEdit={handleEdit}
      />

      <TransactionList
        data={transactions}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      {transactions && (
        <Pagination
          page={page}
          totalPages={totalPages}
          totalElements={totalElements}
        />
      )}

      <DeleteConfirmDialog
        open={openDeleteDialog}
        onOpenChange={(openDelete) => {
          setOpenDeleteDialog(openDelete);

          if (!openDelete) {
            setTransactionToDelete(null);
          }
        }}
        onConfirm={confirmDelete}
        title="Excluir transacao"
        itemName={transactionToDelete?.description || "a transacao"}
        isLoading={isDeleting}
      />
    </div>
  );
}
