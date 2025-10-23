import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { ClientData, Empresa, Gasto, Deuda } from "@shared/types";
import { fetchClientData } from "../services/client.service";
import {
  ClientDataContext,
  type ClientDataContextValue,
} from "@shared/hooks/useClientData";
import { mapAPIToClientData } from "../lib/utils/mappers";

export function ClientDataProvider({ children }: { children: ReactNode }) {
  const { idDefensoria } = useParams<{ idDefensoria: string }>();
  const queryClient = useQueryClient();

  const [localClientData, setLocalClientData] = useState<ClientData | null>(
    null
  );

  const {
    data: fetchedClientData,
    isLoading,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ["clientData", idDefensoria ?? ""] as const,
    queryFn: fetchClientData,
    enabled: !!idDefensoria && idDefensoria !== "undefined",
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: (failureCount: number, error: Error) => {
      if (error.name === "AbortError") {
        return false;
      }
      if (error.message.includes("ID de Defensoría ausente")) {
        return false;
      }
      return failureCount < 1;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (fetchedClientData && !localClientData) {
      const mappedData = mapAPIToClientData(fetchedClientData);
      setLocalClientData(mappedData);
    }
  }, [fetchedClientData, localClientData]);

  useEffect(() => {
    if (!idDefensoria || idDefensoria === "undefined") {
      setLocalClientData(null);
      queryClient.removeQueries({ queryKey: ["clientData"] });
    }
  }, [idDefensoria, queryClient]);

  useEffect(() => {
    if (
      idDefensoria &&
      idDefensoria !== "undefined" &&
      !localClientData &&
      !isLoading
    ) {
      console.log("Refetching debido a cambio de ID válido");
      refetch();
    }
  }, [idDefensoria, localClientData, isLoading, refetch]);

  const clientData = localClientData;
  const loading = isLoading;
  const error = queryError?.message || null;

  const fetchClientDataWrapper = useCallback(
    async (id: string) => {
      if (id === idDefensoria) {
        const result = await refetch();
        if (result.data) {
          const mappedData = mapAPIToClientData(result.data);
          setLocalClientData(mappedData);
        }
      }
    },
    [idDefensoria, refetch]
  );

  const setClientData = useCallback((data: ClientData | null) => {
    setLocalClientData(data);
  }, []);

  const addDeuda = useCallback(
    (deuda: Deuda) => {
      if (!clientData) return;
      const actualDeudas = clientData.deudas || [];
      const updatedDeudas = [...actualDeudas, deuda];
      setClientData({ ...clientData, deudas: updatedDeudas });
    },
    [clientData, setClientData]
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
    [clientData, setClientData]
  );

  const removeDeuda = useCallback(
    (index: number) => {
      if (!clientData) return;
      const actualDeudas = clientData.deudas || [];
      if (index < 0 || index >= actualDeudas.length) return;
      const updatedDeudas = actualDeudas.filter((_, i) => i !== index);
      setClientData({ ...clientData, deudas: updatedDeudas });
    },
    [clientData, setClientData]
  );

  const totalDeudas = useMemo(() => {
    if (!clientData?.deudas || clientData.deudas.length === 0) return 0;
    return clientData.deudas.reduce(
      (sum, deuda) => sum + (deuda.monto || 0),
      0
    );
  }, [clientData]);

  const addGastoMensual = useCallback(
    (gasto: Gasto) => {
      if (!clientData) return;
      const actualGastos = clientData.gastos || [];
      const updatedGastos = [...actualGastos, gasto];
      setClientData({ ...clientData, gastos: updatedGastos });
    },
    [clientData, setClientData]
  );

  const modifyGastoMensual = useCallback(
    (index: number, gasto: Gasto) => {
      if (!clientData) return;
      const actualGastos = clientData.gastos || [];
      if (index < 0 || index >= actualGastos.length) return;
      const updatedGastos = actualGastos.map((g, i) =>
        i === index ? gasto : g
      );
      setClientData({ ...clientData, gastos: updatedGastos });
    },
    [clientData, setClientData]
  );

  const removeGastoMensual = useCallback(
    (index: number) => {
      if (!clientData) return;
      const actualGastos = clientData.gastos || [];
      if (index < 0 || index >= actualGastos.length) return;
      const updatedGastos = actualGastos.filter((_, i) => i !== index);
      setClientData({ ...clientData, gastos: updatedGastos });
    },
    [clientData, setClientData]
  );

  const totalGastosMensuales = useMemo(() => {
    if (!clientData?.gastos || clientData.gastos.length === 0) return 0;
    return clientData.gastos.reduce(
      (sum, gasto) => sum + (Number(gasto.monto) || 0),
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
    [clientData, setClientData]
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
    [clientData, setClientData]
  );

  const removeEmpresa = useCallback(
    (index: number) => {
      if (!clientData) return;
      const actualEmpresas = clientData.empresas || [];
      const updatedEmpresas = actualEmpresas.filter((e) => e.id !== index);
      setClientData({ ...clientData, empresas: updatedEmpresas });
    },
    [clientData, setClientData]
  );

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
      fetchClientData: fetchClientDataWrapper,
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
      fetchClientDataWrapper,
      setClientData,
    ]
  );

  return (
    <ClientDataContext.Provider value={value}>
      {children}
    </ClientDataContext.Provider>
  );
}
