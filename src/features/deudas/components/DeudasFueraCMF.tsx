import { usePinService } from "@shared/hooks";
import { Card, Table } from "@shared/components/ui";
import { Select } from "@shared/components/form";
import { SiONo } from "@shared/lib/options";
import { useSidebar } from "@features/sidebar";
import { useDeudasStore } from "../stores/deudas.store";

export function DeudasFueraCMF() {
  const { isInDistribution } = useSidebar();
  const { isRowPinned, togglePinRow } = usePinService();

  const { datos_financieros, updateDatosFinancierosField } = useDeudasStore();

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
              value={datos_financieros?.caja_compensacion ?? ""}
              onValueChange={(v) =>
                updateDatosFinancierosField("caja_compensacion", v)
              }
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
              value={datos_financieros?.autopista ?? ""}
              onValueChange={(v) => updateDatosFinancierosField("autopista", v)}
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
              value={datos_financieros?.inst_medicas ?? ""}
              onValueChange={(v) =>
                updateDatosFinancierosField("inst_medicas", v)
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
              value={datos_financieros?.tgr ?? ""}
              onValueChange={(v) => updateDatosFinancierosField("tgr", v)}
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
