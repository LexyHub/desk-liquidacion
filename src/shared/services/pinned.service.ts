type PinnedMap = Record<string, true>;

const STORAGE_KEY = "pinnedRows";

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => {
    try {
      l();
    } catch {
      // omitimos errores
    }
  });
}

function readPinnedMap(): PinnedMap {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function writePinnedMap(map: PinnedMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  notify();
}

export function getPinnedRows(): string[] {
  const map = readPinnedMap();
  return Object.keys(map);
}

export function isPinned(rowKey: string): boolean {
  const map = readPinnedMap();
  return !!map[rowKey];
}

export function getPinnedSnapshot(): string {
  return localStorage.getItem(STORAGE_KEY) ?? "{}";
}

export function pinRow(rowKey: string) {
  const map = readPinnedMap();
  if (!map[rowKey]) {
    map[rowKey] = true;
    writePinnedMap(map);
  }
}

export function unpinRow(rowKey: string) {
  const map = readPinnedMap();
  if (map[rowKey]) {
    delete map[rowKey];
    writePinnedMap(map);
  }
}

export function togglePinRow(rowKey: string) {
  const map = readPinnedMap();
  if (map[rowKey]) {
    delete map[rowKey];
  } else {
    map[rowKey] = true;
  }
  writePinnedMap(map);
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

if (
  typeof window !== "undefined" &&
  typeof window.addEventListener === "function"
) {
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) notify();
  });
}
