import { useEffect, useRef } from "react";
import { useMessages } from "@/context/messages";
import { Message } from "./Message";

export function MessageList() {
  const { getMessages } = useMessages();
  const messages = getMessages();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // auito scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  return (
    <div className='flex flex-col items-end max-w-72 gap-y-2.5'>
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
