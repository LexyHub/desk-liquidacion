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

  const datos = useDatosPersonalesStore((state) => state.datos);
  const updateDatosField = useDatosPersonalesStore(
    (state) => state.updateDatosField
  );

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
              onChange={(value) => updateDatosField("nombres", String(value))}
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
              onChange={(value) => updateDatosField("rut", String(value))}
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
              onValueChange={(value) => updateDatosField("nacionalidad", value)}
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
                updateDatosField("profesion_oficio", String(value))
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
              value={"hola"} // deberia ser juicios
              onChange={() => console.log("Cambió los juicios")}
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
              value={"hola"} // deberia ser procedimiento concursal
              onValueChange={() =>
                console.log("Cambió el procedimiento concursal")
              }
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
