import type { ReactNode, ComponentType } from "react";
import { SidebarProvider } from "@features/sidebar";
import { HeaderUIProvider } from "@features/header";
import { MessagesProvider } from "@features/mensajes";
import { ClientDataProvider } from "@shared/context";
import { GlobalDocumentViewer } from "@shared/components/popups/GlobalDocumentViewer";
import { useProviderComposition } from "@shared/hooks";
import { PrivateRoute } from "@app/PrivateRoute";

interface Props {
  isPrivate?: boolean;
  redirect?: string;
  children: ReactNode;
}

// Configuración de providers ordenados de exterior a interior
const APP_PROVIDERS: ComponentType<{ children: ReactNode }>[] = [
  SidebarProvider,
  HeaderUIProvider,
  MessagesProvider,
  ClientDataProvider,
];

function AllProvidersWrapper({ children }: { children: ReactNode }) {
  const composed = useProviderComposition(
    APP_PROVIDERS,
    <>
      {children}
      <GlobalDocumentViewer />
    </>
  );

  return composed;
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
