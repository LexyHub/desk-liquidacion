import type { QueryFunctionContext } from "@tanstack/react-query";
import type {
  ClientDataAPIResponse,
  DatosFinancieros,
  DatosPP,
  Deuda,
  SituacionLaboral,
} from "@shared/types";
import {
  mapToDatosFinancieros,
  mapToPersonalData,
  mapToSituacionLaboral,
} from "../lib/utils/mappers.util";
import { notificationBus } from "@features/notificaciones/lib/notificationBus";

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

  try {
    const response = await fetch(final_api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "lexy-key": API_KEY,
        Authorization: sessionStorage.getItem("token") || "",
      },
      signal: context.signal,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => null);
      const errorMsg = `Error al traer datos del cliente. ${response.status} ${response.statusText}${text ? `: ${text}` : ""}`;
      throw new Error(errorMsg);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError") {
      console.error("Fetch error en datos del cliente:", error);
    }
    throw error;
  }
}

export async function patchDatosPersonales(
  id_cliente: string,
  payload: DatosPP,
  signal?: AbortSignal
) {
  if (!RAW_ENDPOINT) throw new Error("API Key o URL ausentes");

  const final_api = `${RAW_ENDPOINT}/datos-personales/${id_cliente}`;
  const data = mapToPersonalData(payload);
  try {
    const response = await fetch(final_api, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
      body: JSON.stringify(data),
      signal,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => null);
      const errorMsg = `Error al actualizar datos del cliente. ${response.status} ${response.statusText}${text ? `: ${text}` : ""}`;
      throw new Error(errorMsg);
    }

    notificationBus.emit("notify", {
      id: crypto.randomUUID(),
      type: "success",
      message: "Datos Personales del cliente actualizados correctamente.",
      closeable: true,
    });
    return true;
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError") {
      console.error("Fetch error al actualizar datos del cliente:", error);
    }
    notificationBus.emit("notify", {
      id: crypto.randomUUID(),
      type: "error",
      message: "Error al actualizar los Datos Personales del cliente.",
      closeable: true,
    });
    throw error;
  }
}

export async function patchSituacionLaboral(
  id_cliente: string,
  payload: SituacionLaboral,
  signal?: AbortSignal
) {
  if (!RAW_ENDPOINT) throw new Error("API Key o URL ausentes");

  const final_api = `${RAW_ENDPOINT}/situacion-laboral/${id_cliente}`;
  const data = mapToSituacionLaboral(payload);

  try {
    const response = await fetch(final_api, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
      body: JSON.stringify(data),
      signal,
    });
    if (!response.ok) {
      const text = await response.text().catch(() => null);
      const errorMsg = `Error al actualizar situación laboral del cliente. ${response.status} ${response.statusText}${text ? `: ${text}` : ""}`;
      throw new Error(errorMsg);
    }
    notificationBus.emit("notify", {
      id: crypto.randomUUID(),
      type: "success",
      message: "Situación Laboral del cliente actualizados correctamente.",
      closeable: true,
    });
    return true;
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError") {
      console.error(
        "Fetch error al actualizar situación laboral del cliente:",
        error
      );
    }
    notificationBus.emit("notify", {
      id: crypto.randomUUID(),
      type: "error",
      message: "Error al actualizar la Situación Laboral del cliente.",
      closeable: true,
    });
    throw error;
  }
}

export async function patchDatosFinancieros(
  id_cliente: string,
  payload: DatosFinancieros,
  signal?: AbortSignal
) {
  if (!RAW_ENDPOINT) throw new Error("API Key o URL ausentes");

  const final_api = `${RAW_ENDPOINT}/datos-financieros/${id_cliente}`;
  const data = mapToDatosFinancieros(payload);

  try {
    const response = await fetch(final_api, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
      body: JSON.stringify(data),
      signal,
    });
    if (!response.ok) {
      const text = await response.text().catch(() => null);
      const errorMsg = `Error al actualizar datos financieros del cliente. ${response.status} ${response.statusText}${text ? `: ${text}` : ""}`;
      throw new Error(errorMsg);
    }
    notificationBus.emit("notify", {
      id: crypto.randomUUID(),
      type: "success",
      message: "Datos Financieros del cliente actualizados correctamente.",
      closeable: true,
    });
    return true;
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError") {
      console.error(
        "Fetch error al actualizar datos financieros del cliente:",
        error
      );
    }
    notificationBus.emit("notify", {
      id: crypto.randomUUID(),
      type: "error",
      message: "Error al actualizar los Datos Financieros del cliente.",
      closeable: true,
    });
    throw error;
  }
}

export async function uploadDeudas(
  id_cliente: string,
  payload: Deuda[],
  signal?: AbortSignal
) {
  if (!RAW_ENDPOINT) throw new Error("API Key o URL ausentes");

  const final_api = `${RAW_ENDPOINT}/deudas/${id_cliente}`;

  const deudas = payload.map((d) => {
    if (d.id! > 0) {
      return d;
    }
    return {
      id_cliente: d.id_cliente,
      tipo: d.tipo,
      id_acreedor: d.id_acreedor,
      monto: d.monto,
    };
  });

  try {
    const response = await fetch(final_api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
      body: JSON.stringify(deudas),
      signal,
    });
    if (!response.ok) {
      const text = await response.text().catch(() => null);
      const errorMsg = `Error al actualizar deudas del cliente. ${response.status} ${response.statusText}${text ? `: ${text}` : ""}`;
      throw new Error(errorMsg);
    }
    notificationBus.emit("notify", {
      id: crypto.randomUUID(),
      type: "success",
      message: "Deudas del cliente actualizadas correctamente.",
      closeable: true,
    });
    return true;
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError") {
      console.error("Fetch error al actualizar deudas del cliente:", error);
    }
    notificationBus.emit("notify", {
      id: crypto.randomUUID(),
      type: "error",
      message: "Error al actualizar las Deudas del cliente.",
      closeable: true,
    });
    throw error;
  }
}
