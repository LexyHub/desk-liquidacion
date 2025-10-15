export { default as DatosPersonales } from "./views/DatosPersonales";
export { default as SituacionLaboral } from "./views/SituacionLaboral";
export * from "./types/client";
export {
  useClientDataContext,
  ClientDataContext,
  type ClientDataContextValue,
} from "./hooks/useClientData";
export { ClientDataProvider } from "./context/ClientDataContext";
