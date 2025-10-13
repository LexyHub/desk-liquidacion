import { UserSearch } from "@/lib/icons";
import { Drive, PoderJudicial, SII } from "@assets";
import { useSidebar } from "@context/sidebar";
import { useHeaderUI } from "@context/headerUI";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { Card } from "./Card";
import { LinkButton } from "./LinkButton";
import { Table } from "./Table";

export function ContentHead() {
  const { isOpen: isSidebarOpen } = useSidebar();
  const { isOpen: isMessageTabOpen } = useHeaderUI();

  //! Hard-codeado por mientras
  const ClientData = {
    nombre: "Moonie",
    rut: "20.919.721-9",
    clave_unica: "Er papu 123",
  };
  return (
    <section className='p-4 grid grid-cols-[auto_1fr] gap-x-6 h-fit border-b border-b-lexy-border-table'>
      <Card
        className={twMerge(
          "min-w-md max-w-md transition-all",
          clsx({ "min-w-xs max-w-xs": isSidebarOpen && isMessageTabOpen })
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
              value={ClientData.nombre}
            />
            <Table.Row
              className='justify-between'
              rowkey='rut'
              label='RUT'
              value={ClientData.rut}
            />
            <Table.Row
              className='justify-between'
              rowkey='clave_unica'
              label='Clave única'
              value={ClientData.clave_unica}
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
            url='https://www.drive.google.com/drive/'
          />
          <LinkButton
            logo_url={SII}
            title='SII'
            subtitle='Servicio de Impuestos Internos'
            url='https://www.drive.google.com/drive/'
          />
        </Card.Content>
      </Card>
    </section>
  );
}
