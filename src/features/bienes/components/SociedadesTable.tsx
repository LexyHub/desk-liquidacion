import { useSidebar } from "@/features/sidebar";
import type { Empresa } from "@/shared/types";
import { Card } from "@shared/components/ui";
import { SociedadInfo } from "./SociedadInfo";
import { useRef } from "react";
import { useDatosPersonalesStore } from "@/features/datos-personales/stores/useDatosPersonales.store";
import { useBienesStore } from "../stores/useBienes.store";

export function SociedadesTable() {
  const { isInDistribution } = useSidebar();

  const datos = useDatosPersonalesStore((state) => state.datos);
  const empresas = useBienesStore((state) => state.empresas);
  const addEmpresa = useBienesStore((state) => state.addEmpresa);

  const bottomRef = useRef<HTMLDivElement>(null);

  const handleAddEmpresa = () => {
    const newEmpresa: Empresa = {
      nombre_empresa: "",
      actividad: "",
      id_cliente: datos?.id_cliente ?? "",
      activos_pasivos: "",
      movimientos: "",
      contabilidad_completa: "",
      socios: "",
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
        {empresas && empresas.length > 0 ? (
          empresas.map((e) => <SociedadInfo key={`${e.id}`} sociedad={e} />)
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
