import type { Empresa } from "@shared/types";
import { Trash2 } from "@shared/lib/icons";
import { Input, Select } from "@shared/components/form";
import { useSidebar } from "@features/sidebar";
import { useClientDataContext } from "@/shared/context";
import { SiONo } from "../../../shared/lib/options";

interface Props {
  sociedad: Empresa;
}

export function SociedadInfo({ sociedad }: Props) {
  const { isInDistribution } = useSidebar();
  const { modifyEmpresa, removeEmpresa } = useClientDataContext();

  const handleChange = (field: string, value: string) => {
    modifyEmpresa(sociedad.id, { ...sociedad, [field]: value });
  };

  const handleDelete = () => {
    removeEmpresa(sociedad.id);
  };

  return (
    <div className='w-full grid grid-cols-[1fr_auto] rounded-md border border-[#E6E6E6] animate-fade-in animate-duration-100'>
      <section className='w-full flex flex-col'>
        <div className='w-full h-full grid grid-cols-[40%_60%] items-center border-b border-b-[#E6E6E6]'>
          <div className='px-3 py-2 bg-[#F5F5F5] border-r border-r-[#E6E6E6]'>
            <span className='font-medium leading-6 text-[#2F2F2F]'>
              Nombre de la sociedad o empresa
            </span>
          </div>
          <Input
            disabled={isInDistribution}
            placeholder='Ej: Moonie Studios'
            value={sociedad.nombre ?? ""}
            onChange={(value: string | number) =>
              handleChange("nombre", String(value))
            }
            className='py-2 px-3 h-full w-full text-lexy-text-secondary leading-6 rounded-sm'
          />
        </div>
        <div className='w-full h-full grid grid-cols-[40%_60%] items-center border-b border-b-[#E6E6E6]'>
          <div className='px-3 py-2 h-full bg-[#F5F5F5] border-r border-r-[#E6E6E6]'>
            <span className='font-medium leading-6 text-[#2F2F2F]'>
              Activos/Pasivos
            </span>
          </div>
          <Input
            disabled={isInDistribution}
            placeholder='Ej: $1.500.000'
            type='currency'
            value={String(sociedad.activos_pasivos)}
            onChange={(value: string | number) =>
              handleChange("activos_pasivos", String(value))
            }
            className='w-full h-full py-2 px-3 text-lexy-text-secondary leading-6 rounded-sm'
          />
        </div>
        <div className='w-full h-full grid grid-cols-[40%_60%] items-center border-b border-b-[#E6E6E6]'>
          <div className='px-3 py-2 h-full bg-[#F5F5F5] border-r border-r-[#E6E6E6]'>
            <span className='font-medium leading-6 text-[#2F2F2F]'>
              Posee movimientos
            </span>
          </div>
          <Select
            disabled={isInDistribution}
            value={sociedad.actividad ?? ""}
            options={SiONo}
            onValueChange={(value: string | number) =>
              handleChange("actividad", String(value))
            }
            triggerClassName='w-full h-full py-2 text-lexy-text-secondary leading-6 rounded-sm'
          />
        </div>
        <div className='w-full h-full grid grid-cols-[40%_60%] items-center border-b border-b-[#E6E6E6]'>
          <div className='px-3 py-2 h-full bg-[#F5F5F5] border-r border-r-[#E6E6E6]'>
            <span className='font-medium leading-6 text-[#2F2F2F]'>
              Presenta contabilidad completa
            </span>
          </div>
          <Select
            disabled={isInDistribution}
            value={sociedad.presenta_contabilidad ?? ""}
            options={SiONo}
            onValueChange={(value: string | number) =>
              handleChange("presenta_contabilidad", String(value))
            }
            triggerClassName='w-full h-full py-2 text-lexy-text-secondary leading-6 rounded-sm'
          />
        </div>
        <div className='w-full h-full grid grid-cols-[40%_60%] items-center border-b border-b-[#E6E6E6]'>
          <div className='px-3 py-2 h-full bg-[#F5F5F5] border-r border-r-[#E6E6E6]'>
            <span className='font-medium leading-6 text-[#2F2F2F]'>
              Otros socios
            </span>
          </div>
          <Input
            disabled={isInDistribution}
            placeholder='Ej: María Soto, Felipe Morales'
            value={sociedad.otros_socios ?? ""}
            onChange={(value: string | number) =>
              handleChange("otros_socios", String(value))
            }
            className='w-full h-full py-2 px-3 text-lexy-text-secondary leading-6 rounded-sm'
          />
        </div>
      </section>
      <button
        type='button'
        title='Eliminar sociedad'
        onClick={handleDelete}
        className='flex items-center justify-center h-full w-fit px-3 py-2 bg-[#F5F5F5] hover:bg-[#EEEBFF] transition-all cursor-pointer'>
        <Trash2 className='size-6' />
      </button>
    </div>
  );
}
