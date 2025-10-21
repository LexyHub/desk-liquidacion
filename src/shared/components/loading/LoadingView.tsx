import { Spinner } from "./Spinner";

export function LoadingView() {
  return (
    <div className='relative'>
      <section className='absolute inset-0 z-10 flex flex-col items-center pt-96 gap-y-4 bg-black/5'>
        <Spinner className='size-8' />
        <h2 className='text-2xl font-medium'>Cargando vista...</h2>
      </section>
      <section className='p-4 grid grid-cols-2 gap-x-6 h-fit border-b border-b-lexy-border-table'>
        <div className='w-full h-64 rounded-lg shadow-lexy-card animate-pulse bg-neutral-50' />
        <div className='w-full h-64 rounded-lg shadow-lexy-card animate-pulse bg-neutral-50' />
      </section>
      <section className='p-4 flex flex-col gap-y-6'>
        <div className='w-full h-96 rounded-lg shadow-lexy-card animate-pulse bg-neutral-50' />
        <div className='w-full h-96 rounded-lg shadow-lexy-card animate-pulse bg-neutral-50' />
      </section>
    </div>
  );
}
