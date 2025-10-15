import { Eye } from "@shared/lib/icons";
import { useDocumentViewer } from "@features/documentos";

interface Props {
  document: string;
  title: string;
}

export function DocumentButton({ document, title }: Props) {
  const { openDocument } = useDocumentViewer();

  const handleClick = () => {
    if (document && document.trim() !== "") {
      openDocument(document, title);
    }
  };

  return (
    <button
      type='button'
      disabled={!document || document.trim() === ""}
      onClick={handleClick}
      className='flex items-center justify-center gap-x-2 py-2 px-6 w-full text-lexy-brand-secondary-dark font-medium leading-6 border-2 border-lexy-brand-secondary-dark bg-white hover:bg-lexy-btn-secondary-hover rounded-sm cursor-pointer disabled:cursor-not-allowed transition-all'>
      <Eye className='size-6' />
      Ver documento
    </button>
  );
}
