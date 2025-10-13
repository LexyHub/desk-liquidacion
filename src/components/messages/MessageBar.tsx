import { useHeaderUI } from "@context/headerUI";
import { useMessages } from "@context/messages";
import clsx from "clsx";
import { ArrowUp, X } from "@/lib/icons";
import { useState } from "react";
import { Search } from "@assets";
import { MessageList } from "./MessageList";
import type { Message } from "@/types";

export function MessageBar() {
  const { isOpen, close, rawPath, actualPath } = useHeaderUI();
  // const { fetchMessages, getMessages, addMessage, removeMessage } =
  //   useMessages();
  const { getMessages, addMessage } = useMessages();
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
      <section className='border-y border-y-lexy-border-table py-6 px-4 overflow-y-auto hide-scrollbar min-h-0'>
        {getMessages().length === 0 ? (
          <div className='h-full flex flex-col items-center justify-center'>
            <img
              src={Search}
              alt='No hay mensajes disponibles'
              className='size-16 object-contain'
            />
            <span className='text-lexy-text-secondary leading-6 text-center font-medium'>
              No hay comentarios aún en la sección <strong>{actualPath}</strong>
            </span>
          </div>
        ) : (
          <MessageList />
        )}
      </section>
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
