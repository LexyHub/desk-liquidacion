import { useSidebar } from "@features/sidebar";
import { Input, Select } from "@shared/components/form";
import { Card, DocumentButton, Table } from "@shared/components/ui";
import { usePinService } from "@shared/hooks";
import { SiONo } from "@shared/lib/options";
import { useSituacionLaboralStore } from "../stores/useSituacionLaboral.store";

export function Finiquito() {
  const { isInDistribution } = useSidebar();
  const { isRowPinned, togglePinRow } = usePinService();

  const datos = useSituacionLaboralStore((state) => state.situacion_laboral);
  const updateDatosField = useSituacionLaboralStore(
    (state) => state.updateField
  );

  return (
    <Card>
      <Card.Header>
        <Card.Title>Finiquito</Card.Title>
      </Card.Header>
      <Card.Content>
        <Table className='gap-y-2'>
          <Table.Row
            rowkey='finiquito'
            label='Finiquito últimos 12 meses'
            stareable
            isStared={isRowPinned("finiquito")}
            onStarToggle={() => togglePinRow("finiquito")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              value={datos?.finiquito}
              onValueChange={(value) => updateDatosField("finiquito", value)}
            />
          </Table.Row>
          <Table.Row
            rowkey='monto_finiquito'
            label='Monto del finiquito'
            stareable
            isStared={isRowPinned("monto_finiquito")}
            onStarToggle={() => togglePinRow("monto_finiquito")}>
            <Input
              disabled={isInDistribution}
              type='currency'
              value={String(datos?.monto_finiquito || "")}
              onChange={(value) =>
                updateDatosField("monto_finiquito", value as number)
              }
            />
          </Table.Row>
          <Table.Row
            rowkey='link_finiquito'
            label='Documento de finiquito'
            stareable
            isStared={isRowPinned("link_finiquito")}
            onStarToggle={() => togglePinRow("link_finiquito")}>
            <DocumentButton
              document={datos?.link_finiquito ?? ""}
              title='Documento de finiquito'
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
