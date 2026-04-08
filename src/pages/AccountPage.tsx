import { AccountFiltersForm } from "@/components/account/AccountFiltersForm";
import AccountForm from "@/components/account/AccountForm";
import { AccountList } from "@/components/account/AccountList";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import { Pagination } from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { useAccount } from "@/hooks/useAccount";
import { useBankOptions } from "@/hooks/useBankOptions";
import type { Account } from "@/types/account/Account";
import type { AccountRequest } from "@/types/account/AccountRequest";
import type { ApiError } from "@/types/api/ApiError";
import { applyErrors } from "@/utils/applyErrors";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AccountPage() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>(
    undefined,
  );

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    accounts,
    isLoading,
    page,
    totalPages,
    totalElements,
    filters,
    clearFilters,
    createAccount,
    updateAccount,
    removeAccount,
  } = useAccount();

  const { banksOptions } = useBankOptions();

  async function handleSubmit(payload: AccountRequest) {
    await createAccount(payload);
  }

  async function handleEdit(id: string, payload: Partial<AccountRequest>) {
    await updateAccount({ id, payload });
  }

  function handleOpenEdit(account: Account) {
    setSelectedAccount(account);
    setOpenForm(true);
  }

  function handleOpenCreate() {
    setSelectedAccount(undefined);
    setOpenForm(true);
  }

  function handleDelete(account: Account) {
    setAccountToDelete(account);
    setOpenDeleteDialog(true);
  }

  async function confirmDelete() {
    if (!accountToDelete) return;

    try {
      setIsDeleting(true);
      await removeAccount(accountToDelete.id);
      toast.success("Conta excluída com sucesso!");
      setOpenDeleteDialog(false);
      setAccountToDelete(null);
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
          <h1 className="text-2xl font-bold">Contas</h1>
          <p className="text-muted-foreground">Gerencie suas contas</p>
        </div>
        <div>
          <Button onClick={handleOpenCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Conta
          </Button>
        </div>
      </div>

      <AccountForm
        open={openForm}
        onOpenChange={setOpenForm}
        account={selectedAccount}
        onSave={handleSubmit}
        onEdit={handleEdit}
        banksOptions={banksOptions}
      />

      <AccountFiltersForm
        banks={banksOptions}
        filters={filters}
        onClear={clearFilters}
      />

      <AccountList
        data={accounts}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      {accounts && (
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
            setAccountToDelete(null);
          }
        }}
        onConfirm={confirmDelete}
        title="Excluir conta"
        itemName={accountToDelete?.description}
        isLoading={isDeleting}
      />
    </div>
  );
}
