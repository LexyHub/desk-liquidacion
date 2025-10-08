import clsx from "clsx";
import { lazy, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftToLine,
  Briefcase,
  Building2,
  CreditCard,
  ScrollText,
  UserRound,
  X,
} from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../dialog";
// import { EmbeddedVideo } from "../EmbeddedVideo";
const EmbeddedVideo = lazy(() => import("../EmbeddedVideo"));

export function Sidebar() {
  const { clientId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const isDistribution = pathname.startsWith("/distribucion");

  const handleOptionClick = (to: string) => {
    if (to === pathname) return;
    navigate(to);
  };

  return (
    <>
      <Dialog open={showVideoDialog}>
        <DialogContent showCloseButton={false} className="sm:max-w-2xl w-full border border-lexy-border-table p-0 gap-y-0">
          <DialogHeader className="flex flex-row items-center justify-between p-4">
            <DialogTitle className="font-normal">Vídeo: <strong>Presentación Liquidación</strong></DialogTitle>
            <DialogDescription></DialogDescription>
            <button
              type="button"
              title="Cerrar vídeo"
              aria-description="Cerrar vídeo de presentación de liquidación"
              onClick={() => setShowVideoDialog(false)}
              className="flex items-center justify-center size-9 bg-white border border-black/10 hover:bg-lexy-border-table transition-colors rounded-full cursor-pointer"
            >
              <X />
            </button>
          </DialogHeader>
          <div className="w-full h-96">
            <EmbeddedVideo
              title="Presentación Liquidación"
              videoId="xlX7NwTq9Zo"
            />
          </div>
        </DialogContent>
      </Dialog>
      <aside
        className={clsx(
          "flex flex-col h-full bg-white border-r border-r-lexy-border-table py-6 transition-all duration-300",
          { "w-64": expanded, "w-20": !expanded }
        )}
      >
        <section className="header px-4">
          <div
            className={clsx("flex items-center justify-between py-4", {
              "flex-col gap-y-7": !expanded,
            })}
          >
            <div className="flex items-center gap-x-2">
              <svg
                className="size-6"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m19.344 23.642 4.805-4.804a.497.497 0 0 0 0-.703L6.367.354a.497.497 0 0 0-.702 0L.86 5.159a.497.497 0 0 0 0 .702l17.781 17.781a.497.497 0 0 0 .703 0"
                  fill="#0B013C"
                />
                <path
                  d="M6.016 20.019.51 14.512l9.242-5.266 5.507 5.507z"
                  fill="#9D90FC"
                />
                <path
                  d="m6.017 20.018-.01 3.77a.5.5 0 0 0 .36-.145l8.892-8.891z"
                  fill="#27198E"
                />
                <path
                  d="m6.007 23.789.01-3.77-5.508-5.507L.5 18.275c0 .122.046.239.127.33l5.038 5.038a.5.5 0 0 0 .342.145M24.149 5.16 19.344.354a.497.497 0 0 0-.703 0L9.75 9.245l5.507 5.507 8.89-8.89a.5.5 0 0 0 0-.704z"
                  fill="#4429CC"
                />
              </svg>
              {expanded && (
                <h2 className="text-[#0B013C] leading-6 font-medium">
                  Desk Liquidación
                </h2>
              )}
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className={clsx(
                "flex items-center justify-center cursor-pointer p-1 border border-lexy-border-table text-lexy-brand-secondary-dark rounded-sm hover:bg-lexy-btn-secondary-hover transition-colors",
                { "size-6": expanded, "rotate-180 size-8": !expanded }
              )}
            >
              <ArrowLeftToLine className="size-4" />
            </button>
          </div>
          {expanded && (
            <div className="flex items-center justify-between my-6">
              <button
                type="button"
                className={clsx(
                  "cursor-pointer text-sm leading-5 font-medium px-4 py-1 rounded-sm h-8 transition-all",
                  {
                    "text-lexy-text-secondary bg-lexy-bg-card border border-lexy-border-table":
                      isDistribution,
                    "text-lexy-bg-card bg-[#0B013C]": !isDistribution,
                  }
                )}
              >
                Entrevista
              </button>
              <button
                type="button"
                className={clsx(
                  "cursor-pointer text-sm leading-5 font-medium px-4 py-1 rounded-sm h-8 transition-all",
                  {
                    "text-lexy-text-secondary bg-lexy-bg-card border border-lexy-border-table":
                      !isDistribution,
                    "text-lexy-bg-card bg-[#0B013C]": isDistribution,
                  }
                )}
              >
                Distribución
              </button>
            </div>
          )}
        </section>
        <div className="w-full h-px bg-lexy-border-table" />
        <section className="intersection py-4 px-4">
          <button
            type="button"
            onClick={() => setShowVideoDialog(true)}
            title="Reproducir vídeo"
            aria-description="Reproducir vídeo de presentación sobre liquidación"
            className={clsx(
              "w-full flex items-center justify-center gap-x-2.5 cursor-pointer rounded-sm border border-lexy-btn-secondary-hover bg-lexy-bg-secondary hover:bg-[#E4DFFF] hover:border-[#EEEBFF] transition-all text-lexy-brand-secondary-dark shadow-lexy-button",
              { "p-2": !expanded, "px-4 py-2": expanded }
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.5 17a24.1 24.1 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
              <path d="m10 15 5-3-5-3z" />
            </svg>
            {expanded && (
              <span className="leading-6 font-medium">Presentación</span>
            )}
          </button>
        </section>
        <div className="w-full h-px bg-lexy-border-table" />
        <section className="body flex flex-col gap-y-4 py-4 px-4">
          <SidebarItem
            icon={UserRound}
            label="Datos personales"
            to={`/datos-personales/${clientId}`}
            expanded={expanded}
            active={pathname.startsWith("/datos-personales")}
            onClick={handleOptionClick}
          />
          <SidebarItem
            icon={Briefcase}
            label="Situación laboral"
            to={`/situacion-laboral/${clientId}`}
            expanded={expanded}
            active={pathname.startsWith("/situacion-laboral")}
            onClick={handleOptionClick}
          />
          <SidebarItem
            icon={CreditCard}
            label="Deudas"
            to={`/deudas/${clientId}`}
            expanded={expanded}
            active={pathname.startsWith("/deudas")}
            onClick={handleOptionClick}
          />
          <SidebarItem
            icon={Building2}
            label="Bienes"
            to={`/bienes/${clientId}`}
            expanded={expanded}
            active={pathname.startsWith("/bienes")}
            onClick={handleOptionClick}
          />
          <SidebarItem
            icon={ScrollText}
            label="Historia de SE"
            to={`/historia-se/${clientId}`}
            expanded={expanded}
            active={pathname.startsWith("/historia-se")}
            onClick={handleOptionClick}
          />
        </section>
      </aside>
    </>
  );
}
