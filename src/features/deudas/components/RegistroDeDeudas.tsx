import { Input, SearchableSelect, Select } from "@shared/components/form";
import { Card, Table } from "@shared/components/ui";
import { useAcreedores } from "../hooks/useAcreedores";
import { useClientDataContext } from "@shared/context";
import type { Deuda } from "../types/deudas";
import { TipoCreditos } from "@shared/lib/options";
import { Plus, Trash2 } from "@shared/lib/icons";
import { cn } from "@shared/lib/utils";

export function RegistroDeDeudas() {
  const {
    acreedoresOptions,
    loading: loadingAcreedores,
    error,
  } = useAcreedores();

  const { clientData, addDeuda, modifyDeuda, removeDeuda } =
    useClientDataContext();

  const handleAddDeuda = () => {
    const newDeuda: Deuda = {
      id_cliente: "",
      tipo: "",
      monto: 0,
      id_acreedor: "",
    };
    addDeuda(newDeuda);
  };

  const handleDeudaChange = (
    index: number,
    field: keyof Deuda,
    value: string | number
  ) => {
    if (!clientData) return;
    const actualDeudas = clientData.deudas || [];
    if (index < 0 || index >= actualDeudas.length) return;
    const updatedDeuda = { ...actualDeudas[index], [field]: value };
    modifyDeuda(index, updatedDeuda);
  };

  const handleDeleteDeuda = (index: number) => {
    if (!clientData) return;
    removeDeuda(index);
  };

  return (
    <Card>
      <Card.Header className='w-full flex items-center justify-between'>
        <Card.Title>Registro de deudas</Card.Title>
        <button
          type='button'
          onClick={handleAddDeuda}
          className='flex items-center gap-x-2 text-lexy-brand-secondary-dark leading-6 font-medium rounded-sm py-2 px-4 bg-white hover:bg-lexy-btn-secondary-hover border-2 border-lexy-brand-secondary-dark shadow-lexy-button cursor-pointer transition-all'>
          <Plus />
          Agregar deuda
        </button>
      </Card.Header>
      <Card.Content>
        <Table>
          <Table.Header className='grid-cols-[1fr_1fr_1fr_auto]'>
            <Table.HeaderCell>Acreedor</Table.HeaderCell>
            <Table.HeaderCell>Tipo de crédito</Table.HeaderCell>
            <Table.HeaderCell>Monto</Table.HeaderCell>
            <div data-template className='w-fit p-2'>
              <div className='size-6' />
            </div>
          </Table.Header>
          <Table.Content>
            {clientData?.deudas && clientData.deudas.length > 0 ? (
              clientData.deudas.map((deuda: Deuda, index: number) => (
                <Table.Cell
                  key={`deuda-${index}`}
                  className='grid-cols-[1fr_1fr_1fr_auto] gap-x-8 animate-fade-in-down animate-duration-200'>
                  <SearchableSelect
                    disabled={loadingAcreedores || !!error}
                    options={acreedoresOptions}
                    value={deuda.id_acreedor}
                    onValueChange={(v) =>
                      handleDeudaChange(index, "id_acreedor", v)
                    }
                    triggerClassName={cn(
                      "py-2 px-4 border border-lexy-input-border text-lexy-text-secondary leading-6 rounded-sm transition-all w-full overflow-hidden",
                      {
                        "border-transparent":
                          deuda.id_acreedor &&
                          deuda.id_acreedor.trim().length > 0,
                      }
                    )}
                  />
                  <Select
                    placeholder='Ej: Hipotecario'
                    disabled={loadingAcreedores || !!error}
                    options={TipoCreditos}
                    value={deuda.tipo}
                    onValueChange={(v) => handleDeudaChange(index, "tipo", v)}
                    triggerClassName={cn(
                      "py-5 px-4 border border-lexy-input-border text-lexy-text-secondary leading-6 rounded-sm",
                      {
                        "border-transparent":
                          deuda.tipo && deuda.tipo.trim().length > 0,
                      }
                    )}
                  />
                  <Input
                    placeholder='Ej: $50.000'
                    value={String(deuda.monto) || ""}
                    type='currency'
                    onChange={(v: string | number) =>
                      handleDeudaChange(index, "monto", v)
                    }
                    className={cn(
                      "py-2 px-4 border border-lexy-input-border text-lexy-text-secondary leading-6 rounded-sm",
                      {
                        "border-transparent": deuda.monto && deuda.monto > 0,
                      }
                    )}
                  />
                  <button
                    title='Eliminar deuda'
                    type='button'
                    className='w-fit rounded-sm text-lexy-text-primary border border-black/10 bg-white hover:bg-lexy-btn-secondary-hover transition-all cursor-pointer p-2'
                    onClick={() => handleDeleteDeuda(index)}>
                    <Trash2 className='size-6' />
                  </button>
                </Table.Cell>
              ))
            ) : (
              <div className='w-full flex items-center justify-center pt-6 pb-4 animate-fade-in animate-duration-300'>
                <h2 className='text-xl text-lexy-text-secondary font-medium'>
                  No hay deudas registradas
                </h2>
              </div>
            )}
          </Table.Content>
        </Table>
      </Card.Content>
    </Card>
  );
}
