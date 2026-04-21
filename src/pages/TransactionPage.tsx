import { Pagination } from "@/components/common/Pagination";
import { TransactionList } from "@/components/transaction/TransactionList";
import { Button } from "@/components/ui/button";
import { useTransaction } from "@/hooks/useTransaction";
import type { Transaction } from "@/types/transaction/Transaction";
import { Plus } from "lucide-react";

export default function TransactionPage() {
  const { 
    transactions, 
    page, 
    totalPages, 
    totalElements, 
    isLoading, 
    filters 
  } = useTransaction();

    function handleOpenEdit(transaction: Transaction) {

    }
  
    function handleDelete(transaction: Transaction) {

    }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Transações</h1>
          <p className="text-muted-foreground">Gerencie suas transações</p>
        </div>
        <div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Transação
          </Button>
        </div>
      </div>

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
    </div>
  );
}
