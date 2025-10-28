import { Card, Table } from "@shared/components/ui";
import { Input, Select } from "@shared/components/form";
import { SiONo } from "@shared/lib/options";
import { usePinService } from "@shared/hooks";
import { useSidebar } from "@features/sidebar";
import { useDatosPersonalesStore } from "../stores/useDatosPersonales.store";

export function InformacionFamiliar() {
  const { isRowPinned, togglePinRow } = usePinService();
  const { isInDistribution } = useSidebar();

  const { datosPP, patchDatosPP } = useDatosPersonalesStore();

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
              value={datosPP?.padres_fallecidos}
              onValueChange={(v) => patchDatosPP({ padres_fallecidos: v })}
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
              value={datosPP?.posesion_efectiva}
              onValueChange={(v) => patchDatosPP({ posesion_efectiva: v })}
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
              value={datosPP?.derechos_hereditarios ?? ""}
              onValueChange={(v) => patchDatosPP({ derechos_hereditarios: v })}
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
              value={String(datosPP?.hijos ?? "")}
              onChange={(v) => patchDatosPP({ hijos: v as number })}
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
              value={datosPP?.recibe_alimentos ?? ""}
              onValueChange={(v) => patchDatosPP({ recibe_alimentos: v })}
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
              value={datosPP?.deuda_alimentos ?? ""}
              onValueChange={(v) => patchDatosPP({ deuda_alimentos: v })}
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
              value={datosPP?.alimentos_regularizados ?? ""}
              onValueChange={(v) =>
                patchDatosPP({ alimentos_regularizados: v })
              }
              options={SiONo}
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
