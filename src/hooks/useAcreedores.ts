import type { Acreedor } from "@/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchAcreedores as _fetchAcreedores } from "@/services/acreedores.service";

export function useAcreedores() {
  const [acreedores, setAcreedores] = useState<Acreedor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const fetchAcreedores = useCallback(async () => {
    // cancelar petición anterior si existe
    controllerRef.current?.abort();
    const ctrl = new AbortController();
    controllerRef.current = ctrl;

    setLoading(true);
    setError(null);

    try {
      const data = await _fetchAcreedores(ctrl.signal);
      if (ctrl.signal.aborted) return;
      setAcreedores(data);
    } catch (err: unknown) {
      if ((err as Error)?.name === "AbortError") return;
      setError((err as Error)?.message || "Unknown error");
    } finally {
      if (!ctrl.signal.aborted) setLoading(false);
      if (controllerRef.current === ctrl) controllerRef.current = null;
    }
  }, []);

  useEffect(() => {
    fetchAcreedores();
  }, [fetchAcreedores]);

  const acreedoresOptions = useMemo(
    () => acreedores.map((a) => ({ label: a.nombre, value: String(a.id) })),
    [acreedores]
  );

  const refetch = useCallback(() => fetchAcreedores(), [fetchAcreedores]);

  return {
    acreedores,
    acreedoresOptions,
    loading,
    error,
    fetchAcreedores,
    refetch,
  };
}
