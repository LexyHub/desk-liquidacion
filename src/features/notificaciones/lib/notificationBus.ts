import mitt from "mitt";
import type { NotificationPayload } from "../types/notificacion";

type Events = {
  notify: NotificationPayload & { id: string };
  dismiss: string; // para poder hacer dismiss a voluntad por id
};

export const notificationBus = mitt<Events>();
