import type { BankFilters } from "@/types/bank/BankFilters";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type BankFiltersProps = {
  filters: BankFilters;
  onChange: <K extends keyof BankFilters>(
    key: K,
    value: BankFilters[K]
  ) => void;
  onClear: () => void;
};

export function BankFiltersForm({ filters, onChange, onClear }: BankFiltersProps) {
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

      <select
        className="h-9 rounded-md border bg-background px-3 text-sm"
        value={String(filters.active)}
        onChange={(e) => {
          const value = e.target.value;
          onChange(
            "active",
            value === "" ? "" : value === "true"
          );
        }}
      >
        <option value="">Todos</option>
        <option value="true">Ativos</option>
        <option value="false">Inativos</option>
      </select>

      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onClear}>
          Limpar filtros
        </Button>
      </div>
    </div>
  );
}
