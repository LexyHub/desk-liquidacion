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
  options: Record<string, string>;
  onValueChange?: (value: string) => void;
}

export function Select({
  placeholder = "Selecciona una opción",
  options,
  value,
  onValueChange,
}: Props) {
  return (
    <BaseSelect onValueChange={onValueChange} value={value ?? ""}>
      <SelectTrigger className='w-full shadow-none border-none cursor-pointer bg-transparent select-none text-base text-lexy-text-secondary leading-6'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className='mt-1 rounded-md'>
        <SelectGroup>
          <SelectLabel className='select-none'>{placeholder}</SelectLabel>
          {Object.entries(options).map(([key, label]) => (
            <SelectItem
              value={key}
              key={key}
              className='text-base cursor-pointer focus:bg-lexy-bg-secondary'>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </BaseSelect>
  );
}
