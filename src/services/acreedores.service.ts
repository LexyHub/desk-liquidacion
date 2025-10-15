import type { Acreedor } from "@/types";

const API_URL = import.meta.env.VITE_LEXY_API + "acreedores";
const API_KEY = import.meta.env.VITE_LEXY_KEY;

export async function fetchAcreedores(signal?: AbortSignal) {
  if (!API_URL || !API_KEY) throw new Error("API_URL or API_KEY not set");

  const res = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "lexy-key": API_KEY,
    },
    signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => null);
    throw new Error(
      `Error fetching acreedores: ${res.status} ${res.statusText} - ${text}`
    );
  }

  const data = (await res.json()) as Acreedor[];

  return data;
}
