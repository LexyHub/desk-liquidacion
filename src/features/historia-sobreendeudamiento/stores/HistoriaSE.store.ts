import { create } from "zustand";
import type { Gasto, Historial } from "@shared/types";

interface HistoriaSEState {
  historiaSE: Historial | null;
  gastos: Gasto[] | null;
  // ID temporal decreciente para nuevos gastos (IDs negativos)
  nextGastoTempId: number;

  changesInHistoriaSE: boolean | null;
  changesInGastos: boolean | null;

  setHistoriaSE: (datos: Historial) => void;
  updateHistoria: (historia: string) => void;
  setGastos: (gastos: Gasto[]) => void;
  addGasto: (gasto: Gasto) => void;
  updateGastoField: <K extends keyof Gasto>(
    id: number,
    field: K,
    value: Gasto[K]
  ) => void;
  removeGasto: (id: number) => void;
  replaceGastoId: (tempId: number, realId: number) => void;
  getTotalGastos: () => number;

  setChangesInHistoriaSE: (changes: boolean | null) => void;
  setChangesInGastos: (changes: boolean | null) => void;

  reset: () => void;
}

export const useHistoriaSEStore = create<HistoriaSEState>((set, get) => ({
  historiaSE: null,
  gastos: null,
  nextGastoTempId: -1,
  changesInHistoriaSE: null,
  changesInGastos: null,

  setHistoriaSE: (datos) => set({ historiaSE: datos }),
  updateHistoria: (historia) => {
    set((state) => ({
      historiaSE: state.historiaSE ? { ...state.historiaSE, historia } : null,
    }));
    const changes = get().changesInHistoriaSE;
    if (!changes) {
      set({ changesInHistoriaSE: true });
    }
  },

  setGastos: (gastos) => set({ gastos, nextGastoTempId: -1 }),
  addGasto: (gasto) => {
    set((state) => {
      const ensuredId = gasto.id ?? state.nextGastoTempId;
      const newGasto: Gasto = { ...gasto, id: ensuredId };
      return {
        gastos: state.gastos ? [...state.gastos, newGasto] : [newGasto],
        nextGastoTempId:
          gasto.id == null ? state.nextGastoTempId - 1 : state.nextGastoTempId,
      };
    });
    const changes = get().changesInGastos;
    if (!changes) {
      set({ changesInGastos: true });
    }
  },
  updateGastoField: (id, field, value) => {
    set((state) => ({
      gastos: state.gastos
        ? state.gastos.map((gasto) =>
            gasto.id === id ? { ...gasto, [field]: value } : gasto
          )
        : null,
    }));
    const changes = get().changesInGastos;
    if (!changes) {
      set({ changesInGastos: true });
    }
  },
  removeGasto: (id) => {
    set((state) => ({
      gastos: state.gastos ? state.gastos.filter((g) => g.id !== id) : null,
    }));
    const changes = get().changesInGastos;
    if (!changes) {
      set({ changesInGastos: true });
    }
  },
  replaceGastoId: (tempId, realId) =>
    set((state) => ({
      gastos: state.gastos
        ? state.gastos.map((g) => (g.id === tempId ? { ...g, id: realId } : g))
        : null,
    })),
  getTotalGastos: () => {
    const { gastos } = get();
    if (!gastos || gastos.length === 0) return 0;
    return gastos.reduce((total, gasto) => total + (gasto.monto || 0), 0);
  },

  setChangesInHistoriaSE: (changes) => set({ changesInHistoriaSE: changes }),
  setChangesInGastos: (changes) => set({ changesInGastos: changes }),

  reset: () => set({ historiaSE: null, gastos: null }),
}));
