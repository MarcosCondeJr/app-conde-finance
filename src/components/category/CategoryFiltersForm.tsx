import type { CategoryFilters } from "@/types/category/CategoryFilters";
import { CategoryType } from "@/types/category/CategoryType";
import { useSearchParams } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Eraser } from "lucide-react";
import { Input } from "../ui/input";

type CategoryFiltersProps = {
  filters: CategoryFilters;
  onClear: () => void;
};

export function CategoryFiltersForm({ filters, onClear }: CategoryFiltersProps) {
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
    <div className="grid gap-4 md:grid-cols-2">
      <Input
        placeholder="Filtrar por nome"
        value={filters.name}
        onChange={(e) => onChange("name", e.target.value)}
      />

      <Select
        defaultValue={filters.categoryType == "" ? "all" : String(filters.categoryType)}
        onValueChange={(value) => {
          onChange("categoryType", value === "all" ? "" : value);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Tipo de categoria" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value={CategoryType.REVENUE}>Receita</SelectItem>
            <SelectItem value={CategoryType.EXPENSE}>Despesa</SelectItem>
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
