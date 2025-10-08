import clsx from "clsx";

interface Props {
  icon: React.ElementType;
  label: string;
  to: string;
  expanded: boolean;
  active: boolean;
  onClick: (to: string) => void;
}

export function SidebarItem({
  icon: Icon,
  label,
  to,
  expanded,
  active,
  onClick,
}: Props) {
  return (
    <button
      onClick={() => onClick(to)}
      className={clsx(
        "flex items-center w-full gap-x-2.5 rounded-sm transition-all",
        {
          "px-4 py-2 justify-start": expanded,
          "p-2 justify-center": !expanded,
          "text-lexy-text-secondary bg-lexy-bg-card hover:bg-[#EAE6FF] cursor-pointer": !active,
          "text-lexy-brand-secondary-dark bg-[#EAE6FF]": active,
        }
      )}
    >
      <Icon strokeWidth={2} className="size-6" />
      {expanded && <span className="leading-6 font-medium">{label}</span>}
    </button>
  );
}
