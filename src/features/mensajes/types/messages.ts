export type Message = {
  id?: number | null;
  id_cliente: string;
  entidad: string; // p.ej. "desk-liquidacion"
  modulo: string; // p.ej. rawPath de la vista
  campo?: string | null;
  comentario: string;
  creado_por: string;
  creado_en?: string | null; // ISO desde backend
};

export type MessageInput = Omit<
  Message,
  "id" | "id_cliente" | "creado_en" | "creado_por"
>;

// export type NewMessageInput = Omit<Message, "id" | "creado_en">;
export type UpdateMessageInput = Partial<
  Omit<Message, "id" | "entidad" | "modulo" | "creado_en">
>;

export interface MessagesContextValue {
  messages: Message[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  create: (input: MessageInput) => Promise<void>;
  remove: (id: number) => Promise<void>;
  modify: (id: number, patch: UpdateMessageInput) => Promise<void>;
}
