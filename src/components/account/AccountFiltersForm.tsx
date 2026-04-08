import type { AccountFilters } from "@/types/account/AccountFilters";
import { useSearchParams } from "react-router-dom";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Eraser } from "lucide-react";
import type { Bank } from "@/types/bank/Bank";
import { SelectWithSearch } from "../common/SelectWithSearch";

type AccountFiltersProps = {
  banks: Bank[];
  filters: AccountFilters;
  onClear: () => void;
};

export function AccountFiltersForm({
  banks,
  filters,
  onClear,
}: AccountFiltersProps) {
  const [, setSearchParams] = useSearchParams();

  async function onChange(parameter: string, value: string | boolean) {
    setSearchParams((params) => {
      const next = new URLSearchParams(params);

      if (value === "" || value === null || value === undefined) {
        next.delete(parameter);
      } else {
        next.set(parameter, String(value));
      }

      next.set("page", "1");
      return next;
    });
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <SelectWithSearch
        items={banks}
        value={filters.bankId}
        placeholder="Selecionar banco"
        searchPlaceholder="Buscar banco..."
        emptyMessage="Nenhum banco encontrado"
        getValue={(bank) => bank.id}
        getLabel={(bank) => bank.name}
        onChange={(value) => onChange("bankId", value)}
      />

      <Input
        placeholder="Filtrar por descrição"
        value={filters.description}
        onChange={(e) => onChange("description", e.target.value)}
      />

      <Select
        defaultValue={filters.active === "" ? "all" : String(filters.active)}
        onValueChange={(value) => {
          onChange("active", value === "all" ? "" : value === "true");
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="true">Ativo</SelectItem>
          <SelectItem value="false">Inativo</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onClear}>
          <Eraser />
          Limpar filtros
        </Button>
      </div>
    </div>
  );
}
