import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchClientData } from "@shared/services/client.service";
import { mapAPIToClientData } from "@shared/lib/utils/mappers";
import { useClientStore } from "@shared/stores/useClientStore";

export function useClientDataSync() {
  const { idDefensoria } = useParams<{ idDefensoria: string }>();
  const { setClientData, setLoading, setError, reset } = useClientStore();

  const {
    data: fetchedClientData,
    isLoading,
    error: queryError,
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

  // Sincronizar con el store cuando llegan datos nuevos
  useEffect(() => {
    if (fetchedClientData) {
      const mappedData = mapAPIToClientData(fetchedClientData);
      setClientData(mappedData);
    }
  }, [fetchedClientData, setClientData]);

  // Sincronizar estado de carga
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  // Sincronizar errores
  useEffect(() => {
    setError(queryError?.message || null);
  }, [queryError, setError]);

  // Limpiar cuando no hay ID válido
  useEffect(() => {
    if (!idDefensoria || idDefensoria === "undefined") {
      reset();
    }
  }, [idDefensoria, reset]);
}
