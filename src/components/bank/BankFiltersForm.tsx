import type { BankFilters } from "@/types/bank/BankFilters";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Eraser } from "lucide-react";
import { useSearchParams } from "react-router-dom";

type BankFiltersProps = {
  filters: BankFilters;
  onClear: () => void;
};

export function BankFiltersForm({ filters, onClear }: BankFiltersProps) {
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
      <Input
        placeholder="Filtrar por código"
        value={filters.code}
        onChange={(e) => onChange("code", e.target.value)}
      />

      <Input
        placeholder="Filtrar por nome"
        value={filters.name}
        onChange={(e) => onChange("name", e.target.value)}
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
