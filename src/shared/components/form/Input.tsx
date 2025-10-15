import { cn } from "@shared/lib/utils";
import {
  formatCurrency,
  parseCurrencyInput,
} from "@shared/lib/utils/formatters";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  placeholder?: string;
  value?: string;
  type?: string;
  onChange: (value: string | number) => void;
}

export function Input({ placeholder, value, onChange, type, ...props }: Props) {
  // Estado interno para el valor mostrado
  const [internalValue, setInternalValue] = useState(value || "");

  const defaultPlaceholder = (() => {
    if (type === "currency") return "Ej: 1.500.000";
    if (type === "number") return "Ingresa un número";
    return "Escribe algo...";
  })();

  const finalPlaceholder = placeholder || defaultPlaceholder;

  // Sincronizar el valor interno con el prop value cuando cambie
  useEffect(() => {
    if (type === "currency") {
      setInternalValue(formatCurrency(value || ""));
    } else {
      setInternalValue(value || "");
    }
  }, [value, type]);

  const displayValue = internalValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      if (Number.isNaN(Number(e.target.value))) return;
      const number = e.target.value === "" ? "" : Number(e.target.value);
      setInternalValue(String(number));
      onChange(number);
      return;
    }
    if (type === "currency") {
      const rawValue = parseCurrencyInput(e.target.value);

      if (rawValue === "") {
        setInternalValue("");
        onChange("");
        return;
      }

      const numericValue = parseInt(rawValue, 10);
      const formattedValue = formatCurrency(numericValue);
      setInternalValue(formattedValue);
      onChange(numericValue);
      return;
    }
    setInternalValue(e.target.value);
    onChange(e.target.value);
  };
  return (
    <input
      value={displayValue}
      onChange={handleChange}
      placeholder={finalPlaceholder}
      {...props}
      className={cn(
        "text-base placeholder:text-base text-lexy-text-secondary placeholder:text-lexy-text-secondary outline-none px-3",
        props.className
      )}
    />
  );
}
