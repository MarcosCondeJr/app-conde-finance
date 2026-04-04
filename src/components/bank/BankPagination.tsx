import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BankPaginationProps = {
  page: number;
  totalPages: number;
  totalElements: number;
};

export function BankPagination({
  page,
  totalPages,
  totalElements,
}: BankPaginationProps) {
  const [, setSearchParams] = useSearchParams();

  function updatePage(newPage: number) {
    setSearchParams((params) => {
      params.set("page", String(newPage));
      return params;
    });
  }

  function firstPage() {
    updatePage(1);
  }

  function previousPage() {
    if (page <= 1) {
      return
    };
    updatePage(page - 1);
  }

  function nextPage() {
    if (page >= totalPages) {
      return
    };
    updatePage(page + 1);
  }

  function lastPage() {
    if (totalPages <= 0) {
      return
    };
    updatePage(totalPages);
  }

  return (
    <div className="flex text-sm flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <span className="text-sm text-muted-foreground">
        Total de registros: {totalElements}
      </span>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span>Linhas por página</span>

          <Select defaultValue="10">
            <SelectTrigger aria-label="Página" />
            <SelectContent>
              <SelectItem value="10"></SelectItem>
              <SelectItem value="15"></SelectItem>
              <SelectItem value="20"></SelectItem>
            </SelectContent>
          </Select>
        </div>

        <span className="text sm text-muted-foreground">
          Página {page} de {totalPages}
        </span>

        <div className="space-x-1.5">
          <Button size="icon" onClick={firstPage} disabled={page - 1 < 0}>
            <ChevronLeft className="size-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button size="icon" onClick={previousPage} disabled={page - 1 < 0} >
            <ChevronLeft className="size-4" />
            <span className="sr-only">Anterior</span>
          </Button>
          <Button size="icon" onClick={nextPage} disabled={page + 1 >= totalPages} >
            <ChevronRight className="size-4" />
            <span className="sr-only">Próxima</span>
          </Button>
          <Button size="icon" onClick={lastPage}  disabled={page + 1 >= totalPages}>
            <ChevronRight className="size-4" />
            <span className="sr-only">Ultima página</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
