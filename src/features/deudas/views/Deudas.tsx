import { LoadingView } from "@shared/components/loading/LoadingView";
import { useClientDataContext } from "@shared/context";
import {
  RegistroDeDeudas,
  TotalDeDeudas,
  InfoFinancieraAdicional,
  InstrumentosFinancieros,
  DeudasFueraCMF,
} from "@features/deudas/components";
import { useSyncDeudas } from "../hooks/useSyncDeudas";

export default function Deudas() {
  const { loading } = useClientDataContext();

  useSyncDeudas();

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
