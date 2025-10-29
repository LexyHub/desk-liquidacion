import { notificationBus } from "@features/notificaciones/lib/notificationBus";

export async function sendPut(
  url: string,
  body: unknown,
  signal?: AbortSignal,
  opts?: { successMessage?: string; errorMessage?: string }
) {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
      body: JSON.stringify(body),
      signal,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => null);
      const errorMsg = `Error en petición PUT. ${response.status} ${response.statusText}${text ? `: ${text}` : ""}`;
      throw new Error(errorMsg);
    }

    if (opts?.successMessage) {
      notificationBus.emit("notify", {
        id: crypto.randomUUID(),
        type: "success",
        message: opts.successMessage,
        closeable: true,
      });
    }
    return true;
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError") {
      console.error("Fetch error (PUT):", error);
    }
    if (opts?.errorMessage) {
      notificationBus.emit("notify", {
        id: crypto.randomUUID(),
        type: "error",
        message: opts.errorMessage,
        closeable: true,
      });
    }
    throw error;
  }
}

export async function sendPost(
  url: string,
  body: unknown,
  signal?: AbortSignal,
  opts?: { successMessage?: string; errorMessage?: string }
) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
      body: JSON.stringify(body),
      signal,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => null);
      const errorMsg = `Error en petición POST. ${response.status} ${response.statusText}${text ? `: ${text}` : ""}`;
      throw new Error(errorMsg);
    }

    if (opts?.successMessage) {
      notificationBus.emit("notify", {
        id: crypto.randomUUID(),
        type: "success",
        message: opts.successMessage,
        closeable: true,
      });
    }
    return true;
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError") {
      console.error("Fetch error (POST):", error);
    }
    if (opts?.errorMessage) {
      notificationBus.emit("notify", {
        id: crypto.randomUUID(),
        type: "error",
        message: opts.errorMessage,
        closeable: true,
      });
    }
    throw error;
  }
}

export async function sendGet<T = unknown>(
  url: string,
  signal?: AbortSignal,
  raw_headers?: Record<string, string>
): Promise<T> {
  const headers = raw_headers ?? {
    "Content-Type": "application/json",
    Authorization: sessionStorage.getItem("token") || "",
  };
  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
      signal,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => null);
      const errorMsg = `Error en petición GET. ${response.status} ${response.statusText}${text ? `: ${text}` : ""}`;
      throw new Error(errorMsg);
    }

    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError") {
      console.error("Fetch error (GET):", error);
    }
    throw error;
  }
}

export async function sendDelete(
  url: string,
  signal?: AbortSignal,
  opts?: { successMessage?: string; errorMessage?: string }
) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
      signal,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => null);
      const errorMsg = `Error en petición DELETE. ${response.status} ${response.statusText}${text ? `: ${text}` : ""}`;
      throw new Error(errorMsg);
    }

    if (opts?.successMessage) {
      notificationBus.emit("notify", {
        id: crypto.randomUUID(),
        type: "success",
        message: opts.successMessage,
        closeable: true,
      });
    }
    return true;
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError") {
      console.error("Fetch error (DELETE):", error);
    }
    if (opts?.errorMessage) {
      notificationBus.emit("notify", {
        id: crypto.randomUUID(),
        type: "error",
        message: opts.errorMessage,
        closeable: true,
      });
    }
    throw error;
  }
}
