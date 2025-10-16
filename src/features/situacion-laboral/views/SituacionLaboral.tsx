import { ContentHead } from "@shared/components/ui/ContentHead";
import { useClientDataContext } from "@shared/context";
import { LoadingView } from "@shared/components/loading/LoadingView";
import {
  SituacionLaboralActual,
  Remuneracion,
  Finiquito,
} from "@features/situacion-laboral/components";

export default function SituacionLaboral() {
  const { loading } = useClientDataContext();

  if (loading) {
    return <LoadingView />;
  }

  return (
    <main className='animate-fade-in animate-duration-100 animate-ease-in'>
      <ContentHead />
      <section className='p-4 flex flex-col gap-y-6'>
        <SituacionLaboralActual />

        <Remuneracion />

        <Finiquito />
      </section>
    </main>
  );
}
