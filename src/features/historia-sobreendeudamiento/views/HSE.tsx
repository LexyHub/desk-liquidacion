// hse es historia sobreendeudamiento

import { LoadingView } from "@shared/components/loading";
import { useClientDataContext } from "@shared/context";
import { Historia } from "../components/Historia";
import { GastosMensuales } from "../components/GastosMensuales";
import { Save } from "@shared/lib/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useSidebar } from "@/features/sidebar";

export default function HSE() {
  const { idDefensoria } = useParams();
  const { loading } = useClientDataContext();
  const { setInDistribution } = useSidebar();
  const navigate = useNavigate();

  const handleNavigation = () => {
    setInDistribution(true);
    navigate(`/distribucion/${idDefensoria}`);
  };

  if (loading) {
    return <LoadingView />;
  }

  return (
    <section className='p-4 flex flex-col gap-y-6'>
      <Historia />

      <GastosMensuales />

      <button
        type='button'
        onClick={handleNavigation}
        className='py-2.5 px-6 flex items-center gap-x-2 font-medium leading-6 bg-lexy-brand-secondary-dark hover:bg-[#0B013C] text-white shadow-lexy-button rounded-sm transition-all cursor-pointer w-fit self-end mt-6'>
        <Save />
        Guardar entrevista
      </button>
    </section>
  );
}
