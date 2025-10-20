import { LoadingView } from "@shared/components/loading";
import { ContentHead } from "@shared/components/ui";
import { useClientDataContext } from "@shared/context";
import { Inmuebles } from "../components/Inmuebles";
import { Vehiculos } from "../components/Vehiculos";
import { Sociedades } from "../components/Sociedades";
import { SociedadesTable } from "../components/SociedadesTable";

export default function Bienes() {
  const { loading } = useClientDataContext();

  if (loading) {
    return <LoadingView />;
  }

  return (
    <main className='animate-fade-in animate-duration-100 animate-ease-in'>
      <ContentHead />
      <section className='p-4 flex flex-col gap-y-6'>
        <Inmuebles />

        <Vehiculos />

        {/* ACÁ VAN LAS SOCIEDADES PERO POR ERROR DE DISEÑO SE OMITIÓ */}
        <Sociedades />

        <SociedadesTable />
      </section>
    </main>
  );
}
