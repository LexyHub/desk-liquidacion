import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import type { Message } from "@/types";
import {
  messagesReducer,
  initialState,
  type State,
  type Action,
} from "./messagesReducer";

interface MessagesContextValue {
  fetchMessages: (path: string, signal?: AbortSignal) => Promise<void>;
  addMessage: (path: string, msg: Message) => void;
  removeMessage: (path: string, id: string) => void;
  getMessages: (path: string) => Message[];
  getMessage: (id: string) => Message | undefined;
}

const MessagesContext = createContext<MessagesContextValue | undefined>(
  undefined
);

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(messagesReducer, initialState as State);
  const lastRequestByPath = useRef<Record<string, number>>({});

  const fetchMessages = useCallback(
    async (path: string, signal?: AbortSignal) => {
      console.info("Debug para signal", signal)
      const reqId = (lastRequestByPath.current[path] ?? 0) + 1;
      lastRequestByPath.current[path] = reqId;
      try {
        // const res = await fetch(`/api/messages/${path}`, { signal });
        // const data: Message[] = await res.json();
        await new Promise((r) => setTimeout(r, 120)); // simuelo latencia
        const data: Message[] = [];

        if (lastRequestByPath.current[path] !== reqId) return;
        dispatch({ type: "SET", path, messages: data } as Action);
      } catch (err) {
        if ((err as DOMException)?.name === "AbortError") return;
        console.error("fetchMessages error", err);
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

  const value = useMemo(
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

export function useMessagesContext(): MessagesContextValue {
  const ctx = useContext(MessagesContext);
  if (!ctx)
    throw new Error("useMessagesContext must be used inside MessagesProvider");
  return ctx;
}
