import { useHeaderUI } from "@features/header";
import { useMessages } from "@features/mensajes";
import clsx from "clsx";
import { ArrowUp, X } from "@shared/lib/icons";
import { useState } from "react";
import { MessageList } from "./MessageList";
import type { Message } from "../types/messages";

export function MessageBar() {
  const { isOpen, close, rawPath } = useHeaderUI();
  const { addMessage } = useMessages();
  const [message, setMessage] = useState("");

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMsg: Message = {
      path: rawPath || "desconocido",
      id: crypto.randomUUID(),
      message,
      date: new Date().toISOString(),
    };
    addMessage(rawPath || "desconocido", newMsg);
    setMessage("");
  };

  return (
    <aside
      className={clsx(
        "grid grid-rows-[auto_1fr_auto] hide-scrollbar h-full bg-white border-l border-l-lexy-border-table transition-all duration-300 overflow-hidden max-w-80",
        { "w-80": isOpen, "w-0": !isOpen }
      )}>
      <header className='p-4 flex items-center justify-between'>
        <h3 className='text-lg leading-7 font-medium'>Comentarios</h3>
        <button
          type='button'
          title='Cerrar barra de mensajes'
          onClick={close}
          className='flex items-center justify-center cursor-pointer shadow-lexy-button border border-black/10 hover:bg-lexy-border-table transition-colors rounded-full w-9 p-1.5'>
          <X />
        </button>
      </header>
      <MessageList />
      <footer className='p-4'>
        <form
          id='enviar-mensaje'
          onSubmit={handleMessageSubmit}
          className='flex items-end gap-x-2.5'>
          <textarea
            name='mensaje'
            id='mensaje'
            form='enviar-mensaje'
            placeholder='Escribe un comentario...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='p-2.5 rounded-sm w-full text-lexy-text-secondary placeholder:text-lexy-text-placeholder bg-lexy-bg-platform border border-lexy-border-table outline-none resize-none'></textarea>
          <button
            title='Enviar comentario'
            type='submit'
            disabled={message.trim() === ""}
            className={clsx(
              "text-white size-fit py-2.5 px-2.5 rounded-lg shadow-lexy-button cursor-pointer disabled:cursor-not-allowed transition-colors",
              {
                "bg-lexy-text-secondary": message.trim() === "",
                "bg-lexy-brand-secondary-dark": message !== "",
              }
            )}>
            <ArrowUp className='size-6' />
          </button>
        </form>
      </footer>
    </aside>
  );
}
