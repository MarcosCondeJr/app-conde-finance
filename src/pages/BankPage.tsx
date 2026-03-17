import { BankFiltersForm } from "@/components/bank/BankFiltersForm";
import BankForm from "@/components/bank/BankForm";
import { BankList } from "@/components/bank/BankList";
import { BankPagination } from "@/components/bank/BankPagination";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { useBank } from "@/hooks/useBank";
import type { Bank } from "@/types/bank/Bank";
import type { BankRequest } from "@/types/bank/BankRequest";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Banks() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | undefined>(undefined);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [bankToDelete, setBankToDelete] = useState<Bank | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    banks,
    filters,
    totalPages,
    totalElements,
    isLoading,
    updateFilter,
    clearFilters,
    changePage,
    changeSorting,
    createBank,
    updateBank,
    removeBank,
  } = useBank();

  function handleOpenCreate() {
    setSelectedBank(undefined);
    setOpenForm(true);
  }

  function handleOpenEdit(bank: Bank) {
    setSelectedBank(bank);
    setOpenForm(true);
  }

  async function handleSubmit(payload: BankRequest) {
    await createBank(payload);
  }

  async function handleEdit(id: string, payload: Partial<BankRequest>) {
    await updateBank(id, payload);
  }

  function handleDelete(bank: Bank) {
    setBankToDelete(bank);
    setOpenDeleteDialog(true);
  }

  async function confirmDelete() {
    if (!bankToDelete) return;

    try {
      setIsDeleting(true);
      await removeBank(bankToDelete.id);
      toast.success("Banco excluído com sucesso!");
      setOpenDeleteDialog(false);
      setBankToDelete(null);
    } catch (error) {
      toast.error("Erro ao excluir banco.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bancos</h1>
          <p className="text-muted-foreground">
            Gerencie suas instituições bancárias
          </p>
        </div>
        <div>
          <Button onClick={handleOpenCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Banco
          </Button>
        </div>
      </div>

      <BankForm
        open={openForm}
        onOpenChange={setOpenForm}
        bank={selectedBank}
        onSave={handleSubmit}
        onEdit={handleEdit}
      />

      <BankFiltersForm
        filters={filters}
        onChange={updateFilter}
        onClear={clearFilters}
      />

      <BankList
        data={banks}
        isLoading={isLoading}
        sortBy={filters.sort}
        direction={filters.direction}
        onSort={changeSorting}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      <BankPagination
        page={filters.page}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={changePage}
      />

      <DeleteConfirmDialog
        open={openDeleteDialog}
        onOpenChange={(openDelete) => {
          setOpenDeleteDialog(openDelete);

          if (!openDelete) {
            setBankToDelete(null);
          }
        }}
        onConfirm={confirmDelete}
        title="Excluir banco"
        itemName={bankToDelete?.name}
        isLoading={isDeleting}
      />
    </div>
  );
}
