import { Card } from "@/components/ui/Card";
import { ContentHead } from "@/components/ui/ContentHead";
import { LoadingView } from "@/components/ui/loading/LoadingView";
import { Table } from "@/components/ui/Table";
import { useClientDataContext } from "@/context";
// import { usePinService } from "@/hooks";
import { Plus, Trash2 } from "@lib/icons";

export default function Deudas() {
  // const { isRowPinned, togglePinRow } = usePinService();
  // const { clientData, loading } = useClientDataContext();
  const { loading } = useClientDataContext();

  if (loading) {
    return <LoadingView />;
  }

  return (
    <main className='animate-fade-in animate-duration-100 animate-ease-in'>
      <ContentHead />
      <section className='p-4 flex flex-col gap-y-6'>
        <Card>
          <Card.Header className='w-full flex items-center justify-between'>
            <Card.Title>Registro de deudas</Card.Title>
            <button
              type='button'
              className='flex items-center gap-x-2 text-lexy-brand-secondary-dark leading-6 font-medium rounded-sm py-2 px-4 bg-white hover:bg-lexy-btn-secondary-hover border-2 border-lexy-brand-secondary-dark shadow-lexy-button cursor-pointer transition-all'>
              <Plus />
              Agregar deuda
            </button>
          </Card.Header>
          <Card.Content>
            <Table>
              <Table.Header className='grid-cols-[1fr_1fr_auto]'>
                <Table.HeaderCell>Tipo de crédito</Table.HeaderCell>
                <Table.HeaderCell>Monto</Table.HeaderCell>
                <div data-template className='w-fit p-2'>
                  <div className='size-6' />
                </div>
              </Table.Header>
              <Table.Content>
                <Table.Cell className='grid-cols-[1fr_1fr_auto]'>
                  <span>Crédito de Consumo</span>
                  <span>Crédito de Consumo 2</span>
                  <button
                    title='Eliminar deuda'
                    type='button'
                    className='w-fit rounded-sm text-lexy-text-primary border border-black/10 bg-white hover:bg-lexy-btn-secondary-hover transition-all cursor-pointer p-2'>
                    <Trash2 className='size-6' />
                  </button>
                </Table.Cell>
                <Table.Cell className='grid-cols-[1fr_1fr_auto]'>
                  <span>Crédito de Consumo</span>
                  <span>Crédito de Consumo 2</span>
                  <button
                    title='Eliminar deuda'
                    type='button'
                    className='w-fit rounded-sm text-lexy-text-primary border border-black/10 bg-white hover:bg-lexy-btn-secondary-hover transition-all cursor-pointer p-2'>
                    <Trash2 className='size-6' />
                  </button>
                </Table.Cell>
              </Table.Content>
            </Table>
          </Card.Content>
        </Card>
      </section>
    </main>
  );
}
