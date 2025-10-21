import { useSidebar } from "@/features/sidebar";
import type { Empresa } from "@/shared/types";
import { Card } from "@shared/components/ui";
import { useClientDataContext } from "@shared/context";
import { SociedadInfo } from "./SociedadInfo";
import { useRef } from "react";

export function SociedadesTable() {
  const { isInDistribution } = useSidebar();
  const { clientData, addEmpresa } = useClientDataContext();
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleAddEmpresa = () => {
    const newEmpresa: Empresa = {
      id: window.crypto.getRandomValues(new Uint16Array(1))[0],
      nombre: "",
      actividad: "",
      activos_pasivos: 0,
      presenta_contabilidad: "",
      otros_socios: "",
      id_cliente: "",
    };
    addEmpresa(newEmpresa);
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <Card>
      <Card.Header className='w-full flex items-center justify-between mb-0'>
        <Card.Title>Lista de Sociedades y Empresas</Card.Title>
        <button
          type='button'
          onClick={handleAddEmpresa}
          disabled={isInDistribution}
          className='flex items-center gap-x-2 text-lexy-brand-secondary-dark leading-6 font-medium rounded-sm py-2 px-4 bg-white not-disabled:hover:bg-lexy-btn-secondary-hover border-2 border-lexy-brand-secondary-dark shadow-lexy-button cursor-pointer transition-all disabled:cursor-not-allowed'>
          Agregar empresa
        </button>
      </Card.Header>
      <Card.Content className='gap-y-4'>
        {clientData?.empresas && clientData.empresas.length > 0 ? (
          clientData?.empresas?.map((e) => (
            <SociedadInfo key={e.id} sociedad={e} />
          ))
        ) : (
          <div className='w-full flex items-center justify-center pt-6 pb-4 animate-fade-in animate-duration-300'>
            <h2 className='text-xl text-lexy-text-secondary font-medium'>
              No hay sociedades registradas
            </h2>
          </div>
        )}
      </Card.Content>
      <div data-template ref={bottomRef} />
    </Card>
  );
}
