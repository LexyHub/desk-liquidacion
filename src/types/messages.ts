export type Message = {
  path: string;
  id: string;
  message: string;
  date: string; // iso
};

// Context
export interface MessagesContextValue {
  messages: Message[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  addMessage: (path: string, msg: Message) => void;
  removeMessage: (path: string, id: string) => void;
  saveMessages: (path?: string) => Promise<void>;
}
