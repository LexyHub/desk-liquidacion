import { useCallback, useMemo, useState, type ReactNode } from "react";
import { SidebarContext } from "@features/sidebar";
import { useLocation } from "react-router-dom";

export function SidebarProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  const [isOpen, setIsOpen] = useState(true);
  const [isInDistribution, setIsInDistribution] = useState(
    pathname.startsWith("/distribucion")
  );

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const toggleDistribution = useCallback(() => {
    setIsInDistribution((v) => !v);
  }, []);

  const setInDistribution = useCallback((value: boolean) => {
    setIsInDistribution(value);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      open,
      close,
      toggle,
      isInDistribution,
      setInDistribution,
      toggleDistribution,
    }),
    [
      isOpen,
      open,
      close,
      toggle,
      isInDistribution,
      setInDistribution,
      toggleDistribution,
    ]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}
