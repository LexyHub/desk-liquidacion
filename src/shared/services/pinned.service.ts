type PinnedMap = Record<string, Record<string, true>>;

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

export function getPinnedRows(clientId: string): string[] {
  const map = readPinnedMap();
  return Object.keys(map[clientId] || {});
}

export function isPinned(clientId: string, rowKey: string): boolean {
  const map = readPinnedMap();
  if (map[clientId] === undefined) return false;
  return !!map[clientId][rowKey];
}

export function getPinnedSnapshot(): string {
  return localStorage.getItem(STORAGE_KEY) ?? "{}";
}

export function pinRow(clientId: string, rowKey: string) {
  const map = readPinnedMap();
  if (!map[clientId][rowKey]) {
    map[clientId][rowKey] = true;
    writePinnedMap(map);
  }
}

export function unpinRow(clientId: string, rowKey: string) {
  const map = readPinnedMap();
  if (map[clientId][rowKey]) {
    delete map[clientId][rowKey];
    writePinnedMap(map);
  }
}

function _doClientExist(map: PinnedMap, clientId: string) {
  return map[clientId] !== undefined;
}

export function togglePinRow(clientId: string, rowKey: string) {
  const map = readPinnedMap();
  if (!_doClientExist(map, clientId)) map[clientId] = {};
  if (map[clientId][rowKey]) {
    delete map[clientId][rowKey];
  } else {
    map[clientId][rowKey] = true;
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
