import { Input, SearchableSelect, Select } from "@shared/components/form";
import { Card } from "@shared/components/ui/Card";
import { ContentHead } from "@shared/components/ui/ContentHead";
import { LoadingView } from "@shared/components/loading/LoadingView";
import { Table } from "@shared/components/ui/Table";
import { useClientDataContext } from "@features/clientes";
import { cn } from "@shared/lib/utils";
import { useAcreedores, type Deuda } from "@features/deudas";
import { usePinService } from "@shared/hooks";
import { Plus, Trash2 } from "@shared/lib/icons";
import { TipoCreditos, SiONo } from "@shared/lib/options";
import { formatCurrency } from "@shared/lib/utils/formatters";

export default function Deudas() {
  const { isRowPinned, togglePinRow } = usePinService();
  const {
    acreedoresOptions,
    loading: loadingAcreedores,
    error,
  } = useAcreedores();

  const {
    clientData,
    addDeuda,
    modifyDeuda,
    removeDeuda,
    totalDeudas,
    loading,
  } = useClientDataContext();

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

  if (loading) {
    return <LoadingView />;
  }

  return (
    <main className='animate-fade-in animate-duration-100 animate-ease-in'>
      <ContentHead />
      <section className='p-4 flex flex-col gap-y-6'>
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
                        onValueChange={(v) =>
                          handleDeudaChange(index, "tipo", v)
                        }
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
                            "border-transparent":
                              deuda.monto && deuda.monto > 0,
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
        <Card className='gap-y-0'>
          <Card.Header className='flex items-center justify-center w-full'>
            <Card.Title className='text-lexy-text-primary font-medium text-base leading-6'>
              Total deudas registradas
            </Card.Title>
          </Card.Header>
          <Card.Content className='w-full flex items-center justify-center'>
            <h4 className='text-[32px] text-lexy-brand-secondary-dark leading-12 font-medium'>
              {formatCurrency(totalDeudas)}
            </h4>
          </Card.Content>
        </Card>
        <Card>
          <Card.Header>
            <Card.Title>Información financiera adicional</Card.Title>
          </Card.Header>
          <Card.Content>
            <Table className='gap-y-2'>
              <Table.Row
                rowkey='cae'
                label='Tiene CAE'
                stareable
                isStared={isRowPinned("cae")}
                onStarToggle={() => togglePinRow("cae")}>
                <Select
                  options={SiONo}
                  onValueChange={() => console.log("Cambió el cae")}
                />
              </Table.Row>
              <Table.Row
                rowkey='codeudor'
                label='Es codeudor solidario, aval o fiador'
                stareable
                isStared={isRowPinned("codeudor")}
                onStarToggle={() => togglePinRow("codeudor")}>
                <Select
                  options={SiONo}
                  onValueChange={() => console.log("Cambió el codeudor")}
                />
              </Table.Row>
              <Table.Row
                rowkey='ultima_vez_credito'
                label='¿Cuándo fue la última vez que sacó un crédito, reventó una tarjeta, etc?'
                stareable
                isStared={isRowPinned("ultima_vez_credito")}
                onStarToggle={() => togglePinRow("ultima_vez_credito")}>
                <Input
                  value=''
                  placeholder='Escribe aquí...'
                  onChange={() => console.log("Cambió el ultima_vez_credito")}
                />
              </Table.Row>
            </Table>
          </Card.Content>
        </Card>
        <Card>
          <Card.Header>
            <Card.Title>Instrumentos financieros</Card.Title>
          </Card.Header>
          <Card.Content>
            <Table className='gap-y-2'>
              <Table.Row
                rowkey='instrumento_tarjeta_credito'
                label='Tarjeta de crédito'
                stareable
                isStared={isRowPinned("instrumento_tarjeta_credito")}
                onStarToggle={() =>
                  togglePinRow("instrumento_tarjeta_credito")
                }>
                <Select
                  options={SiONo}
                  onValueChange={() =>
                    console.log("Cambió el instrumento_tarjeta_credito")
                  }
                />
              </Table.Row>
              <Table.Row
                rowkey='instrumento_chequera'
                label='Es codeudor solidario, aval o fiador'
                stareable
                isStared={isRowPinned("instrumento_chequera")}
                onStarToggle={() => togglePinRow("instrumento_chequera")}>
                <Select
                  options={SiONo}
                  onValueChange={() =>
                    console.log("Cambió el instrumento_chequera")
                  }
                />
              </Table.Row>
              <Table.Row
                rowkey='instrumento_cheques_protestados'
                label='Cheques protestados'
                stareable
                isStared={isRowPinned("instrumento_cheques_protestados")}
                onStarToggle={() =>
                  togglePinRow("instrumento_cheques_protestados")
                }>
                <Select
                  options={SiONo}
                  onValueChange={() =>
                    console.log("Cambió el instrumento_cheques_protestados")
                  }
                />
              </Table.Row>
              <Table.Row
                rowkey='instrumento_vv_sincobrar'
                label='Vales vista sin cobrar'
                stareable
                isStared={isRowPinned("instrumento_vv_sincobrar")}
                onStarToggle={() => togglePinRow("instrumento_vv_sincobrar")}>
                <Select
                  options={SiONo}
                  onValueChange={() =>
                    console.log("Cambió el instrumento_vv_sincobrar")
                  }
                />
              </Table.Row>
              <Table.Row
                rowkey='instrumento_vv_vencido'
                label='Vales vista vencidos'
                stareable
                isStared={isRowPinned("instrumento_vv_vencido")}
                onStarToggle={() => togglePinRow("instrumento_vv_vencido")}>
                <Select
                  options={SiONo}
                  onValueChange={() =>
                    console.log("Cambió el instrumento_vv_vencido")
                  }
                />
              </Table.Row>
              <Table.Row
                rowkey='instrumento_fondo_cooperativas'
                label='Fondos de cooperativas'
                stareable
                isStared={isRowPinned("instrumento_fondo_cooperativas")}
                onStarToggle={() =>
                  togglePinRow("instrumento_fondo_cooperativas")
                }>
                <Select
                  options={SiONo}
                  onValueChange={() =>
                    console.log("Cambió el instrumento_fondo_cooperativas")
                  }
                />
              </Table.Row>
              <Table.Row
                rowkey='instrumento_criptomoneda'
                label='Criptomonedas'
                stareable
                isStared={isRowPinned("instrumento_criptomoneda")}
                onStarToggle={() => togglePinRow("instrumento_criptomoneda")}>
                <Select
                  options={SiONo}
                  onValueChange={() =>
                    console.log("Cambió el instrumento_criptomoneda")
                  }
                />
              </Table.Row>
              <Table.Row
                rowkey='instrumento_libreta_ahorro'
                label='Libreta de ahorros'
                stareable
                isStared={isRowPinned("instrumento_libreta_ahorro")}
                onStarToggle={() => togglePinRow("instrumento_libreta_ahorro")}>
                <Select
                  options={SiONo}
                  onValueChange={() =>
                    console.log("Cambió el instrumento_libreta_ahorro")
                  }
                />
              </Table.Row>
              <Table.Row
                rowkey='instrumento_fondos_mutuos'
                label='Fondos mutuos'
                stareable
                isStared={isRowPinned("instrumento_fondos_mutuos")}
                onStarToggle={() => togglePinRow("instrumento_fondos_mutuos")}>
                <Select
                  options={SiONo}
                  onValueChange={() =>
                    console.log("Cambió el instrumento_fondos_mutuos")
                  }
                />
              </Table.Row>
              <Table.Row
                rowkey='instrumento_apv'
                label='APV'
                stareable
                isStared={isRowPinned("instrumento_apv")}
                onStarToggle={() => togglePinRow("instrumento_apv")}>
                <Select
                  options={SiONo}
                  onValueChange={() => console.log("Cambió el instrumento_apv")}
                />
              </Table.Row>
              <Table.Row
                rowkey='instrumento_deposito_plazo'
                label='Depósito a plazo'
                stareable
                isStared={isRowPinned("instrumento_deposito_plazo")}
                onStarToggle={() => togglePinRow("instrumento_deposito_plazo")}>
                <Select
                  options={SiONo}
                  onValueChange={() =>
                    console.log("Cambió el instrumento_deposito_plazo")
                  }
                />
              </Table.Row>
            </Table>
          </Card.Content>
        </Card>
        <Card>
          <Card.Header>
            <Card.Title>Deudas fuera de CMF</Card.Title>
          </Card.Header>
          <Card.Content>
            <Table className='gap-y-2'>
              <Table.Row
                rowkey='cajas_compensacion'
                label='Cajas de compensación'
                stareable
                isStared={isRowPinned("cajas_compensacion")}
                onStarToggle={() => togglePinRow("cajas_compensacion")}>
                <Select
                  options={SiONo}
                  onValueChange={() =>
                    console.log("Cambió el cajas_compensacion")
                  }
                />
              </Table.Row>
              <Table.Row
                rowkey='autopistas'
                label='Autopistas'
                stareable
                isStared={isRowPinned("autopistas")}
                onStarToggle={() => togglePinRow("autopistas")}>
                <Select
                  options={SiONo}
                  onValueChange={() => console.log("Cambió el autopistas")}
                />
              </Table.Row>
              <Table.Row
                rowkey='instituciones_medicas'
                label='Instituciones médicas (Clínicas/Centros)'
                stareable
                isStared={isRowPinned("instituciones_medicas")}
                onStarToggle={() => togglePinRow("instituciones_medicas")}>
                <Select
                  options={SiONo}
                  onValueChange={() =>
                    console.log("Cambió el instituciones_medicas")
                  }
                />
              </Table.Row>
              <Table.Row
                rowkey='tgr'
                label='TGR (Tesorería General de la República)'
                stareable
                isStared={isRowPinned("tgr")}
                onStarToggle={() => togglePinRow("tgr")}>
                <Select
                  options={SiONo}
                  onValueChange={() => console.log("Cambió el tgr")}
                />
              </Table.Row>
            </Table>
          </Card.Content>
        </Card>
      </section>
    </main>
  );
}
