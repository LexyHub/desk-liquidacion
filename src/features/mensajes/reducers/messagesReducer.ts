import type { Message } from "../types/messages";

export type Normalized = {
  byId: Record<string, Message>;
  idsByPath: Record<string, string[]>;
};

export type State = {
  normalized: Normalized;
};

export type Action =
  | { type: "SET"; path: string; messages: Message[] }
  | { type: "ADD"; path: string; msg: Message }
  | { type: "REMOVE"; path: string; id: string }
  | { type: "RESET" };

export const initialState: State = {
  normalized: { byId: {}, idsByPath: {} },
};

export function messagesReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET": {
      const byId: Record<string, Message> = { ...state.normalized.byId };
      const ids = action.messages.map((m) => {
        byId[m.id] = m;
        return m.id;
      });
      return {
        normalized: {
          byId,
          idsByPath: { ...state.normalized.idsByPath, [action.path]: ids },
        },
      };
    }

    case "ADD": {
      const { path, msg } = action;
      const byId = { ...state.normalized.byId, [msg.id]: msg };
      const prev = state.normalized.idsByPath[path] ?? [];
      return {
        normalized: {
          byId,
          idsByPath: {
            ...state.normalized.idsByPath,
            [path]: [...prev, msg.id],
          },
        },
      };
    }

    case "REMOVE": {
      const { path, id } = action;
      const byId = { ...state.normalized.byId };
      delete byId[id];
      const prev = state.normalized.idsByPath[path] ?? [];
      const ids = prev.filter((x) => x !== id);
      return {
        normalized: {
          byId,
          idsByPath: { ...state.normalized.idsByPath, [path]: ids },
        },
      };
    }

    case "RESET":
      return initialState;

    default:
      return state;
  }
}
