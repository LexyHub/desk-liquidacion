import { logIn as AuthLogIn, logOut as AuthLogOut } from "@services/auth";
import type { Credentials } from "@types";
import { useState, type ReactNode } from "react";
import { AuthContext } from "./useAuth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string>(
    sessionStorage.getItem("token") ?? ""
  );
  const [userId, setUserId] = useState<string>(
    sessionStorage.getItem("id_cliente") ?? ""
  );

  const logIn = async (cred: Credentials) => {
    const res = await AuthLogIn(cred);
    if (!res.success || !res.data) return false;

    const { id_cliente, token } = res.data;
    setToken(token);
    setUserId(id_cliente);

    return true;
  };

  const logOut = () => AuthLogOut();

  const isAuthenticated = !!sessionStorage.getItem("token");

  return (
    <AuthContext.Provider
      value={{ token, userId, logIn, logOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
