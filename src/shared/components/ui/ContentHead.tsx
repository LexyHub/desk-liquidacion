import { Eye, EyeClosed, UserSearch, Copy, Check } from "@shared/lib/icons";
import { Drive, PoderJudicial, SII } from "@shared/assets";
import { Card } from "./Card";
import { LinkButton } from "./LinkButton";
import { Table } from "./Table";
import { useClientStore } from "@shared/stores/useClientStore";
import { useHeaderUI } from "@features/header";
import { useSidebar } from "@features/sidebar";
import { cn } from "@/shared/lib/utils";
import { useMemo, useState } from "react";
import { notificationBus } from "@/features/notificaciones/lib/notificationBus";

export function ContentHead() {
  const { isOpen: isSidebarOpen } = useSidebar();
  const { isOpen: isMessageTabOpen } = useHeaderUI();
  const {
    clientData,
    isLoading,
    claveUnica,
    isLoadingClaveUnica,
    errorClaveUnica,
  } = useClientStore();

  const [isCUVisible, setIsCUVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const claveUnicaText = useMemo(() => {
    if (errorClaveUnica) return "Error al cargar";
    return claveUnica ?? "No disponible";
  }, [errorClaveUnica, claveUnica]);

  const handleCopyCU = () => {
    if (copied) return;
    if (claveUnica) {
      setCopied(true);
      navigator.clipboard
        .writeText(claveUnica)
        .then(() => {
          notificationBus.emit("notify", {
            id: crypto.randomUUID(),
            type: "success",
            message: "Clave única copiada al portapapeles",
            closeable: true,
          });
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          notificationBus.emit("notify", {
            id: crypto.randomUUID(),
            type: "error",
            message: "Error al copiar clave única",
            closeable: true,
          });
          setCopied(false);
        });
      return;
    }
    notificationBus.emit("notify", {
      id: crypto.randomUUID(),
      type: "info",
      message: "No hay clave única para copiar",
      closeable: true,
    });
  };

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
              loading={isLoading}
              value={clientData?.datos.nombres || "No disponible"}
            />
            <Table.Row
              className='justify-between'
              rowkey='rut'
              label='RUT'
              loading={isLoading}
              value={clientData?.datos.rut || "No disponible"}
            />
            <Table.Row
              className='justify-between'
              rowkey='clave_unica'
              label='Clave única'
              loading={isLoadingClaveUnica}>
              <div className='flex items-center text-[#666666]'>
                <span>
                  {isCUVisible
                    ? claveUnicaText
                    : "*".repeat(claveUnicaText.length)}
                </span>
                <button
                  type='button'
                  title='Mostrar/Ocultar clave unica'
                  className='cursor-pointer ml-2.5'
                  onClick={() => setIsCUVisible(!isCUVisible)}>
                  {isCUVisible ? (
                    <Eye className='size-6' />
                  ) : (
                    <EyeClosed className='size-6' />
                  )}
                </button>
                <button
                  type='button'
                  title='Copiar clave única'
                  className='cursor-pointer ml-4 size-fit px-2 py-2 text-lexy-brand-secondary-dark hover:bg-[#EAE6FF] transition-all rounded-sm'
                  onClick={handleCopyCU}>
                  {copied ? (
                    <Check className='size-6' />
                  ) : (
                    <Copy className='size-6' />
                  )}
                </button>
              </div>
            </Table.Row>
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
