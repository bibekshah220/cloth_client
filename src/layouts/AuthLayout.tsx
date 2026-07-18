import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { Link } from 'react-router-dom';
import { Toaster } from 'sonner';

export function AuthLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 transition-colors duration-200">
      <Toaster position="bottom-center" toastOptions={{ className: 'rounded-sm' }} />
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
        <Link to="/" className="text-xl font-semibold tracking-[0.15em] uppercase text-stone-900">
          ELITE THREADS
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-[400px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
