import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchOverlay } from '@/components/layout/SearchOverlay';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Toaster } from 'sonner';

export function RootLayout() {
  return (
    <div className={`min-h-screen flex flex-col bg-stone-50 text-stone-900 transition-colors duration-200`}>
      <ScrollRestoration />
      <Toaster 
        position="bottom-center"
        toastOptions={{
          className: 'rounded-sm border border-stone-200 shadow-elevated bg-white text-stone-900',
          style: { borderRadius: '2px' }
        }}
      />
      <Header />
      <SearchOverlay />
      <CartDrawer />
      
      <main className="flex-1 w-full relative">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}
