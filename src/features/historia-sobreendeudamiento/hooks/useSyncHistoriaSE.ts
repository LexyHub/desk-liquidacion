import { useClientDataContext } from "@/shared/context";
import { useHistoriaSEStore } from "../stores/HistoriaSE.store";
import { useEffect } from "react";

export function useSyncHistoriaSE() {
  const { clientData } = useClientDataContext();
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
