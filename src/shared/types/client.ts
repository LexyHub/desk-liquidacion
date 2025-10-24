export interface ClientData {
  datos: Datos;
  deudas: Deuda[];
  bienes: Bienes[];
  datos_pp: DatosPP;
  situacion_laboral: SituacionLaboral;
  empresas: Empresa[];
  gastos: Gasto[];
  historial?: Historial | null;
  datos_financieros?: DatosFinancieros | null;
}

export interface Datos {
  id_cliente: string;
  id_defensoria: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  rut: string;
  fecha_nacimiento: string;
  domicilio: string;
  id_comuna: string;
  id_region: string;
  sexo: string;
  nacionalidad: string;
  estado_civil: string;
  regimen_matrimonial: string;
  situacion_habitacional: string;
  profesion_oficio: string;
  derechos_sepultura?: string | null;
  clave_unica_seteada: boolean;
  tiene_sociedades?: string | null;
}

export interface Deuda {
  id?: number;
  id_cliente: string;
  tipo: string;
  id_acreedor: string;
  monto: number;
}

export interface Bienes {
  bien: {
    id: number;
    id_cliente: string;
    tipo_bien: string;
    descripcion: string;
    vendido: string;
  };
  inmueble: {
    id: number;
    credito_hipotecario: string;
    codeudor_solidario: string;
    al_dia: string;
    hipotecado: string;
    mas_dos_anos_venta: string;
    comprador?: string | null;
  };
  vehiculo: {
    id: number;
    mas_dos_anos_venta: string;
    comprador?: string | null;
    medio_compra?: string | null;
  };
}

export interface DatosPP {
  id: string;
  arrendador: string;
  relacion_arrendador: string;
  padres_fallecidos: string;
  posesion_efectiva: string;
  ficha_enviada: string;
  cae_fondo: string;
  aval: string;
  tiene_inmueble: string;
  tiene_vehiculo: string;
  derechos_hereditarios?: string | null;
  hijos?: number | null;
  recibe_alimentos?: string | null;
  deuda_alimentos?: string | null;
  alimentos_regularizados?: string | null;
  juicios_pendientes: string;
  proc_concursal: string | null;
}

export interface SituacionLaboral {
  id: string;
  trabajando: string;
  tipo_trabajo: string;
  responsable_trabajadores?: string | null;
  establecimiento_comercial?: string | null;
  total_trabajadores?: number | null;
  empresa_propia: string;
  remuneracion: number;
  tipo_funcionario: string;
  bono_gratificacion: string;
  link_ultima_liquidacion: string;
  finiquito: string;
  monto_finiquito?: number | null;
  link_finiquito?: string | null;
}

export interface Empresa {
  id?: number | null;
  nombre_empresa: string;
  actividad: string;
  id_cliente: string;
  activos_pasivos: number;
  movimientos: string;
  contabilidad_completa: string;
  socios: string;
}

export interface Gasto {
  id?: number | null;
  id_cliente: string;
  categoria: string;
  descripcion: string;
  monto: number;
}

export interface Historial {
  id?: number;
  id_cliente: string;
  historia: string;
}

export interface DatosFinancieros {
  id?: number;
  id_cliente: string;
  cae: string;
  aval: string;
  ultimo_credito: string;
  declaro_renta: string;
  recibe_devolucion_impuestos: string;
  retencion_impuestos: string;
  categoria_contribuyente: string;
  tarjeta_credito: string;
  chequera: string;
  cheques_protestados: string;
  vales_sin_cobrar: string;
  vales_vencidos: string;
  fondos_cooperativas: string;
  criptomonedas: string;
  libreta_ahorros: string;
  fondos_mutuos: string;
  apv: string;
  deposito_plazo: string;
  caja_compensacion: string;
  autopista: string;
  inst_medicas: string;
  tgr: string;
}
