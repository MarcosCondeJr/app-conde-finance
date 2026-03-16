import { BankFiltersForm } from "@/components/bank/BankFiltersForm";
import BankForm from "@/components/bank/BankForm";
import { BankList } from "@/components/bank/BankList";
import { BankPagination } from "@/components/bank/BankPagination";
import { Button } from "@/components/ui/button";
import { useBank } from "@/hooks/useBank";
import type { Bank } from "@/types/bank/Bank";
import { Plus } from "lucide-react";

export default function Banks() {
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
  } = useBank();

  function handleEdit(bank: Bank) {
    console.log("Editar:", bank);
  }

  function handleDelete(bank: Bank) {
    console.log("Excluir:", bank);
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
          <BankForm
            trigger={
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Banco
              </Button>
            }
          />
        </div>
      </div>

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
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <BankPagination
        page={filters.page}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={changePage}
      />
    </div>
  );
}
