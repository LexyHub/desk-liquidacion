import { LoadingView } from "@shared/components/loading/LoadingView";
import { useClientStore } from "@shared/stores/useClientStore";
import {
  RegistroDeDeudas,
  TotalDeDeudas,
  InfoFinancieraAdicional,
  InstrumentosFinancieros,
  DeudasFueraCMF,
} from "@features/deudas/components";

export default function Deudas() {
  const loading = useClientStore((state) => state.isLoading);

  if (loading) {
    return <LoadingView />;
  }

  return (
    <section className='p-4 flex flex-col gap-y-6'>
      <RegistroDeDeudas />

      <TotalDeDeudas />

      <InfoFinancieraAdicional />

      <InstrumentosFinancieros />

      <DeudasFueraCMF />
    </section>
  );
}
