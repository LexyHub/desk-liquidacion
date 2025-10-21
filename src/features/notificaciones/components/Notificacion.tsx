import { cn } from "@shared/lib/utils";
import { X, CircleCheck, CircleAlert, CircleX } from "@shared/lib/icons";

interface Props {
  type: "success" | "error" | "info";
  message: string;
  closeable?: boolean;
  isVisible?: boolean;
  onClose?: () => void;
}

export function Notificacion({
  type,
  message,
  closeable,
  isVisible,
  onClose,
}: Props) {
  const classes = cn(
    "max-w-md w-full rounded-sm grid grid-cols-[auto_1fr_auto] items-center gap-x-3 p-4 shadow-lg animate-duration-400",
    {
      "bg-green-100 text-green-800": type === "success",
      "bg-red-100 text-red-800": type === "error",
      "bg-blue-100 text-blue-800": type === "info",
      "animate-fade-in": isVisible,
      "animate-fade-out": !isVisible,
    }
  );

  const messageClasses = cn("text-sm pr-4 border-r", {
    "border-r-green-600/30": type === "success",
    "border-r-red-600/30": type === "error",
    "border-r-blue-600/30": type === "info",
  });

  const icon = (() => {
    switch (type) {
      case "success":
        return <CircleCheck className='size-5' />;
      case "error":
        return <CircleX className='size-5' />;
      case "info":
        return <CircleAlert className='size-5' />;
      default:
        return null;
    }
  })();

  return (
    <div className={classes}>
      <section className='size-5'>{icon}</section>
      <p className={messageClasses}>{message}</p>
      {closeable && (
        <button
          type='button'
          title='Cerrar notificación'
          className='size-fit cursor-pointer'
          onClick={onClose}>
          <X className='size-4' />
        </button>
      )}
    </div>
  );
}
