import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchClientData } from "@shared/services/client.service";
import { mapAPIToClientData } from "@shared/lib/utils/mappers.util";
import { useClientStore } from "@shared/stores/useClientStore";
import { fetchClaveUnica } from "../services/claveunica.service";

export function useClientDataSync() {
  const { idDefensoria } = useParams<{ idDefensoria: string }>();
  const {
    setClientData,
    setLoading,
    setError,
    setClaveUnica,
    setLoadingClaveUnica,
    setErrorClaveUnica,
    reset,
  } = useClientStore();

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

  const {
    data: clave_unica,
    isLoading: isLoadingClaveUnica,
    error: queryErrorClaveUnica,
  } = useQuery({
    queryKey: ["claveUnica", idDefensoria ?? ""],
    queryFn: fetchClaveUnica,
    enabled: !!idDefensoria && idDefensoria !== "undefined",
    staleTime: 1000 * 60 * 10,
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
    if (fetchedClientData) {
      const mappedData = mapAPIToClientData(fetchedClientData);
      setClientData(mappedData);
    }

    if (clave_unica) {
      setClaveUnica(clave_unica.CLAVE_UNICA);
    }
  }, [fetchedClientData, setClientData, clave_unica, setClaveUnica]);

  useEffect(() => {
    setLoading(isLoading);
    setLoadingClaveUnica(isLoadingClaveUnica);
  }, [isLoading, setLoading, isLoadingClaveUnica, setLoadingClaveUnica]);

  useEffect(() => {
    setError(queryError?.message || null);
    setErrorClaveUnica(queryErrorClaveUnica?.message || null);
  }, [queryError, setError, queryErrorClaveUnica, setErrorClaveUnica]);

  useEffect(() => {
    if (!idDefensoria || idDefensoria === "undefined") {
      reset();
    }
  }, [idDefensoria, reset]);
}
