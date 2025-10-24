import { usePinService } from "@shared/hooks";
import { Card, Table } from "@shared/components/ui";
import { Select } from "@shared/components/form";
import { SiONo } from "@shared/lib/options";
import { useSidebar } from "@features/sidebar";
import { useDeudasStore } from "../stores/deudas.store";

export function InstrumentosFinancieros() {
  const { isInDistribution } = useSidebar();
  const { isRowPinned, togglePinRow } = usePinService();

  const { datos_financieros, updateDatosFinancierosField } = useDeudasStore();

  return (
    <Card>
      <Card.Header>
        <Card.Title>Instrumentos financieros</Card.Title>
      </Card.Header>
      <Card.Content>
        <Table className='gap-y-2'>
          <Table.Row
            rowkey='instrumento_tarjeta_credito'
            label='Tarjeta de crédito'
            stareable
            isStared={isRowPinned("instrumento_tarjeta_credito")}
            onStarToggle={() => togglePinRow("instrumento_tarjeta_credito")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              value={datos_financieros?.tarjeta_credito ?? ""}
              onValueChange={(v) =>
                updateDatosFinancierosField("tarjeta_credito", v)
              }
            />
          </Table.Row>
          <Table.Row
            rowkey='instrumento_chequera'
            label='Es codeudor solidario, aval o fiador'
            stareable
            isStared={isRowPinned("instrumento_chequera")}
            onStarToggle={() => togglePinRow("instrumento_chequera")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              value={datos_financieros?.chequera ?? ""}
              onValueChange={(v) => updateDatosFinancierosField("chequera", v)}
            />
          </Table.Row>
          <Table.Row
            rowkey='instrumento_cheques_protestados'
            label='Cheques protestados'
            stareable
            isStared={isRowPinned("instrumento_cheques_protestados")}
            onStarToggle={() =>
              togglePinRow("instrumento_cheques_protestados")
            }>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              value={datos_financieros?.cheques_protestados ?? ""}
              onValueChange={(v) =>
                updateDatosFinancierosField("cheques_protestados", v)
              }
            />
          </Table.Row>
          <Table.Row
            rowkey='instrumento_vv_sincobrar'
            label='Vales vista sin cobrar'
            stareable
            isStared={isRowPinned("instrumento_vv_sincobrar")}
            onStarToggle={() => togglePinRow("instrumento_vv_sincobrar")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              value={datos_financieros?.vales_sin_cobrar ?? ""}
              onValueChange={(v) =>
                updateDatosFinancierosField("vales_sin_cobrar", v)
              }
            />
          </Table.Row>
          <Table.Row
            rowkey='instrumento_vv_vencido'
            label='Vales vista vencidos'
            stareable
            isStared={isRowPinned("instrumento_vv_vencido")}
            onStarToggle={() => togglePinRow("instrumento_vv_vencido")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              value={datos_financieros?.vales_vencidos ?? ""}
              onValueChange={(v) =>
                updateDatosFinancierosField("vales_vencidos", v)
              }
            />
          </Table.Row>
          <Table.Row
            rowkey='instrumento_fondo_cooperativas'
            label='Fondos de cooperativas'
            stareable
            isStared={isRowPinned("instrumento_fondo_cooperativas")}
            onStarToggle={() => togglePinRow("instrumento_fondo_cooperativas")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              value={datos_financieros?.fondos_cooperativas ?? ""}
              onValueChange={(v) =>
                updateDatosFinancierosField("fondos_cooperativas", v)
              }
            />
          </Table.Row>
          <Table.Row
            rowkey='instrumento_criptomoneda'
            label='Criptomonedas'
            stareable
            isStared={isRowPinned("instrumento_criptomoneda")}
            onStarToggle={() => togglePinRow("instrumento_criptomoneda")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              value={datos_financieros?.criptomonedas ?? ""}
              onValueChange={(v) =>
                updateDatosFinancierosField("criptomonedas", v)
              }
            />
          </Table.Row>
          <Table.Row
            rowkey='instrumento_libreta_ahorro'
            label='Libreta de ahorros'
            stareable
            isStared={isRowPinned("instrumento_libreta_ahorro")}
            onStarToggle={() => togglePinRow("instrumento_libreta_ahorro")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              value={datos_financieros?.libreta_ahorros ?? ""}
              onValueChange={(v) =>
                updateDatosFinancierosField("libreta_ahorros", v)
              }
            />
          </Table.Row>
          <Table.Row
            rowkey='instrumento_fondos_mutuos'
            label='Fondos mutuos'
            stareable
            isStared={isRowPinned("instrumento_fondos_mutuos")}
            onStarToggle={() => togglePinRow("instrumento_fondos_mutuos")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              value={datos_financieros?.fondos_mutuos ?? ""}
              onValueChange={(v) =>
                updateDatosFinancierosField("fondos_mutuos", v)
              }
            />
          </Table.Row>
          <Table.Row
            rowkey='instrumento_apv'
            label='APV'
            stareable
            isStared={isRowPinned("instrumento_apv")}
            onStarToggle={() => togglePinRow("instrumento_apv")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              value={datos_financieros?.apv ?? ""}
              onValueChange={(v) => updateDatosFinancierosField("apv", v)}
            />
          </Table.Row>
          <Table.Row
            rowkey='instrumento_deposito_plazo'
            label='Depósito a plazo'
            stareable
            isStared={isRowPinned("instrumento_deposito_plazo")}
            onStarToggle={() => togglePinRow("instrumento_deposito_plazo")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              value={datos_financieros?.deposito_plazo ?? ""}
              onValueChange={(v) =>
                updateDatosFinancierosField("deposito_plazo", v)
              }
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
