import { create } from "zustand";
import type { ClientData, Deuda, Gasto, Empresa } from "@shared/types";

interface ClientStore {
  clientData: ClientData | null;
  isLoading: boolean;
  error: string | null;

  setClientData: (data: ClientData | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  updateDatosPersonales: (datos: ClientData["datos"]) => void;
  updateDatosPP: (datosPP: ClientData["datos_pp"]) => void;

  addDeuda: (deuda: Deuda) => void;
  modifyDeuda: (index: number, deuda: Deuda) => void;
  removeDeuda: (index: number) => void;

  addGastoMensual: (gasto: Gasto) => void;
  modifyGastoMensual: (index: number, gasto: Gasto) => void;
  removeGastoMensual: (index: number) => void;

  addEmpresa: (empresa: Empresa) => void;
  modifyEmpresa: (index: number, empresa: Empresa) => void;
  removeEmpresa: (index: number) => void;

  reset: () => void;
}

export const useClientStore = create<ClientStore>((set) => ({
  clientData: null,
  isLoading: false,
  error: null,

  setClientData: (data) => set({ clientData: data, error: null }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  updateDatosPersonales: (datos) =>
    set((state) =>
      state.clientData ? { clientData: { ...state.clientData, datos } } : state
    ),

  updateDatosPP: (datosPP) =>
    set((state) =>
      state.clientData
        ? { clientData: { ...state.clientData, datos_pp: datosPP } }
        : state
    ),

  // Deudas
  addDeuda: (deuda) =>
    set((state) => {
      if (!state.clientData) return state;
      const deudas = [...(state.clientData.deudas || []), deuda];
      return { clientData: { ...state.clientData, deudas } };
    }),

  modifyDeuda: (index, deuda) =>
    set((state) => {
      if (!state.clientData?.deudas) return state;
      const deudas = state.clientData.deudas.map((d, i) =>
        i === index ? deuda : d
      );
      return { clientData: { ...state.clientData, deudas } };
    }),

  removeDeuda: (index) =>
    set((state) => {
      if (!state.clientData?.deudas) return state;
      const deudas = state.clientData.deudas.filter((_, i) => i !== index);
      return { clientData: { ...state.clientData, deudas } };
    }),

  // Gastos
  addGastoMensual: (gasto) =>
    set((state) => {
      if (!state.clientData) return state;
      const gastos = [...(state.clientData.gastos || []), gasto];
      return { clientData: { ...state.clientData, gastos } };
    }),

  modifyGastoMensual: (index, gasto) =>
    set((state) => {
      if (!state.clientData?.gastos) return state;
      const gastos = state.clientData.gastos.map((g, i) =>
        i === index ? gasto : g
      );
      return { clientData: { ...state.clientData, gastos } };
    }),

  removeGastoMensual: (index) =>
    set((state) => {
      if (!state.clientData?.gastos) return state;
      const gastos = state.clientData.gastos.filter((_, i) => i !== index);
      return { clientData: { ...state.clientData, gastos } };
    }),

  // Empresas
  addEmpresa: (empresa) =>
    set((state) => {
      if (!state.clientData) return state;
      const empresas = [...(state.clientData.empresas || []), empresa];
      return { clientData: { ...state.clientData, empresas } };
    }),

  modifyEmpresa: (index, empresa) =>
    set((state) => {
      if (!state.clientData?.empresas) return state;
      const empresas = state.clientData.empresas.map((e, i) =>
        i === index ? empresa : e
      );
      return { clientData: { ...state.clientData, empresas } };
    }),

  removeEmpresa: (index) =>
    set((state) => {
      if (!state.clientData?.empresas) return state;
      const empresas = state.clientData.empresas.filter((_, i) => i !== index);
      return { clientData: { ...state.clientData, empresas } };
    }),

  reset: () => set({ clientData: null, isLoading: false, error: null }),
}));

// Selectores derivados
export const selectTotalDeudas = (state: ClientStore) => {
  const deudas = state.clientData?.deudas || [];
  return deudas.reduce((sum, d) => sum + (d.monto || 0), 0);
};

export const selectTotalGastosMensuales = (state: ClientStore) => {
  const gastos = state.clientData?.gastos || [];
  return gastos.reduce((sum, g) => sum + (Number(g.monto) || 0), 0);
};
