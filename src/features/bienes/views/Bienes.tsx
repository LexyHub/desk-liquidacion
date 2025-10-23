import { LoadingView } from "@shared/components/loading";
import { useClientDataContext } from "@shared/context";
import { Inmuebles } from "../components/Inmuebles";
import { Vehiculos } from "../components/Vehiculos";
import { Sociedades } from "../components/Sociedades";
import { SociedadesTable } from "../components/SociedadesTable";
import { useSyncBienes } from "../hooks/useSyncBienes";

export default function Bienes() {
  const { loading } = useClientDataContext();

  useSyncBienes();

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
