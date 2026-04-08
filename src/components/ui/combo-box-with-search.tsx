import { ChevronDownIcon, Search } from "lucide-react";
import { Button } from "./button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger
} from "./combobox";

type ComboboxWithSearchProps<T> = {
  items: T[];
  value: string;
  disabled?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  getValue: (item: T) => string;
  getLabel: (item: T) => string;
  onChange: (value: string) => void;
};

export function ComboboxWithSearch<T>({
  items,
  value,
  disabled = false,
  placeholder = "Selecionar item",
  searchPlaceholder = "Buscar...",
  emptyMessage = "Nenhum item encontrado",
  getValue,
  getLabel,
  onChange,
}: ComboboxWithSearchProps<T>) {
  const selectedItem = items.find((item) => getValue(item) == value);

  return (
    <Combobox
      items={items}
      value={selectedItem ?? null}
      onValueChange={(nextValue) => {
        if (!nextValue || getValue(nextValue) == value) {
          onChange("");
          return;
        }

        onChange(getValue(nextValue));
      }}
      itemToStringValue={(item) => (item ? getLabel(item) : "")}
      disabled={disabled}
    >
      <ComboboxTrigger
        render={
          <Button
            variant="outline"
            className="w-full justify-between font-normal"
            disabled={disabled}
            role="combobox"
          >
            {selectedItem ? getLabel(selectedItem) : placeholder}
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        }
      />

      <ComboboxContent>
        <ComboboxInput
          showTrigger={false}
          placeholder={searchPlaceholder}
          disabled={disabled}
        />


        <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>

        <ComboboxList>
          {(item) => (
            <ComboboxItem key={getValue(item)} value={item}>
              {getLabel(item)}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
