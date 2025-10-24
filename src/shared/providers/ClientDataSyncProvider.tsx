import type { ReactNode } from "react";
import { useClientDataSync } from "@shared/hooks/useClientDataSync";

export function ClientDataSyncProvider({ children }: { children: ReactNode }) {
  useClientDataSync();
  return children;
}
