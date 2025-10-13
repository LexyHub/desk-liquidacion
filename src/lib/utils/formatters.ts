export function normalizeString(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD") // separa letras y tildes
    .replace(/[\u0300-\u036f]/g, "") // elimina tildes
    .replace(/[''´`]/g, ""); // elimina comillas/apóstrofos
}

export function formatCurrency(value: string | number): string {
  if (!value || value === "" || Number(value) === 0) return "";
  return "$" + Number(value).toLocaleString("es-CL");
}

export function parseCurrencyInput(value: string): string {
  return value.replace(/[^\d]/g, "");
}

export function currencyToNumber(value: string): number {
  const digits = parseCurrencyInput(value);
  return digits === "" ? 0 : parseInt(digits, 10);
}
