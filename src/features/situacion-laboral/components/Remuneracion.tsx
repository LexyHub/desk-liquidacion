import { useSidebar } from "@features/sidebar";
import { Input, Select } from "@shared/components/form";
import { Card, DocumentButton, Table } from "@shared/components/ui";
import { usePinService } from "@shared/hooks";
import { SiONo } from "@shared/lib/options";
import { useSituacionLaboralStore } from "../stores/useSituacionLaboral.store";
import { useUFService } from "@/shared/hooks/useUFService";
import clsx from "clsx";
import { useMemo } from "react";

export function Remuneracion() {
  const { isInDistribution } = useSidebar();
  const { isRowPinned, togglePinRow } = usePinService();
  const { clpToUF } = useUFService();

  const { situacion_laboral, updateField } = useSituacionLaboralStore();

  const hasHighRemuneration = useMemo(
    () => clpToUF(situacion_laboral?.remuneracion || 0)! > 56,
    [situacion_laboral?.remuneracion, clpToUF]
  );

  return (
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
            onStarToggle={() => togglePinRow("remuneracion")}
            className={clsx({ "bg-[#FFDFDF]": hasHighRemuneration })}>
            <Input
              type='currency'
              disabled={isInDistribution}
              value={String(situacion_laboral?.remuneracion || "")}
              onChange={(v) => updateField("remuneracion", v as number)}
            />
          </Table.Row>
          <Table.Row
            rowkey='bonos'
            label='Sobresueldo, bono o gratificación'
            stareable
            isStared={isRowPinned("bonos")}
            onStarToggle={() => togglePinRow("bonos")}>
            <Select
              disabled={isInDistribution}
              options={SiONo}
              value={situacion_laboral?.bono_gratificacion}
              onValueChange={(value) =>
                updateField("bono_gratificacion", value)
              }
            />
          </Table.Row>
          <Table.Row
            rowkey='link_liquidacion'
            label='Última liquidación de sueldo'
            stareable
            isStared={isRowPinned("link_liquidacion")}
            onStarToggle={() => togglePinRow("link_liquidacion")}>
            <DocumentButton
              document={situacion_laboral?.link_ultima_liquidacion ?? ""}
              title='Última liquidación de sueldo'
            />
          </Table.Row>
        </Table>
      </Card.Content>
    </Card>
  );
}
