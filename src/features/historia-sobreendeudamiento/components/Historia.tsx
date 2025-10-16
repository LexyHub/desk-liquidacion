import { useSidebar } from "@features/sidebar";
import { Card } from "@shared/components/ui";
import { useClientDataContext } from "@shared/context";

export function Historia() {
  const { isInDistribution } = useSidebar();
  const { clientData } = useClientDataContext();

  return (
    <Card>
      <Card.Header>
        <Card.Title>Historia sobreendeudamiento</Card.Title>
      </Card.Header>
      <Card.Content className='gap-y-2'>
        <h4 className='text-lexy-text-primary font-medium leading-6'>
          Cuéntanos tu historia
        </h4>
        <textarea
          disabled={isInDistribution}
          title='Historia sobre endeudamiento'
          value={clientData?.historia_sobreendeudamiento?.historia}
          placeholder='Describe como llegaste a esta situación de sobreendeudamiento, qué eventos o circunstancias contribuyeron, y cualquier información adicional que consideres relevante...'
          className='resize-none w-full h-32 p-4 rounded-sm text-lexy-text-secondary leading-6 placeholder:text-lexy-text-placeholder bg-white border border-lexy-input-border outline-none disabled:cursor-not-allowed'
        />
      </Card.Content>
    </Card>
  );
}
