export interface ClientDataAPIResponse {
  datos: DatosResponse;
  deudas: DeudaResponse[];
  bienes: BienesResponse[];
  datos_pp: DatosPPResponse;
  situacion_laboral: SituacionLaboralResponse;
  empresas: EmpresaResponse[];
  gastos: GastoResponse[];
  historial?: HistorialResponse | null;
  datos_financieros?: DatosFinancierosResponse | null;
}

export interface DatosResponse {
  id_cliente: string;
  id_defensoria: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  rut: string;
  fecha_nacimiento: string;
  domicilio: string;
  id_comuna: number;
  id_region: number;
  sexo: string;
  nacionalidad: string;
  estado_civil: string;
  regimen_matrimonial: string;
  situacion_habitacional: string;
  profesion_oficio: string;
  derechos_sepultura?: boolean | null;
  clave_unica_seteada: boolean;
  tiene_sociedades?: boolean | null;
}

export interface DeudaResponse {
  id: number;
  id_cliente: string;
  tipo: string;
  id_acreedor: number;
  monto: number;
}

export interface BienesResponse {
  bien: {
    id: number;
    id_cliente: string;
    tipo_bien: string;
    descripcion: string;
    vendido: boolean;
  };
  inmueble: {
    id: number;
    credito_hipotecario: boolean;
    codeudor_solidario: boolean;
    al_dia: boolean;
    hipotecado: boolean;
    mas_dos_anos_venta: boolean;
    comprador?: string | null;
  };
  vehiculo: {
    id: number;
    mas_dos_anos_venta: boolean;
    comprador?: string | null;
    medio_compra?: string | null;
  };
}

export interface DatosPPResponse {
  id: string;
  arrendador: string;
  relacion_arrendador: string;
  padres_fallecidos: boolean;
  posesion_efectiva: boolean;
  ficha_enviada: boolean;
  cae_fondo: boolean;
  aval: boolean;
  tiene_inmueble: boolean;
  tiene_vehiculo: boolean;
  derechos_hereditarios?: string | null;
  hijos?: number | null;
  recibe_alimentos?: boolean | null;
  deuda_alimentos?: boolean | null;
  alimentos_regularizados?: boolean | null;
  juicios_pendientes?: string | null;
  proc_concursal?: boolean | null;
}

export interface SituacionLaboralResponse {
  id: string;
  trabajando: boolean;
  tipo_trabajo: string;
  responsable_trabajadores?: boolean | null;
  establecimiento_comercial?: boolean | null;
  total_trabajadores?: number | null;
  empresa_propia: boolean;
  remuneracion: number;
  tipo_funcionario: string;
  bono_gratificacion: boolean;
  link_ultima_liquidacion: string;
  finiquito: boolean;
  monto_finiquito?: number | null;
  link_finiquito?: string | null;
}

export interface EmpresaResponse {
  id: number;
  nombre_empresa: string;
  actividad: boolean;
  id_cliente: string;
  activos_pasivos: string;
  movimientos: boolean;
  contabilidad_completa: boolean;
  socios: string;
}

export interface GastoResponse {
  id: number;
  id_cliente: string;
  categoria: string;
  descripcion: string;
  monto: number;
}

export interface HistorialResponse {
  id: number;
  id_cliente: string;
  historia: string;
}

export interface DatosFinancierosResponse {
  id: number;
  id_cliente: string;
  cae: boolean;
  aval: boolean;
  ultimo_credito: string;
  declaro_renta: boolean;
  recibe_devolucion_impuestos: boolean;
  retencion_impuestos: boolean;
  categoria_contribuyente: string;
  tarjeta_credito: boolean;
  chequera: boolean;
  cheques_protestados: boolean;
  vales_sin_cobrar: boolean;
  vales_vencidos: boolean;
  fondos_cooperativas: boolean;
  criptomonedas: boolean;
  libreta_ahorros: boolean;
  fondos_mutuos: boolean;
  apv: boolean;
  deposito_plazo: boolean;
  caja_compensacion: boolean;
  autopista: boolean;
  inst_medicas: boolean;
  tgr: boolean;
}
