import { Star } from 'lucide-react';
import { cn } from '@/utils/cn';

interface RatingProps {
  value: number;
  max?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (value: number) => void;
}

export function Rating({ value, max = 5, size = 16, interactive = false, onChange }: RatingProps) {
  return (
    <div className="inline-flex items-center gap-0.5" role="img" aria-label={`${value} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(value);
        const halfFilled = !filled && i < value;

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(i + 1)}
            className={cn(
              'transition-colors duration-150',
              interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default',
              'disabled:cursor-default'
            )}
            aria-label={interactive ? `Rate ${i + 1} stars` : undefined}
            tabIndex={interactive ? 0 : -1}
          >
            <Star
              size={size}
              className={cn(
                filled
                  ? 'fill-stone-900 text-stone-900'
                  : halfFilled
                    ? 'fill-stone-400 text-stone-400'
                    : 'fill-none text-stone-300'
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
