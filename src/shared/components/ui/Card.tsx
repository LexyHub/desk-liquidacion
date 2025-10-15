import { createContext, useContext, useMemo, type ReactNode } from "react";
import { Skeleton } from "@shared/components/loading/Skeleton";
import { cn } from "@shared/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
}

interface CardContextValue {
  isLoading: boolean;
}

const CardContext = createContext<CardContextValue | undefined>(undefined);

function useCard() {
  const ctx = useContext(CardContext);
  if (!ctx) throw new Error("Card subcomponents must be used within Card");
  return ctx;
}

function Card({ children, className, isLoading = false }: CardProps) {
  const value = useMemo(() => ({ isLoading }), [isLoading]);

  return (
    <CardContext.Provider value={value}>
      <div
        className={cn(
          "w-full h-full p-4 flex flex-col items-start gap-y-4 rounded-lg border border-lexy-border-table shadow-lexy-card bg-white",
          className
        )}>
        {children}
      </div>
    </CardContext.Provider>
  );
}

Card.Header = function CardHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("flex items-center gap-x-2 mb-4", className)}>
      {children}
    </section>
  );
};

Card.Title = function CardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "text-xl font-medium leading-7 text-lexy-brand-secondary-dark",
        className
      )}>
      {children}
    </h3>
  );
};

Card.Icon = function CardIcon({ children }: { children: ReactNode }) {
  return (
    <div className='size-10 rounded-full flex items-center justify-center bg-lexy-bg-platform border border-lexy-btn-secondary-hover text-lexy-brand-secondary-dark'>
      {children}
    </div>
  );
};

Card.Content = function CardContent({
  children,
  className,
  skeletonLines = 3,
  skeletonWidth = "3/4",
}: {
  children: ReactNode;
  className?: string;
  skeletonLines?: number;
  skeletonWidth?: "full" | "3/4" | "1/2" | "1/3" | "1/4";
}) {
  const { isLoading } = useCard();
  const defaultClassName = cn(
    "flex flex-col items-start justify-start w-full",
    className
  );

  if (isLoading) {
    return (
      <section className={defaultClassName}>
        <Skeleton lines={skeletonLines} width={skeletonWidth} />
      </section>
    );
  }

  return (
    <section
      className={cn(
        "flex flex-col items-start justify-start w-full",
        className
      )}>
      {children}
    </section>
  );
};

export { Card };
