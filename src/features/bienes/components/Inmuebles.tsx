import { useSidebar } from "@features/sidebar";
import { Select } from "@shared/components/form";
import { Card, Table } from "@shared/components/ui";
import { usePinService } from "@shared/hooks";
import { SiONo } from "@shared/lib/options";
import { useBienesStore } from "../stores/useBienes.store";
import { useDatosPersonalesStore } from "@/features/datos-personales/stores/useDatosPersonales.store";

export function Inmuebles() {
  const { isRowPinned, togglePinRow } = usePinService();
  const { isInDistribution } = useSidebar();

  const datos = useBienesStore((state) => state.bienes);
  const updateDatos = useBienesStore((state) => state.updateBienesField);
  const datos_pp = useDatosPersonalesStore((state) => state.datosPP);
  const updateDatosPP = useDatosPersonalesStore(
    (state) => state.updateDatosPPField
  );

  return (
    <Card>
      <Card.Header>
        <Card.Title>Inmuebles</Card.Title>
      </Card.Header>
      <Card.Content>
        <Table className='gap-y-2'>
          <Table.Row
            rowkey='posee_inmuebles'
            label='Posee inmuebles'
            stareable
            isStared={isRowPinned("posee_inmuebles")}
            onStarToggle={() => togglePinRow("posee_inmuebles")}>
            <Select
              disabled={isInDistribution}
              value={datos_pp?.tiene_inmueble ?? ""}
              onValueChange={(v) => updateDatosPP("tiene_inmueble", v)}
              options={SiONo}
            />
          </Table.Row>
          <Table.Row
            rowkey='paga_cred_hipotecario'
            label='Paga crédito hipotecario'
            stareable
            isStared={isRowPinned("paga_cred_hipotecario")}
            onStarToggle={() => togglePinRow("paga_cred_hipotecario")}>
            <Select
              disabled={isInDistribution}
              value={datos?.inmueble.credito_hipotecario ?? ""}
              onValueChange={(v) =>
                updateDatos("inmueble", {
                  ...datos!.inmueble,
                  credito_hipotecario: v,
                })
              }
              options={SiONo}
            />
          </Table.Row>
          <Table.Row
            rowkey='tiene_codeudor'
            label='Tiene codeudor solidario'
            stareable
            isStared={isRowPinned("tiene_codeudor")}
            onStarToggle={() => togglePinRow("tiene_codeudor")}>
            <Select
              disabled={isInDistribution}
              value={datos?.inmueble.codeudor_solidario ?? ""}
              onValueChange={(v) =>
                updateDatos("inmueble", {
                  ...datos!.inmueble,
                  codeudor_solidario: v,
                })
              }
              options={SiONo}
            />
          </Table.Row>
          <Table.Row
            rowkey='al_dia_hipoteca'
            label='Al día con crédito hipotecario'
            stareable
            isStared={isRowPinned("al_dia_hipoteca")}
            onStarToggle={() => togglePinRow("al_dia_hipoteca")}>
            <Select
              disabled={isInDistribution}
              value={datos?.inmueble.al_dia ?? ""}
              onValueChange={(v) =>
                updateDatos("inmueble", { ...datos!.inmueble, al_dia: v })
              }
              options={SiONo}
            />
          </Table.Row>
          <Table.Row
            rowkey='hipoteco_ultimos_anos'
            label='Hipotecó en el último año'
            stareable
            isStared={isRowPinned("hipoteco_ultimos_anos")}
            onStarToggle={() => togglePinRow("hipoteco_ultimos_anos")}>
            <Select
              disabled={isInDistribution}
              value={datos?.inmueble.hipotecado ?? ""}
              onValueChange={(v) =>
                updateDatos("inmueble", { ...datos!.inmueble, hipotecado: v })
              }
              options={SiONo}
            />
          </Table.Row>
          <Table.Row
            rowkey='vendio_inmueble'
            label='Vendió algún inmueble o cuota'
            stareable
            isStared={isRowPinned("vendio_inmueble")}
            onStarToggle={() => togglePinRow("vendio_inmueble")}>
            <Select
              disabled={isInDistribution}
              value={datos?.bien.vendido ?? ""}
              onValueChange={(v) =>
                updateDatos("bien", { ...datos!.bien, vendido: v })
              }
              options={SiONo}
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
