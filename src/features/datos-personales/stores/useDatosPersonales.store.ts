import { create } from "zustand";
import type { Datos, DatosPP } from "@shared/types";

interface DatosPersonalesState {
  // Estado
  datos: Datos | null;
  datosPP: DatosPP | null;

  // Acciones para inicializar desde el fetch
  setDatos: (datos: Datos) => void;
  setDatosPP: (datosPP: DatosPP) => void;

  // Acciones para actualizar campos individuales de Datos
  updateDatosField: <K extends keyof Datos>(field: K, value: Datos[K]) => void;

  // Acciones para actualizar campos individuales de DatosPP
  updateDatosPPField: <K extends keyof DatosPP>(
    field: K,
    value: DatosPP[K]
  ) => void;

  // Acción para limpiar todo
  reset: () => void;
}

export const useDatosPersonalesStore = create<DatosPersonalesState>((set) => ({
  // Estado inicial
  datos: null,
  datosPP: null,

  // Inicializar datos desde el fetch
  setDatos: (datos) => set({ datos }),
  setDatosPP: (datosPP) => set({ datosPP }),

  // Actualizar campo individual de Datos
  updateDatosField: (field, value) =>
    set((state) => ({
      datos: state.datos ? { ...state.datos, [field]: value } : null,
    })),

  // Actualizar campo individual de DatosPP
  updateDatosPPField: (field, value) =>
    set((state) => ({
      datosPP: state.datosPP ? { ...state.datosPP, [field]: value } : null,
    })),

  // Limpiar todo el estado
  reset: () => set({ datos: null, datosPP: null }),
}));
