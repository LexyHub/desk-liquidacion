import { lazy, Suspense, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@shared/components/base/dialog";
import { X } from "@shared/lib/icons";
import { Spinner } from "@shared/components/loading/Spinner";
import { fetchFile } from "@shared/lib/utils";
import { useDocumentViewerStore } from "@/features/documentos/stores/documentViewerStore";

const DocumentIframe = lazy(() =>
  Promise.resolve({
    default: ({ document, title }: { document: string; title?: string }) => (
      <embed
        title={title || "Visualizando documento"}
        src={document}
        className='w-full h-full rounded-b-lg'
        width='560'
        height='315'
      />
    ),
  })
);

export function GlobalDocumentViewer() {
  const { isOpen, document, title, closeDocument } = useDocumentViewerStore();
  const [file, setFile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (document && isOpen) {
      setFile(null);
      setError(null);
      setIsLoading(true);

      fetchFile(document)
        .then((fileData) => setFile(fileData))
        .catch((err) => {
          console.error("Error al cargar el documento:", err);
          setError("Error al cargar el documento");
        })
        .finally(() => setIsLoading(false));
    } else {
      setFile(null);
      setError(null);
      setIsLoading(false);
    }
  }, [document, isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeDocument}>
      <DialogContent
        onInteractOutside={() => closeDocument()}
        showCloseButton={false}
        className='sm:max-w-5xl w-full h-fit border border-lexy-border-table p-0 gap-y-0'>
        <DialogHeader className='flex flex-row h-fit items-center justify-between p-4'>
          <DialogTitle className='font-normal'>
            Documento: <strong>{title || "Sin título"}</strong>
          </DialogTitle>
          <DialogDescription />
          <button
            type='button'
            title='Cerrar documento'
            aria-description='Cerrar visualización de documento'
            onClick={() => closeDocument()}
            className='flex items-center justify-center size-9 bg-white border border-black/10 hover:bg-lexy-border-table transition-colors rounded-full cursor-pointer'>
            <X />
          </button>
        </DialogHeader>
        <div className='w-full h-[42rem] flex items-center justify-center'>
          {isLoading ? (
            <div className='flex items-center justify-center h-full'>
              <Spinner />
              <span className='ml-2 text-gray-500'>Cargando documento...</span>
            </div>
          ) : error ? (
            <div className='flex items-center justify-center h-full text-red-500'>
              {error}
            </div>
          ) : file ? (
            <Suspense
              fallback={
                <div className='flex items-center justify-center h-full'>
                  <Spinner />
                  <span className='ml-2 text-gray-500'>
                    Cargando documento...
                  </span>
                </div>
              }>
              <DocumentIframe document={file} title={title} />
            </Suspense>
          ) : (
            <div className='flex items-center justify-center h-full text-gray-500'>
              No hay documento para mostrar
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
