import { cn } from "@/lib/utils";
import type { ChangeEvent } from "react";

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  placeholder?: string;
  value?: string;
  type?: string;
  onChange: (value: string | number) => void;
}

export function Input({
  placeholder = "Escribe algo...",
  value,
  onChange,
  type,
  ...props
}: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      if (Number.isNaN(Number(e.target.value))) return;
      const number = e.target.value === "" ? "" : Number(e.target.value);
      onChange(number);
      return;
    }
    onChange(e.target.value);
  };
  return (
    <input
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      {...props}
      className={cn(
        "text-base placeholder:text-base text-lexy-text-secondary placeholder:text-lexy-text-secondary outline-none px-3",
        props.className
      )}
    />
  );
}
