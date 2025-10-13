import { formatDate } from "@lib/utils/formatters";
import type { Message } from "@types";

interface Props {
  message: Message;
}

export function Message({ message }: Props) {
  const formattedDate = formatDate(message.date, "long");
  return (
    <div className='flex flex-col items-end w-fit bg-lexy-bg-platform gap-y-1 px-4 py-2.5 rounded-sm border border-lexy-border-table whitespace-pre-line'>
      <p className='max-w-60 wrap-break-word text-end'>{message.message}</p>
      <span className='text-xs text-lexy-text-secondary'>{formattedDate}</span>
    </div>
  );
}
