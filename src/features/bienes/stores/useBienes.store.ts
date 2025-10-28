import { create } from "zustand";
import type { Bienes, Empresa } from "@/shared/types";

interface BienesState {
  bienes: Bienes | null;
  empresas: Empresa[] | null;
  // id temporal, decreciente para nuevas empresas
  nextEmpresaTempId: number;

  changesInBienes: boolean | null;
  changesInEmpresas: boolean | null;

  setBienes: (datos: Bienes) => void;
  // Helpers de patch para evitar lógica repetida en componentes
  patchBien: (patch: Partial<Bienes["bien"]>) => void;
  patchInmueble: (patch: Partial<NonNullable<Bienes["inmueble"]>>) => void;
  patchVehiculo: (patch: Partial<NonNullable<Bienes["vehiculo"]>>) => void;
  // Helpers para empresas
  setEmpresas: (empresas: Empresa[]) => void;
  addEmpresa: (empresa: Empresa) => void;
  removeEmpresa: (id: number) => void;
  patchEmpresa: (id: number, patch: Partial<Empresa>) => void;
  replaceEmpresaId: (tempId: number, realId: number) => void;

  setChangesInBienes: (changes: boolean | null) => void;
  setChangesInEmpresas: (changes: boolean | null) => void;

  reset: () => void;
}

export const useBienesStore = create<BienesState>((set, get) => ({
  bienes: null,
  empresas: null,
  nextEmpresaTempId: -1,

  changesInBienes: null,
  changesInEmpresas: null,

  setBienes: (datos) => set({ bienes: datos }),
  patchBien: (patch) => {
    set((state) => {
      if (!state.bienes) return state;
      return {
        bienes: { ...state.bienes, bien: { ...state.bienes.bien, ...patch } },
      };
    });
    const changes = get().changesInBienes;
    if (!changes) set({ changesInBienes: true });
  },

  patchInmueble: (patch) => {
    set((state) => {
      if (!state.bienes || !state.bienes.inmueble) return state;
      return {
        bienes: {
          ...state.bienes,
          inmueble: { ...state.bienes.inmueble, ...patch },
        },
      };
    });
    const changes = get().changesInBienes;
    if (!changes) set({ changesInBienes: true });
  },

  patchVehiculo: (patch) => {
    set((state) => {
      if (!state.bienes) return state;
      const existingVeh = state.bienes.vehiculo;
      const newVeh = existingVeh
        ? { ...existingVeh, ...patch }
        : ({ ...patch } as NonNullable<Bienes["vehiculo"]>);
      return {
        bienes: {
          ...state.bienes,
          vehiculo: newVeh,
        },
      };
    });
    const changes = get().changesInBienes;
    if (!changes) set({ changesInBienes: true });
  },
  setEmpresas: (empresas) => set({ empresas, nextEmpresaTempId: -1 }),
  addEmpresa: (empresa) => {
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
    });
    const changes = get().changesInEmpresas;
    if (!changes) set({ changesInEmpresas: true });
  },
  removeEmpresa: (id) => {
    set((state) => ({
      empresas: state.empresas
        ? state.empresas.filter((e) => e.id !== id)
        : null,
    }));
    const changes = get().changesInEmpresas;
    if (!changes) set({ changesInEmpresas: true });
  },
  patchEmpresa: (id, patch) => {
    set((state) => ({
      empresas: state.empresas
        ? state.empresas.map((e) => (e.id === id ? { ...e, ...patch } : e))
        : null,
    }));
    const changes = get().changesInEmpresas;
    if (!changes) set({ changesInEmpresas: true });
  },
  // cuando se haga un POST y se reciba el id real del servidor
  replaceEmpresaId: (tempId, realId) =>
    set((state) => ({
      empresas: state.empresas
        ? state.empresas.map((e) =>
            e.id === tempId ? { ...e, id: realId } : e
          )
        : null,
    })),

  setChangesInBienes: (changes) => set({ changesInBienes: changes }),
  setChangesInEmpresas: (changes) => set({ changesInEmpresas: changes }),

  reset: () => {
    set({ bienes: null });
    set({ empresas: null });
  },
}));
