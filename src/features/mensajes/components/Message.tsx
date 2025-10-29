import { getHourAndMinutes } from "@shared/lib/utils/date.util";
import type { Message } from "../types/messages";

interface Props {
  message: Message;
}

export function Message({ message }: Props) {
  const formattedDate = getHourAndMinutes(message.creado_en ?? "");
  return (
    <div className='flex flex-col items-end w-full gap-y-1 animate-fade-in-left animate-duration-400'>
      <p className='bg-lexy-bg-platform leading-6 text-lexy-text-secondary w-full wrap-break-word px-4 py-2.5 rounded-sm whitespace-pre-line'>
        {message.comentario}
      </p>
      <span className='text-xs leading-4 text-lexy-text-secondary'>
        {formattedDate} hrs
      </span>
    </div>
  );
}
