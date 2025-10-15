import { useCallback, useMemo, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { PATH_TITLES } from "../constants";
import { HeaderUIContext } from "@features/header";

export function HeaderUIProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const rawPath = pathname.split("/")[1] ?? "";
  const actualPath = PATH_TITLES[rawPath] ?? null;

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const value = useMemo(
    () => ({ isOpen, open, close, toggle, rawPath, actualPath }),
    [isOpen, open, close, toggle, rawPath, actualPath]
  );

  return (
    <HeaderUIContext.Provider value={value}>
      {children}
    </HeaderUIContext.Provider>
  );
}
