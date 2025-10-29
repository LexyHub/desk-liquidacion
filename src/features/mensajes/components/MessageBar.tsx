import { useHeaderUI } from "@features/header";
import { useMessages } from "../hooks/useMessages";
import clsx from "clsx";
import { ArrowUp, X } from "@shared/lib/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { MessageList } from "./MessageList";
import type { MessageInput } from "../types/messages";

export function MessageBar() {
  const { isOpen, close, rawPath } = useHeaderUI();
  const [message, setMessage] = useState("");
  const { create: addMessage } = useMessages();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const MAX_TEXTAREA_HEIGHT = 430; // px

  const sendMessage = useCallback(() => {
    const trimmed = message.trim();
    if (!trimmed) return;

    const newMsg: MessageInput = {
      entidad: "desk-liquidacion",
      modulo: rawPath || "desconocido",
      comentario: trimmed,
    };

    addMessage(newMsg);
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "";
      textareaRef.current.focus();
    }
  }, [addMessage, message, rawPath]);

  const handleMessageSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      sendMessage();
    },
    [sendMessage]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
        if (textareaRef.current) textareaRef.current.style.height = "";
      }
    },
    [sendMessage]
  );

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.target.value);
      const el = e.currentTarget;
      if (el.scrollHeight > MAX_TEXTAREA_HEIGHT) return;
      el.style.height = "";
      el.style.height = el.scrollHeight + "px";
    },
    []
  );

  useEffect(() => {
    if (!message && textareaRef.current) textareaRef.current.style.height = "";
  }, [message]);

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
          className='flex items-end gap-x-2.5'
          aria-label='Enviar comentario'>
          <textarea
            name='mensaje'
            id='mensaje'
            form='enviar-mensaje'
            placeholder='Escribe un comentario...'
            aria-label='Comentario'
            value={message}
            ref={textareaRef}
            onKeyDown={handleKeyDown}
            onChange={handleOnChange}
            className='p-2.5 rounded-sm w-full text-lexy-text-secondary placeholder:text-lexy-text-placeholder bg-lexy-bg-platform border border-lexy-border-table outline-none resize-none'
          />
          <button
            title='Enviar comentario'
            aria-label='Enviar comentario'
            type='submit'
            disabled={message.trim().length === 0}
            className={clsx(
              "text-white size-fit py-2.5 px-2.5 rounded-lg shadow-lexy-button cursor-pointer disabled:cursor-not-allowed transition-colors",
              {
                "bg-lexy-text-secondary": message.trim().length === 0,
                "bg-lexy-brand-secondary-dark": message.trim().length > 0,
              }
            )}>
            <ArrowUp className='size-6' />
          </button>
        </form>
      </footer>
    </aside>
  );
}
