import { create } from "zustand";
import type { Bienes, Empresa } from "@/shared/types";

interface BienesState {
  bienes: Bienes | null;
  empresas: Empresa[] | null;
  // id temporal, decreciente para nuevas empresas
  nextEmpresaTempId: number;

  setBienes: (datos: Bienes) => void;
  updateBienesField: <K extends keyof Bienes>(
    field: K,
    value: Bienes[K]
  ) => void;
  // Helpers de patch para evitar lógica repetida en componentes
  patchBien: (patch: Partial<Bienes["bien"]>) => void;
  patchInmueble: (patch: Partial<NonNullable<Bienes["inmueble"]>>) => void;
  patchVehiculo: (patch: Partial<NonNullable<Bienes["vehiculo"]>>) => void;
  setEmpresas: (empresas: Empresa[]) => void;
  addEmpresa: (empresa: Empresa) => void;
  removeEmpresa: (id: number) => void;
  updateEmpresaField: <K extends keyof Empresa>(
    id: number,
    field: K,
    value: Empresa[K]
  ) => void;
  replaceEmpresaId: (tempId: number, realId: number) => void;
  reset: () => void;
}

export const useBienesStore = create<BienesState>((set) => ({
  bienes: null,
  empresas: null,
  nextEmpresaTempId: -1,

  setBienes: (datos) => set({ bienes: datos }),
  updateBienesField: (field, value) =>
    set((state) => ({
      bienes: state.bienes ? { ...state.bienes, [field]: value } : null,
    })),
  patchBien: (patch) =>
    set((state) => {
      if (!state.bienes) return state;
      return {
        bienes: { ...state.bienes, bien: { ...state.bienes.bien, ...patch } },
      };
    }),
  patchInmueble: (patch) =>
    set((state) => {
      if (!state.bienes || !state.bienes.inmueble) return state;
      return {
        bienes: {
          ...state.bienes,
          inmueble: { ...state.bienes.inmueble, ...patch },
        },
      };
    }),
  patchVehiculo: (patch) =>
    set((state) => {
      if (!state.bienes || !state.bienes.vehiculo) return state;
      return {
        bienes: {
          ...state.bienes,
          vehiculo: { ...state.bienes.vehiculo, ...patch },
        },
      };
    }),
  setEmpresas: (empresas) => set({ empresas, nextEmpresaTempId: -1 }),
  addEmpresa: (empresa) =>
    set((state) => {
      const ensuredId = empresa.id ?? state.nextEmpresaTempId;
      const newEmpresa: Empresa = { ...empresa, id: ensuredId };
      return {
        empresas: state.empresas
          ? [...state.empresas, newEmpresa]
          : [newEmpresa],
        nextEmpresaTempId:
          empresa.id == null
            ? state.nextEmpresaTempId - 1
            : state.nextEmpresaTempId,
      };
    }),
  removeEmpresa: (id) =>
    set((state) => ({
      empresas: state.empresas
        ? state.empresas.filter((e) => e.id !== id)
        : null,
    })),
  updateEmpresaField: (id, field, value) =>
    set((state) => ({
      empresas: state.empresas
        ? state.empresas.map((e) =>
            e.id === id ? { ...e, [field]: value } : e
          )
        : null,
    })),
  // cuando se haga un POST y se reciba el id real del servidor
  replaceEmpresaId: (tempId, realId) =>
    set((state) => ({
      empresas: state.empresas
        ? state.empresas.map((e) =>
            e.id === tempId ? { ...e, id: realId } : e
          )
        : null,
    })),
  reset: () => {
    set({ bienes: null });
    set({ empresas: null });
  },
}));
