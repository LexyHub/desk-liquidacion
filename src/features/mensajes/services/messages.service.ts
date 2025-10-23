import type { Message } from "../types/messages";

const API_URL = import.meta.env.VITE_LEXY_API + "liquidacion/desk_entrevista/";

export async function getMessages(cliente: string, signal?: AbortSignal) {
  const final_url = `${API_URL}comments/${cliente}?entidad=desk-liquidacion`;
  try {
    const response = await fetch(final_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
      signal,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => null);
      const errorMsg = `Error al traer comentarios para el cliente. ${response.status} ${response.statusText}${text ? `: ${text}` : ""}`;
      throw new Error(errorMsg);
    }

    const data = (await response.json()) as Message[];
    return data;
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError") {
      console.error("Fetch error en datos del cliente:", error);
    }
    throw error;
  }
}

export async function createMessage(
  cliente: string,
  message: Omit<Message, "id">,
  signal?: AbortSignal
): Promise<boolean | Error> {
  const final_url = `${API_URL}add-comment/${cliente}`;
  try {
    const response = await fetch(final_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
      body: JSON.stringify(message),
      signal,
    });
    if (!response.ok) {
      const text = await response.text().catch(() => null);
      const errorMsg = `Error al crear comentario para el cliente. ${response.status} ${response.statusText}${text ? `: ${text}` : ""}`;
      throw new Error(errorMsg);
    }
    return true;
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError") {
      console.error("Fetch error al crear comentario:", error);
    }
    throw error;
  }
}

export async function deleteMessage(
  cliente: string,
  id: number,
  signal?: AbortSignal
): Promise<boolean | Error> {
  const final_url = `${API_URL}${cliente}/${id}`;
  try {
    const response = await fetch(final_url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
      signal,
    });
    if (!response.ok) {
      const text = await response.text().catch(() => null);
      const errorMsg = `Error al eliminar comentario para el cliente. ${response.status} ${response.statusText}${text ? `: ${text}` : ""}`;
      throw new Error(errorMsg);
    }
    return true;
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError") {
      console.error("Fetch error al eliminar comentario:", error);
    }
    throw error;
  }
}

export async function modifyMessage(
  cliente: string,
  id: number,
  message: Partial<Message>,
  signal?: AbortSignal
): Promise<boolean | Error> {
  const final_url = `${API_URL}${cliente}/${id}`;
  try {
    const response = await fetch(final_url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
      body: JSON.stringify(message),
      signal,
    });
    if (!response.ok) {
      const text = await response.text().catch(() => null);
      const errorMsg = `Error al modificar comentario para el cliente. ${response.status} ${response.statusText}${text ? `: ${text}` : ""}`;
      throw new Error(errorMsg);
    }
    return true;
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError") {
      console.error("Fetch error al modificar comentario:", error);
    }
    throw error;
  }
}
