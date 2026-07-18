import { useMyOrders } from '@/hooks/use-orders';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/States';
import { Badge } from '@/components/ui/Badge';
import { OrderStepper } from '@/components/order/OrderStepper';
import { OrderStatus, PaymentStatus } from '@/types';
import { Package, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function OrdersPage() {
  const { data: orders, isLoading } = useMyOrders();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-medium mb-8">My Orders</h2>
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full" />)}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        icon={<Package size={48} strokeWidth={1} />}
        title="No orders yet"
        description="When you place orders, they will appear here."
        action={{ label: 'Start Shopping', onClick: () => window.location.href = '/shop' }}
      />
    );
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED: return 'success';
      case OrderStatus.CANCELLED: return 'error';
      case OrderStatus.SHIPPED: return 'info';
      default: return 'default';
    }
  };

  const getPaymentColor = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PAID: return 'success';
      case PaymentStatus.FAILED: return 'error';
      case PaymentStatus.REFUNDED: return 'warning';
      default: return 'default';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-medium text-stone-900 mb-8">
        My Orders
      </h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border border-stone-200 rounded-sm overflow-hidden">
            <div className="bg-stone-50 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 border-b border-stone-200">
              <div className="flex gap-8">
                <div>
                  <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">Order Placed</p>
                  <p className="text-sm font-medium">{format(new Date(order.createdAt), 'MMM d, yyyy')}</p>
                </div>
                <div>
                  <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">Total</p>
                  <p className="text-sm font-medium">${order.total_amount.toFixed(2)}</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">Order #</p>
                  <p className="text-sm font-medium">{order._id.slice(-8).toUpperCase()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                <Badge variant={getPaymentColor(order.payment_status)}>{order.payment_status}</Badge>
              </div>
            </div>

            <div className="p-4 sm:p-6 divide-y divide-stone-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-stone-900">{item.name}</h4>
                    <p className="text-sm text-stone-500 mt-1">
                      Qty: {item.quantity} • Size: {item.size} • ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <Link to={`/product/${item.product}`} className="text-sm text-stone-900 hover:underline underline-offset-4">
                    View
                  </Link>
                </div>
              ))}
            </div>

            {/* Order Tracking Section */}
            <div className="border-t border-stone-200">
              <button
                onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                className="w-full p-4 flex items-center justify-between text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <span>Track Order</span>
                {expandedOrder === order._id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {expandedOrder === order._id && (
                <div className="px-4 pb-4">
                  <OrderStepper status={order.status} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
