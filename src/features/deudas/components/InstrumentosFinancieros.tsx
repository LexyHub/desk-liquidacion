import { usePinService } from "@shared/hooks";
import { Card, Table } from "@shared/components/ui";
import { Select } from "@shared/components/form";
import { SiONo } from "@shared/lib/options";
import { useSidebar } from "@features/sidebar";

export function InstrumentosFinancieros() {
  const { isInDistribution } = useSidebar();
  const { isRowPinned, togglePinRow } = usePinService();

  /*
  Próximamente se utilizará
  const {
    clientData
  } = useClientDataContext();
  */

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
              onValueChange={() =>
                console.log("Cambió el instrumento_tarjeta_credito")
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
              onValueChange={() =>
                console.log("Cambió el instrumento_chequera")
              }
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
              onValueChange={() =>
                console.log("Cambió el instrumento_cheques_protestados")
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
              onValueChange={() =>
                console.log("Cambió el instrumento_vv_sincobrar")
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
              onValueChange={() =>
                console.log("Cambió el instrumento_vv_vencido")
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
              onValueChange={() =>
                console.log("Cambió el instrumento_fondo_cooperativas")
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
              onValueChange={() =>
                console.log("Cambió el instrumento_criptomoneda")
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
              onValueChange={() =>
                console.log("Cambió el instrumento_libreta_ahorro")
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
              onValueChange={() =>
                console.log("Cambió el instrumento_fondos_mutuos")
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
              onValueChange={() => console.log("Cambió el instrumento_apv")}
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
              onValueChange={() =>
                console.log("Cambió el instrumento_deposito_plazo")
              }
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
