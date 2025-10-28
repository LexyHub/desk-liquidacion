import type { DatosFinancieros } from "@/shared/types";
import type { Deuda } from "@shared/types";
import { create } from "zustand";

interface DeudasState {
  deudas: Deuda[] | null;
  datos_financieros: DatosFinancieros | null;
  // ID temporal decreciente para nuevas deudas (IDs negativos)
  nextDeudaTempId: number;

  changesInDeudas: boolean | null;
  changesInDF: boolean | null;

  setDeudas: (deudas: Deuda[]) => void;
  addDeuda: (deuda: Deuda) => void;
  updateDeudaField: <K extends keyof Deuda>(
    id: number,
    field: K,
    value: Deuda[K]
  ) => void;
  removeDeuda: (id: number) => void;
  replaceDeudaId: (tempId: number, realId: number) => void;
  setDatosFinancieros: (datos: DatosFinancieros) => void;
  // Helper para aplicar parches (permite actualizar uno o varios campos)
  patchDatosFinancieros: (patch: Partial<DatosFinancieros>) => void;
  getTotalDeudas: () => number;

  setChangesInDeudas: (changes: boolean) => void;
  setChangesInDF: (changes: boolean) => void;

  reset: () => void;
}

export const useDeudasStore = create<DeudasState>((set, get) => ({
  deudas: null,
  datos_financieros: null,
  nextDeudaTempId: -1,

  changesInDeudas: null,
  changesInDF: null,

  setDeudas: (deudas) => set({ deudas, nextDeudaTempId: -1 }),
  addDeuda: (deuda) =>
    set((state) => {
      const ensuredId = deuda.id ?? state.nextDeudaTempId;
      const newDeuda: Deuda = { ...deuda, id: ensuredId };
      return {
        deudas: state.deudas ? [...state.deudas, newDeuda] : [newDeuda],
        nextDeudaTempId:
          deuda.id == null ? state.nextDeudaTempId - 1 : state.nextDeudaTempId,
      };
    }),
  updateDeudaField: (id, field, value) => {
    set((state) => ({
      deudas: state.deudas
        ? state.deudas.map((deuda) =>
            deuda.id === id ? { ...deuda, [field]: value } : deuda
          )
        : null,
    }));
    const changes = get().changesInDeudas;
    if (!changes) {
      set({ changesInDeudas: true });
    }
  },
  removeDeuda: (id) =>
    set((state) => ({
      deudas: state.deudas ? state.deudas.filter((d) => d.id !== id) : null,
    })),
  replaceDeudaId: (tempId, realId) =>
    set((state) => ({
      deudas: state.deudas
        ? state.deudas.map((d) => (d.id === tempId ? { ...d, id: realId } : d))
        : null,
    })),
  getTotalDeudas: () => {
    const { deudas } = get();
    if (!deudas || deudas.length === 0) return 0;
    return deudas.reduce((total, deuda) => total + (deuda.monto || 0), 0);
  },
  setDatosFinancieros: (datos) => set({ datos_financieros: datos }),
  patchDatosFinancieros: (patch) => {
    set((state) => {
      if (!state.datos_financieros) return state;
      return { datos_financieros: { ...state.datos_financieros, ...patch } };
    });
    const changes = get().changesInDF;
    if (!changes) {
      set({ changesInDF: true });
    }
  },

  setChangesInDeudas: (changes) => set({ changesInDeudas: changes }),
  setChangesInDF: (changes) => set({ changesInDF: changes }),

  reset: () => set({ deudas: null, datos_financieros: null }),
}));
