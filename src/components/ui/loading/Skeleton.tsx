import { twMerge } from 'tailwind-merge';

interface SkeletonProps {
  className?: string;
  lines?: number;
  width?: 'full' | '3/4' | '1/2' | '1/3' | '1/4';
}

export function Skeleton({ className, lines = 3, width = 'full' }: SkeletonProps) {
  const widthClasses = {
    full: 'w-full',
    '3/4': 'w-3/4',
    '1/2': 'w-1/2',
    '1/3': 'w-1/3',
    '1/4': 'w-1/4',
  };

  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={twMerge(
            'h-4 bg-gray-200 rounded animate-pulse',
            index === lines - 1 ? widthClasses[width] : 'w-full',
            className
          )}
        />
      ))}
    </div>
  );
}