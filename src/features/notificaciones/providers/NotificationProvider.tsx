import { type ReactNode, useCallback, useEffect, useState } from "react";
import type { Notification, NotificationPayload } from "../types/notificacion";
import { Notificacion } from "../components/Notificacion";
import { notificationBus } from "../lib/notificationBus";

export function NotificationProvider({ children }: { children?: ReactNode }) {
  const [notificaciones, setNotificaciones] = useState<Notification[]>([]);

  const hideNotification = useCallback((id: string) => {
    setNotificaciones((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isVisible: false } : n))
    );

    const REMOVE_DELAY = 500;
    window.setTimeout(() => {
      setNotificaciones((prev) => prev.filter((n) => n.id !== id));
    }, REMOVE_DELAY);
  }, []);

  const emitNotification = useCallback(
    (payload: Notification) => {
      setNotificaciones((prev) => {
        const next = [...prev, payload];
        return next.length > 5 ? next.slice(-5) : next;
      });

      const duration = payload.duration ?? 3000;

      window.setTimeout(() => {
        hideNotification(payload.id);
      }, duration);
    },
    [hideNotification]
  );

  useEffect(() => {
    const notifyHandler = (payload: NotificationPayload & { id: string }) => {
      const nuevaNotificacion: Notification = {
        ...payload,
        isVisible: true,
      };
      emitNotification(nuevaNotificacion);
    };

    const dismissHandler = (id: string) => {
      hideNotification(id);
    };

    notificationBus.on("notify", notifyHandler);
    notificationBus.on("dismiss", dismissHandler);
    return () => {
      notificationBus.off("notify", notifyHandler);
      notificationBus.off("dismiss", dismissHandler);
    };
  }, [emitNotification, hideNotification]);

  return (
    <>
      {children}
      <section className='fixed bottom-4 right-4 flex flex-col gap-2 z-[9999] h-fit transition-all'>
        {notificaciones.map((notificacion) => (
          <Notificacion
            key={notificacion.id}
            {...notificacion}
            onClose={() => hideNotification(notificacion.id)}
          />
        ))}
      </section>
    </>
  );
}
