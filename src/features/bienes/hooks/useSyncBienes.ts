import { useClientDataContext } from "@/shared/context";
import { useEffect } from "react";
import { useBienesStore } from "../stores/useBienes.store";

export function useSyncBienes() {
  const { clientData } = useClientDataContext();
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
