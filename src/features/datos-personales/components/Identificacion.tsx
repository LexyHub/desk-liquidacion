import { Card, Table } from "@shared/components/ui";
import { Input, SearchableSelect, Select } from "@shared/components/form";
import { useGeoData, usePinService } from "@shared/hooks";
import { useClientDataContext } from "@shared/context";
import { SiONo } from "@shared/lib/options";

export function Identificacion() {
  const { isRowPinned, togglePinRow } = usePinService();
  const { countryOptions } = useGeoData();
  // por ahora hard-coded y con mock-data
  const { clientData } = useClientDataContext();

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
              value={clientData?.datos_personales.nombre}
              onChange={() => console.log("Cambió el nombre")}
            />
          </Table.Row>
          <Table.Row
            rowkey='rut'
            label='RUT'
            stareable
            isStared={isRowPinned("rut")}
            onStarToggle={() => togglePinRow("rut")}>
            <Input
              value={clientData?.datos_personales.rut}
              onChange={() => console.log("Cambió el RUT")}
            />
          </Table.Row>
          <Table.Row
            rowkey='nacionalidad'
            label='Nacionalidad'
            stareable
            isStared={isRowPinned("nacionalidad")}
            onStarToggle={() => togglePinRow("nacionalidad")}>
            <SearchableSelect
              value={clientData?.datos_personales.nacionalidad ?? ""}
              options={countryOptions}
              onValueChange={() => console.log("Cambió el país")}
            />
          </Table.Row>
          <Table.Row
            rowkey='profesion'
            label='Profesión'
            stareable
            isStared={isRowPinned("profesion")}
            onStarToggle={() => togglePinRow("profesion")}>
            <Input
              value={clientData?.datos_personales.profesion}
              onChange={() => console.log("Cambió la profesión")}
            />
          </Table.Row>
          <Table.Row
            rowkey='juicios'
            label='Juicios pendientes'
            stareable
            isStared={isRowPinned("juicios")}
            onStarToggle={() => togglePinRow("juicios")}>
            <Input
              value={clientData?.datos_personales.juicios}
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
              options={SiONo}
              value={clientData?.datos_personales.procedimiento_concursal}
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
