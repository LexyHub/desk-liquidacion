import { type ReactNode } from "react";
import { HeaderUIProvider } from "@context/headerUI";
import { MessagesProvider } from "@context/messages/MessagesContext";

export function HeaderProvider({ children }: { children: ReactNode }) {
  return (
    <HeaderUIProvider>
      <MessagesProvider>{children}</MessagesProvider>
    </HeaderUIProvider>
  );
}
