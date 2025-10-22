import { usePinService } from "@shared/hooks";
import { Select } from "@shared/components/form";
import { Card, Table } from "@shared/components/ui";
import { SiONo, TipoTrabajador, TipoTrabajo } from "@shared/lib/options";
import { useSidebar } from "@features/sidebar";
import { useSituacionLaboralStore } from "../stores/useSituacionLaboral.store";

export function SituacionLaboralActual() {
  const { isInDistribution } = useSidebar();
  const { isRowPinned, togglePinRow } = usePinService();
  const datos = useSituacionLaboralStore((state) => state.situacion_laboral);
  const updateField = useSituacionLaboralStore((state) => state.updateField);

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
              value={datos?.trabajando}
              onValueChange={(v) => updateField("trabajando", v)}
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
              value={datos?.tipo_trabajo}
              onValueChange={(v) => updateField("tipo_trabajo", v)}
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
              value={datos?.tipo_funcionario}
              onValueChange={(v) => updateField("tipo_funcionario", v)}
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
              value={"jeje"}
              // tbd falta cesante
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
