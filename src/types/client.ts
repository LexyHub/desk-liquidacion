// Provicional
export interface ClientData {
  datos_personales: PersonalData;
}

interface PersonalData {
  nombre: string;
  rut: string;
  nacionalidad: string;
  profesion: string;
  juicios: string;
  procedimiento_concursal: string;
  direccion: string;
  padres_fallecidos: string;
  posesion_efectiva: string;
  derechos_hereditarios: string;
  hijos: string;
  recibe_alimentos: string;
  deuda_alimenticia: string;
  regularizada: string;
  estado_civil: string;
  regimen_matrimonial: string;
}

export interface ClientDataResponse {
  datos_personales: ResponsePersonalData;
}

interface ResponsePersonalData
  extends Omit<
    PersonalData,
    | "procedimiento_concursal"
    | "padres_fallecidos"
    | "posesion_efectiva"
    | "derechos_hereditarios"
    | "hijos"
    | "recibe_alimentos"
    | "deuda_alimenticia"
    | "regularizada"
  > {
  procedimiento_concursal: boolean;
  padres_fallecidos: boolean;
  posesion_efectiva: boolean;
  derechos_hereditarios: boolean;
  hijos: boolean;
  recibe_alimentos: boolean;
  deuda_alimenticia: boolean;
  regularizada: boolean;
}
