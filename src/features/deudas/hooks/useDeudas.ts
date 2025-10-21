import { useCallback } from "react";
import { useClientDataContext } from "@shared/context";
import type { Deuda } from "../types/deudas";

export function useDeudas() {
  const { clientData, addDeuda, modifyDeuda, removeDeuda } =
    useClientDataContext();

  const handleAddDeuda = useCallback(() => {
    const newDeuda: Deuda = {
      id_cliente: "",
      tipo: "",
      monto: 0,
      id_acreedor: "",
    };
    addDeuda(newDeuda);
  }, [addDeuda]);

  const handleDeudaChange = useCallback(
    (index: number, field: keyof Deuda, value: string | number) => {
      if (!clientData) return;
      const actualDeudas = clientData.deudas || [];
      if (index < 0 || index >= actualDeudas.length) return;
      const updatedDeuda = { ...actualDeudas[index], [field]: value };
      modifyDeuda(index, updatedDeuda);
    },
    [clientData, modifyDeuda]
  );

  const handleDeleteDeuda = useCallback(
    (index: number) => {
      if (!clientData) return;
      removeDeuda(index);
    },
    [clientData, removeDeuda]
  );

  return {
    deudas: clientData?.deudas || [],
    handleAddDeuda,
    handleDeudaChange,
    handleDeleteDeuda,
  };
}
