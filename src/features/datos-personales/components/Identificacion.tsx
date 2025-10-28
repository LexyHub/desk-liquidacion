import { Card, Table } from "@shared/components/ui";
import { Input, SearchableSelect, Select } from "@shared/components/form";
import { useGeoData, usePinService } from "@shared/hooks";
import { SiONo } from "@shared/lib/options";
import { useSidebar } from "@features/sidebar";
import { useDatosPersonalesStore } from "../stores/useDatosPersonales.store";

export function Identificacion() {
  const { isRowPinned, togglePinRow } = usePinService();
  const { isInDistribution } = useSidebar();
  const { countryOptions } = useGeoData();

  const { datos, patchDatos } = useDatosPersonalesStore();
  const { datosPP, patchDatosPP } = useDatosPersonalesStore();

  return (
    <Card>
      <Card.Header>
        <Card.Title>Identificación</Card.Title>
      </Card.Header>
      <Card.Content>
        <Table className='gap-y-2'>
          <Table.Row
            rowkey='nombre'
            label='Nombre completo'
            stareable
            isStared={isRowPinned("nombre")}
            onStarToggle={() => togglePinRow("nombre")}>
            <Input
              disabled={isInDistribution}
              value={datos?.nombres ?? ""}
              onChange={(value) => patchDatos({ nombres: String(value) })}
            />
          </Table.Row>
          <Table.Row
            rowkey='rut'
            label='RUT'
            stareable
            isStared={isRowPinned("rut")}
            onStarToggle={() => togglePinRow("rut")}>
            <Input
              disabled={isInDistribution}
              value={datos?.rut ?? ""}
              onChange={(value) => patchDatos({ rut: String(value) })}
            />
          </Table.Row>
          <Table.Row
            rowkey='nacionalidad'
            label='Nacionalidad'
            stareable
            isStared={isRowPinned("nacionalidad")}
            onStarToggle={() => togglePinRow("nacionalidad")}>
            <SearchableSelect
              disabled={isInDistribution}
              value={datos?.nacionalidad ?? ""}
              options={countryOptions}
              onValueChange={(value) => patchDatos({ nacionalidad: value })}
            />
          </Table.Row>
          <Table.Row
            rowkey='profesion'
            label='Profesión'
            stareable
            isStared={isRowPinned("profesion")}
            onStarToggle={() => togglePinRow("profesion")}>
            <Input
              disabled={isInDistribution}
              value={datos?.profesion_oficio ?? ""}
              onChange={(value) =>
                patchDatos({ profesion_oficio: String(value) })
              }
            />
          </Table.Row>
          <Table.Row
            rowkey='juicios'
            label='Juicios pendientes'
            stareable
            isStared={isRowPinned("juicios")}
            onStarToggle={() => togglePinRow("juicios")}>
            <Input
              disabled={isInDistribution}
              value={datosPP?.juicios_pendientes ?? ""}
              onChange={(value) =>
                patchDatosPP({ juicios_pendientes: String(value) })
              }
            />
          </Table.Row>
          <Table.Row
            rowkey='procedimiento_concursal'
            label='Sometido a procedimiento concursal'
            stareable
            isStared={isRowPinned("procedimiento_concursal")}
            onStarToggle={() => togglePinRow("procedimiento_concursal")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              value={datosPP?.proc_concursal ?? ""}
              onValueChange={(value) => patchDatosPP({ proc_concursal: value })}
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
