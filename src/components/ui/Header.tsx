import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";



const _PATHS: Record<string, string> = {
  "datos-personales": "Datos Personales",
  "situacion-laboral": "Situación laboral",
  "deudas": "Deudas",
  "bienes": "Bienes",
  "historia-se": "Historia de Sobreendeudamiento"
};

export function Header() {
  const { pathname } = useLocation();
  const pathnameCleaned = pathname.split("/")[1];
  const title = _PATHS[pathnameCleaned];
  // messages hardcodeado por mientras
  const _MESSAGES = [{ name: "", date: "" }]

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white">
      <h1 className="text-lg leading-7 font-medium text-lexy-brand-secondary-dark">{title}</h1>
      <button className="group flex items-center gap-x-2.5 px-3 py-2.5 rounded-lg cursor-pointer border border-lexy-border-table hover:bg-lexy-btn-secondary-hover transition-all">
        <MessageCircle className="size-6 text-black" />
        <div className="px-2.5 py-0.5 rounded-sm text-lexy-brand-secondary-dark bg-lexy-btn-secondary-hover group-hover:bg-lexy-bg-secondary">
            <span>{_MESSAGES.length}</span>
        </div>
      </button>
    </header>
  );
}
