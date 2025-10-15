import { createContext, useContext } from "react";
import type { MessagesContextValue } from "@/types";

export const MessagesContext = createContext<MessagesContextValue | undefined>(
  undefined
);

export function useMessages(): MessagesContextValue {
  const ctx = useContext(MessagesContext);
  if (!ctx)
    throw new Error("useMessagesContext must be used inside MessagesProvider");
  return ctx;
}
