import { useAuth } from "@/context/auth";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  redirect?: string;
  children: ReactNode;
}

export function PrivateRoute({ redirect, children }: Props) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const idDefensoria = pathSegments[pathSegments.length - 1];
    const to =
      redirect ?? `/login?redirect=${idDefensoria}&unauthenticated=true`;
    return <Navigate to={to} replace />;
  }

  return children;
}
