import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { cn } from '@/utils/cn';
import { User, ShoppingBag, Heart } from 'lucide-react';

const ACCOUNT_LINKS = [
  { label: 'Profile', href: '/account/profile', icon: User },
  { label: 'Orders', href: '/account/orders', icon: ShoppingBag },
  { label: 'Wishlist', href: '/account/wishlist', icon: Heart },
];

export function AccountLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return (
    <div className="container-narrow py-12 md:py-20">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <h1 className="text-2xl editorial-heading text-stone-900 mb-8">
            My Account
          </h1>
          <nav className="flex flex-col gap-1">
            {ACCOUNT_LINKS.map((link) => {
              const isActive = location.pathname.startsWith(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-sm transition-colors text-sm font-medium',
                    isActive
                      ? 'bg-stone-100 text-stone-900'
                      : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                  )}
                >
                  <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
