import { useQuery } from "@tanstack/react-query";
import { getTodaysUF } from "../services/uf.service";
import { useCallback } from "react";

export function useUFService() {
  const {
    data: ufToday = null,
    isLoading,
    error,
    refetch,
  } = useQuery<number, Error>({
    queryKey: ["ufToday"],
    queryFn: getTodaysUF,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });

  const clpToUF = useCallback(
    (x: number) => {
      if (!ufToday) return;
      return x / ufToday;
    },
    [ufToday]
  );

  return {
    ufToday,
    clpToUF,
    isLoading,
    error,
    refetch,
  };
}
