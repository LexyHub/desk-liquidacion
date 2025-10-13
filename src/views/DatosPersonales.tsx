import { Card } from "@components/ui/Card";
import { ContentHead } from "@components/ui/ContentHead";
import { Table } from "@components/ui/Table";
import { Input, Select, SearchableSelect } from "@components/form";
import { useGeoData, usePinService } from "@hooks";
import { EstadoCivil, RegimenMarital, SiONo } from "./options";
import { useClientDataContext } from "@context/clientData/useClientData";

export default function DatosPersonales() {
  const { isRowPinned, togglePinRow } = usePinService();
  //! TODO esto está hard-codeado. No se cambiará hasta que el backend esté listo.
  const { countryOptions } = useGeoData();
  const { clientData, loading } = useClientDataContext();

  if (loading) {
    return <div>Cargando datos del cliente...</div>;
  }

  return (
    <main className='animate-fade-in animate-duration-100 animate-ease-in'>
      <ContentHead />
      <section className='p-4 flex flex-col gap-y-6'>
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

        <Card>
          <Card.Header>
            <Card.Title>Domicilio</Card.Title>
          </Card.Header>
          <Card.Content>
            <Table className='gap-y-2'>
              <Table.Row
                rowkey='direccion'
                label='Dirección'
                stareable
                isStared={isRowPinned("direccion")}
                onStarToggle={() => togglePinRow("direccion")}>
                <Input
                  value={clientData?.datos_personales.direccion}
                  onChange={() => console.log("Cambió la dirección")}
                />
              </Table.Row>
            </Table>
          </Card.Content>
        </Card>
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
                  value={clientData?.datos_personales.regularizada}
                  options={SiONo}
                />
              </Table.Row>
            </Table>
          </Card.Content>
        </Card>
        <Card>
          <Card.Header>
            <Card.Title>Estado civil</Card.Title>
          </Card.Header>
          <Card.Content>
            <Table className='gap-y-2'>
              <Table.Row
                rowkey='estado_civil'
                label='Estado civil'
                stareable
                isStared={isRowPinned("estado_civil")}
                onStarToggle={() => togglePinRow("estado_civil")}>
                <Select
                  value={clientData?.datos_personales.estado_civil}
                  options={EstadoCivil}
                />
              </Table.Row>
              <Table.Row
                rowkey='regimen_matrimonial'
                label='Régimen matrimonial'
                stareable
                isStared={isRowPinned("regimen_matrimonial")}
                onStarToggle={() => togglePinRow("regimen_matrimonial")}>
                <Select
                  value={clientData?.datos_personales.regimen_matrimonial}
                  options={RegimenMarital}
                />
              </Table.Row>
            </Table>
          </Card.Content>
        </Card>
      </section>
    </main>
  );
}
