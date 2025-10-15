import type { Deuda, ResponseDeuda } from "@features/deudas";

// Provicional
export interface ClientData {
  datos_personales: PersonalData;
  situacion_laboral: LaboralSituation;
  deudas: Deuda[];
  bienes?: Bienes;
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

interface LaboralSituation {
  trabajando: string;
  tipo_trabajo: string;
  tipo_trabajador: string;
  cesante: string;
  remuneracion: number;
  bonos: string;
  link_liquidacion: string;
  finiquito: string;
  monto_finiquito: number;
  link_finiquito: string;
}

export interface ClientDataResponse {
  datos_personales: ResponsePersonalData;
  situacion_laboral: ResponseLaboralSituation;
  deudas: ResponseDeuda[];
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

interface ResponseLaboralSituation
  extends Omit<
    LaboralSituation,
    "trabajando" | "cesante" | "bonos" | "finiquito"
  > {
  trabajando: boolean;
  cesante: boolean;
  bonos: boolean;
  finiquito: boolean;
}

export interface Bienes {
  inmuebles: Inmuebles;
  vehiculos: Vehiculos;
  sociedades: Sociedades;
}

export interface Inmuebles {
  posee_inmuebles: string;
  paga_cred_hipotecario: string;
  tiene_codeudor: string;
  al_dia_hipoteca: string;
  hipoteco_ultimos_anos: string;
  vendio_inmueble: string;
}

export interface Vehiculos {
  posee_vehiculos: string;
  ha_vendido_vehiculo: string;
  hace_cuanto: string;
  a_quien: string;
  a_traves_de: string;
}

export interface Sociedades {
  posee_empresas: string;
  nombre: string;
  activos_pasivos: number;
  tiene_movimientos: string;
  presenta_contabilidad: string;
  socios: string;
}
