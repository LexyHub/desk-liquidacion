import { useState, type ReactNode } from "react";
import {
  DocumentViewerContext,
  type DocumentViewerContextValue,
} from "@features/documentos";

interface DocumentViewerProviderProps {
  children: ReactNode;
}

export function DocumentViewerProvider({
  children,
}: DocumentViewerProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [document, setDocument] = useState("");
  const [title, setTitle] = useState("");

  const openDocument = (document: string, title: string) => {
    setDocument(document);
    setTitle(title);
    setIsOpen(true);
  };

  const closeDocument = () => {
    setIsOpen(false);
    setDocument("");
    setTitle("");
  };

  const value: DocumentViewerContextValue = {
    isOpen,
    document,
    title,
    openDocument,
    closeDocument,
  };

  return (
    <DocumentViewerContext.Provider value={value}>
      {children}
    </DocumentViewerContext.Provider>
  );
}
