import {
  useCallback,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import { messagesReducer, initialState, type Action } from "./messagesReducer";
import { MessagesContext } from "./useMessages";
import type { MessagesContextValue, Message } from "@/types";
import { useHeaderUI } from "../headerUI";

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(messagesReducer, initialState);
  const controllersRef = useRef<Record<string, AbortController | undefined>>(
    {}
  );
  const { rawPath } = useHeaderUI();

  const fetchMessages = useCallback(
    async (path: string, externalSignal?: AbortSignal) => {
      controllersRef.current[path]?.abort();
      const controller = new AbortController();
      controllersRef.current[path] = controller;

      const signal = externalSignal ?? controller.signal;

      console.info("Debug para signal", signal);
      try {
        // const res = await fetch(`/api/messages/${path}`, { signal });
        // const data: Message[] = await res.json();
        await new Promise((r) => setTimeout(r, 120)); // simula latencia
        const data: Message[] = [];
        if (controller.signal.aborted) return;
        dispatch({ type: "SET", path, messages: data } as Action);
      } catch (err) {
        if ((err as DOMException)?.name === "AbortError") return;
        console.error("fetchMessages error", err);
      } finally {
        if (controllersRef.current[path] === controller) {
          delete controllersRef.current[path];
        }
      }
    },
    []
  );

  const addMessage = useCallback((path: string, msg: Message) => {
    dispatch({ type: "ADD", path, msg } as Action);
  }, []);

  const removeMessage = useCallback((path: string, id: string) => {
    dispatch({ type: "REMOVE", path, id } as Action);
  }, []);

  const getMessage = useCallback(
    (id: string) => state.normalized.byId[id],
    [state.normalized.byId]
  );

  const getMessagesByDomain = useCallback(
    (path: string) => {
      const ids = state.normalized.idsByPath[path] ?? [];
      return ids.map((id) => state.normalized.byId[id]).filter(Boolean);
    },
    [state.normalized.byId, state.normalized.idsByPath]
  );

  const getMessages = useCallback(() => {
    if (!rawPath) return [];
    return getMessagesByDomain(rawPath);
  }, [rawPath, getMessagesByDomain]);

  const saveMessages = useCallback(
    async (path: string) => {
      const messages = getMessagesByDomain(path);
      console.info("Guardando mensajes de", path, messages);
      try {
        // await fetch(`/api/messages/${path}`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(messages),
        // });
        await new Promise((r) => setTimeout(r, 120)); // simula latencia
      } catch (err) {
        console.error("saveMessages error", err);
      }
    },
    [getMessagesByDomain]
  );

  const saveAllMessages = useCallback(async () => {
    const paths = Object.keys(state.normalized.idsByPath);
    await Promise.all(paths.map((p) => saveMessages(p)));
  }, [saveMessages, state.normalized.idsByPath]);

  const value: MessagesContextValue = useMemo(
    () => ({
      fetchMessages,
      addMessage,
      removeMessage,
      getMessages,
      getMessagesByDomain,
      getMessage,
      saveMessages,
      saveAllMessages,
    }),
    [
      fetchMessages,
      addMessage,
      removeMessage,
      getMessages,
      getMessagesByDomain,
      getMessage,
      saveMessages,
      saveAllMessages,
    ]
  );

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
}
