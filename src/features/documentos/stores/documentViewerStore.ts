import { useState, useCallback } from "react";

interface DocumentViewerState {
  isOpen: boolean;
  document: string;
  title: string;
}

let globalState: DocumentViewerState = {
  isOpen: false,
  document: "",
  title: "",
};

const listeners = new Set<(state: DocumentViewerState) => void>();

const setState = (newState: Partial<DocumentViewerState>) => {
  globalState = { ...globalState, ...newState };
  listeners.forEach((listener) => listener(globalState));
};

export const useDocumentViewerStore = () => {
  const [state, setLocalState] = useState(globalState);

  useState(() => {
    listeners.add(setLocalState);
    return () => {
      listeners.delete(setLocalState);
    };
  });

  const openDocument = useCallback((document: string, title: string) => {
    setState({ isOpen: true, document, title });
  }, []);

  const closeDocument = useCallback(() => {
    setState({ isOpen: false, document: "", title: "" });
  }, []);

  return {
    ...state,
    openDocument,
    closeDocument,
  };
};
