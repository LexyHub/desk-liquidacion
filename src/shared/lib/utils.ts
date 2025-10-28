import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseAffirmationToBoolean(value: string | boolean): boolean {
  return value === "si";
}

export function parseBooleanToAffirmation(value: boolean) {
  return value ? "si" : "no";
}

const API_URL =
  import.meta.env.VITE_LEXY_API + "liquidacion/ficha_web/file-link-interno";

export async function fetchFile(slug: string) {
  const final_url = `${API_URL}?s3_key=${slug}`;
  const response = await fetch(final_url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token") || "",
    },
  });
  if (!response.ok) {
    throw new Error(
      `Error al obtener el archivo. ${response.status} ${response.statusText}`
    );
  }
  const data = await response.json();
  return data.url;
}
