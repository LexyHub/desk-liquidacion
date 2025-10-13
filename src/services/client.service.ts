import type { ClientData } from "@types";
import _ClientData from "@lib/data/client.mock.json";

export function getClientData(idDefensoria: string) {
  console.info("DEBUG - Fetching de data de cliente", idDefensoria);
  return new Promise<ClientData>((resolve) => {
    setTimeout(() => resolve(_ClientData as ClientData), 500); // Simulo latencia de 500ms
  });
}
