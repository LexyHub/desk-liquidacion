export interface Notification {
  id: string;
  type: "success" | "error" | "info";
  duration?: number;
  message: string;
  closeable?: boolean;
  isVisible: boolean;
}

export type NotificationPayload = Omit<Notification, "id" | "isVisible">;
