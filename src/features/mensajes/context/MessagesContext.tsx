import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import { MessagesContext } from "./useMessages";
import { useHeaderUI } from "../headerUI";
import { getMessagesByDomain } from "@/services/messages.service";
import type { Message, MessagesContextValue } from "@/types";

export function MessagesProvider({ children }: { children: ReactNode }) {
  const { rawPath } = useHeaderUI();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cacheRef = useRef<Record<string, Message[]>>({});
  const abortRef = useRef<AbortController | null>(null);

  const loadPath = useCallback(async (path: string) => {
    if (!path) return;
    // Cache hit
    if (cacheRef.current[path]) {
      setMessages(cacheRef.current[path]);
      return;
    }
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setError(null);
    try {
      const data = await getMessagesByDomain(path, controller.signal);
      if (controller.signal.aborted) return;
      cacheRef.current[path] = data;
      setMessages(data);
    } catch (e) {
      if ((e as DOMException)?.name === "AbortError") return;
      console.error("Error obteniendo mensajes", e);
      setError("No se pudieron cargar los mensajes.");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // para cuando cambiemos de path
  useEffect(() => {
    if (rawPath) loadPath(rawPath);
    return () => abortRef.current?.abort();
  }, [rawPath, loadPath]);

  const refetch = useCallback(() => {
    if (!rawPath) return;
    delete cacheRef.current[rawPath];
    loadPath(rawPath);
  }, [rawPath, loadPath]);

  const addMessage = useCallback(
    (path: string, msg: Message) => {
      cacheRef.current[path] = [...(cacheRef.current[path] ?? []), msg];
      if (path === rawPath) setMessages((prev) => [...prev, msg]);
    },
    [rawPath]
  );

  const removeMessage = useCallback(
    (path: string, id: string) => {
      cacheRef.current[path] = (cacheRef.current[path] ?? []).filter(
        (m) => m.id !== id
      );
      if (path === rawPath)
        setMessages((prev) => prev.filter((m) => m.id !== id));
    },
    [rawPath]
  );

  const saveMessages = useCallback(
    async (path?: string) => {
      const target = path || rawPath;
      if (!target) return;
      const msgs = cacheRef.current[target] ?? [];
      console.info("Guardando mensajes de", target, msgs);
      await new Promise((r) => setTimeout(r, 120));
    },
    [rawPath]
  );

  const value: MessagesContextValue = useMemo(
    () => ({
      messages,
      loading,
      error,
      refetch,
      addMessage,
      removeMessage,
      saveMessages,
    }),
    [messages, loading, error, refetch, addMessage, removeMessage, saveMessages]
  );

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
}
