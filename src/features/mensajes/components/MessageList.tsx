import { useEffect, useRef } from "react";
import { Message } from "./Message";
import { getGroupedMessages } from "@shared/lib/utils/date.util";
import { Search } from "@shared/assets";
import { useMessages } from "../hooks/useMessages";
import { useHeaderUI } from "@features/header";

export function MessageList() {
  const { actualPath } = useHeaderUI();
  const { messages, loading, error, refetch } = useMessages();
  const realMessages = getGroupedMessages(messages);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // auito scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  return (
    <section className='border-y border-y-lexy-border-table py-6 px-4 overflow-y-auto hide-scrollbar min-h-0'>
      {loading && (
        <div className='h-full flex flex-col items-center justify-center text-sm text-lexy-text-secondary'>
          Cargando comentarios...
        </div>
      )}
      {!loading && error && (
        <div className='h-full flex flex-col items-center justify-center gap-y-2 text-center'>
          <span className='text-lexy-text-secondary text-sm'>{error}</span>
          <button
            type='button'
            onClick={refetch}
            className='px-3 py-1.5 text-xs rounded bg-lexy-brand-secondary-dark text-white'>
            Reintentar
          </button>
        </div>
      )}
      {!loading && !error && messages.length === 0 ? (
        <div className='h-full flex flex-col items-center justify-center'>
          <img
            src={Search}
            alt='No hay comentarios disponibles'
            className='size-16 object-contain'
          />
          <span className='text-lexy-text-secondary leading-6 text-center font-medium'>
            No hay comentarios aún en la sección <strong>{actualPath}</strong>
          </span>
        </div>
      ) : (
        !loading &&
        !error && (
          <div className='flex flex-col gap-y-8 max-w-72'>
            {Object.entries(realMessages).map(([date, msgs]) => (
              <div key={date} className='w-full'>
                <div className='w-full grid grid-cols-[1fr_auto_1fr] items-center justify-between gap-x-2 mb-2.5 select-none animate-fade-in animate-duration-400'>
                  <div className='w-[90%] h-px bg-lexy-text-secondary/15' />
                  <p className='text-lexy-text-placeholder/50 text-sm leading-5 font-medium text-center'>
                    {date}
                  </p>
                  <div className='w-[90%] h-px bg-lexy-text-secondary/15 justify-self-end' />
                </div>
                <div className='flex flex-col items-end gap-y-2.5'>
                  {msgs.map((msg) => (
                    <Message key={msg.id} message={msg} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      )}
      <div ref={bottomRef} />
    </section>
  );
}
