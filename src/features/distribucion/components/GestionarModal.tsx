import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shared/components/base/dialog";
import { cn } from "@shared/lib/utils";
import { X, Files, Plus, Mail, Send } from "@shared/lib/icons";
import { useState } from "react";
import type { Documento } from "../types/documento";
import { ACTUAL_DOCUMENTS } from "../constants";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (documentos: Documento[]) => void;
}

export function GestionarModal({ open, onOpenChange, onSave }: Props) {
  const [documento, setDocumento] = useState("");
  const [documentosSeleccionados, setDocumentosSeleccionados] =
    useState<Documento[]>(ACTUAL_DOCUMENTS);

  const handleDocumentoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDocumento(event.target.value);
  };

  const handleAgregarDocumento = () => {
    if (documento) {
      setDocumentosSeleccionados([
        ...documentosSeleccionados,
        { id: window.crypto.randomUUID(), nombre: documento, active: true },
      ]);
      setDocumento("");
    }
  };

  const toggleDocumento = (id: string) => {
    setDocumentosSeleccionados((prevDocs) =>
      prevDocs.map((doc) =>
        doc.id === id ? { ...doc, active: !doc.active } : doc
      )
    );
  };

  const handleSave = () => {
    onSave(documentosSeleccionados.filter((doc) => doc.active));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className='sm:max-w-2xl max-w-2xl w-full p-0 gap-y-0 space-y-0 max-h-[90vh]'>
        <DialogHeader className='p-4 border-b border-b-[#E6E6E6] flex flex-row items-center justify-between'>
          <DialogTitle className='text-lexy-brand-secondary-dark text-xl font-medium'>
            Solicitud de documentación - Gestionar
          </DialogTitle>
          <DialogDescription />
          <button
            type='button'
            title='Cerrar documento'
            aria-description='Cerrar visualización de documento'
            onClick={() => onOpenChange(false)}
            className='flex items-center justify-center size-9 bg-white border border-black/10 hover:bg-lexy-border-table shadow-lexy-button-sm transition-colors rounded-full cursor-pointer'>
            <X />
          </button>
        </DialogHeader>
        <section className='pt-4 px-4 w-full h-full'>
          <div className='flex flex-col p-4 rounded-sm border border-lexy-border-table bg-white mb-4'>
            <div className='flex items-center gap-x-2 text-lexy-text-primary mb-4'>
              <Files className='size-6' />
              <h4 className='text-lg font-medium leading-6'>
                Documentos a solicitar
              </h4>
            </div>
            <p className='text-lexy-text-secondary leading-6 mb-6'>
              Haz clic en los documentos que quieras solicitar; se agregarán
              automáticamente al correo de abajo
            </p>
            <div className='flex flex-col gap-y-4'>
              <div className='grid grid-cols-[1fr_auto] items-center gap-x-2'>
                <input
                  type='text'
                  title='Nuevo documento'
                  value={documento}
                  onChange={handleDocumentoChange}
                  className='px-4 py-2 rounded-sm border border-lexy-input-border bg-white leading-6 text-lexy-text-secondary outline-none'
                />
                <button
                  type='button'
                  title='Agregar documento'
                  disabled={!documento}
                  onClick={handleAgregarDocumento}
                  className='py-2 px-6 flex items-center gap-x-2 text-lexy-brand-secondary-dark border-2 border-lexy-brand-secondary-dark rounded-sm shadow-lexy-button bg-white not-disabled:hover:bg-lexy-btn-secondary-hover cursor-pointer disabled:cursor-not-allowed'>
                  <Plus />
                  <span>Agregar</span>
                </button>
              </div>
              <div className='flex items-center flex-wrap gap-2 max-h-28 overflow-y-auto'>
                {documentosSeleccionados.length > 0 &&
                  documentosSeleccionados.map((doc) => (
                    <button
                      type='button'
                      key={doc.id}
                      className={cn(
                        "px-4 py-1 rounded-full text-[#666] text-sm font-medium leading-5 border-2 border-lexy-input-border bg-lexy-bg-platform transition-all w-fit animate-fade-in animate-duration-100 cursor-pointer",
                        {
                          "bg-[#DCD6FF] border-lexy-brand-secondary-dark text-lexy-brand-secondary-dark":
                            doc.active,
                        }
                      )}
                      onClick={() => toggleDocumento(doc.id)}>
                      {doc.nombre}
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <div className='flex flex-col p-4 rounded-sm border border-lexy-border-table bg-white'>
            <div className='flex items-center gap-x-2 text-lexy-text-primary mb-4'>
              <Mail className='size-6' />
              <h4 className='text-lg font-medium leading-6'>
                Vista previa de correo
              </h4>
            </div>
            <div className='flex flex-col p-4 text-lexy-text-secondary font-medium leading-6 bg-lexy-bg-platform rounded-sm max-h-60 overflow-y-auto hide-scrollbar'>
              <span>Para: cliente@email.com</span>
              <span className='mb-4'>
                Asunto: Solicitud de documentación - Caso Legal
              </span>
              <span className='mb-4'>Estimado/a cliente,</span>
              <p>
                Para continuar con su proceso legal, necesitamos que nos
                proporcione los siguientes documentos:
              </p>
              {/* aca documentos */}
              <ul className='mb-4'>
                {documentosSeleccionados.map((doc) =>
                  doc.active ? (
                    <li
                      key={doc.id}
                      className='list-disc ml-6 animate-fade-in animate-duration-250'>
                      {doc.nombre}
                    </li>
                  ) : null
                )}
              </ul>
              {/* aca documentos */}
              <p className='mb-4'>
                Por favor, envíe estos documentos a la brevedad posible para
                continuar con su proceso.
              </p>
              <span>Atentamente,</span>
              <span className='font-medium mb-4'>Equipo Legal Lexy</span>
              <p className='mb-4'>
                Este correo es generado automáticamente por el sistema Lexy. Si
                tiene alguna consulta, no dude en contactarnos.
              </p>
              <span>Información adicional:</span>
              <ul>
                <li className='list-disc ml-6'>
                  Los documentos pueden ser enviados en formato PDF o imagen
                </li>
                <li className='list-disc ml-6'>
                  Tamaño máximo por archivo: 10MB
                </li>
                <li className='list-disc ml-6'>
                  Tiempo estimado de respuesta: 24-48 horas
                </li>
              </ul>
            </div>
          </div>
        </section>
        <DialogFooter className='px-4 pb-4 mt-4'>
          <button
            type='button'
            onClick={handleSave}
            className='w-full flex items-center justify-center gap-x-2 px-6 py-2.5 bg-lexy-brand-secondary-dark hover:bg-[#0B013C] text-lexy-bg-card rounded-sm shadow-lexy-button cursor-pointer transition-all'>
            <Send />
            Guardar y enviar correo
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
