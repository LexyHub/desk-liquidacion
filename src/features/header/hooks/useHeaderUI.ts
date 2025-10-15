import { createContext, useContext } from "react";

interface HeaderUIValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  rawPath: string;
  actualPath: string | null;
}

export const HeaderUIContext = createContext<HeaderUIValue | undefined>(
  undefined
);

export function useHeaderUI(): HeaderUIValue {
  const ctx = useContext(HeaderUIContext);
  if (!ctx) throw new Error("useHeaderUI must be used within HeaderUIProvider");
  return ctx;
}
