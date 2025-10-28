import { usePinService } from "@shared/hooks";
import { Input, Select } from "@shared/components/form";
import { Card, Table } from "@shared/components/ui";
import { SiONo } from "@shared/lib/options";
import { useSidebar } from "@features/sidebar";
import { useDeudasStore } from "../stores/deudas.store";
import { useDatosPersonalesStore } from "@/features/datos-personales/stores/useDatosPersonales.store";

export function InfoFinancieraAdicional() {
  const { isInDistribution } = useSidebar();
  const { isRowPinned, togglePinRow } = usePinService();

  const { datos_financieros, patchDatosFinancieros } = useDeudasStore();
  const { datosPP, patchDatosPP } = useDatosPersonalesStore();

  return (
    <Card>
      <Card.Header>
        <Card.Title>Información financiera adicional</Card.Title>
      </Card.Header>
      <Card.Content>
        <Table className='gap-y-2'>
          <Table.Row
            rowkey='cae'
            label='Tiene CAE'
            stareable
            isStared={isRowPinned("cae")}
            onStarToggle={() => togglePinRow("cae")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              value={datosPP?.cae_fondo ?? ""}
              onValueChange={(v) => patchDatosPP({ cae_fondo: v })}
            />
          </Table.Row>
          <Table.Row
            rowkey='codeudor'
            label='Es codeudor solidario, aval o fiador'
            stareable
            isStared={isRowPinned("codeudor")}
            onStarToggle={() => togglePinRow("codeudor")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              value={datosPP?.aval ?? ""}
              onValueChange={(v) => patchDatosPP({ aval: v })}
            />
          </Table.Row>
          <Table.Row
            rowkey='ultima_vez_credito'
            label='¿Cuándo fue la última vez que sacó un crédito, reventó una tarjeta, etc?'
            stareable
            isStared={isRowPinned("ultima_vez_credito")}
            onStarToggle={() => togglePinRow("ultima_vez_credito")}>
            <Input
              disabled={isInDistribution}
              placeholder='Escribe aquí...'
              value={datos_financieros?.ultimo_credito ?? ""}
              onChange={(e) =>
                patchDatosFinancieros({ ultimo_credito: e as string })
              }
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
