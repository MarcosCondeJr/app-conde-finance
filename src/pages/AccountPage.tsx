import { AccountList } from "@/components/account/AccountList";
import { Button } from "@/components/ui/button";
import { useAccount } from "@/hooks/useAccount";
import type { Account } from "@/types/account/Account";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function AccountPage() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>(
    undefined,
  );

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { accounts, isLoading } = useAccount();

  function handleOpenEdit(account: Account) {
    setSelectedAccount(account);
    setOpenForm(true);
  }

  function handleDelete(account: Account) {
    setAccountToDelete(account);
    setOpenDeleteDialog(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Contas</h1>
          <p className="text-muted-foreground">Gerencie suas contas</p>
        </div>
        <div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Conta
          </Button>
        </div>
      </div>

      <AccountList
        data={accounts}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
