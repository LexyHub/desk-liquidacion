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
  placeholder?: string;
  value?: string | undefined;
  options: SelectOption[];
  onValueChange?: (value: string) => void;
}

export function Select({
  placeholder = "Selecciona una opción",
  options,
  value,
  onValueChange,
}: Props) {
  const isAValidValue = options.some((option) => option.value === value);

  return (
    <BaseSelect onValueChange={onValueChange} value={value ?? ""}>
      <SelectTrigger className='w-full shadow-none border-none cursor-pointer bg-transparent select-none text-base text-lexy-text-secondary leading-6'>
        <SelectValue placeholder={placeholder}>
          {!isAValidValue ? "No válido o no aplica" : undefined}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className='mt-1 rounded-md'>
        <SelectGroup>
          <SelectLabel className='select-none'>{placeholder}</SelectLabel>
          {options.map(({ value, label }) => (
            <SelectItem
              value={value}
              key={value}
              className='text-base cursor-pointer focus:bg-lexy-bg-secondary'>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </BaseSelect>
  );
}
