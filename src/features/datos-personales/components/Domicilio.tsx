import { useClientDataContext } from "@shared/context";
import { usePinService } from "@shared/hooks";
import { Input } from "@shared/components/form";
import { Card, Table } from "@shared/components/ui";
import { useSidebar } from "@features/sidebar";

export function Domicilio() {
  const { isRowPinned, togglePinRow } = usePinService();
  const { isInDistribution } = useSidebar();
  //! TODO esto está hard-codeado. No se cambiará hasta que el backend esté listo.
  const { clientData } = useClientDataContext();

  return (
    <Card>
      <Card.Header>
        <Card.Title>Domicilio</Card.Title>
      </Card.Header>
      <Card.Content>
        <Table className='gap-y-2'>
          <Table.Row
            rowkey='direccion'
            label='Dirección'
            stareable
            isStared={isRowPinned("direccion")}
            onStarToggle={() => togglePinRow("direccion")}>
            <Input
              disabled={isInDistribution}
              value={clientData?.datos_personales.direccion}
              onChange={() => console.log("Cambió la dirección")}
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
