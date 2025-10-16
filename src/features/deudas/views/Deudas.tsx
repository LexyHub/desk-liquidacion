import { ContentHead } from "@shared/components/ui/ContentHead";
import { LoadingView } from "@shared/components/loading/LoadingView";
import { useClientDataContext } from "@shared/context";
import {
  RegistroDeDeudas,
  TotalDeDeudas,
  InfoFinancieraAdicional,
  InstrumentosFinancieros,
  DeudasFueraCMF,
} from "@features/deudas/components";

export default function Deudas() {
  const {
    // clientData,
    // addDeuda,
    // modifyDeuda,
    // removeDeuda,
    // totalDeudas,
    loading,
  } = useClientDataContext();

  if (loading) {
    return <LoadingView />;
  }

  return (
    <main className='animate-fade-in animate-duration-100 animate-ease-in'>
      <ContentHead />
      <section className='p-4 flex flex-col gap-y-6'>
        <RegistroDeDeudas />

        <TotalDeDeudas />

        <InfoFinancieraAdicional />

        <InstrumentosFinancieros />

        <DeudasFueraCMF />
      </section>
    </main>
  );
}
