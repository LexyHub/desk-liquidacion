import { useEffect } from "react";
import { useClientStore } from "@shared/stores/useClientStore";
import { useDatosPersonalesStore } from "../stores/useDatosPersonales.store";

export function useSyncDatosPersonales() {
  const clientData = useClientStore((state) => state.clientData);
  const { setDatos, setDatosPP, reset } = useDatosPersonalesStore();

  useEffect(() => {
    if (clientData?.datos) {
      setDatos(clientData.datos);
    }
    if (clientData?.datos_pp) {
      setDatosPP(clientData.datos_pp);
    }

    if (!clientData) {
      reset();
    }
  }, [clientData, setDatos, setDatosPP, reset]);
}
