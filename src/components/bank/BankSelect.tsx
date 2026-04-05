import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import type { Bank } from "@/types/bank/Bank";

type BankFilterSelectProps = {
  banks: Bank[];
  value: string;
  onChange: (value: string) => void;
};

export function BankSelect({
  banks,
  value,
  onChange,
}: BankFilterSelectProps) {
  const [open, setOpen] = useState(false);

  const selectedBank = banks.find((b) => b.id == value);

  console.log(selectedBank)

   return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {selectedBank ? selectedBank.name : "Selecionar banco"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command>
          <CommandInput placeholder="Buscar banco..." />
          
          <CommandList className="max-h-64 overflow-y-auto">
            <CommandEmpty>Nenhum banco encontrado.</CommandEmpty>

            <CommandGroup>
              {banks.map((bank) => (
                <CommandItem
                  key={bank.id}
                  value={`${bank.name} ${bank.code ?? ""}`}
                  onSelect={() => {
                    onChange(bank.id);
                    setOpen(false);
                  }}
                >
                  <div className="flex flex-col">
                    <span>{bank.name}</span>
                    {bank.code && (
                      <span className="text-xs text-muted-foreground">
                        Código: {bank.code}
                      </span>
                    )}
                  </div>

                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === bank.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}