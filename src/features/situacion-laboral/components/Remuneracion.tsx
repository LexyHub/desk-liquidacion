import { useSidebar } from "@features/sidebar";
import { Input, Select } from "@shared/components/form";
import { Card, DocumentButton, Table } from "@shared/components/ui";
import { usePinService } from "@shared/hooks";
import { SiONo } from "@shared/lib/options";
import { useSituacionLaboralStore } from "../stores/useSituacionLaboral.store";

export function Remuneracion() {
  const { isInDistribution } = useSidebar();
  const { isRowPinned, togglePinRow } = usePinService();

  const datos = useSituacionLaboralStore((state) => state.situacion_laboral);
  const updateDatosField = useSituacionLaboralStore(
    (state) => state.updateField
  );

  return (
    <Card>
      <Card.Header>
        <Card.Title>Remuneración</Card.Title>
      </Card.Header>
      <Card.Content>
        <Table className='gap-y-2'>
          <Table.Row
            rowkey='remuneracion'
            label='Remuneración mensual'
            stareable
            isStared={isRowPinned("remuneracion")}
            onStarToggle={() => togglePinRow("remuneracion")}>
            <Input
              type='currency'
              disabled={isInDistribution}
              value={String(datos?.remuneracion || "")}
              onChange={(v) => updateDatosField("remuneracion", v as number)}
            />
          </Table.Row>
          <Table.Row
            rowkey='bonos'
            label='Sobresueldo, bono o gratificación'
            stareable
            isStared={isRowPinned("bonos")}
            onStarToggle={() => togglePinRow("bonos")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              value={datos?.bono_gratificacion}
              onValueChange={(value) =>
                updateDatosField("bono_gratificacion", value)
              }
            />
          </Table.Row>
          <Table.Row
            rowkey='link_liquidacion'
            label='Última liquidación de sueldo'
            stareable
            isStared={isRowPinned("link_liquidacion")}
            onStarToggle={() => togglePinRow("link_liquidacion")}>
            <DocumentButton
              document={datos?.link_ultima_liquidacion ?? ""}
              title='Última liquidación de sueldo'
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
