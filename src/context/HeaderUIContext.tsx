import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";

const PATH_TITLES: Record<string, string> = {
  "datos-personales": "Datos Personales",
  "situacion-laboral": "Situación laboral",
  deudas: "Deudas",
  bienes: "Bienes",
  "historia-se": "Historia de Sobreendeudamiento",
};

interface HeaderUIValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  rawPath: string;
  actualPath: string | null;
}

const HeaderUIContext = createContext<HeaderUIValue | undefined>(undefined);

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

export function useHeaderUI(): HeaderUIValue {
  const ctx = useContext(HeaderUIContext);
  if (!ctx) throw new Error("useHeaderUI must be used within HeaderUIProvider");
  return ctx;
}
