import { useCallback } from "react";
import { notificationBus } from "../lib/notificationBus";
import type { NotificationPayload } from "../types/notificacion";

export const notify = (payload: NotificationPayload): string => {
  const id = crypto.randomUUID();
  notificationBus.emit("notify", { ...payload, id });
  return id;
};

export const dismiss = (id: string): void => {
  notificationBus.emit("dismiss", id);
};

export function useNotify() {
  const emit = useCallback((payload: NotificationPayload): string => {
    return notify(payload);
  }, []);

  const dismissNotification = useCallback((id: string): void => {
    dismiss(id);
  }, []);

  const success = useCallback(
    (
      message: string,
      options?: Omit<NotificationPayload, "message" | "type">
    ): string => emit({ type: "success", message, ...options }),
    [emit]
  );

  const error = useCallback(
    (
      message: string,
      options?: Omit<NotificationPayload, "message" | "type">
    ): string => emit({ type: "error", message, ...options }),
    [emit]
  );

  const info = useCallback(
    (
      message: string,
      options?: Omit<NotificationPayload, "message" | "type">
    ): string => emit({ type: "info", message, ...options }),
    [emit]
  );

  return { notify: emit, success, error, info, dismiss: dismissNotification };
}
