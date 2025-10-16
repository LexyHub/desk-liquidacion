import { useClientDataContext } from "@shared/context";
import { usePinService } from "@shared/hooks";
import { Select } from "@shared/components/form";
import { Card, Table } from "@shared/components/ui";
import { SiONo, TipoTrabajador, TipoTrabajo } from "@shared/lib/options";
import { useSidebar } from "@features/sidebar";

export function SituacionLaboralActual() {
  const { isInDistribution } = useSidebar();
  const { isRowPinned, togglePinRow } = usePinService();
  const { clientData } = useClientDataContext();

  return (
    <Card>
      <Card.Header>
        <Card.Title>Situación laboral actual</Card.Title>
      </Card.Header>
      <Card.Content>
        <Table className='gap-y-2'>
          <Table.Row
            rowkey='trabajando'
            label='Trabajo actualmente'
            stareable
            isStared={isRowPinned("trabajando")}
            onStarToggle={() => togglePinRow("trabajando")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              value={clientData?.situacion_laboral.trabajando}
            />
          </Table.Row>
          <Table.Row
            rowkey='tipo_trabajo'
            label='Tipo de trabajo'
            stareable
            isStared={isRowPinned("tipo_trabajo")}
            onStarToggle={() => togglePinRow("tipo_trabajo")}>
            <Select
              disabled={isInDistribution}
              options={TipoTrabajo}
              value={clientData?.situacion_laboral.tipo_trabajo}
            />
          </Table.Row>
          <Table.Row
            rowkey='tipo_trabajador'
            label='Público o Privado'
            stareable
            isStared={isRowPinned("tipo_trabajador")}
            onStarToggle={() => togglePinRow("tipo_trabajador")}>
            <Select
              disabled={isInDistribution}
              options={TipoTrabajador}
              value={clientData?.situacion_laboral.tipo_trabajador}
            />
          </Table.Row>
          <Table.Row
            rowkey='cesante'
            label='Cesante el último año'
            stareable
            isStared={isRowPinned("cesante")}
            onStarToggle={() => togglePinRow("cesante")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              value={clientData?.situacion_laboral.cesante}
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
