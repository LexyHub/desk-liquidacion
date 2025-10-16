import { Card, Table } from "@shared/components/ui";
import { Select } from "@shared/components/form";
import { SiONo } from "@shared/lib/options";
import { useClientDataContext } from "@shared/context";
import { usePinService } from "@shared/hooks";
import { useSidebar } from "@features/sidebar";

export function InformacionFamiliar() {
  const { isRowPinned, togglePinRow } = usePinService();
  const { isInDistribution } = useSidebar();
  //! TODO esto está hard-codeado. No se cambiará hasta que el backend esté listo.
  const { clientData } = useClientDataContext();

  return (
    <Card>
      <Card.Header>
        <Card.Title>Información familiar</Card.Title>
      </Card.Header>
      <Card.Content>
        <Table className='gap-y-2'>
          <Table.Row
            rowkey='padres_fallecidos'
            label='Padres fallecidos'
            stareable
            isStared={isRowPinned("padres_fallecidos")}
            onStarToggle={() => togglePinRow("padres_fallecidos")}>
            <Select
              disabled={isInDistribution}
              value={clientData?.datos_personales.padres_fallecidos}
              options={SiONo}
            />
          </Table.Row>
          <Table.Row
            rowkey='posesion_efectiva'
            label='Posesión efectiva realizada'
            stareable
            isStared={isRowPinned("posesion_efectiva")}
            onStarToggle={() => togglePinRow("posesion_efectiva")}>
            <Select
              disabled={isInDistribution}
              value={clientData?.datos_personales.posesion_efectiva}
              options={SiONo}
            />
          </Table.Row>
          <Table.Row
            rowkey='derechos_hereditarios'
            label='Derechos hereditarios'
            stareable
            isStared={isRowPinned("derechos_hereditarios")}
            onStarToggle={() => togglePinRow("derechos_hereditarios")}>
            <Select
              disabled={isInDistribution}
              value={clientData?.datos_personales.derechos_hereditarios}
              options={SiONo}
            />
          </Table.Row>
          <Table.Row
            rowkey='hijos'
            label='Hijos'
            stareable
            isStared={isRowPinned("hijos")}
            onStarToggle={() => togglePinRow("hijos")}>
            <Select
              disabled={isInDistribution}
              value={clientData?.datos_personales.hijos}
              options={SiONo}
            />
          </Table.Row>
          <Table.Row
            rowkey='recibe_alimentos'
            label='Recibe alimentos'
            stareable
            isStared={isRowPinned("recibe_alimentos")}
            onStarToggle={() => togglePinRow("recibe_alimentos")}>
            <Select
              disabled={isInDistribution}
              value={clientData?.datos_personales.recibe_alimentos}
              options={SiONo}
            />
          </Table.Row>
          <Table.Row
            rowkey='deuda_alimenticia'
            label='Tiene deuda de alimentos'
            stareable
            isStared={isRowPinned("deuda_alimenticia")}
            onStarToggle={() => togglePinRow("deuda_alimenticia")}>
            <Select
              disabled={isInDistribution}
              value={clientData?.datos_personales.deuda_alimenticia}
              options={SiONo}
            />
          </Table.Row>
          <Table.Row
            rowkey='regularizada'
            label='Están regularizados'
            stareable
            isStared={isRowPinned("regularizada")}
            onStarToggle={() => togglePinRow("regularizada")}>
            <Select
              disabled={isInDistribution}
              value={clientData?.datos_personales.regularizada}
              options={SiONo}
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
