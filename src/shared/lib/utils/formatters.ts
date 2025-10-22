export function normalizeString(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD") // separa letras y tildes
    .replace(/[\u0300-\u036f]/g, "") // elimina tildes
    .replace(/[''´`]/g, ""); // elimina comillas/apóstrofos
}

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

export function formatDate(
  date: string | Date,
  format: "short" | "long" | "word" = "word"
): string {
  const d = new Date(date);
  if (format === "long") {
    return d
      .toLocaleDateString("es-CL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replaceAll("-", "/");
  } else if (format === "word") {
    return d.toLocaleDateString("es-CL", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } else if (format === "short") {
    return d
      .toLocaleDateString("es-CL", {
        day: "2-digit",
        month: "short",
      })
      .replace("-", " de ");
  }
  return d.toLocaleDateString("es-CL");
}
