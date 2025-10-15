import { cn } from "@/lib/utils";
import type { SelectOption } from "@/types";
import {
  Select as BaseSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/base/select";

interface Props {
  triggerClassName?: string;
  popupClassName?: string;
  placeholder?: string;
  value?: string | undefined;
  options: SelectOption[];
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

export function Select({
  triggerClassName,
  popupClassName,
  placeholder = "Selecciona una opción",
  options,
  value,
  disabled = false,
  onValueChange,
}: Props) {
  const isAValidValue = options.some((option) => option.value === value);

  return (
    <BaseSelect onValueChange={onValueChange} value={value ?? ""}>
      <SelectTrigger
        disabled={disabled}
        className={cn(
          "w-full shadow-none border-transparent cursor-pointer bg-transparent select-none text-base text-lexy-text-secondary leading-6",
          triggerClassName
        )}>
        <SelectValue placeholder={placeholder}>
          {!isAValidValue ? "No válido o no aplica" : undefined}
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        className={cn(
          "w-[--radix-select-trigger-width] mt-1 rounded-md",
          popupClassName
        )}>
        <SelectGroup>
          <SelectLabel className='select-none'>{placeholder}</SelectLabel>
          {options.map(({ value, label }, i) => (
            <SelectItem
              value={value}
              key={value}
              className={cn(
                "text-base cursor-pointer focus:bg-lexy-bg-secondary data-[highlighted]:bg-[#E4E1FF] data-[highlighted]:text-[#666] data-[highlighted]:font-normal rounded-[2px] text-[#666] max-w-full line-clamp-1 transition-all",
                { "border-b border-[#C5C5C5]": i < options.length - 1 }
              )}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </BaseSelect>
  );
}
