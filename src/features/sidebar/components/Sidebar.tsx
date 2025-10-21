import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftToLine,
  Briefcase,
  Building2,
  CreditCard,
  LogOut,
  ScrollText,
  UserRound,
  Send,
  LexyLogo,
  YoutubeLogo,
} from "@shared/lib/icons";
import { SidebarItem } from "./SidebarItem";
import { VideoDialog } from "./VideoDialog";
import { useSidebar } from "@features/sidebar";
import { cn } from "@shared/lib/utils";
import { useAuth } from "@features/auth";
import { dismiss, useNotify } from "@/features/notificaciones";

export function Sidebar() {
  const { idDefensoria } = useParams();
  const { pathname } = useLocation();
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const { isOpen, toggle, isInDistribution, setInDistribution } = useSidebar();
  // test notificaciones
  const { notify } = useNotify();

  const [showVideoDialog, setShowVideoDialog] = useState(false);

  const handleOptionClick = async (to: string) => {
    if (to === pathname) return;
    //! ESTO ES SOLO PARA TEST Y SIMULAR GUARDADO ANTES DE NAVEGAR
    // Después hay que quitarlo y cambiarlo por una llamada real a guardado
    const pretifiedPath = pathname
      .split("/")[1]
      .replace("/", "")
      .replaceAll("-", " ");
    const idSaving = notify({
      type: "info",
      message: `Guardando datos de "${pretifiedPath}"...`,
      closeable: true,
    });
    await new Promise((resolve) => setTimeout(resolve, 500));
    dismiss(idSaving);
    notify({
      type: "success",
      message: `Datos de "${pretifiedPath}" guardados correctamente.`,
      closeable: true,
    });
    //!
    navigate(to);
  };

  const backToEntrevista = () => {
    if (!idDefensoria) return;
    setInDistribution(false);
    navigate(`/datos-personales/${idDefensoria}`);
  };

  return (
    <>
      <VideoDialog isOpen={showVideoDialog} toggleOpen={setShowVideoDialog} />
      <aside
        className={cn(
          "flex flex-col h-full bg-white border-r border-r-lexy-border-table py-6 transition-all duration-300",
          { "w-64": isOpen, "w-20": !isOpen }
        )}>
        <section className='header px-4'>
          <div
            className={cn("flex items-center justify-between py-4", {
              "flex-col gap-y-7": !isOpen,
            })}>
            <div className='flex items-center gap-x-2'>
              <LexyLogo className='size-6' />
              {isOpen && (
                <h2 className='text-[#0B013C] leading-6 font-medium'>
                  Desk Liquidación
                </h2>
              )}
            </div>
            <button
              title='Expandir / Contraer menú'
              type='button'
              onClick={toggle}
              className={cn(
                "flex items-center justify-center cursor-pointer p-1 border border-lexy-border-table text-lexy-brand-secondary-dark rounded-sm hover:bg-lexy-btn-secondary-hover transition-colors",
                { "size-6": isOpen, "rotate-180 size-8": !isOpen }
              )}>
              <ArrowLeftToLine className='size-4' />
            </button>
          </div>
          {isOpen && (
            <div className='flex items-center justify-between my-6'>
              <button
                type='button'
                onClick={backToEntrevista}
                className={cn(
                  "cursor-pointer text-sm leading-5 font-medium px-4 py-1 rounded-sm h-8 transition-all",
                  {
                    "text-lexy-text-secondary bg-lexy-bg-card border border-lexy-border-table":
                      isInDistribution,
                    "text-lexy-bg-card bg-[#0B013C]": !isInDistribution,
                  }
                )}>
                Entrevista
              </button>
              <button
                type='button'
                className={cn(
                  "cursor-pointer text-sm leading-5 font-medium px-4 py-1 rounded-sm h-8 transition-all",
                  {
                    "text-lexy-text-secondary bg-lexy-bg-card border border-lexy-border-table":
                      !isInDistribution,
                    "text-lexy-bg-card bg-[#0B013C]": isInDistribution,
                  }
                )}>
                Distribución
              </button>
            </div>
          )}
        </section>
        <div className='w-full h-px bg-lexy-border-table' />
        <section className='intersection py-4 px-4'>
          <button
            type='button'
            onClick={() => setShowVideoDialog(true)}
            title='Reproducir vídeo'
            aria-description='Reproducir vídeo de presentación sobre liquidación'
            className={cn(
              "w-full flex items-center justify-center gap-x-2.5 cursor-pointer rounded-sm border border-lexy-btn-secondary-hover bg-lexy-bg-secondary hover:bg-[#E4DFFF] hover:border-[#EEEBFF] transition-all text-lexy-brand-secondary-dark shadow-lexy-button",
              { "p-2": !isOpen, "px-4 py-2": isOpen }
            )}>
            <YoutubeLogo />
            {isOpen && (
              <span className='leading-6 font-medium'>Presentación</span>
            )}
          </button>
        </section>
        <div className='w-full h-px bg-lexy-border-table' />
        <section
          className={cn("body flex flex-col gap-y-4 py-4 px-4 flex-grow", {
            "items-center": !isOpen,
          })}>
          <SidebarItem
            icon={UserRound}
            label='Datos personales'
            to={`/datos-personales/${idDefensoria}`}
            expanded={isOpen}
            active={pathname.startsWith("/datos-personales")}
            onClick={handleOptionClick}
          />
          <SidebarItem
            icon={Briefcase}
            label='Situación laboral'
            to={`/situacion-laboral/${idDefensoria}`}
            expanded={isOpen}
            active={pathname.startsWith("/situacion-laboral")}
            onClick={handleOptionClick}
          />
          <SidebarItem
            icon={CreditCard}
            label='Deudas'
            to={`/deudas/${idDefensoria}`}
            expanded={isOpen}
            active={pathname.startsWith("/deudas")}
            onClick={handleOptionClick}
          />
          <SidebarItem
            icon={Building2}
            label='Bienes'
            to={`/bienes/${idDefensoria}`}
            expanded={isOpen}
            active={pathname.startsWith("/bienes")}
            onClick={handleOptionClick}
          />
          <SidebarItem
            icon={ScrollText}
            label='Historia de SE'
            to={`/historia-se/${idDefensoria}`}
            expanded={isOpen}
            active={pathname.startsWith("/historia-se")}
            onClick={handleOptionClick}
          />
          {isInDistribution && (
            <SidebarItem
              icon={Send}
              label='Distribución'
              to={`/distribucion/${idDefensoria}`}
              expanded={isOpen}
              active={pathname.startsWith("/distribucion")}
              onClick={handleOptionClick}
            />
          )}
        </section>

        <section className='px-4'>
          <button
            type='button'
            title='Cerrar sesión'
            aria-description='Cerrar sesión y volver a la pantalla de inicio de sesión'
            onClick={logOut}
            className={cn(
              "flex items-center justify-center leading-6 gap-x-2.5 rounded-sm font-medium text-lexy-text-secondary bg-lexy-bg-card hover:bg-[#EAE6FF] border border-lexy-border-table w-full py-2 transition-colors cursor-pointer",
              { "p-3 justify-center": !isOpen }
            )}>
            <LogOut className='size-5' />
            {isOpen && <span>Cerrar sesión</span>}
          </button>
        </section>
      </aside>
    </>
  );
}
