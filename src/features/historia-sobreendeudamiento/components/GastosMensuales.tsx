import { Input } from "@shared/components/form";
import { Table, Card } from "@shared/components/ui";
import { Plus, Trash2 } from "@shared/lib/icons";
import { cn } from "@shared/lib/utils";
import { formatCurrency } from "@shared/lib/utils/currency.util";
import { useSidebar } from "@features/sidebar";
import { useHistoriaSEStore } from "../stores/HistoriaSE.store";
import { useDatosPersonalesStore } from "@/features/datos-personales/stores/useDatosPersonales.store";
import type { Gasto } from "@shared/types";

export function GastosMensuales() {
  const { isInDistribution } = useSidebar();

  const datos = useDatosPersonalesStore((state) => state.datos);
  const { gastos, getTotalGastos, addGasto, updateGastoField, removeGasto } =
    useHistoriaSEStore();

  const handleAddGasto = () => {
    const newGasto: Gasto = {
      id_cliente: datos?.id_cliente ?? "",
      categoria: "",
      descripcion: "",
      monto: 0,
    };
    addGasto(newGasto);
  };

  return (
    <>
      <Card>
        <Card.Header className='w-full flex items-center justify-between'>
          <Card.Title>Registro de gastos mensuales</Card.Title>
          <button
            type='button'
            disabled={isInDistribution}
            onClick={handleAddGasto}
            className='flex items-center gap-x-2 text-lexy-brand-secondary-dark leading-6 font-medium rounded-sm py-2 px-4 bg-white not-disabled:hover:bg-lexy-btn-secondary-hover border-2 border-lexy-brand-secondary-dark shadow-lexy-button cursor-pointer transition-all disabled:cursor-not-allowed'>
            <Plus />
            Agregar gasto
          </button>
        </Card.Header>
        <Card.Content>
          <Table>
            <Table.Header className='grid-cols-[1fr_1fr_1fr_auto]'>
              <Table.HeaderCell>Categoría</Table.HeaderCell>
              <Table.HeaderCell>Descripción</Table.HeaderCell>
              <Table.HeaderCell>Monto</Table.HeaderCell>
              <div data-template className='w-fit p-2'>
                <div className='size-6' />
              </div>
            </Table.Header>
            <Table.Content>
              {gastos && gastos.length > 0 ? (
                gastos.map((gasto) => (
                  <Table.Cell
                    key={`gasto-${gasto.id}`}
                    className='grid-cols-[1fr_1fr_1fr_auto] gap-x-8 animate-fade-in-down animate-duration-200'>
                    <Input
                      disabled={isInDistribution}
                      value={gasto.categoria}
                      onChange={(v) =>
                        updateGastoField(gasto.id!, "categoria", String(v))
                      }
                      className={cn(
                        "py-2 px-4 border border-lexy-input-border text-lexy-text-secondary leading-6 rounded-sm",
                        {
                          "border-transparent":
                            gasto.categoria &&
                            gasto.categoria.trim().length > 0,
                        }
                      )}
                    />
                    <Input
                      disabled={isInDistribution}
                      value={gasto.descripcion}
                      onChange={(v) =>
                        updateGastoField(gasto.id!, "descripcion", String(v))
                      }
                      className={cn(
                        "py-2 px-4 border border-lexy-input-border text-lexy-text-secondary leading-6 rounded-sm",
                        {
                          "border-transparent":
                            gasto.descripcion &&
                            gasto.descripcion.trim().length > 0,
                        }
                      )}
                    />
                    <Input
                      disabled={isInDistribution}
                      placeholder='Ej: $50.000'
                      value={String(gasto.monto || 0)}
                      type='currency'
                      onChange={(v: string | number) =>
                        updateGastoField(gasto.id!, "monto", Number(v))
                      }
                      className={cn(
                        "py-2 px-4 border border-lexy-input-border text-lexy-text-secondary leading-6 rounded-sm",
                        {
                          "border-transparent": gasto.monto && gasto.monto > 0,
                        }
                      )}
                    />
                    <button
                      disabled={isInDistribution}
                      title='Eliminar gasto'
                      type='button'
                      className='w-fit rounded-sm text-lexy-text-primary border border-black/10 bg-white not-disabled:hover:bg-lexy-btn-secondary-hover transition-all cursor-pointer p-2 disabled:cursor-not-allowed'
                      onClick={() => removeGasto(gasto.id!)}>
                      <Trash2 className='size-6' />
                    </button>
                  </Table.Cell>
                ))
              ) : (
                <div className='w-full flex items-center justify-center pt-6 pb-4 animate-fade-in animate-duration-300'>
                  <h2 className='text-xl text-lexy-text-secondary font-medium'>
                    No hay gastos mensuales registrados
                  </h2>
                </div>
              )}
            </Table.Content>
          </Table>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content className='w-full flex flex-row items-center justify-between'>
          <h4 className='font-medium leading-6'>Total gastos mensuales</h4>
          <div className='w-fit px-4 py-2 border border-lexy-border-table shadow-lexy-table rounded-sm bg-white'>
            <span className='text-lexy-brand-secondary-dark font-medium leading-6'>
              {formatCurrency(getTotalGastos())}
            </span>
          </div>
        </Card.Content>
      </Card>
    </>
  );
}
