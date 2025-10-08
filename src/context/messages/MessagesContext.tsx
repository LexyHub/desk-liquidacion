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

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(messagesReducer, initialState);
  const controllersRef = useRef<Record<string, AbortController | undefined>>(
    {}
  );

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

  const getMessages = useCallback(
    (path: string) => {
      const ids = state.normalized.idsByPath[path] ?? [];
      return ids.map((id) => state.normalized.byId[id]).filter(Boolean);
    },
    [state.normalized.byId, state.normalized.idsByPath]
  );

  const value: MessagesContextValue = useMemo(
    () => ({
      fetchMessages,
      addMessage,
      removeMessage,
      getMessages,
      getMessage,
    }),
    [fetchMessages, addMessage, removeMessage, getMessages, getMessage]
  );

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
}
