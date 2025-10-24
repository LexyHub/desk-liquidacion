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

  const { bienes, updateBienesField } = useBienesStore();
  const { datosPP, updateDatosPPField } = useDatosPersonalesStore();

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
              value={datosPP?.tiene_inmueble ?? ""}
              onValueChange={(v) => updateDatosPPField("tiene_inmueble", v)}
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
              value={bienes?.inmueble.credito_hipotecario ?? ""}
              onValueChange={(v) =>
                updateBienesField("inmueble", {
                  ...bienes!.inmueble,
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
              value={bienes?.inmueble.codeudor_solidario ?? ""}
              onValueChange={(v) =>
                updateBienesField("inmueble", {
                  ...bienes!.inmueble,
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
              value={bienes?.inmueble.al_dia ?? ""}
              onValueChange={(v) =>
                updateBienesField("inmueble", {
                  ...bienes!.inmueble,
                  al_dia: v,
                })
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
              value={bienes?.inmueble.hipotecado ?? ""}
              onValueChange={(v) =>
                updateBienesField("inmueble", {
                  ...bienes!.inmueble,
                  hipotecado: v,
                })
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
              value={bienes?.bien.vendido ?? ""}
              onValueChange={(v) =>
                updateBienesField("bien", { ...bienes!.bien, vendido: v })
              }
              options={SiONo}
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
