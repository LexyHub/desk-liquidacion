import clsx from "clsx";
import { Star } from "@/lib/icons";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

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
