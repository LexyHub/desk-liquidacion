import { LoadingView } from "@shared/components/loading";
import { useClientStore } from "@shared/stores/useClientStore";
import { Inmuebles } from "../components/Inmuebles";
import { Vehiculos } from "../components/Vehiculos";
import { Sociedades } from "../components/Sociedades";
import { SociedadesTable } from "../components/SociedadesTable";

export default function Bienes() {
  const loading = useClientStore((state) => state.isLoading);

  if (loading) {
    return <LoadingView />;
  }

  return (
    <section className='p-4 flex flex-col gap-y-6'>
      <Inmuebles />

      <Vehiculos />

      <Sociedades />

      <SociedadesTable />
    </section>
  );
}
