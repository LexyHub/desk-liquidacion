import { ContentHead } from "@shared/components/ui/ContentHead";
import { useClientDataContext } from "@shared/context";
import { LoadingView } from "@shared/components/loading/LoadingView";
import {
  Identificacion,
  Domicilio,
  InformacionFamiliar,
  EstadoCivil,
} from "@features/datos-personales/components";

export default function DatosPersonales() {
  const { loading } = useClientDataContext();

  if (loading) {
    return <LoadingView />;
  }

  return (
    <main className='animate-fade-in animate-duration-100 animate-ease-in'>
      <ContentHead />
      <section className='p-4 flex flex-col gap-y-6'>
        <Identificacion />

        <Domicilio />

        <InformacionFamiliar />

        <EstadoCivil />
      </section>
    </main>
  );
}
