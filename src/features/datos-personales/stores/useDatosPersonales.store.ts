import { create } from "zustand";
import type { Datos, DatosPP } from "@shared/types";

interface DatosPersonalesState {
  datos: Datos | null;
  datosPP: DatosPP | null;
  changesInDatos: boolean;
  changesInPP: boolean;

  setDatos: (datos: Datos) => void;
  setDatosPP: (datosPP: DatosPP) => void;

  updateDatosField: <K extends keyof Datos>(field: K, value: Datos[K]) => void;
  patchDatos: (patch: Partial<Datos>) => void;

  // Helper de patch para DatosPP
  patchDatosPP: (patch: Partial<DatosPP>) => void;

  setChangesInDatos: (changes: boolean) => void;
  setChangesInPP: (changes: boolean) => void;

  reset: () => void;
}

export const useDatosPersonalesStore = create<DatosPersonalesState>(
  (set, get) => ({
    datos: null,
    datosPP: null,
    changesInDatos: false,
    changesInPP: false,

    setDatos: (datos) => set({ datos }),
    setDatosPP: (datosPP) => set({ datosPP }),

    updateDatosField: (field, value) => {
      set((state) => ({
        datos: state.datos ? { ...state.datos, [field]: value } : null,
      }));
      const changes = get().changesInDatos;
      if (!changes) {
        set({ changesInDatos: true });
      }
    },

    patchDatos: (patch) => {
      set((state) => {
        if (!state.datos) return state;
        return { datos: { ...state.datos, ...patch } };
      });
      const changes = get().changesInDatos;
      if (!changes) {
        set({ changesInDatos: true });
      }
    },

    patchDatosPP: (patch) => {
      set((state) => {
        if (!state.datosPP) return state;
        return { datosPP: { ...state.datosPP, ...patch } };
      });
      const changes = get().changesInPP;
      if (!changes) {
        set({ changesInPP: true });
      }
    },

    setChangesInDatos: (changes) => set({ changesInDatos: changes }),
    setChangesInPP: (changes) => set({ changesInPP: changes }),

    reset: () =>
      set({
        datos: null,
        datosPP: null,
        changesInDatos: false,
        changesInPP: false,
      }),
  })
);
