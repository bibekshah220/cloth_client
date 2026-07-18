import { useDashboardStats } from '@/hooks/use-dashboard';
import { Skeleton } from '@/components/ui/Skeleton';
import { Package, Users, ShoppingBag, DollarSign, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/Badge';
import { OrderStatus } from '@/types';

function StatCard({ title, value, icon, loading }: { title: string, value: string | number, icon: React.ReactNode, loading?: boolean }) {
  return (
    <div className="bg-white border border-stone-200 p-6 rounded-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-stone-500">{title}</h3>
        <div className="text-stone-400">{icon}</div>
      </div>
      {loading ? (
        <Skeleton className="h-8 w-24" />
      ) : (
        <p className="text-2xl font-semibold text-stone-900">{value}</p>
      )}
    </div>
  );
}

export function AdminDashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED: return 'success';
      case OrderStatus.CANCELLED: return 'error';
      case OrderStatus.SHIPPED: return 'info';
      default: return 'default';
    }
  };

  return (
    <div>
      <h1 className="editorial-heading text-2xl md:text-3xl text-stone-900 mb-8">
        Overview
      </h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
        <StatCard
          title="Total Revenue"
          value={`$${stats?.overview.total_revenue.toFixed(2) || '0.00'}`}
          icon={<DollarSign size={20} />}
          loading={isLoading}
        />
        <StatCard
          title="Total Orders"
          value={stats?.overview.total_orders || 0}
          icon={<ShoppingBag size={20} />}
          loading={isLoading}
        />
        <StatCard
          title="Total Customers"
          value={stats?.overview.total_users || 0}
          icon={<Users size={20} />}
          loading={isLoading}
        />
        <StatCard
          title="Total Products"
          value={stats?.overview.total_products || 0}
          icon={<Package size={20} />}
          loading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-medium text-stone-900 mb-4">Recent Orders</h2>
          <div className="bg-white border border-stone-200 rounded-sm overflow-hidden">
            {isLoading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-stone-50 text-xs uppercase font-medium text-stone-500 border-b border-stone-200">
                    <tr>
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {stats?.recent_orders.map(order => (
                      <tr key={order._id} className="hover:bg-stone-50 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs">{order._id.slice(-8).toUpperCase()}</td>
                        <td className="px-6 py-4">{order.user.first_name} {order.user.last_name}</td>
                        <td className="px-6 py-4">{format(new Date(order.createdAt), 'MMM d, yyyy')}</td>
                        <td className="px-6 py-4"><Badge variant={getStatusColor(order.status)}>{order.status}</Badge></td>
                        <td className="px-6 py-4 font-medium">${order.total_amount.toFixed(2)}</td>
                      </tr>
                    ))}
                    {stats?.recent_orders.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-stone-500">No recent orders.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div>
          <h2 className="text-lg font-medium text-stone-900 mb-4 flex items-center gap-2">
            Low Stock Alerts
            {stats?.low_stock_products && stats.low_stock_products.length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-[10px] font-medium text-red-600">
                {stats.low_stock_products.length}
              </span>
            )}
          </h2>
          <div className="bg-white border border-stone-200 rounded-sm overflow-hidden">
            {isLoading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full" />)}
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {stats?.low_stock_products.map(product => (
                  <div key={product._id} className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-stone-100 rounded-sm overflow-hidden shrink-0">
                      {product.images[0]?.path && <img src={product.images[0].path} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-stone-900 truncate">{product.name}</p>
                      <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} className={product.total_stock === 0 ? 'text-red-500' : 'text-amber-500'} />
                        {product.total_stock === 0 ? 'Out of stock' : `${product.total_stock} left in stock`}
                      </p>
                    </div>
                  </div>
                ))}
                {stats?.low_stock_products.length === 0 && (
                  <div className="p-8 text-center text-sm text-stone-500">
                    All products are well stocked.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
