import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import type { Country, Region } from "@shared/types";
import countriesData from "@shared/lib/data/countries.json";
import { fetchRegions } from "../services/geodata.service";

export function useGeoData() {
  const {
    data: regions = [],
    isLoading,
    error,
    refetch,
  } = useQuery<Region[], Error>({
    queryKey: ["regions"],
    queryFn: fetchRegions,
    staleTime: 1000 * 60 * 10, // 10 minuitos de cache
    retry: 1,
  });

  const regionOptions = useMemo(
    () =>
      regions.map((r: Region) => ({ label: r.nombre, value: r.id.toString() })),
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

  return {
    countries,
    getCountryByCode,
    countryOptions,
    regions,
    getRegionById,
    regionOptions,
    getComunaByIdAndRegion,
    getComunaOptions,
    loading: isLoading,
    error,
    refetch,
  };
}
