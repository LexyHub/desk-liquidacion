import type { QueryFunctionContext } from "@tanstack/react-query";
import type { Region } from "../types";

const API_URL = import.meta.env.VITE_LEXY_API + "regiones/con_comunas";
const API_KEY = import.meta.env.VITE_LEXY_KEY;

export async function fetchRegions(
  context: QueryFunctionContext
): Promise<Region[]> {
  if (!API_KEY || !API_URL) {
    throw new Error("API Key o URL ausentes");
  }

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "lexy-key": API_KEY,
      },
      signal: context.signal,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => null);
      const errorMsg = `Error de API ${response.status} ${response.statusText}${text ? `: ${text}` : ""}`;
      throw new Error(errorMsg);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError") {
      console.error("Fetch error:", error);
    }
    throw error;
  }
}
