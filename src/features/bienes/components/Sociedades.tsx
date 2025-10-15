import { Select } from "@shared/components/form";
import { SiONo } from "@shared/lib/options";
import { Card, Table } from "@shared/components/ui";
import { useClientDataContext } from "@shared/context";
import { usePinService } from "@shared/hooks";

export function Sociedades() {
  const { isRowPinned, togglePinRow } = usePinService();
  //! TODO esto está hard-codeado. No se cambiará hasta que el backend esté listo.
  const { clientData } = useClientDataContext();

  return (
    <Card>
      <Card.Header>
        <Card.Title>Sociedades y Empresas</Card.Title>
      </Card.Header>
      <Card.Content>
        <Table className='gap-y-2'>
          <Table.Row
            rowkey='posee_empresa'
            label='Posee una empresa'
            stareable
            isStared={isRowPinned("tiene_vehiculo")}
            onStarToggle={() => togglePinRow("tiene_vehiculo")}>
            <Select
              value={clientData?.bienes?.sociedades.posee_empresas}
              options={SiONo}
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
