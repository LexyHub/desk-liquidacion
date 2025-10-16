import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shared/components/base/dialog";
import { cn } from "@shared/lib/utils";
import { CirclePause, X, Mail, Send } from "@shared/lib/icons";
import type { Motivo } from "../types/documento";
import {
  MOTIVOS_COMPLEJOS,
  MOTIVOS_INMEDIATA,
  MOTIVOS_NO_INMEDIATOS,
} from "../constants";
import { useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (
    complejos: Motivo[],
    inmediatos: Motivo[],
    noInmediatos: Motivo[]
  ) => void;
}

export function WaitingModal({ open, onOpenChange, onSave }: Props) {
  const [motivoInmediato, setMotivoInmediato] =
    useState<Motivo[]>(MOTIVOS_INMEDIATA);
  const [motivoNoInmediato, setMotivoNoInmediato] = useState<Motivo[]>(
    MOTIVOS_NO_INMEDIATOS
  );
  const [motivoComplejo, setMotivoComplejo] =
    useState<Motivo[]>(MOTIVOS_COMPLEJOS);

  const toggleActivation = (
    motivo: "complejo" | "inmediato" | "no_inmediato",
    id: string
  ) => {
    if (motivo === "complejo") {
      setMotivoComplejo((prev) =>
        prev.map((m) => (m.id === id ? { ...m, active: !m.active } : m))
      );
    } else if (motivo === "inmediato") {
      setMotivoInmediato((prev) =>
        prev.map((m) => (m.id === id ? { ...m, active: !m.active } : m))
      );
    } else if (motivo === "no_inmediato") {
      setMotivoNoInmediato((prev) =>
        prev.map((m) => (m.id === id ? { ...m, active: !m.active } : m))
      );
    }
  };

  const handleSave = () => {
    const motivosComplejosActivos = motivoComplejo.filter((m) => m.active);
    const motivosInmediatosActivos = motivoInmediato.filter((m) => m.active);
    const motivosNoInmediatosActivos = motivoNoInmediato.filter(
      (m) => m.active
    );
    onSave(
      motivosComplejosActivos,
      motivosInmediatosActivos,
      motivosNoInmediatosActivos
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className='sm:max-w-2xl max-w-2xl w-full p-0 gap-y-0 space-y-0 max-h-[96vh]'>
        <DialogHeader className='p-4 border-b border-b-[#E6E6E6] flex flex-row items-center justify-between'>
          <DialogTitle className='text-[#A66626] text-xl font-medium'>
            Segmentación - Waiting
          </DialogTitle>
          <DialogDescription />
          <button
            type='button'
            title='Cerrar documento'
            aria-description='Cerrar visualización de documento'
            onClick={() => onOpenChange(false)}
            className='flex items-center justify-center size-9 bg-white border border-black/10 hover:bg-lexy-border-table shadow-lexy-button transition-colors rounded-full cursor-pointer'>
            <X />
          </button>
        </DialogHeader>
        <section className='pt-4 px-4 w-full h-full'>
          <div className='flex flex-col p-4 rounded-sm border border-lexy-border-table bg-white mb-4'>
            <div className='flex items-center gap-x-2 text-lexy-text-primary mb-4'>
              <CirclePause className='size-6' />
              <h4 className='text-lg font-medium leading-6'>
                Motivos de waitingg
              </h4>
            </div>
            <p className='text-lexy-text-secondary leading-6 mb-6'>
              Seleccione el motivo de 'waiting'; el correo se generará
              automáticamente en el visor de abajo.
            </p>
            <div className='flex flex-col gap-y-4'>
              <div className='flex flex-col gap-y-2'>
                <h5 className='text-lexy-text-primary font-medium leading-6'>
                  Motivos que requieren solicitud de documenttación inmediata
                </h5>
                <div className='flex items-center flex-wrap gap-2'>
                  {motivoInmediato.map((motivo) => (
                    <button
                      type='button'
                      key={motivo.id}
                      className={cn(
                        "px-4 py-1 rounded-full text-sm font-medium leading-5 border-2 border-lexy-input-border bg-lexy-bg-platform transition-all w-fit animate-fade-in animate-duration-100 cursor-pointer",
                        {
                          "bg-[#F7F0EA] border-[#A66626] text-[#A66626]":
                            motivo.active,
                        }
                      )}
                      onClick={() => toggleActivation("inmediato", motivo.id)}>
                      {motivo.nombre}
                    </button>
                  ))}
                </div>
              </div>
              <div className='flex flex-col gap-y-2'>
                <h5 className='text-lexy-text-primary font-medium leading-6'>
                  Motivos que NO requieren solicitud de documenttación inmediata
                </h5>
                <div className='flex items-center flex-wrap gap-2'>
                  {motivoNoInmediato.map((motivo) => (
                    <button
                      type='button'
                      key={motivo.id}
                      className={cn(
                        "px-4 py-1 rounded-full text-sm font-medium leading-5 border-2 border-lexy-input-border bg-lexy-bg-platform transition-all w-fit animate-fade-in animate-duration-100 cursor-pointer",
                        {
                          "bg-[#F7F0EA] border-[#A66626] text-[#A66626]":
                            motivo.active,
                        }
                      )}
                      onClick={() =>
                        toggleActivation("no_inmediato", motivo.id)
                      }>
                      {motivo.nombre}
                    </button>
                  ))}
                </div>
              </div>
              <div className='flex flex-col gap-y-2'>
                <h5 className='text-lexy-text-primary font-medium leading-6'>
                  Motivos de gestiones más complejas, no requieren documentos en
                  la brevedad
                </h5>
                <div className='flex items-center flex-wrap gap-2'>
                  {motivoComplejo.map((motivo) => (
                    <button
                      type='button'
                      key={motivo.id}
                      className={cn(
                        "px-4 py-1 rounded-full text-sm font-medium leading-5 border-2 border-lexy-input-border bg-lexy-bg-platform transition-all w-fit animate-fade-in animate-duration-100 cursor-pointer",
                        {
                          "bg-[#F7F0EA] border-[#A66626] text-[#A66626]":
                            motivo.active,
                        }
                      )}
                      onClick={() => toggleActivation("complejo", motivo.id)}>
                      {motivo.nombre}
                    </button>
                  ))}
                </div>
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
            <div className='flex flex-col p-4 text-lexy-text-secondary font-medium leading-6 bg-lexy-bg-platform rounded-sm max-h-32 overflow-y-auto hide-scrollbar'>
              <span>Para: cliente@email.com</span>
              <span className='mb-4'>
                Asunto: Solicitud de documentación - Caso Legal
              </span>
              <span className='mb-4'>Estimado/a cliente,</span>
              <p>
                Para continuar con su proceso legal, necesitamos que nos
                proporcione los siguientes documentos:
              </p>
              {/* aca motivos? */}
              <ul className='mb-4'>
                <li className='list-disc ml-6 animate-fade-in animate-duration-250'>
                  Sepa quien que cosa va aquí :p
                </li>
              </ul>
              {/* aca motivos? */}
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
            className='w-full flex items-center justify-center gap-x-2 px-6 py-2.5 bg-[#A66626] hover:bg-[#664414] text-lexy-bg-card rounded-sm shadow-lexy-button cursor-pointer transition-all'>
            <Send />
            Guardar y enviar correo
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
