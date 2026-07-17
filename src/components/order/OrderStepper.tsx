import { Check, Package, Truck, Home, X } from 'lucide-react';
import { OrderStatus } from '@/types';
import { cn } from '@/utils/cn';

interface OrderStepperProps {
  status: OrderStatus;
  className?: string;
}

const STEPS = [
  { status: OrderStatus.PENDING, label: 'Order Placed', icon: Package },
  { status: OrderStatus.PROCESSING, label: 'Processing', icon: Package },
  { status: OrderStatus.SHIPPED, label: 'Shipped', icon: Truck },
  { status: OrderStatus.DELIVERED, label: 'Delivered', icon: Home },
];

function getStepState(currentStatus: OrderStatus, stepStatus: OrderStatus) {
  if (currentStatus === OrderStatus.CANCELLED) return 'cancelled';
  
  const currentIndex = STEPS.findIndex(s => s.status === currentStatus);
  const stepIndex = STEPS.findIndex(s => s.status === stepStatus);
  
  if (stepIndex < currentIndex) return 'completed';
  if (stepIndex === currentIndex) return 'active';
  return 'pending';
}

export function OrderStepper({ status, className }: OrderStepperProps) {
  if (status === OrderStatus.CANCELLED) {
    return (
      <div className={cn('flex items-center gap-3 p-4 bg-red-50 rounded-sm', className)}>
        <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center">
          <X size={20} />
        </div>
        <div>
          <p className="text-sm font-medium text-red-900">Order Cancelled</p>
          <p className="text-xs text-red-600">This order has been cancelled</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('py-4', className)}>
      <div className="flex flex-col gap-0">
        {STEPS.map((step, index) => {
          const state = getStepState(status, step.status);
          const Icon = step.icon;
          const isLast = index === STEPS.length - 1;

          return (
            <div key={step.status} className="flex relative">
              {/* Vertical line */}
              {!isLast && (
                <div
                  className={cn(
                    'absolute left-5 top-10 w-0.5 h-8',
                    state === 'completed' ? 'bg-stone-900' : 'bg-stone-200'
                  )}
                />
              )}

              {/* Circle */}
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10',
                  state === 'completed' && 'bg-stone-900 text-white',
                  state === 'active' && 'border-2 border-stone-900 text-stone-900 bg-white',
                  state === 'pending' && 'border-2 border-stone-200 text-stone-400 bg-white'
                )}
              >
                {state === 'completed' ? (
                  <Check size={18} />
                ) : (
                  <Icon size={18} />
                )}
              </div>

              {/* Content */}
              <div className="ml-4 pb-8">
                <p
                  className={cn(
                    'text-sm font-medium',
                    state === 'pending' ? 'text-stone-400' : 'text-stone-900'
                  )}
                >
                  {step.label}
                </p>
                <p
                  className={cn(
                    'text-xs mt-0.5',
                    state === 'completed' && 'text-green-600',
                    state === 'active' && 'text-blue-600',
                    state === 'pending' && 'text-stone-400'
                  )}
                >
                  {state === 'completed' && 'Completed'}
                  {state === 'active' && 'In Progress'}
                  {state === 'pending' && 'Pending'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
