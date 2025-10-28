import type { ReactNode } from "react";
import { useClientDataSync } from "@shared/hooks/useClientDataSync";
import { useSyncDatosPersonales } from "@features/datos-personales/hooks/useSyncDatosPersonales";
import { useSyncSituacionLaboral } from "@features/situacion-laboral/hooks/useSyncSituacionLaboral";
import { useSyncDeudas } from "@features/deudas/hooks/useSyncDeudas";
import { useSyncBienes } from "@features/bienes/hooks/useSyncBienes";
import { useSyncHistoriaSE } from "@features/historia-sobreendeudamiento/hooks/useSyncHistoriaSE";

export function ClientDataSyncProvider({ children }: { children: ReactNode }) {
  useClientDataSync();
  useSyncDatosPersonales();
  useSyncSituacionLaboral();
  useSyncDeudas();
  useSyncBienes();
  useSyncHistoriaSE();

  return children;
}
