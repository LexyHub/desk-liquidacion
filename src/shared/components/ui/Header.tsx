import { useMessages } from "@context/messages";
import { useHeaderUI } from "@context/headerUI";
import { MessageCircle } from "@/lib/icons";

export function Header() {
  // const { actualPath, rawPath, toggle } = useHeaderUI();
  const { actualPath, toggle } = useHeaderUI();
  const { messages } = useMessages();

  return (
    <header className='w-full flex items-center justify-between px-6 py-2.5 bg-white border-b border-b-lexy-border-table'>
      <h1 className='text-lg leading-7 font-medium text-lexy-brand-secondary-dark'>
        {actualPath}
      </h1>
      <button
        onClick={toggle}
        className='group flex items-center gap-x-2.5 px-3 py-2.5 cursor-pointer rounded-lg border border-lexy-border-table hover:bg-lexy-btn-secondary-hover transition-all'>
        <MessageCircle className='size-6 text-black' />
        <div className='px-2.5 py-0.5 rounded-sm text-lexy-brand-secondary-dark bg-lexy-btn-secondary-hover group-hover:bg-lexy-bg-secondary'>
          <span>{messages.length}</span>
        </div>
      </button>
    </header>
  );
}
