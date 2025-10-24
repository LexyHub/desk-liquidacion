import type { AuthAPIData, Credentials } from "@features/auth";

const AUTH_API = import.meta.env.VITE_LEXY_API + "auth/token";
const API_KEY = import.meta.env.VITE_LEXY_KEY;

export async function logIn(cred: Credentials) {
  try {
    const res = await fetch(AUTH_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "lexy-key": API_KEY,
        rol: "interno",
      },
      body: new URLSearchParams({
        grant_type: "password",
        username: cred.username,
        password: cred.password,
      }),
    });
    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        throw new Error("Credenciales incorrectas");
      } else if (res.status === 422) {
        throw new Error("Datos inválidos o formato incorrecto");
      } else {
        throw new Error("Error desconocido");
      }
    }
    const data = (await res.json()) as AuthAPIData;
    sessionStorage.setItem("token", `Bearer ${data.access_token}`);
    sessionStorage.setItem("id_cliente", data.id_cliente);
    sessionStorage.setItem("id_defensoria", data.id_defensoria);
    sessionStorage.setItem("nombre", data.primer_nombre ?? "No identificado");
    sessionStorage.setItem("email", cred.username);

    return { success: true, data };
  } catch (err: unknown) {
    let msg = "¡Ha ocurrido un error desconocido!";
    if (err instanceof Error) msg = err.message;
    return { success: false, error: msg };
  }
}

export function logOut() {
  sessionStorage.clear();
}
