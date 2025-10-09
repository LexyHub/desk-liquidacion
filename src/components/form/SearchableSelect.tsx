import { Check, ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@components/ui/base/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/base/popover";
import clsx from "clsx";
import { useEffect, useId, useMemo, useState } from "react";
import { normalizeString } from "@/lib/utils/formatters";
import type { SelectOption } from "@/types/global";

interface Props {
  placeholder?: string;
  disabled?: boolean;
  options: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
}

export function SearchableSelect({
  placeholder,
  disabled,
  value,
  options,
  onValueChange,
}: Props) {
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const id = useId();
  const listId = `searchable-select-${id}-list`;

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        normalizeString(option.label).includes(normalizeString(search))
      ),
    [options, search]
  );

  const handleChange = (val: string) => {
    onValueChange(val);
    setSearch("");
    setOpen(false);
  };

  useEffect(() => {
    if (options.length === 0) return;
    const optionValues = options.map((o) => o.value);
    if (value && !optionValues.includes(value)) {
      onValueChange("");
    }
  }, [value, onValueChange, options]);

  const selectedLabel = useMemo(
    () => options.find((option) => option.value === value)?.label ?? "",
    [options, value]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger disabled={disabled} asChild>
        <button
          type='button'
          title='Seleccionar opción'
          role='combobox'
          aria-expanded={open}
          className={`border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex items-center justify-between gap-2 rounded-md border px-3 py-2 whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 w-full shadow-none border-none cursor-pointer bg-transparent select-none text-base text-lexy-text-secondary leading-6`}>
          <span className='line-clamp-1'>
            {value ? selectedLabel : (placeholder ?? "Selecciona una opción")}
          </span>
          <ChevronDown className='size-6 text-lexy-text-primary' />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align='start'
        className='p-0 mt-1 min-w-[var(--radix-popover-trigger-width)] w-[var(--radix-popover-trigger-width)]'>
        <Command className='w-full'>
          <CommandInput
            placeholder={placeholder ?? "Buscar..."}
            className='w-full text-base placeholder:text-base'
            value={search}
            onValueChange={setSearch}
          />
          <CommandList id={listId} role='listbox' className='w-full'>
            <CommandEmpty>No se encontró lo que buscabas</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option, i) => (
                <CommandItem
                  role='option'
                  key={option.value}
                  value={option.label}
                  onSelect={() => handleChange(option.value)}
                  className={clsx(
                    "px-4 font-normal text-sm md:text-base cursor-pointer focus:bg-lexy-bg-secondary data-[highlighted]:bg-lexy-bg-secondary hover:bg-lexy-bg-secondary data-[selected=true]:bg-lexy-bg-secondary data-[highlighted]:text-lexy-text-secondary rounded-sm text-lexy-text-secondary",
                    {
                      "bg-lexy-bg-secondary": value === option.value,
                      "border-b border-[#C5C5C5]":
                        i < filteredOptions.length - 1,
                    }
                  )}>
                  {option.label}
                  <Check
                    className={clsx("ml-auto", {
                      "opacity-0": value !== option.value,
                      "opacity-100": value === option.value,
                    })}
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
