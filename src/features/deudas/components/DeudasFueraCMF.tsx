import { usePinService } from "@shared/hooks";
import { Card, Table } from "@shared/components/ui";
import { Select } from "@shared/components/form";
import { SiONo } from "@shared/lib/options";
import { useSidebar } from "@features/sidebar";

export function DeudasFueraCMF() {
  const { isInDistribution } = useSidebar();
  const { isRowPinned, togglePinRow } = usePinService();

  /*
  Próximamente se utilizará
  const {
    clientData
  } = useClientDataContext();
  */

  return (
    <Card>
      <Card.Header>
        <Card.Title>Deudas fuera de CMF</Card.Title>
      </Card.Header>
      <Card.Content>
        <Table className='gap-y-2'>
          <Table.Row
            rowkey='cajas_compensacion'
            label='Cajas de compensación'
            stareable
            isStared={isRowPinned("cajas_compensacion")}
            onStarToggle={() => togglePinRow("cajas_compensacion")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              onValueChange={() => console.log("Cambió el cajas_compensacion")}
            />
          </Table.Row>
          <Table.Row
            rowkey='autopistas'
            label='Autopistas'
            stareable
            isStared={isRowPinned("autopistas")}
            onStarToggle={() => togglePinRow("autopistas")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              onValueChange={() => console.log("Cambió el autopistas")}
            />
          </Table.Row>
          <Table.Row
            rowkey='instituciones_medicas'
            label='Instituciones médicas (Clínicas/Centros)'
            stareable
            isStared={isRowPinned("instituciones_medicas")}
            onStarToggle={() => togglePinRow("instituciones_medicas")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              onValueChange={() =>
                console.log("Cambió el instituciones_medicas")
              }
            />
          </Table.Row>
          <Table.Row
            rowkey='tgr'
            label='TGR (Tesorería General de la República)'
            stareable
            isStared={isRowPinned("tgr")}
            onStarToggle={() => togglePinRow("tgr")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              onValueChange={() => console.log("Cambió el tgr")}
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
