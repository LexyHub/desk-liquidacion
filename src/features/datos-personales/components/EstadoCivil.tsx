import { Card, Table } from "@shared/components/ui";
import { Select } from "@shared/components/form";
import {
  EstadoCivil as OPT_ESTADOCIVIL,
  RegimenMarital,
} from "@shared/lib/options";
import { usePinService } from "@shared/hooks";
import { useSidebar } from "@/features/sidebar";
import { useDatosPersonalesStore } from "../stores/useDatosPersonales.store";

export function EstadoCivil() {
  const { isRowPinned, togglePinRow } = usePinService();
  const { isInDistribution } = useSidebar();

  const datos = useDatosPersonalesStore((state) => state.datos);
  const updateDatosField = useDatosPersonalesStore(
    (state) => state.updateDatosField
  );

  return (
    <Card>
      <Card.Header>
        <Card.Title>Estado civil</Card.Title>
      </Card.Header>
      <Card.Content>
        <Table className='gap-y-2'>
          <Table.Row
            rowkey='estado_civil'
            label='Estado civil'
            stareable
            isStared={isRowPinned("estado_civil")}
            onStarToggle={() => togglePinRow("estado_civil")}>
            <Select
              disabled={isInDistribution}
              value={datos?.estado_civil}
              onValueChange={(value) => updateDatosField("estado_civil", value)}
              options={OPT_ESTADOCIVIL}
            />
          </Table.Row>
          <Table.Row
            rowkey='regimen_matrimonial'
            label='Régimen matrimonial'
            stareable
            isStared={isRowPinned("regimen_matrimonial")}
            onStarToggle={() => togglePinRow("regimen_matrimonial")}>
            <Select
              disabled={isInDistribution}
              value={datos?.regimen_matrimonial}
              onValueChange={(value) =>
                updateDatosField("regimen_matrimonial", value)
              }
              options={RegimenMarital}
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
