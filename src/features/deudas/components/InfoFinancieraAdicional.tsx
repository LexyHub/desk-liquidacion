import { usePinService } from "@shared/hooks";
import { Input, Select } from "@shared/components/form";
import { Card, Table } from "@shared/components/ui";
import { SiONo } from "@shared/lib/options";

export function InfoFinancieraAdicional() {
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
              options={SiONo}
              onValueChange={() => console.log("Cambió el cae")}
            />
          </Table.Row>
          <Table.Row
            rowkey='codeudor'
            label='Es codeudor solidario, aval o fiador'
            stareable
            isStared={isRowPinned("codeudor")}
            onStarToggle={() => togglePinRow("codeudor")}>
            <Select
              options={SiONo}
              onValueChange={() => console.log("Cambió el codeudor")}
            />
          </Table.Row>
          <Table.Row
            rowkey='ultima_vez_credito'
            label='¿Cuándo fue la última vez que sacó un crédito, reventó una tarjeta, etc?'
            stareable
            isStared={isRowPinned("ultima_vez_credito")}
            onStarToggle={() => togglePinRow("ultima_vez_credito")}>
            <Input
              value=''
              placeholder='Escribe aquí...'
              onChange={() => console.log("Cambió el ultima_vez_credito")}
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
