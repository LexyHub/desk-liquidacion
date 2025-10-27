export function formatCurrency(value: string | number): string {
  if (!value || value === "" || Number(value) === 0) return "$0";
  return "$" + Number(value).toLocaleString("es-CL");
}

export function parseCurrencyInput(value: string): string {
  return value.replace(/[^\d]/g, "");
}

export function currencyToNumber(value: string): number {
  const digits = parseCurrencyInput(value).replace("$", "");
  return digits === "" ? 0 : parseInt(digits, 10);
}
