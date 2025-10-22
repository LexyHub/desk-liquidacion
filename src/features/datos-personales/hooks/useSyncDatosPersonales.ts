import { useEffect } from "react";
import { useClientDataContext } from "@shared/context";
import { useDatosPersonalesStore } from "../stores/useDatosPersonales.store";

/**
 * Hook que sincroniza los datos del contexto global con el store de Zustand
 * Solo se ejecuta cuando los datos cambian desde el fetch inicial
 */
export function useSyncDatosPersonales() {
  const { clientData } = useClientDataContext();
  const { setDatos, setDatosPP, reset } = useDatosPersonalesStore();

  useEffect(() => {
    if (clientData?.datos) {
      setDatos(clientData.datos);
    }
    if (clientData?.datos_pp) {
      setDatosPP(clientData.datos_pp);
    }

    // Limpiar cuando no hay clientData
    if (!clientData) {
      reset();
    }
  }, [clientData, setDatos, setDatosPP, reset]);
}
