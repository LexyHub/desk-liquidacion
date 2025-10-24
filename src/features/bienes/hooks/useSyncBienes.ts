import { useClientStore } from "@shared/stores/useClientStore";
import { useEffect } from "react";
import { useBienesStore } from "../stores/useBienes.store";

export function useSyncBienes() {
  const clientData = useClientStore((state) => state.clientData);
  const { setBienes, setEmpresas, reset } = useBienesStore();

  useEffect(() => {
    if (clientData?.bienes) {
      setBienes(clientData.bienes[0]);
    }
    if (clientData?.empresas) {
      setEmpresas(clientData.empresas);
    }

    if (!clientData) {
      reset();
    }
  }, [clientData, setBienes, setEmpresas, reset]);
}
