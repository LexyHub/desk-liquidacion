import { lazy, Suspense, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@shared/components/base/dialog";
import { X } from "lucide-react";
import { Spinner } from "@shared/components/loading";

const EmbeddedVideo = lazy(() =>
  import("@shared/components/popups/EmbeddedVideo").then((module) => ({
    default: module.EmbeddedVideo,
  }))
);

interface Props {
  isOpen: boolean;
  toggleOpen: (open: boolean) => void;
}

export function VideoDialog({ isOpen, toggleOpen }: Props) {
  const handlePreload = useCallback(() => {
    import("@shared/components/popups/EmbeddedVideo");
  }, []);

  return (
    <Dialog open={isOpen}>
      <DialogContent
        onInteractOutside={() => toggleOpen(false)}
        showCloseButton={false}
        className='sm:max-w-2xl w-full border border-lexy-border-table p-0 gap-y-0'>
        <DialogHeader className='flex flex-row items-center justify-between p-4'>
          <DialogTitle className='font-normal'>
            Vídeo: <strong>Presentación Liquidación</strong>
          </DialogTitle>
          <DialogDescription></DialogDescription>
          <button
            type='button'
            title='Cerrar vídeo'
            aria-description='Cerrar vídeo de presentación de liquidación'
            onClick={() => toggleOpen(false)}
            onMouseEnter={handlePreload}
            onFocus={handlePreload}
            className='flex items-center justify-center size-9 bg-white border border-black/10 hover:bg-lexy-border-table transition-colors rounded-full cursor-pointer'>
            <X />
          </button>
        </DialogHeader>
        <div className='w-full h-96 flex items-center justify-center'>
          <Suspense fallback={<Spinner message='Cargando vídeo' />}>
            <EmbeddedVideo
              title='Presentación Liquidación'
              videoId='xlX7NwTq9Zo'
            />
          </Suspense>
        </div>
      </DialogContent>
    </Dialog>
  );
}
