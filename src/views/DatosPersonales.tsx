import { Card } from "@components/ui/Card";
import { ContentHead } from "@/components/ui/ContentHead";
import { Table } from "@components/ui/Table";
import { Select } from "@/components/form/Select";
import { SearchableSelect } from "@/components/form/SearchableSelect";
import { Input } from "@/components/form/Input";
import { useGeoData } from "@/hooks/useGeodata";
import { EstadoCivil, RegimenMarital, SiONo } from "./options";

export default function DatosPersonales() {
  //! TODO esto está hard-codeado. No se cambiará hasta que el backend esté listo.
  const { countryOptions } = useGeoData();
  const country = "CL";

  return (
    <main className='animate-fade-in animate-duration-200'>
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
                  value='Moonie Silva'
                  onChange={() => console.log("Cambió el nombre")}
                />
              </Table.Row>
              <Table.Row rowkey='rut' label='RUT' stareable>
                <Input
                  value='20.919.721-9'
                  onChange={() => console.log("Cambió el RUT")}
                />
              </Table.Row>
              <Table.Row rowkey='nacionalidad' label='Nacionalidad' stareable>
                <SearchableSelect
                  value={country}
                  options={countryOptions}
                  onValueChange={() => console.log("Cambió el país")}
                />
              </Table.Row>
              <Table.Row rowkey='profesion' label='Profesión' stareable>
                <Input
                  value='Cazadadora de recompensas'
                  onChange={() => console.log("Cambió la profesión")}
                />
              </Table.Row>
              <Table.Row rowkey='juicios' label='Juicios pendientes' stareable>
                <Input
                  value='Fraude al fisco'
                  onChange={() => console.log("Cambió los juicios")}
                />
              </Table.Row>
              <Table.Row
                rowkey='procedimiento_concursal'
                label='Sometido a procedimiento concursal'
                stareable>
                <Select
                  options={SiONo}
                  value='si'
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
                  value='Calle Falsa 123'
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
                <Select value='no' options={SiONo} />
              </Table.Row>
              <Table.Row
                rowkey='posesion_efectiva'
                label='Posesión efectiva realizada'
                stareable>
                <Select value='no' options={SiONo} />
              </Table.Row>
              <Table.Row
                rowkey='derechos_hereditarios'
                label='Derechos hereditarios'
                stareable>
                <Select value='no' options={SiONo} />
              </Table.Row>
              <Table.Row rowkey='hijos' label='Hijos' stareable>
                <Select value='no' options={SiONo} />
              </Table.Row>
              <Table.Row
                rowkey='recibe_alimentos'
                label='Recibe alimentos'
                stareable>
                <Select value='no' options={SiONo} />
              </Table.Row>
              <Table.Row
                rowkey='deuda_alimenticia'
                label='Tiene deuda de alimentos'
                stareable>
                <Select value='no' options={SiONo} />
              </Table.Row>
              <Table.Row
                rowkey='regularizada'
                label='Están regularizados'
                stareable>
                <Select value='no' options={SiONo} />
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
                <Select value='soltero' options={EstadoCivil} />
              </Table.Row>
              <Table.Row
                rowkey='regimen_matrimonial'
                label='Régimen matrimonial'
                stareable>
                <Select value='no' options={RegimenMarital} />
              </Table.Row>
            </Table>
          </Card.Content>
        </Card>
      </section>
    </main>
  );
}
