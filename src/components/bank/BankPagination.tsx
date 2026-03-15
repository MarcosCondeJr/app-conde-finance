import { Button } from "@/components/ui/button";

type BankPaginationProps = {
  page: number;
  totalPages: number;
  totalElements: number;
  onPageChange: (page: number) => void;
};

export function BankPagination({
  page,
  totalPages,
  totalElements,
  onPageChange,
}: BankPaginationProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <span className="text-sm text-muted-foreground">
        Total de registros: {totalElements}
      </span>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
        >
          Anterior
        </Button>

        <span className="text-sm">
          Página {page + 1} de {totalPages || 1}
        </span>

        <Button
          type="button"
          variant="outline"
          disabled={page + 1 >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}