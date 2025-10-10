import type { Country, Region } from "@/types/geodata";
import countriesData from "@lib/data/countries.json";
import { useCallback, useEffect, useMemo, useState } from "react";

const API_URL = import.meta.env.VITE_LEXY_API + "regiones/con_comunas";
const API_KEY = import.meta.env.VITE_LEXY_API_KEY;

export function useGeoData() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRegions = useCallback(async (signal?: AbortSignal) => {
    if (!API_KEY || !API_URL) {
      setError("API key or URL is missing");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "lexy-key": API_KEY,
        },
        signal,
      });

      if (!response.ok) {
        const text = await response.text().catch(() => null);
        throw new Error(
          `API error ${response.status} ${response.statusText} ${text}`
        );
      }

      const data = (await response.json()) as Region[];
      setRegions(data);
    } catch (err: unknown) {
      if ((err as DOMException).name === "AbortError") {
        // se abortó
      } else if (err instanceof Error) {
        setError(err.message);
        console.error(err);
      } else {
        setError("Error desconocido al cargar las regiones");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchRegions(ctrl.signal);
    return () => ctrl.abort();
  }, [fetchRegions]);

  const regionOptions = useMemo(
    () => regions.map((r) => ({ label: r.nombre, value: r.id.toString() })),
    [regions]
  );

  const getComunaOptions = useCallback(
    (regionId: string) => {
      const region = regions.find((r) => r.id.toString() === regionId);
      return (
        region?.comunas.map((c) => ({
          label: c.nombre,
          value: c.id.toString(),
        })) ?? []
      );
    },
    [regions]
  );

  const getComunaByIdAndRegion = useCallback(
    (regionId: number, comunaId: number) => {
      const region = regions.find((r) => r.id === regionId);
      const comuna = region?.comunas.find((c) => c.id === comunaId);
      return comuna?.nombre ?? "Desconocida";
    },
    [regions]
  );

  const getRegionById = useCallback(
    (regionId: number) => {
      const region = regions.find((r) => r.id === regionId);
      return region?.nombre ?? "Desconocida";
    },
    [regions]
  );

  const countries = useMemo(() => countriesData as Country[], []);

  const countryOptions = useMemo(
    () => countries.map((c) => ({ label: c.country, value: c.code })),
    [countries]
  );

  const getCountryByCode = useCallback(
    (countryCode: string) => {
      const country = countries.find((c) => c.code === countryCode);
      return country?.country ?? "Desconocido";
    },
    [countries]
  );

  const refetch = useCallback(() => fetchRegions(), [fetchRegions]);

  return {
    countries,
    getCountryByCode,
    countryOptions,
    regions,
    getRegionById,
    regionOptions,
    getComunaByIdAndRegion,
    getComunaOptions,
    loading,
    error,
    refetch,
  };
}
