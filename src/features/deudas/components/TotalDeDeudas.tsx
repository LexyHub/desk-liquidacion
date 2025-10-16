import { useClientDataContext } from "@shared/context";
import { Card } from "@shared/components/ui";
import { formatCurrency } from "@shared/lib/utils/formatters";

export function TotalDeDeudas() {
  const { totalDeudas } = useClientDataContext();

  return (
    <Card className='gap-y-0'>
      <Card.Header className='flex items-center justify-center w-full'>
        <Card.Title className='text-lexy-text-primary font-medium text-base leading-6'>
          Total deudas registradas
        </Card.Title>
      </Card.Header>
      <Card.Content className='w-full flex items-center justify-center'>
        <h4 className='text-[32px] text-lexy-brand-secondary-dark leading-12 font-medium'>
          {formatCurrency(totalDeudas)}
        </h4>
      </Card.Content>
    </Card>
  );
}
