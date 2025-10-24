import { useClientStore } from "@shared/stores/useClientStore";
import { LoadingView } from "@shared/components/loading/LoadingView";
import {
  Identificacion,
  Domicilio,
  InformacionFamiliar,
  EstadoCivil,
} from "@features/datos-personales/components";
import { useSyncDatosPersonales } from "../hooks/useSyncDatosPersonales";

export default function DatosPersonales() {
  const loading = useClientStore((state) => state.isLoading);

  useSyncDatosPersonales();

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
