import type { QueryFunctionContext } from "@tanstack/react-query";
import type {
  Bienes,
  ClientDataAPIResponse,
  Datos,
  DatosFinancieros,
  DatosPP,
  Deuda,
  Empresa,
  Gasto,
  SituacionLaboral,
} from "@shared/types";
import {
  mapEmpresas,
  mapToBienes,
  mapToDatosFinancieros,
  mapToPersonalData,
  mapToSituacionLaboral,
} from "../lib/utils/mappers.util";
import { sendPut, sendPost, sendGet } from "./http.client";

const RAW_ENDPOINT =
  import.meta.env.VITE_LEXY_API + "liquidacion/desk_entrevista";
const API_URL =
  import.meta.env.VITE_LEXY_API + "liquidacion/desk_entrevista/info-desk";

export async function fetchClientData(
  context: QueryFunctionContext<[string, string]>
): Promise<ClientDataAPIResponse> {
  const [, idDefensoria] = context.queryKey;
  if (!idDefensoria || idDefensoria === "" || idDefensoria === "undefined") {
    throw new Error("ID de Defensoría ausente");
  }

  if (!API_URL) {
    throw new Error("API Key o URL ausentes");
  }

  const final_api = `${API_URL}?id_defensoria=${idDefensoria}`;

  const data = await sendGet<ClientDataAPIResponse>(final_api, context.signal);
  return data;
}

export async function patchDatosCliente(
  id_cliente: string,
  payload: Datos,
  signal?: AbortSignal
) {
  if (!RAW_ENDPOINT) throw new Error("API Key o URL ausentes");

  return sendPut(
    `${RAW_ENDPOINT}/editar-cliente/${id_cliente}`,
    payload,
    signal,
    {
      successMessage: "Datos del cliente actualizados correctamente.",
      errorMessage: "Error al actualizar los Datos del cliente.",
    }
  );
}

export async function patchDatosPersonales(
  id_cliente: string,
  payload: DatosPP,
  signal?: AbortSignal
) {
  if (!RAW_ENDPOINT) throw new Error("API Key o URL ausentes");
  return sendPut(
    `${RAW_ENDPOINT}/datos-personales/${id_cliente}`,
    mapToPersonalData(payload),
    signal,
    {
      successMessage:
        "Datos Personales del cliente actualizados correctamente.",
      errorMessage: "Error al actualizar los Datos Personales del cliente.",
    }
  );
}

export async function patchSituacionLaboral(
  id_cliente: string,
  payload: SituacionLaboral,
  signal?: AbortSignal
) {
  if (!RAW_ENDPOINT) throw new Error("API Key o URL ausentes");
  return sendPut(
    `${RAW_ENDPOINT}/situacion-laboral/${id_cliente}`,
    mapToSituacionLaboral(payload),
    signal,
    {
      successMessage:
        "Situación Laboral del cliente actualizados correctamente.",
      errorMessage: "Error al actualizar la Situación Laboral del cliente.",
    }
  );
}

export async function patchDatosFinancieros(
  id_cliente: string,
  payload: DatosFinancieros,
  signal?: AbortSignal
) {
  if (!RAW_ENDPOINT) throw new Error("API Key o URL ausentes");
  return sendPut(
    `${RAW_ENDPOINT}/datos-financieros/${id_cliente}`,
    mapToDatosFinancieros(payload),
    signal,
    {
      successMessage:
        "Datos Financieros del cliente actualizados correctamente.",
      errorMessage: "Error al actualizar los Datos Financieros del cliente.",
    }
  );
}

export async function uploadDeudas(payload: Deuda[], signal?: AbortSignal) {
  if (!RAW_ENDPOINT) throw new Error("API Key o URL ausentes");

  const finalData = payload.map((d) => {
    if (d.id! > 0) return d;
    return {
      id_cliente: d.id_cliente,
      tipo: d.tipo,
      id_acreedor: d.id_acreedor,
      monto: d.monto,
    };
  });

  return sendPost(`${RAW_ENDPOINT}/deuda`, finalData, signal, {
    successMessage: "Deudas del cliente actualizadas correctamente.",
    errorMessage: "Error al actualizar las Deudas del cliente.",
  });
}

export async function postDatosBienes(payload: Bienes, signal?: AbortSignal) {
  if (!RAW_ENDPOINT) throw new Error("API Key o URL ausentes");
  return sendPost(
    `${RAW_ENDPOINT}/bienes`,
    { bienes: [mapToBienes(payload)] },
    signal,
    {
      successMessage: "Bienes del cliente actualizados correctamente.",
      errorMessage: "Error al actualizar los Bienes del cliente.",
    }
  );
}

export async function patchEmpresas(
  client_id: string,
  empresas: Empresa[],
  signal?: AbortSignal
) {
  if (!RAW_ENDPOINT) throw new Error("API Key o URL ausentes");
  const mapped = mapEmpresas(empresas);

  return sendPut(`${RAW_ENDPOINT}/empresas/${client_id}`, mapped, signal, {
    successMessage: "Empresas del cliente actualizadas correctamente.",
    errorMessage: "Error al actualizar las Empresas del cliente.",
  });
}

// no llamaremos al objeto completo d historial
export async function patchHistoriaSE(
  client_id: string,
  historia: string,
  signal?: AbortSignal
) {
  if (!RAW_ENDPOINT) throw new Error("API Key o URL ausentes");
  return sendPut(
    `${RAW_ENDPOINT}/reemplazar-historia/${client_id}`,
    { historia },
    signal,
    {
      successMessage:
        "Historia Sobre endeudamiento del cliente actualizado correctamente.",
      errorMessage:
        "Error al actualizar la Historia Sobre endeudamiento del cliente.",
    }
  );
}

export async function patchGastos(
  client_id: string,
  gastos: Gasto[],
  signal?: AbortSignal
) {
  if (!RAW_ENDPOINT) throw new Error("API Key o URL ausentes");
  const mapped = gastos.map((gasto) => ({
    categoria: gasto.categoria,
    monto: String(gasto.monto),
    descripcion: gasto.descripcion,
  }));
  return sendPut(`${RAW_ENDPOINT}/gastos/${client_id}`, mapped, signal, {
    successMessage: "Gastos del cliente actualizados correctamente.",
    errorMessage: "Error al actualizar los Gastos del cliente.",
  });
}
