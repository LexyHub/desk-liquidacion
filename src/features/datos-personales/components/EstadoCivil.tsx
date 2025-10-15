import { Card, Table } from "@shared/components/ui";
import { Select } from "@shared/components/form";
import {
  EstadoCivil as OPT_ESTADOCIVIL,
  RegimenMarital,
} from "@shared/lib/options";
import { useClientDataContext } from "@shared/context";
import { usePinService } from "@shared/hooks";

export function EstadoCivil() {
  const { isRowPinned, togglePinRow } = usePinService();
  //! TODO esto está hard-codeado. No se cambiará hasta que el backend esté listo.
  const { clientData } = useClientDataContext();

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
              value={clientData?.datos_personales.estado_civil}
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
              value={clientData?.datos_personales.regimen_matrimonial}
              options={RegimenMarital}
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
