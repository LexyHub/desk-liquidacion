import { Card, Table } from "@shared/components/ui";
import { Input, Select } from "@shared/components/form";
import { SiONo } from "@shared/lib/options";
import { usePinService } from "@shared/hooks";
import { useSidebar } from "@features/sidebar";
import { useDatosPersonalesStore } from "../stores/useDatosPersonales.store";

export function InformacionFamiliar() {
  const { isRowPinned, togglePinRow } = usePinService();
  const { isInDistribution } = useSidebar();

  const datos_pp = useDatosPersonalesStore((state) => state.datosPP);
  const updateDatosPPField = useDatosPersonalesStore(
    (state) => state.updateDatosPPField
  );

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
              value={datos_pp?.padres_fallecidos}
              onValueChange={(v) => updateDatosPPField("padres_fallecidos", v)}
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
              value={datos_pp?.posesion_efectiva}
              onValueChange={(v) => updateDatosPPField("posesion_efectiva", v)}
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
              value={datos_pp?.derechos_hereditarios ?? ""}
              onValueChange={(v) =>
                updateDatosPPField("derechos_hereditarios", v)
              }
              options={SiONo}
            />
          </Table.Row>
          <Table.Row
            rowkey='hijos'
            label='Hijos'
            stareable
            isStared={isRowPinned("hijos")}
            onStarToggle={() => togglePinRow("hijos")}>
            <Input
              disabled={isInDistribution}
              type='number'
              placeholder='Ingresa la cantidad de hijos'
              value={String(datos_pp?.hijos ?? "")}
              onChange={() => console.log("Cambió los hijos")}
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
              value={datos_pp?.recibe_alimentos ?? ""}
              onValueChange={(v) => updateDatosPPField("recibe_alimentos", v)}
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
              value={datos_pp?.deuda_alimentos ?? ""}
              onValueChange={(v) => updateDatosPPField("deuda_alimentos", v)}
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
              value={datos_pp?.alimentos_regularizados ?? ""}
              onValueChange={(v) =>
                updateDatosPPField("alimentos_regularizados", v)
              }
              options={SiONo}
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
