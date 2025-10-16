import type { ClientData } from "@shared/types";
import _ClientData from "@shared/lib/data/client.mock.json";

export function getClientData(idDefensoria: string) {
  console.info("DEBUG - Fetching de data de cliente", idDefensoria);
  return new Promise<ClientData>((resolve) => {
    setTimeout(() => resolve(_ClientData as ClientData), 500); // Simulo latencia de 500ms
  });
}
