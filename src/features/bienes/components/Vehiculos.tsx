import { useSidebar } from "@features/sidebar";
import { Select } from "@shared/components/form";
import { AQuien, HaceCuanto, QueMedio, SiONo } from "@shared/lib/options";
import { Card, Table } from "@shared/components/ui";
import { usePinService } from "@shared/hooks";
import { useBienesStore } from "../stores/useBienes.store";
import { useDatosPersonalesStore } from "@/features/datos-personales/stores/useDatosPersonales.store";

export function Vehiculos() {
  const { isRowPinned, togglePinRow } = usePinService();
  const { isInDistribution } = useSidebar();

  const { datosPP, updateDatosPPField } = useDatosPersonalesStore();
  const { bienes, updateBienesField } = useBienesStore();

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
              value={datosPP?.tiene_vehiculo ?? ""}
              onValueChange={(v) => updateDatosPPField("tiene_vehiculo", v)}
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
              value={bienes?.vehiculo.comprador ? "si" : ""}
              onValueChange={(v) =>
                updateBienesField("vehiculo", {
                  ...bienes!.vehiculo,
                  comprador: v,
                })
              }
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
              value={bienes?.vehiculo.mas_dos_anos_venta ?? ""}
              onValueChange={(v) =>
                updateBienesField("vehiculo", {
                  ...bienes!.vehiculo,
                  mas_dos_anos_venta: v,
                })
              }
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
              value={bienes?.vehiculo.comprador ?? ""}
              onValueChange={(v) =>
                updateBienesField("vehiculo", {
                  ...bienes!.vehiculo,
                  comprador: v,
                })
              }
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
              value={bienes?.vehiculo.medio_compra ?? ""}
              onValueChange={(v) =>
                updateBienesField("vehiculo", {
                  ...bienes!.vehiculo,
                  medio_compra: v,
                })
              }
              options={QueMedio}
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
