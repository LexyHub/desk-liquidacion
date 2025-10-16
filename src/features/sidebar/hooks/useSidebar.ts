import { createContext, useContext } from "react";

interface SidebarValue {
  isOpen: boolean;
  isInDistribution: boolean;
  setInDistribution: (value: boolean) => void;
  toggleDistribution: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const SidebarContext = createContext<SidebarValue | undefined>(
  undefined
);

export function useSidebar(): SidebarValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}
