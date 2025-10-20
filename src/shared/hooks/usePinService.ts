import {
  getPinnedSnapshot,
  pinRow as _pinRow,
  unpinRow as _unpinRow,
  togglePinRow as _togglePinRow,
  subscribe,
  isPinned as _isPinned,
} from "@shared/services/pinned.service";
import { useMemo, useSyncExternalStore } from "react";
import { useParams } from "react-router-dom";

export function usePinService() {
  const { idDefensoria } = useParams();

  const snapshot = useSyncExternalStore(
    subscribe,
    getPinnedSnapshot,
    () => "{}"
  );

  const pinnedRows = useMemo(() => {
    try {
      const map = JSON.parse(snapshot) as Record<string, true>;
      return Object.keys(map ?? {});
    } catch {
      return [] as string[];
    }
  }, [snapshot]);

  // Es la misma que la de abajo, pero para retro compatibilidad se deja así
  const isRowPinned = (rowKey: string) =>
    _isPinned(idDefensoria ?? "desconocido", rowKey);

  const isPinned = (rowKey: string) =>
    _isPinned(idDefensoria ?? "desconocido", rowKey);

  const pinRow = (rowKey: string) =>
    _pinRow(idDefensoria ?? "desconocido", rowKey);

  const unpinRow = (rowKey: string) =>
    _unpinRow(idDefensoria ?? "desconocido", rowKey);

  const togglePinRow = (rowKey: string) =>
    _togglePinRow(idDefensoria ?? "desconocido", rowKey);

  return {
    isRowPinned,
    pinRow,
    unpinRow,
    togglePinRow,
    pinnedRows,
    isPinned,
  };
}
