import clsx from "clsx";
import { Star } from "@/lib/icons";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";

interface TableProps {
  children: ReactNode;
  className?: string;
}

function Table({ children, className }: TableProps) {
  return (
    <section
      className={twMerge("w-full flex flex-col justify-start", className)}>
      {children}
    </section>
  );
}

Table.Header = function Header({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "w-full grid items-center py-2 text-[#2F2F2F] font-medium leading-6 border-b border-b-lexy-input-border",
        className
      )}>
      {children}
    </section>
  );
};

Table.HeaderCell = function HeaderCell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
};

Table.Content = function Content({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("w-full flex flex-col gap-y-2 my-2", className)}>
      {children}
    </div>
  );
};

Table.Cell = function Cell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid items-center leading-6 text-lexy-text-secondary",
        className
      )}>
      {children}
    </div>
  );
};

interface RowProps extends Omit<TableProps, "children"> {
  children?: ReactNode;
  rowkey: string;
  label: string;
  value?: string;
  stareable?: boolean;
  isStared?: boolean;
  onStarToggle?: (key: string) => void;
}

Table.Row = function Row({
  children,
  className,
  rowkey,
  label,
  value,
  stareable,
  isStared,
  onStarToggle,
}: RowProps) {
  const handleClick = onStarToggle ? () => onStarToggle(rowkey) : undefined;
  return (
    <div
      className={twMerge(
        "w-full grid grid-cols-2 items-center px-2 py-2 rounded-sm transition-colors",
        className,
        clsx({ "bg-lexy-btn-secondary-hover": isStared && stareable })
      )}>
      <div className={clsx("flex items-center", { "gap-x-2": stareable })}>
        {stareable && (
          <button
            title='Marcar / Desmarcar fila'
            type='button'
            onClick={handleClick}
            className={clsx(
              "flex items-center justify-center size-8 rounded-sm cursor-pointer",
              {
                "hover:bg-lexy-btn-secondary-hover transition-colors":
                  !isStared,
              }
            )}>
            <Star
              className={clsx("size-5 transition-colors", {
                "text-lexy-brand-secondary-dark fill-lexy-brand-secondary-dark":
                  isStared,
                "text-lexy-text-secondary fill-transparent": !isStared,
              })}
            />
          </button>
        )}
        <span className='font-medium leading-6 text-lexy-text-primary'>
          {label}
        </span>
      </div>
      {children ? (
        <>{children}</>
      ) : (
        <span className='leading-6 text-[#666666]'>{value}</span>
      )}
    </div>
  );
};

export { Table };
