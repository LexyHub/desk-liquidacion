import { Select } from "@shared/components/form";
import { SiONo } from "@shared/lib/options";
import { Card, Table } from "@shared/components/ui";
import { usePinService } from "@shared/hooks";
import { useSidebar } from "@features/sidebar";
import { useDatosPersonalesStore } from "@/features/datos-personales/stores/useDatosPersonales.store";

export function Sociedades() {
  const { isRowPinned, togglePinRow } = usePinService();
  const { isInDistribution } = useSidebar();

  const datos = useDatosPersonalesStore((state) => state.datos);
  const updateDatos = useDatosPersonalesStore(
    (state) => state.updateDatosField
  );

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
              disabled={isInDistribution}
              value={datos?.tiene_sociedades ?? ""}
              onValueChange={(v) => updateDatos("tiene_sociedades", v)}
              options={SiONo}
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
