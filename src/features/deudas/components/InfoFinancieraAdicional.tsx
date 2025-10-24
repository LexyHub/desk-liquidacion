import { usePinService } from "@shared/hooks";
import { Input, Select } from "@shared/components/form";
import { Card, Table } from "@shared/components/ui";
import { SiONo } from "@shared/lib/options";
import { useSidebar } from "@features/sidebar";
import { useDeudasStore } from "../stores/deudas.store";

export function InfoFinancieraAdicional() {
  const { isInDistribution } = useSidebar();
  const { isRowPinned, togglePinRow } = usePinService();

  const datos = useDeudasStore((state) => state.datos_financieros);
  const updateDatos = useDeudasStore(
    (state) => state.updateDatosFinancierosField
  );

  return (
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
              disabled={isInDistribution}
              options={SiONo}
              value={datos?.cae ?? ""}
              onValueChange={(v) => updateDatos("cae", v)}
            />
          </Table.Row>
          <Table.Row
            rowkey='codeudor'
            label='Es codeudor solidario, aval o fiador'
            stareable
            isStared={isRowPinned("codeudor")}
            onStarToggle={() => togglePinRow("codeudor")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              value={datos?.aval ?? ""}
              onValueChange={(v) => updateDatos("aval", v)}
            />
          </Table.Row>
          <Table.Row
            rowkey='ultima_vez_credito'
            label='¿Cuándo fue la última vez que sacó un crédito, reventó una tarjeta, etc?'
            stareable
            isStared={isRowPinned("ultima_vez_credito")}
            onStarToggle={() => togglePinRow("ultima_vez_credito")}>
            <Input
              disabled={isInDistribution}
              placeholder='Escribe aquí...'
              value={datos?.ultimo_credito ?? ""}
              onChange={(e) => updateDatos("ultimo_credito", e as string)}
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
