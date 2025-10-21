import { LoadingView } from "@shared/components/loading";
import { Card } from "@shared/components/ui";
import { useClientDataContext } from "@shared/context";
import { ClipboardCheck, Hourglass } from "@shared/lib/icons";
import { useState } from "react";
import type { Documento, Motivo } from "../types/documento";

const GestionarModal = (await import("../components/GestionarModal"))
  .GestionarModal;
const WaitingModal = (await import("../components/WaitingModal")).WaitingModal;

export default function Distribucion() {
  const { loading } = useClientDataContext();

  const [gestionarModal, setGestionarModal] = useState(false);
  const [waitingModal, setWaitingModal] = useState(false);

  const handleSaveGestion = (docs: Documento[]) => {
    console.info("Documentos guardados:", docs);
  };

  const handleSaveWaiting = (
    complejos: Motivo[],
    inmediatos: Motivo[],
    noInmediatos: Motivo[]
  ) => {
    console.info("Waiting guardado");
    console.log("Motivos Complejos:", complejos);
    console.log("Motivos Inmediatos:", inmediatos);
    console.log("Motivos No Inmediatos:", noInmediatos);
  };

  if (loading) {
    return <LoadingView />;
  }

  return (
    <>
      <GestionarModal
        open={gestionarModal}
        onOpenChange={setGestionarModal}
        onSave={handleSaveGestion}
      />

      <WaitingModal
        open={waitingModal}
        onOpenChange={setWaitingModal}
        onSave={handleSaveWaiting}
      />

      <section className='p-4 flex flex-col gap-y-6'>
        <Card className='gap-y-0'>
          <Card.Header className='mb-2'>
            <Card.Title>Distribución</Card.Title>
          </Card.Header>
          <Card.Content>
            <span className='mb-6 text-lexy-text-secondary leading-6'>
              Elige el estado de la distribución para este caso
            </span>
            <div className='w-full grid grid-cols-2 items-center gap-x-4'>
              <button
                type='button'
                title='Gestionar'
                onClick={() => setGestionarModal(true)}
                className='flex flex-col items-center justify-center gap-y-2 py-2.5 px-6 rounded-sm border-[3px] border-lexy-brand-secondary-dark bg-white hover:bg-lexy-btn-secondary-hover transition-all cursor-pointer'>
                <h4 className='flex items-center gap-x-2 font-medium leading-6 text-lexy-text-primary'>
                  <ClipboardCheck className='size-6 text-lexy-brand-secondary-dark' />
                  Gestionar
                </h4>
                <span className='text-lexy-text-secondary leading-6'>
                  Procede a solicitar documentación
                </span>
              </button>
              <button
                type='button'
                title='Waiting'
                onClick={() => setWaitingModal(true)}
                className='flex flex-col items-center justify-center gap-y-2 py-2.5 px-6 rounded-sm border-[3px] border-[#A66626] bg-white hover:bg-[#C57C2E1A] transition-all cursor-pointer'>
                <h4 className='flex items-center gap-x-2 font-medium leading-6 text-lexy-text-primary'>
                  <Hourglass className='size-6 text-[#A66626]' />
                  Waiting
                </h4>
                <span className='text-lexy-text-secondary leading-6'>
                  Mantener en estado de espera
                </span>
              </button>
            </div>
          </Card.Content>
        </Card>
      </section>
    </>
  );
}
