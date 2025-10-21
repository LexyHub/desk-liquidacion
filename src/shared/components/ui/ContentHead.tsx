import { UserSearch } from "@shared/lib/icons";
import { Drive, PoderJudicial, SII } from "@shared/assets";
import { Card } from "./Card";
import { LinkButton } from "./LinkButton";
import { Table } from "./Table";
import { useClientDataContext } from "@shared/context";
import { useHeaderUI } from "@features/header";
import { useSidebar } from "@features/sidebar";
import { cn } from "@/shared/lib/utils";

export function ContentHead() {
  const { isOpen: isSidebarOpen } = useSidebar();
  const { isOpen: isMessageTabOpen } = useHeaderUI();
  const { clientData } = useClientDataContext();
  const claveUnica = "*********";
  return (
    <section className='p-4 grid grid-cols-[auto_1fr] gap-x-6 h-fit border-b border-b-lexy-border-table'>
      <Card
        className={cn(
          "min-w-72 max-w-72 lg:min-w-md lg:max-w-md transition-all",
          cn({
            "min-w-72 max-w-72 lg:min-w-72 lg:max-w-72":
              isSidebarOpen && isMessageTabOpen,
          })
        )}>
        <Card.Header>
          <Card.Icon>
            <UserSearch className='size-6' />
          </Card.Icon>
          <Card.Title>Datos generales cliente</Card.Title>
        </Card.Header>
        <Card.Content>
          <Table>
            <Table.Row
              className='justify-between'
              rowkey='nombre'
              label='Nombre'
              value={clientData?.datos_personales.nombre}
            />
            <Table.Row
              className='justify-between'
              rowkey='rut'
              label='RUT'
              value={clientData?.datos_personales.rut}
            />
            <Table.Row
              className='justify-between'
              rowkey='clave_unica'
              label='Clave única'
              value={claveUnica}
            />
          </Table>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content className='gap-y-2'>
          <LinkButton
            logo_url={Drive}
            title='Google Drive'
            subtitle='Liquidación'
            url='https://www.drive.google.com/drive/'
          />
          <LinkButton
            logo_url={PoderJudicial}
            title='Poder Judicial'
            subtitle='Portal sistema judicial'
            url='https://www.pjud.cl/'
          />
          <LinkButton
            logo_url={SII}
            title='SII'
            subtitle='Servicio de Impuestos Internos'
            url='https://sii.cl/'
          />
        </Card.Content>
      </Card>
    </section>
  );
}
