import { useContext } from "react";
import { createContext } from "react";

export interface DocumentViewerContextValue {
  isOpen: boolean;
  document: string;
  title: string;
  openDocument: (document: string, title: string) => void;
  closeDocument: () => void;
}

export const DocumentViewerContext = createContext<
  DocumentViewerContextValue | undefined
>(undefined);

export function useDocumentViewer(): DocumentViewerContextValue {
  const context = useContext(DocumentViewerContext);
  if (!context) {
    throw new Error(
      "useDocumentViewer must be used within a DocumentViewerProvider"
    );
  }
  return context;
}
