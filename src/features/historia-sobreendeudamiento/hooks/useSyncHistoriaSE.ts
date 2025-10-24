import { useClientStore } from "@shared/stores/useClientStore";
import { useHistoriaSEStore } from "../stores/HistoriaSE.store";
import { useEffect } from "react";

export function useSyncHistoriaSE() {
  const clientData = useClientStore((state) => state.clientData);
  const { setHistoriaSE, setGastos, reset } = useHistoriaSEStore();

  useEffect(() => {
    if (clientData?.historial) {
      setHistoriaSE(clientData.historial);
    }
    if (clientData?.gastos) {
      setGastos(clientData.gastos);
    }

    if (!clientData) {
      reset();
    }
  }, [clientData, setHistoriaSE, setGastos, reset]);
}
