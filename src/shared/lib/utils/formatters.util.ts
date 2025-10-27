export function normalizeString(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD") // separa letras y tildes
    .replace(/[\u0300-\u036f]/g, "") // elimina tildes
    .replace(/[''´`]/g, ""); // elimina comillas/apóstrofos
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
