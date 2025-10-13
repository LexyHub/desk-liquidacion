import type { ReactNode } from "react";
import { SidebarProvider } from "./sidebar";
import { HeaderUIProvider } from "./headerUI";
import { MessagesProvider } from "./messages";
import { ClientDataProvider } from "./clientData";
import { PrivateRoute } from "@/routes";

interface Props {
  isPrivate?: boolean;
  redirect?: string;
  children: ReactNode;
}

export function ContextWrapper({ isPrivate, redirect, children }: Props) {
  if (isPrivate) {
    return (
      <PrivateRoute redirect={redirect}>
        <SidebarProvider>
          <HeaderUIProvider>
            <MessagesProvider>
              <ClientDataProvider>{children}</ClientDataProvider>
            </MessagesProvider>
          </HeaderUIProvider>
        </SidebarProvider>
      </PrivateRoute>
    );
  }
  return (
    <SidebarProvider>
      <HeaderUIProvider>
        <MessagesProvider>
          <ClientDataProvider>{children}</ClientDataProvider>
        </MessagesProvider>
      </HeaderUIProvider>
    </SidebarProvider>
  );
}
