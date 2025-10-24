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
