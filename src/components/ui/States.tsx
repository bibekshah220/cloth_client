import { PackageOpen, AlertTriangle, WifiOff, ShieldX } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="text-stone-300 mb-4">
        {icon || <PackageOpen size={48} strokeWidth={1} />}
      </div>
      <h3 className="text-lg font-medium text-stone-900 mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-stone-500 max-w-sm mb-6">{description}</p>
      )}
      {action && (
        <Button variant="outline" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="text-red-400 mb-4">
        <AlertTriangle size={48} strokeWidth={1} />
      </div>
      <h3 className="text-lg font-medium text-stone-900 mb-1">
        {title}
      </h3>
      <p className="text-sm text-stone-500 max-w-sm mb-6">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}

export function OfflineState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="text-stone-300 mb-4">
        <WifiOff size={48} strokeWidth={1} />
      </div>
      <h3 className="text-lg font-medium text-stone-900 mb-1">
        You're offline
      </h3>
      <p className="text-sm text-stone-500 max-w-sm">
        Check your internet connection and try again.
      </p>
    </div>
  );
}

export function PermissionDeniedState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="text-stone-300 mb-4">
        <ShieldX size={48} strokeWidth={1} />
      </div>
      <h3 className="text-lg font-medium text-stone-900 mb-1">
        Access Denied
      </h3>
      <p className="text-sm text-stone-500 max-w-sm">
        You don't have permission to view this page.
      </p>
    </div>
  );
}
