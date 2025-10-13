import { Input, Select } from "@/components/form";
import { Card } from "@/components/ui/Card";
import { ContentHead } from "@/components/ui/ContentHead";
import { Table } from "@/components/ui/Table";
import { useClientDataContext } from "@/context/clientData";
import { usePinService } from "@/hooks";
import { SiONo, TipoTrabajador, TipoTrabajo } from "./options";
import { DocumentButton } from "@/components/ui/DocumentButton";

export function SituacionLaboral() {
  const { isRowPinned, togglePinRow } = usePinService();
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
            <Card.Title>Situación laboral actual</Card.Title>
          </Card.Header>
          <Card.Content>
            <Table className='gap-y-2'>
              <Table.Row
                rowkey='trabajando'
                label='Trabajo actualmente'
                stareable
                isStared={isRowPinned("trabajando")}
                onStarToggle={() => togglePinRow("trabajando")}>
                <Select
                  options={SiONo}
                  value={clientData?.situacion_laboral.trabajando}
                />
              </Table.Row>
              <Table.Row
                rowkey='tipo_trabajo'
                label='Tipo de trabajo'
                stareable
                isStared={isRowPinned("tipo_trabajo")}
                onStarToggle={() => togglePinRow("tipo_trabajo")}>
                <Select
                  options={TipoTrabajo}
                  value={clientData?.situacion_laboral.tipo_trabajo}
                />
              </Table.Row>
              <Table.Row
                rowkey='tipo_trabajador'
                label='Público o Privado'
                stareable
                isStared={isRowPinned("tipo_trabajador")}
                onStarToggle={() => togglePinRow("tipo_trabajador")}>
                <Select
                  options={TipoTrabajador}
                  value={clientData?.situacion_laboral.tipo_trabajador}
                />
              </Table.Row>
              <Table.Row
                rowkey='cesante'
                label='Cesante el último año'
                stareable
                isStared={isRowPinned("cesante")}
                onStarToggle={() => togglePinRow("cesante")}>
                <Select
                  options={SiONo}
                  value={clientData?.situacion_laboral.cesante}
                />
              </Table.Row>
            </Table>
          </Card.Content>
        </Card>
        <Card>
          <Card.Header>
            <Card.Title>Remuneración</Card.Title>
          </Card.Header>
          <Card.Content>
            <Table className='gap-y-2'>
              <Table.Row
                rowkey='remuneracion'
                label='Remuneración mensual'
                stareable
                isStared={isRowPinned("remuneracion")}
                onStarToggle={() => togglePinRow("remuneracion")}>
                <Input
                  type='currency'
                  value={String(
                    clientData?.situacion_laboral.remuneracion || ""
                  )}
                  onChange={(value) =>
                    console.log("Nueva remuneración:", value)
                  }
                />
              </Table.Row>
              <Table.Row
                rowkey='bonos'
                label='Sobresueldo, bono o gratificación'
                stareable
                isStared={isRowPinned("bonos")}
                onStarToggle={() => togglePinRow("bonos")}>
                <Select
                  options={SiONo}
                  value={clientData?.situacion_laboral.bonos}
                />
              </Table.Row>
              <Table.Row
                rowkey='link_liquidacion'
                label='Última liquidación de sueldo'
                stareable
                isStared={isRowPinned("link_liquidacion")}
                onStarToggle={() => togglePinRow("link_liquidacion")}>
                <DocumentButton
                  document={
                    clientData?.situacion_laboral.link_liquidacion ?? ""
                  }
                  title='Última liquidación de sueldo'
                />
              </Table.Row>
            </Table>
          </Card.Content>
        </Card>
        <Card>
          <Card.Header>
            <Card.Title>Finiquito</Card.Title>
          </Card.Header>
          <Card.Content>
            <Table className='gap-y-2'>
              <Table.Row
                rowkey='finiquito'
                label='Finiquito últimos 12 meses'
                stareable
                isStared={isRowPinned("finiquito")}
                onStarToggle={() => togglePinRow("finiquito")}>
                <Select
                  options={SiONo}
                  value={clientData?.situacion_laboral.finiquito}
                />
              </Table.Row>
              <Table.Row
                rowkey='monto_finiquito'
                label='Monto del finiquito'
                stareable
                isStared={isRowPinned("monto_finiquito")}
                onStarToggle={() => togglePinRow("monto_finiquito")}>
                <Input
                  type='currency'
                  value={String(
                    clientData?.situacion_laboral.monto_finiquito || ""
                  )}
                  onChange={(value) =>
                    console.log("Nuevo monto finiquito:", value)
                  }
                />
              </Table.Row>
              <Table.Row
                rowkey='link_finiquito'
                label='Documento de finiquito'
                stareable
                isStared={isRowPinned("link_finiquito")}
                onStarToggle={() => togglePinRow("link_finiquito")}>
                <DocumentButton
                  document={clientData?.situacion_laboral.link_finiquito ?? ""}
                  title='Documento de finiquito'
                />
              </Table.Row>
            </Table>
          </Card.Content>
        </Card>
      </section>
    </main>
  );
}
