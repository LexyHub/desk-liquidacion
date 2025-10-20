import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useParams } from "react-router-dom";
import type { ClientData, Empresa, GastoMensual } from "@shared/types";
import type { Deuda } from "@features/deudas";
import { getClientData } from "../services/client.service";
import {
  ClientDataContext,
  type ClientDataContextValue,
} from "@shared/hooks/useClientData";

export function ClientDataProvider({ children }: { children: ReactNode }) {
  const { idDefensoria } = useParams<{ idDefensoria: string }>();
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

  const addDeuda = useCallback(
    (deuda: Deuda) => {
      if (!clientData) return;
      const actualDeudas = clientData.deudas || [];
      const updatedDeudas = [...actualDeudas, deuda];
      setClientData({ ...clientData, deudas: updatedDeudas });
    },
    [clientData]
  );

  const modifyDeuda = useCallback(
    (index: number, deuda: Deuda) => {
      if (!clientData) return;
      const actualDeudas = clientData.deudas || [];
      if (index < 0 || index >= actualDeudas.length) return;
      const updatedDeudas = actualDeudas.map((d, i) =>
        i === index ? deuda : d
      );
      setClientData({ ...clientData, deudas: updatedDeudas });
    },
    [clientData]
  );

  const removeDeuda = useCallback(
    (index: number) => {
      if (!clientData) return;
      const actualDeudas = clientData.deudas || [];
      if (index < 0 || index >= actualDeudas.length) return;
      const updatedDeudas = actualDeudas.filter((_, i) => i !== index);
      setClientData({ ...clientData, deudas: updatedDeudas });
    },
    [clientData]
  );

  const totalDeudas = useMemo(() => {
    if (!clientData?.deudas || clientData.deudas.length === 0) return 0;
    return clientData.deudas.reduce(
      (sum, deuda) => sum + (deuda.monto || 0),
      0
    );
  }, [clientData]);

  const addGastoMensual = useCallback(
    (gasto: GastoMensual) => {
      if (!clientData) return;
      const actualGastos = clientData.gastos_mensuales || [];
      const updatedGastos = [...actualGastos, gasto];
      setClientData({ ...clientData, gastos_mensuales: updatedGastos });
    },
    [clientData]
  );

  const modifyGastoMensual = useCallback(
    (index: number, gasto: GastoMensual) => {
      if (!clientData) return;
      const actualGastos = clientData.gastos_mensuales || [];
      if (index < 0 || index >= actualGastos.length) return;
      const updatedGastos = actualGastos.map((g, i) =>
        i === index ? gasto : g
      );
      setClientData({ ...clientData, gastos_mensuales: updatedGastos });
    },
    [clientData]
  );

  const removeGastoMensual = useCallback(
    (index: number) => {
      if (!clientData) return;
      const actualGastos = clientData.gastos_mensuales || [];
      if (index < 0 || index >= actualGastos.length) return;
      const updatedGastos = actualGastos.filter((_, i) => i !== index);
      setClientData({ ...clientData, gastos_mensuales: updatedGastos });
    },
    [clientData]
  );

  const totalGastosMensuales = useMemo(() => {
    if (
      !clientData?.gastos_mensuales ||
      clientData.gastos_mensuales.length === 0
    )
      return 0;
    return clientData.gastos_mensuales.reduce(
      (sum, gasto) => sum + (gasto.monto || 0),
      0
    );
  }, [clientData]);

  const addEmpresa = useCallback(
    (empresa: Empresa) => {
      if (!clientData) return;
      const actualEmpresas = clientData.empresas || [];
      const updatedEmpresas = [...actualEmpresas, empresa];
      setClientData({ ...clientData, empresas: updatedEmpresas });
    },
    [clientData]
  );

  const modifyEmpresa = useCallback(
    (index: number, empresa: Empresa) => {
      if (!clientData) return;
      const actualEmpresas = clientData.empresas || [];
      const updatedEmpresas = actualEmpresas.map((e) =>
        e.id === index ? empresa : e
      );
      setClientData({ ...clientData, empresas: updatedEmpresas });
    },
    [clientData]
  );

  const removeEmpresa = useCallback(
    (index: number) => {
      if (!clientData) return;
      const actualEmpresas = clientData.empresas || [];
      const updatedEmpresas = actualEmpresas.filter((e) => e.id !== index);
      setClientData({ ...clientData, empresas: updatedEmpresas });
    },
    [clientData]
  );

  useEffect(() => {
    if (idDefensoria) {
      fetchClientData(idDefensoria);
    } else {
      // Limpiar datos cuando no hay idDefensoria (ej: en login)
      setClientData(null);
      setError(null);
      setLoading(false);
      // Cancelar petición si está en progreso
      controllerRef.current?.abort();
      controllerRef.current = null;
    }
  }, [fetchClientData, idDefensoria]);

  const value = useMemo<ClientDataContextValue>(
    () => ({
      clientData,
      addDeuda,
      modifyDeuda,
      removeDeuda,
      totalDeudas,
      addGastoMensual,
      modifyGastoMensual,
      removeGastoMensual,
      totalGastosMensuales,
      addEmpresa,
      modifyEmpresa,
      removeEmpresa,
      loading,
      error,
      fetchClientData,
      setClientData,
    }),
    [
      clientData,
      addDeuda,
      modifyDeuda,
      removeDeuda,
      totalDeudas,
      addGastoMensual,
      modifyGastoMensual,
      removeGastoMensual,
      totalGastosMensuales,
      addEmpresa,
      modifyEmpresa,
      removeEmpresa,
      loading,
      error,
      fetchClientData,
    ]
  );

  return (
    <ClientDataContext.Provider value={value}>
      {children}
    </ClientDataContext.Provider>
  );
}
