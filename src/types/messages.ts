export type Message = {
  path: string;
  id: string;
  message: string;
  date: string; // iso
};

// Context
export interface MessagesContextValue {
  fetchMessages: (path: string, signal?: AbortSignal) => Promise<void>;
  addMessage: (path: string, msg: Message) => void;
  removeMessage: (path: string, id: string) => void;
  getMessages: (path: string) => Message[];
  getMessage: (id: string) => Message | undefined;
}
