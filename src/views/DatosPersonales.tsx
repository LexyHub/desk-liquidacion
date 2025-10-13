import { Card } from "@components/ui/Card";
import { ContentHead } from "@components/ui/ContentHead";
import { Table } from "@components/ui/Table";
import { Input, Select, SearchableSelect } from "@components/form";
import { useGeoData } from "@hooks";
import { EstadoCivil, RegimenMarital, SiONo } from "./options";
import { useClientDataContext } from "@context/clientData/useClientData";

export default function DatosPersonales() {
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
              <Table.Row rowkey='nombre' label='Nombre completo' stareable>
                <Input
                  value={clientData?.datos_personales.nombre}
                  onChange={() => console.log("Cambió el nombre")}
                />
              </Table.Row>
              <Table.Row rowkey='rut' label='RUT' stareable>
                <Input
                  value={clientData?.datos_personales.rut}
                  onChange={() => console.log("Cambió el RUT")}
                />
              </Table.Row>
              <Table.Row rowkey='nacionalidad' label='Nacionalidad' stareable>
                <SearchableSelect
                  value={clientData?.datos_personales.nacionalidad ?? ""}
                  options={countryOptions}
                  onValueChange={() => console.log("Cambió el país")}
                />
              </Table.Row>
              <Table.Row rowkey='profesion' label='Profesión' stareable>
                <Input
                  value={clientData?.datos_personales.profesion}
                  onChange={() => console.log("Cambió la profesión")}
                />
              </Table.Row>
              <Table.Row rowkey='juicios' label='Juicios pendientes' stareable>
                <Input
                  value={clientData?.datos_personales.juicios}
                  onChange={() => console.log("Cambió los juicios")}
                />
              </Table.Row>
              <Table.Row
                rowkey='procedimiento_concursal'
                label='Sometido a procedimiento concursal'
                stareable>
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
              <Table.Row rowkey='direccion' label='Dirección' stareable>
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
                stareable>
                <Select
                  value={clientData?.datos_personales.padres_fallecidos}
                  options={SiONo}
                />
              </Table.Row>
              <Table.Row
                rowkey='posesion_efectiva'
                label='Posesión efectiva realizada'
                stareable>
                <Select
                  value={clientData?.datos_personales.posesion_efectiva}
                  options={SiONo}
                />
              </Table.Row>
              <Table.Row
                rowkey='derechos_hereditarios'
                label='Derechos hereditarios'
                stareable>
                <Select
                  value={clientData?.datos_personales.derechos_hereditarios}
                  options={SiONo}
                />
              </Table.Row>
              <Table.Row rowkey='hijos' label='Hijos' stareable>
                <Select
                  value={clientData?.datos_personales.hijos}
                  options={SiONo}
                />
              </Table.Row>
              <Table.Row
                rowkey='recibe_alimentos'
                label='Recibe alimentos'
                stareable>
                <Select
                  value={clientData?.datos_personales.recibe_alimentos}
                  options={SiONo}
                />
              </Table.Row>
              <Table.Row
                rowkey='deuda_alimenticia'
                label='Tiene deuda de alimentos'
                stareable>
                <Select
                  value={clientData?.datos_personales.deuda_alimenticia}
                  options={SiONo}
                />
              </Table.Row>
              <Table.Row
                rowkey='regularizada'
                label='Están regularizados'
                stareable>
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
              <Table.Row rowkey='estado_civil' label='Estado civil' stareable>
                <Select
                  value={clientData?.datos_personales.estado_civil}
                  options={EstadoCivil}
                />
              </Table.Row>
              <Table.Row
                rowkey='regimen_matrimonial'
                label='Régimen matrimonial'
                stareable>
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
