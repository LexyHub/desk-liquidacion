import {
  getPinnedSnapshot,
  pinRow as _pinRow,
  unpinRow as _unpinRow,
  togglePinRow as _togglePinRow,
  subscribe,
  isPinned as _isPinned,
} from "@shared/services/pinned.service";
import { useMemo, useSyncExternalStore } from "react";

export function usePinService() {
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

  const pinnedSet = useMemo(() => new Set(pinnedRows), [pinnedRows]);

  const isRowPinned = (rowKey: string) => pinnedSet.has(rowKey);

  const pinRow = (rowKey: string) => _pinRow(rowKey);

  const unpinRow = (rowKey: string) => _unpinRow(rowKey);

  const togglePinRow = (rowKey: string) => _togglePinRow(rowKey);

  return {
    isRowPinned,
    pinRow,
    unpinRow,
    togglePinRow,
    pinnedRows,
    isPinned: _isPinned,
  };
}
