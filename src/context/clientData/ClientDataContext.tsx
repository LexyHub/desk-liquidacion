import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import type { ClientData } from "@types";
import { getClientData } from "@services/client.service";
import {
  ClientDataContext,
  type ClientDataContextValue,
} from "./useClientData";

export function ClientDataProvider({ children }: { children: ReactNode }) {
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const lastIdRef = useRef<string | null>(null);
  const dataRef = useRef<ClientData | null>(null);

  if (dataRef.current !== clientData) dataRef.current = clientData;

  const fetchClientData = useCallback(
    async (idDefensoria: string, externalSignal?: AbortSignal) => {
      if (lastIdRef.current === idDefensoria && dataRef.current) return;
      lastIdRef.current = idDefensoria;
      // cancelar petición anterior si existe
      controllerRef.current?.abort();
      const ctrl = new AbortController();
      controllerRef.current = ctrl;
      const signal = externalSignal ?? ctrl.signal;

      setLoading(true);
      setError(null);
      try {
        const data = await getClientData(idDefensoria /* , { signal } */);
        if (signal.aborted) return;
        setClientData(data);
      } catch (err: unknown) {
        if ((err as Error)?.name === "AbortError") return;
        setError((err as Error)?.message || "Unknown error");
      } finally {
        if (!signal.aborted) setLoading(false);
        if (controllerRef.current === ctrl) controllerRef.current = null;
      }
    },
    []
  );

  const value = useMemo<ClientDataContextValue>(
    () => ({
      clientData,
      loading,
      error,
      fetchClientData,
      setClientData,
    }),
    [clientData, loading, error, fetchClientData]
  );

  return (
    <ClientDataContext.Provider value={value}>
      {children}
    </ClientDataContext.Provider>
  );
}
