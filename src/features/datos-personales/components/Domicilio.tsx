import { usePinService } from "@shared/hooks";
import { Input } from "@shared/components/form";
import { Card, Table } from "@shared/components/ui";
import { useSidebar } from "@features/sidebar";
import { useDatosPersonalesStore } from "../stores/useDatosPersonales.store";

export function Domicilio() {
  const { isPinned, togglePinRow } = usePinService();
  const { isInDistribution } = useSidebar();

  const { datos, patchDatos } = useDatosPersonalesStore();

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
            isStared={isPinned("direccion")}
            onStarToggle={() => togglePinRow("direccion")}>
            <Input
              disabled={isInDistribution}
              value={datos?.domicilio ?? ""}
              onChange={(v) => patchDatos({ domicilio: String(v) })}
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
