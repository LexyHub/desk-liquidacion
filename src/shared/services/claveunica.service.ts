import type { QueryFunctionContext } from "@tanstack/react-query";
import { sendGet } from "./http.client";

const API_URL = import.meta.env.VITE_LEXY_API + "clientes/cu/clave_unica";
const API_KEY = import.meta.env.VITE_LEXY_KEY;

type RESPONSE = {
  CLAVE_UNICA: string;
  EMAIL_USUARIO: string;
  ID_DEFENSORIA: string;
  RUT: string;
};

/**
Abstracción de get en http.client para manejar con react query
*/
export async function fetchClaveUnica(
  context: QueryFunctionContext<[string, string]>
) {
  const [, idDefensoria] = context.queryKey;
  if (!idDefensoria || idDefensoria === "" || idDefensoria === "undefined") {
    throw new Error("ID de Defensoría ausente");
  }

  if (!API_URL || !API_KEY) {
    throw new Error("API Key o URL ausentes");
  }

  const final_url = `${API_URL}?id_defensoria=${idDefensoria}`;
  const headers = {
    "Content-Type": "application/json",
    "lexy-key": API_KEY,
    Authorization: sessionStorage.getItem("token") || "",
  };

  const data = await sendGet<RESPONSE>(final_url, context.signal, headers);
  return data;
}
