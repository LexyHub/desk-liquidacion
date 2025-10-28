import { useBienesStore } from "@/features/bienes/stores/useBienes.store";
import { useDatosPersonalesStore } from "@/features/datos-personales/stores/useDatosPersonales.store";
import { useDeudasStore } from "@/features/deudas/stores/deudas.store";
import { useHistoriaSEStore } from "@/features/historia-sobreendeudamiento/stores/HistoriaSE.store";
import { useSidebar } from "@/features/sidebar";
import { useSituacionLaboralStore } from "@/features/situacion-laboral/stores/useSituacionLaboral.store";
import { useCallback } from "react";
import {
  patchDatosCliente,
  patchDatosFinancieros,
  patchDatosPersonales,
  patchEmpresas,
  patchGastos,
  patchHistoriaSE,
  patchSituacionLaboral,
  postDatosBienes,
  uploadDeudas,
} from "../services/client.service";

export function useTryUpdateClientData() {
  const {
    datos,
    datosPP,
    changesInDatos,
    changesInPP,
    setChangesInDatos,
    setChangesInPP,
  } = useDatosPersonalesStore();

  const {
    situacion_laboral,
    changes: changesInSL,
    setChanges: setChangesInSL,
  } = useSituacionLaboralStore();

  const {
    deudas,
    datos_financieros,
    changesInDF,
    changesInDeudas,
    setChangesInDF,
    setChangesInDeudas,
  } = useDeudasStore();

  const {
    bienes,
    empresas,
    changesInBienes,
    setChangesInBienes,
    changesInEmpresas,
    setChangesInEmpresas,
  } = useBienesStore();

  const {
    historiaSE,
    changesInHistoriaSE,
    setChangesInHistoriaSE,
    gastos,
    changesInGastos,
    setChangesInGastos,
  } = useHistoriaSEStore();

  const { isInDistribution } = useSidebar();

  const run = useCallback(async () => {
    if (isInDistribution || !datosPP) return;

    if (changesInDatos && datos) {
      await patchDatosCliente(datosPP.id || "", datos);
      setChangesInDatos(false);
    }

    if (changesInPP) {
      await patchDatosPersonales(datosPP.id || "", datosPP);
      setChangesInPP(false);
    }

    if (changesInSL && situacion_laboral) {
      await patchSituacionLaboral(datosPP.id || "", situacion_laboral);
      setChangesInSL(false);
    }

    if (changesInDF && datos_financieros) {
      await patchDatosFinancieros(datosPP.id || "", datos_financieros);
      setChangesInDF(false);
    }

    if (changesInDeudas && deudas) {
      await uploadDeudas(deudas);
      setChangesInDeudas(false);
    }

    if (changesInBienes && bienes) {
      await postDatosBienes(bienes);
      setChangesInBienes(false);
    }

    if (changesInEmpresas && empresas) {
      await patchEmpresas(datosPP.id || "", empresas);
      setChangesInEmpresas(false);
    }

    if (changesInHistoriaSE && historiaSE) {
      await patchHistoriaSE(datosPP.id || "", historiaSE.historia);
      setChangesInHistoriaSE(false);
    }

    if (changesInGastos && gastos) {
      await patchGastos(datosPP.id || "", gastos);
      setChangesInGastos(false);
    }
  }, [
    datos,
    datosPP,
    changesInDatos,
    changesInPP,
    situacion_laboral,
    changesInSL,
    changesInDF,
    datos_financieros,
    changesInDeudas,
    deudas,
    changesInBienes,
    bienes,
    changesInEmpresas,
    empresas,
    changesInHistoriaSE,
    historiaSE,
    changesInGastos,
    gastos,
    isInDistribution,
    setChangesInDatos,
    setChangesInPP,
    setChangesInSL,
    setChangesInDF,
    setChangesInDeudas,
    setChangesInBienes,
    setChangesInEmpresas,
    setChangesInHistoriaSE,
    setChangesInGastos,
  ]);

  return run;
}
