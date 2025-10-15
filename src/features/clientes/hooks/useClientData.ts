import { createContext, useContext } from "react";
import type { ClientData } from "@features/clientes";
import type { Deuda } from "@features/deudas";

export interface ClientDataContextValue {
  clientData: ClientData | null;
  addDeuda: (deuda: Deuda) => void;
  modifyDeuda: (index: number, deuda: Deuda) => void;
  removeDeuda: (index: number) => void;
  totalDeudas: number;
  loading: boolean;
  error: string | null;
  fetchClientData: (
    idDefensoria: string,
    signal?: AbortSignal
  ) => Promise<void>;
  setClientData: (data: ClientData | null) => void;
}

export const ClientDataContext = createContext<
  ClientDataContextValue | undefined
>(undefined);

export function useClientDataContext(): ClientDataContextValue {
  const ctx = useContext(ClientDataContext);
  if (!ctx)
    throw new Error(
      "useClientDataContext must be used inside ClientDataProvider"
    );
  return ctx;
}
