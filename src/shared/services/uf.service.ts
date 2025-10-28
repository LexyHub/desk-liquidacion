import type { QueryFunctionContext } from "@tanstack/react-query";

export async function getTodaysUF(
  context: QueryFunctionContext
): Promise<number> {
  const response = await fetch("https://api.santa.cl/uf", {
    signal: context.signal,
  });
  const data = (await response.json()) as { today: string; uf: string };
  if (!data?.uf) throw new Error("Invalid UF response");
  return parseInt(data.uf.split(".")[0]);
}
