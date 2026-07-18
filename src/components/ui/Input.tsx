import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium tracking-wide text-stone-600 uppercase"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full h-11 px-3.5 bg-transparent border text-sm text-stone-900',
            'placeholder:text-stone-400',
            'transition-colors duration-200',
            'focus:outline-none focus:border-stone-900',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'rounded-sm',
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-stone-300',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-500" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs text-stone-400">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export { Input };
