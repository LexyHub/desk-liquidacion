import { create } from "zustand";
import type { Datos, DatosPP } from "@shared/types";

interface DatosPersonalesState {
  datos: Datos | null;
  datosPP: DatosPP | null;
  changes: boolean;

  setDatos: (datos: Datos) => void;
  setDatosPP: (datosPP: DatosPP) => void;

  updateDatosField: <K extends keyof Datos>(field: K, value: Datos[K]) => void;

  updateDatosPPField: <K extends keyof DatosPP>(
    field: K,
    value: DatosPP[K]
  ) => void;

  setChanges: (changes: boolean) => void;

  reset: () => void;
}

export const useDatosPersonalesStore = create<DatosPersonalesState>(
  (set, get) => ({
    datos: null,
    datosPP: null,
    changes: false,

    setDatos: (datos) => set({ datos }),
    setDatosPP: (datosPP) => set({ datosPP }),

    updateDatosField: (field, value) => {
      set((state) => ({
        datos: state.datos ? { ...state.datos, [field]: value } : null,
      }));
      const changes = get().changes;
      if (!changes) {
        set({ changes: true });
      }
    },

    updateDatosPPField: (field, value) => {
      set((state) => ({
        datosPP: state.datosPP ? { ...state.datosPP, [field]: value } : null,
      }));
      const changes = get().changes;
      if (!changes) {
        set({ changes: true });
      }
    },

    setChanges: (changes) => set({ changes }),

    reset: () => set({ datos: null, datosPP: null, changes: false }),
  })
);
