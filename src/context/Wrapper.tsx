import type { ReactNode, ComponentType } from "react";
import { SidebarProvider } from "./sidebar";
import { HeaderUIProvider } from "./headerUI";
import { MessagesProvider } from "./messages";
import { ClientDataProvider } from "./clientData";
import { DocumentViewerProvider } from "./documentViewer";
import { GlobalDocumentViewer } from "@/components/ui/popups/GlobalDocumentViewer";
import { useProviderComposition } from "@/hooks";
import { PrivateRoute } from "@/routes";

interface Props {
  isPrivate?: boolean;
  redirect?: string;
  children: ReactNode;
}

// Configuración de providers ordenados de exterior a interior
const APP_PROVIDERS: ComponentType<{ children: ReactNode }>[] = [
  DocumentViewerProvider,
  SidebarProvider,
  HeaderUIProvider,
  MessagesProvider,
  ClientDataProvider,
];

function AllProvidersWrapper({ children }: { children: ReactNode }) {
  return useProviderComposition(
    APP_PROVIDERS,
    <>
      {children}
      <GlobalDocumentViewer />
    </>
  );
}

export function ContextWrapper({ isPrivate, redirect, children }: Props) {
  if (isPrivate) {
    return (
      <PrivateRoute redirect={redirect}>
        <AllProvidersWrapper>{children}</AllProvidersWrapper>
      </PrivateRoute>
    );
  }

  return <AllProvidersWrapper>{children}</AllProvidersWrapper>;
}
