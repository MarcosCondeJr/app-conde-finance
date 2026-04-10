import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { useState } from "react";

type BankFilterSelectProps<T> = {
  items: T[];
  value: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  getValue: (item: T) => string;
  getLabel: (item: T) => string;
  onChange: (value: string) => void;
};

export function SelectWithSearch<T>({
  items,
  value,
  placeholder = "Selecionar item",
  searchPlaceholder = "Buscar...",
  emptyMessage = "Nenhum item encontrado",
  getValue,
  getLabel,
  onChange,
}: BankFilterSelectProps<T>) {
  const selectedItem = items.find((item) => getValue(item) == value);
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="
            bg-background 
            hover:bg-background 
            border-input w-full 
            justify-between px-3 
            font-normal outline-offset-0 
            outline-none focus-visible:outline-[3px]"
        >
          {selectedItem ? getLabel(selectedItem) : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />

          <CommandList className="max-h-64 overflow-y-auto">
            <CommandEmpty>{emptyMessage}</CommandEmpty>

            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={getValue(item)}
                  value={`${getLabel(item)} ${getValue(item) ?? ""}`}
                  onSelect={() => {
                    if (getValue(item) == value) {
                      onChange("");
                      setOpen(false);
                      return;
                    }
                    onChange(getValue(item));
                    setOpen(false);
                  }}
                >
                  <div className="flex flex-col">
                    <span>{getLabel(item)}</span>
                  </div>

                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value == getValue(item) ? "opacity-100" : "opacity-0",
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
