import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

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
      const next = new URLSearchParams(params);
      next.set("page", String(newPage));
      return next;
    });
  }

  function firstPage() {
    updatePage(1);
  }

  function previousPage() {
    if (page <= 1) {
      return;
    }
    updatePage(page - 1);
  }

  function nextPage() {
    if (page >= totalPages) {
      return;
    }
    updatePage(page + 1);
  }

  function lastPage() {
    if (totalPages <= 0) {
      return;
    }
    updatePage(totalPages);
  }

  function setSize(size: string) {
    setSearchParams((params) => {
      const next = new URLSearchParams(params);
      next.set("size", String(size));
      return next;
    });
  }

  return (
    <div className="flex text-sm flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <span className="text-sm text-muted-foreground">
        Total de registros: {totalElements}
      </span>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span>Linhas por página</span>

          <Select defaultValue="10" onValueChange={setSize}>
            <SelectTrigger aria-label="Página">
              <SelectValue placeholder="Página" />
            </SelectTrigger>
            <SelectContent onClick={() => setSize}>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <span className="text sm text-muted-foreground">
          Página {page} de {totalPages}
        </span>

        <div className="space-x-1.5">
          <Button size="icon" onClick={firstPage} disabled={page - 1 < 0}>
            <ChevronsLeft className="size-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button size="icon" onClick={previousPage} disabled={page - 1 < 0}>
            <ChevronLeft className="size-4" />
            <span className="sr-only">Anterior</span>
          </Button>
          <Button size="icon" onClick={nextPage} disabled={page >= totalPages}>
            <ChevronRight className="size-4" />
            <span className="sr-only">Próxima</span>
          </Button>
          <Button size="icon" onClick={lastPage} disabled={page >= totalPages}>
            <ChevronsRight className="size-4" />
            <span className="sr-only">Ultima página</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
