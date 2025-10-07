import { useMessagesContext } from "@/context/messages/MessagesContext";
import { useHeaderUI } from "@context/HeaderUIContext";
import { MessageCircle } from "lucide-react";

export function Header() {
  const { actualPath, rawPath, toggle } = useHeaderUI();
  const { getMessages } = useMessagesContext();

  return (
    <header className="w-full flex items-center justify-between px-6 py-2.5 bg-white border-b border-b-lexy-border-table">
      <h1 className="text-lg leading-7 font-medium text-lexy-brand-secondary-dark">{actualPath}</h1>
      <button onClick={toggle} className="group flex items-center gap-x-2.5 px-3 py-2.5 cursor-pointer rounded-lg border border-lexy-border-table hover:bg-lexy-btn-secondary-hover transition-all">
        <MessageCircle className="size-6 text-black" />
        <div className="px-2.5 py-0.5 rounded-sm text-lexy-brand-secondary-dark bg-lexy-btn-secondary-hover group-hover:bg-lexy-bg-secondary">
            <span>{getMessages(rawPath).length}</span>
        </div>
      </button>
    </header>
  );
}
