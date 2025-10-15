import { lazy, Suspense } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/base/dialog";
import { X } from "@/lib/icons";
import { useDocumentViewer } from "@/context/documentViewer/useDocumentViewer";
import { Spinner } from "@/components/ui/loading/Spinner";

// Lazy loading solo del contenido del iframe, no del Dialog completo
const DocumentIframe = lazy(() =>
  Promise.resolve({
    default: ({ document, title }: { document: string; title?: string }) => (
      <iframe
        title={title || "Visualizando documento"}
        src={document}
        className='w-full h-full rounded-b-lg'
        width='560'
        height='315'
        loading='lazy'
        allowFullScreen
      />
    ),
  })
);

export function GlobalDocumentViewer() {
  const { isOpen, document, title, closeDocument } = useDocumentViewer();

  // Solo renderiza cuando el modal debe estar abierto
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
          {document ? (
            <Suspense
              fallback={
                <div className='flex items-center justify-center h-full'>
                  <Spinner />
                  <span className='ml-2 text-gray-500'>
                    Cargando documento...
                  </span>
                </div>
              }>
              <DocumentIframe document={document} title={title} />
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
