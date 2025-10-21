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
    <section className='p-4 flex flex-col gap-y-6'>
      <Identificacion />

      <Domicilio />

      <InformacionFamiliar />

      <EstadoCivil />
    </section>
  );
}
