import { type ReactNode } from "react";
import { HeaderUIProvider } from "@/context/HeaderUIContext";
import { MessagesProvider } from "@/context/messages/MessagesContext";

export function HeaderProvider({ children }: { children: ReactNode }) {
  return (
    <HeaderUIProvider>
      <MessagesProvider>{children}</MessagesProvider>
    </HeaderUIProvider>
  );
}
