import type { BankFilters } from "@/types/bank/BankFilters";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

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

      <Select onValueChange={(value) => {
          onChange(
            "active",
            value === "" ? "" : value === "true"
          );
        }}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Status"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="true">Ativo</SelectItem>
            <SelectItem value="false">Inativo</SelectItem>
          </SelectGroup>
        </SelectContent>
        {/* value={String(filters.active)}
         */}
      </Select>

      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onClear}>
          Limpar filtros
        </Button>
      </div>
    </div>
  );
}
