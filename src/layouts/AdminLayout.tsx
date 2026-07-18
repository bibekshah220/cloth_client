import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { Role } from '@/types';
import { cn } from '@/utils/cn';
import {
  LayoutDashboard,
  Package,
  Tags,
  Users,
  MessageSquare,
  ShoppingBag,
} from 'lucide-react';

const ADMIN_LINKS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Categories', href: '/admin/categories', icon: Tags },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
];

export function AdminLayout() {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (user?.role !== Role.ADMIN) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <h2 className="text-xl font-medium text-stone-900 mb-2">Access Denied</h2>
        <p className="text-stone-500 mb-6">You do not have permission to view the admin area.</p>
        <Link to="/" className="text-sm underline hover:no-underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="container-wide py-12">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        <aside className="w-full md:w-56 shrink-0">
          <h2 className="text-sm font-semibold tracking-wider text-stone-400 uppercase mb-6 px-4">
            Admin Panel
          </h2>
          <nav className="flex flex-col gap-1">
            {ADMIN_LINKS.map((link) => {
              const isActive = link.exact
                ? location.pathname === link.href
                : location.pathname.startsWith(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 rounded-sm transition-colors text-sm font-medium',
                    isActive
                      ? 'bg-stone-900 text-stone-50'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  )}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
