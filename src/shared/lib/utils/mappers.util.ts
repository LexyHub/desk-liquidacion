import type {
  ClientData,
  ClientDataAPIResponse,
  DatosPP,
  DatosPPResponse,
  SituacionLaboral,
  SituacionLaboralResponse,
} from "@/shared/types";
import { parseBooleanToAffirmation } from "../utils";
import { currencyToNumber } from "./currency.util";

export function mapAPIToClientData(apiData: ClientDataAPIResponse): ClientData {
  return {
    datos: {
      ...apiData.datos,
      id_comuna: String(apiData.datos.id_comuna),
      id_region: String(apiData.datos.id_region),
      derechos_sepultura: parseBooleanToAffirmation(
        apiData.datos.derechos_sepultura || false
      ),
      tiene_sociedades: parseBooleanToAffirmation(
        apiData.datos.tiene_sociedades || false
      ),
    },
    deudas: apiData.deudas.map((deuda) => ({
      ...deuda,
      id_acreedor: String(deuda.id_acreedor),
    })),
    bienes: apiData.bienes.map((bienes) => ({
      bien: {
        ...bienes.bien,
        vendido: parseBooleanToAffirmation(bienes.bien.vendido),
      },
      inmueble: bienes.inmueble
        ? {
            ...bienes.inmueble,
            credito_hipotecario: parseBooleanToAffirmation(
              bienes.inmueble.credito_hipotecario
            ),
            codeudor_solidario: parseBooleanToAffirmation(
              bienes.inmueble.codeudor_solidario
            ),
            al_dia: parseBooleanToAffirmation(bienes.inmueble.al_dia),
            hipotecado: parseBooleanToAffirmation(bienes.inmueble.hipotecado),
            mas_dos_anos_venta: parseBooleanToAffirmation(
              bienes.inmueble.mas_dos_anos_venta
            ),
          }
        : null,
      vehiculo: bienes.vehiculo
        ? {
            ...bienes.vehiculo,
            mas_dos_anos_venta: parseBooleanToAffirmation(
              bienes.vehiculo.mas_dos_anos_venta
            ),
          }
        : null,
    })),
    datos_pp: {
      ...apiData.datos_pp,
      padres_fallecidos: parseBooleanToAffirmation(
        apiData.datos_pp.padres_fallecidos
      ),
      posesion_efectiva: parseBooleanToAffirmation(
        apiData.datos_pp.posesion_efectiva
      ),
      ficha_enviada: parseBooleanToAffirmation(apiData.datos_pp.ficha_enviada),
      cae_fondo: parseBooleanToAffirmation(apiData.datos_pp.cae_fondo),
      aval: parseBooleanToAffirmation(apiData.datos_pp.aval),
      tiene_inmueble: parseBooleanToAffirmation(
        apiData.datos_pp.tiene_inmueble
      ),
      tiene_vehiculo: parseBooleanToAffirmation(
        apiData.datos_pp.tiene_vehiculo
      ),
      recibe_alimentos: parseBooleanToAffirmation(
        apiData.datos_pp.recibe_alimentos || false
      ),
      deuda_alimentos: parseBooleanToAffirmation(
        apiData.datos_pp.deuda_alimentos || false
      ),
      alimentos_regularizados: parseBooleanToAffirmation(
        apiData.datos_pp.alimentos_regularizados || false
      ),
      juicios_pendientes: apiData.datos_pp.juicios_pendientes || "",
      proc_concursal: parseBooleanToAffirmation(
        apiData.datos_pp.proc_concursal || false
      ),
    },
    situacion_laboral: {
      ...apiData.situacion_laboral,
      trabajando: parseBooleanToAffirmation(
        apiData.situacion_laboral.trabajando
      ),
      responsable_trabajadores: parseBooleanToAffirmation(
        apiData.situacion_laboral.responsable_trabajadores || false
      ),
      establecimiento_comercial: parseBooleanToAffirmation(
        apiData.situacion_laboral.establecimiento_comercial || false
      ),
      empresa_propia: parseBooleanToAffirmation(
        apiData.situacion_laboral.empresa_propia
      ),
      bono_gratificacion: parseBooleanToAffirmation(
        apiData.situacion_laboral.bono_gratificacion
      ),
      finiquito: parseBooleanToAffirmation(apiData.situacion_laboral.finiquito),
    },
    empresas: apiData.empresas.map((empresa) => ({
      ...empresa,
      activos_pasivos: currencyToNumber(empresa.activos_pasivos),
      actividad: parseBooleanToAffirmation(empresa.actividad),
      movimientos: parseBooleanToAffirmation(empresa.movimientos),
      contabilidad_completa: parseBooleanToAffirmation(
        empresa.contabilidad_completa
      ),
    })),
    gastos: apiData.gastos
      ? apiData.gastos.map((gasto) => ({
          ...gasto,
          monto: currencyToNumber(String(gasto.monto)),
        }))
      : [],
    historial: apiData.historial
      ? apiData.historial
      : {
          id_cliente: apiData.datos.id_cliente,
          historia: "",
        },
    datos_financieros: apiData.datos_financieros
      ? {
          ...apiData.datos_financieros,
          cae: parseBooleanToAffirmation(
            apiData.datos_financieros?.cae || false
          ),
          aval: parseBooleanToAffirmation(
            apiData.datos_financieros?.aval || false
          ),
          declaro_renta: parseBooleanToAffirmation(
            apiData.datos_financieros?.declaro_renta || false
          ),
          recibe_devolucion_impuestos: parseBooleanToAffirmation(
            apiData.datos_financieros?.recibe_devolucion_impuestos || false
          ),
          retencion_impuestos: parseBooleanToAffirmation(
            apiData.datos_financieros?.retencion_impuestos || false
          ),
          tarjeta_credito: parseBooleanToAffirmation(
            apiData.datos_financieros?.tarjeta_credito || false
          ),
          chequera: parseBooleanToAffirmation(
            apiData.datos_financieros?.chequera || false
          ),
          cheques_protestados: parseBooleanToAffirmation(
            apiData.datos_financieros?.cheques_protestados || false
          ),
          vales_sin_cobrar: parseBooleanToAffirmation(
            apiData.datos_financieros?.vales_sin_cobrar || false
          ),
          vales_vencidos: parseBooleanToAffirmation(
            apiData.datos_financieros?.vales_vencidos || false
          ),
          fondos_cooperativas: parseBooleanToAffirmation(
            apiData.datos_financieros?.fondos_cooperativas || false
          ),
          criptomonedas: parseBooleanToAffirmation(
            apiData.datos_financieros?.criptomonedas || false
          ),
          libreta_ahorros: parseBooleanToAffirmation(
            apiData.datos_financieros?.libreta_ahorros || false
          ),
          fondos_mutuos: parseBooleanToAffirmation(
            apiData.datos_financieros?.fondos_mutuos || false
          ),
          apv: parseBooleanToAffirmation(
            apiData.datos_financieros?.apv || false
          ),
          deposito_plazo: parseBooleanToAffirmation(
            apiData.datos_financieros?.deposito_plazo || false
          ),
          caja_compensacion: parseBooleanToAffirmation(
            apiData.datos_financieros?.caja_compensacion || false
          ),
          autopista: parseBooleanToAffirmation(
            apiData.datos_financieros?.autopista || false
          ),
          inst_medicas: parseBooleanToAffirmation(
            apiData.datos_financieros?.inst_medicas || false
          ),
          tgr: parseBooleanToAffirmation(
            apiData.datos_financieros?.tgr || false
          ),
        }
      : {
          id_cliente: apiData.datos.id_cliente,
          cae: "no",
          aval: "no",
          ultimo_credito: "",
          declaro_renta: "no",
          recibe_devolucion_impuestos: "no",
          retencion_impuestos: "no",
          categoria_contribuyente: "",
          tarjeta_credito: "no",
          chequera: "no",
          cheques_protestados: "no",
          vales_sin_cobrar: "no",
          vales_vencidos: "no",
          fondos_cooperativas: "no",
          criptomonedas: "no",
          libreta_ahorros: "no",
          fondos_mutuos: "no",
          apv: "no",
          deposito_plazo: "no",
          caja_compensacion: "no",
          autopista: "no",
          inst_medicas: "no",
          tgr: "no",
        },
  };
}

export function mapToPersonalData(cd: DatosPP): DatosPPResponse {
  return {
    ...cd,
    padres_fallecidos: cd!.padres_fallecidos === "si",
    posesion_efectiva: cd!.posesion_efectiva === "si",
    ficha_enviada: cd!.ficha_enviada === "si",
    cae_fondo: cd!.cae_fondo === "si",
    aval: cd!.aval === "si",
    tiene_inmueble: cd!.tiene_inmueble === "si",
    tiene_vehiculo: cd!.tiene_vehiculo === "si",
    recibe_alimentos: cd!.recibe_alimentos === "si",
    deuda_alimentos: cd!.deuda_alimentos === "si",
    alimentos_regularizados: cd!.alimentos_regularizados === "si",
    juicios_pendientes: cd!.juicios_pendientes,
    proc_concursal: cd!.proc_concursal === "si",
  };
}

export function mapToSituacionLaboral(
  sl: SituacionLaboral
): SituacionLaboralResponse {
  return {
    ...sl,
    trabajando: sl.trabajando === "si",
    responsable_trabajadores: sl.responsable_trabajadores === "si",
    establecimiento_comercial: sl.establecimiento_comercial === "si",
    empresa_propia: sl.empresa_propia === "si",
    bono_gratificacion: sl.bono_gratificacion === "si",
    finiquito: sl.finiquito === "si",
  };
}
