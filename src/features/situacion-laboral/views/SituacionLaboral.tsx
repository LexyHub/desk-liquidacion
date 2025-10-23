import { useClientDataContext } from "@shared/context";
import { LoadingView } from "@shared/components/loading/LoadingView";
import {
  SituacionLaboralActual,
  Remuneracion,
  Finiquito,
} from "@features/situacion-laboral/components";
import { useSyncSituacionLaboral } from "@features/situacion-laboral/hooks/useSyncSituacionLaboral";

export default function SituacionLaboral() {
  const { loading } = useClientDataContext();
  useSyncSituacionLaboral();

  if (loading) {
    return <LoadingView />;
  }

  return (
    <section className='p-4 flex flex-col gap-y-6'>
      <SituacionLaboralActual />

      <Remuneracion />

      <Finiquito />
    </section>
  );
}
