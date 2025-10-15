import { Select } from "@shared/components/form";
import { Card, Table } from "@shared/components/ui";
import { useClientDataContext } from "@shared/context";
import { usePinService } from "@shared/hooks";
import { SiONo } from "@shared/lib/options";

export function Inmuebles() {
  const { isRowPinned, togglePinRow } = usePinService();
  //! TODO esto está hard-codeado. No se cambiará hasta que el backend esté listo.
  const { clientData } = useClientDataContext();

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
              value={clientData?.bienes?.inmuebles.posee_inmuebles}
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
              value={clientData?.bienes?.inmuebles.paga_cred_hipotecario}
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
              value={clientData?.bienes?.inmuebles.tiene_codeudor}
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
              value={clientData?.bienes?.inmuebles.al_dia_hipoteca}
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
              value={clientData?.bienes?.inmuebles.hipoteco_ultimos_anos}
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
              value={clientData?.bienes?.inmuebles.vendio_inmueble}
              options={SiONo}
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
