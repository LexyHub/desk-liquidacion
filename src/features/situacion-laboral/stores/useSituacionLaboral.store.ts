import type { SituacionLaboral } from "@shared/types";
import { create } from "zustand";

interface SituacionLaboralState {
  situacion_laboral: SituacionLaboral | null;
  changes: boolean;

  setDatos: (situacion_laboral: SituacionLaboral) => void;
  updateField: <K extends keyof SituacionLaboral>(
    field: K,
    value: SituacionLaboral[K]
  ) => void;

  setChanges: (changes: boolean) => void;

  reset: () => void;
}

export const useSituacionLaboralStore = create<SituacionLaboralState>(
  (set, get) => ({
    situacion_laboral: null,
    changes: false,

    setDatos: (situacion_laboral) => set({ situacion_laboral }),

    updateField: (field, value) => {
      set((state) => ({
        situacion_laboral: state.situacion_laboral
          ? { ...state.situacion_laboral, [field]: value }
          : null,
      }));

      const changes = get().changes;
      if (!changes) {
        set({ changes: true });
      }
    },

    setChanges: (changes) => set({ changes }),

    reset: () => set({ situacion_laboral: null }),
  })
);
