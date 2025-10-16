import { useSidebar } from "@features/sidebar";
import { Select } from "@shared/components/form";
import { AQuien, HaceCuanto, QueMedio, SiONo } from "@shared/lib/options";
import { Card, Table } from "@shared/components/ui";
import { useClientDataContext } from "@shared/context";
import { usePinService } from "@shared/hooks";

export function Vehiculos() {
  const { isRowPinned, togglePinRow } = usePinService();
  const { isInDistribution } = useSidebar();
  //! TODO esto está hard-codeado. No se cambiará hasta que el backend esté listo.
  const { clientData } = useClientDataContext();
  return (
    <Card>
      <Card.Header>
        <Card.Title>Vehículos</Card.Title>
      </Card.Header>
      <Card.Content>
        <Table className='gap-y-2'>
          <Table.Row
            rowkey='tiene_vehiculo'
            label='Vehículo a su nombre'
            stareable
            isStared={isRowPinned("tiene_vehiculo")}
            onStarToggle={() => togglePinRow("tiene_vehiculo")}>
            <Select
              disabled={isInDistribution}
              value={clientData?.bienes?.vehiculos.posee_vehiculos}
              options={SiONo}
            />
          </Table.Row>
          <Table.Row
            rowkey='ha_vendido_vehiculo'
            label='Ha vendido algún vehículo'
            stareable
            isStared={isRowPinned("ha_vendido_vehiculo")}
            onStarToggle={() => togglePinRow("ha_vendido_vehiculo")}>
            <Select
              disabled={isInDistribution}
              value={clientData?.bienes?.vehiculos.ha_vendido_vehiculo}
              options={SiONo}
            />
          </Table.Row>
          <Table.Row
            rowkey='hace_cuanto_vehiculo'
            label='Hace cuanto vendió el vehículo'
            stareable
            isStared={isRowPinned("hace_cuanto_vehiculo")}
            onStarToggle={() => togglePinRow("hace_cuanto_vehiculo")}>
            <Select
              disabled={isInDistribution}
              value={clientData?.bienes?.vehiculos.hace_cuanto}
              options={HaceCuanto}
            />
          </Table.Row>
          <Table.Row
            rowkey='a_quien_vendio_vehiculo'
            label='A quién se lo vendió'
            stareable
            isStared={isRowPinned("a_quien_vendio_vehiculo")}
            onStarToggle={() => togglePinRow("a_quien_vendio_vehiculo")}>
            <Select
              disabled={isInDistribution}
              value={clientData?.bienes?.vehiculos.a_quien}
              options={AQuien}
            />
          </Table.Row>
          <Table.Row
            rowkey='a_traves_de_vehiculo'
            label='A través de qué medio'
            stareable
            isStared={isRowPinned("a_traves_de_vehiculo")}
            onStarToggle={() => togglePinRow("a_traves_de_vehiculo")}>
            <Select
              disabled={isInDistribution}
              value={clientData?.bienes?.vehiculos.a_traves_de}
              options={QueMedio}
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
