import { SquareArrowOutUpRight } from "@/lib/icons";

interface Props {
  logo_url: string;
  title: string;
  subtitle?: string;
  url: string;
}

export function LinkButton({ logo_url, title, subtitle, url }: Props) {
  return (
    <section className='flex items-center justify-between w-full p-2 bg-lexy-bg-secondary border border-lexy-btn-secondary-hover rounded-sm'>
      <div className='flex items-center gap-x-4'>
        <img src={logo_url} alt={`Logo de ${title}`} className='size-6' />
        <section className=''>
          <h4 className='font-medium leading-6 text-lexy-text-primary'>
            {title}
          </h4>
          <span className='text-sm leading-5 text-lexy-text-secondary'>
            {subtitle}
          </span>
        </section>
      </div>
      <a
        href={url}
        title={`Navegar a ${title}`}
        target='_blank'
        rel='noreferrer'>
        <button
          type='button'
          title={`Botón para ${title}`}
          tabIndex={-1}
          aria-description={`Botón para navegar a la URL de ${title}`}
          className='size-10 flex items-center justify-center rounded-sm border border-lexy-border-table bg-white hover:bg-[#EAE6FF] transition-colors text-lexy-brand-secondary-dark cursor-pointer'>
          <SquareArrowOutUpRight className='size-6' />
        </button>
      </a>
    </section>
  );
}
