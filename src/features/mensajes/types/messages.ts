// Mensaje según API actual (desk_entrevista/comments)
export type Message = {
  id?: number | null;
  entidad: string; // p.ej. "desk-liquidacion"
  modulo: string; // p.ej. rawPath de la vista
  campo?: string | null;
  comentario: string;
  creado_por: string;
  creado_en?: string | null; // ISO desde backend
};

export type NewMessageInput = Omit<Message, "id" | "creado_en">;
export type UpdateMessageInput = Partial<
  Omit<Message, "id" | "entidad" | "modulo" | "creado_en">
>;

// Contrato público del dominio de mensajes (hook + store)
export interface MessagesContextValue {
  messages: Message[]; // ya filtrados por modulo (rawPath)
  loading: boolean;
  error: string | null;
  refetch: () => void;
  create: (input: NewMessageInput) => Promise<void>;
  remove: (id: number) => Promise<void>;
  modify: (id: number, patch: UpdateMessageInput) => Promise<void>;
}
