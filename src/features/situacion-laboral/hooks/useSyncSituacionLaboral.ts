import { useClientStore } from "@shared/stores/useClientStore";
import { useSituacionLaboralStore } from "../stores/useSituacionLaboral.store";
import { useEffect } from "react";

export function useSyncSituacionLaboral() {
  const clientData = useClientStore((state) => state.clientData);
  const { setDatos, reset } = useSituacionLaboralStore();

  useEffect(() => {
    if (clientData?.situacion_laboral) {
      setDatos(clientData.situacion_laboral);
    }

    if (!clientData) {
      reset();
    }
  }, [clientData, reset, setDatos]);
}
