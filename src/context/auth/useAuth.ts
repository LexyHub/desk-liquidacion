import type { Credentials } from "@/types";
import { createContext, useContext } from "react";

interface AuthContextValue {
  isAuthenticated: boolean;
  token: string;
  userId: string;
  logIn: (cred: Credentials) => Promise<boolean>;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
