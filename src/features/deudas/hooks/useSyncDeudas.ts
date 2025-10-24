import { useClientStore } from "@shared/stores/useClientStore";
import { useEffect } from "react";
import { useDeudasStore } from "../stores/deudas.store";

export function useSyncDeudas() {
  const clientData = useClientStore((state) => state.clientData);
  const { setDeudas, setDatosFinancieros, reset } = useDeudasStore();

  useEffect(() => {
    if (clientData?.deudas) {
      setDeudas(clientData.deudas);
    }
    if (clientData?.datos_financieros) {
      setDatosFinancieros(clientData.datos_financieros);
    }

    if (!clientData) {
      reset();
    }
  }, [clientData, setDeudas, setDatosFinancieros, reset]);
}
