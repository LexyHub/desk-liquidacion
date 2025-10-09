export function normalizeString(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD") // separa letras y tildes
    .replace(/[\u0300-\u036f]/g, "") // elimina tildes
    .replace(/['’´`]/g, ""); // elimina comillas/apóstrofos
}
