import { Input, Select } from "@shared/components/form";
import { Card, DocumentButton, Table } from "@shared/components/ui";
import { useClientDataContext } from "@shared/context";
import { usePinService } from "@shared/hooks";
import { SiONo } from "@shared/lib/options";

export function Remuneracion() {
  const { isRowPinned, togglePinRow } = usePinService();
  const { clientData } = useClientDataContext();

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
              value={String(clientData?.situacion_laboral.remuneracion || "")}
              onChange={(value) => console.log("Nueva remuneración:", value)}
            />
          </Table.Row>
          <Table.Row
            rowkey='bonos'
            label='Sobresueldo, bono o gratificación'
            stareable
            isStared={isRowPinned("bonos")}
            onStarToggle={() => togglePinRow("bonos")}>
            <Select
              options={SiONo}
              value={clientData?.situacion_laboral.bonos}
            />
          </Table.Row>
          <Table.Row
            rowkey='link_liquidacion'
            label='Última liquidación de sueldo'
            stareable
            isStared={isRowPinned("link_liquidacion")}
            onStarToggle={() => togglePinRow("link_liquidacion")}>
            <DocumentButton
              document={clientData?.situacion_laboral.link_liquidacion ?? ""}
              title='Última liquidación de sueldo'
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
