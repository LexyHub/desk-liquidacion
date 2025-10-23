import type { SituacionLaboral } from "@shared/types";
import { create } from "zustand";

interface SituacionLaboralState {
  situacion_laboral: SituacionLaboral | null;

  setDatos: (situacion_laboral: SituacionLaboral) => void;
  updateField: <K extends keyof SituacionLaboral>(
    field: K,
    value: SituacionLaboral[K]
  ) => void;

  reset: () => void;
}

export const useSituacionLaboralStore = create<SituacionLaboralState>(
  (set) => ({
    situacion_laboral: null,

    setDatos: (situacion_laboral) => set({ situacion_laboral }),

    updateField: (field, value) =>
      set((state) => ({
        situacion_laboral: state.situacion_laboral
          ? { ...state.situacion_laboral, [field]: value }
          : null,
      })),

    reset: () => set({ situacion_laboral: null }),
  })
);
