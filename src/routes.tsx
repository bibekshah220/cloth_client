import { createBrowserRouter, RouterProvider, Navigate, Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { AccountLayout } from '@/layouts/AccountLayout';
import { AdminLayout } from '@/layouts/AdminLayout';

// Pages
import { HomePage } from '@/pages/Home';
import { ShopPage } from '@/pages/Shop';
import { ProductDetailPage } from '@/pages/ProductDetail';
import { LoginPage } from '@/pages/auth/Login';
import { SignupPage } from '@/pages/auth/Signup';

import { ProfilePage } from '@/pages/account/Profile';
import { OrdersPage } from '@/pages/account/Orders';
import { WishlistPage } from '@/pages/account/Wishlist';

// Placeholder pages for completeness of routing
const Placeholder = ({ title }: { title: string }) => (
  <div className="py-20 text-center">
    <h1 className="editorial-heading text-3xl mb-4">{title}</h1>
    <p className="text-stone-500">Coming soon.</p>
  </div>
);

// Friendly 404 page
const NotFound = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-24">
    <span className="caption text-stone-400 mb-6 block">Error 404</span>
    <h1 className="editorial-heading text-5xl md:text-7xl text-stone-900 mb-6">Page Not Found</h1>
    <p className="text-stone-500 max-w-md mb-10">
      The page you are looking for doesn't exist or has been moved.
    </p>
    <Link
      to="/"
      className="inline-block bg-stone-900 text-white caption px-10 py-4 hover:bg-stone-800 transition-colors"
    >
      Back to Home
    </Link>
  </div>
);

// Router-level error boundary
const RouteErrorBoundary = () => {
  const error = useRouteError();
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
      <span className="caption text-stone-400 mb-6 block">
        {isRouteErrorResponse(error) ? `Error ${error.status}` : 'Unexpected Error'}
      </span>
      <h1 className="editorial-heading text-5xl md:text-7xl text-stone-900 mb-6">
        {is404 ? 'Page Not Found' : 'Something Went Wrong'}
      </h1>
      <p className="text-stone-500 max-w-md mb-10">
        {is404
          ? "The page you are looking for doesn't exist or has been moved."
          : 'An unexpected error occurred. Please try again.'}
      </p>
      <Link
        to="/"
        className="inline-block bg-stone-900 text-white caption px-10 py-4 hover:bg-stone-800 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

import { AboutPage } from '@/pages/About';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'categories', element: <Placeholder title="Categories" /> },
      { path: 'product/:id', element: <ProductDetailPage /> },
      { path: 'cart', element: <Placeholder title="Shopping Bag" /> },
      { path: 'checkout', element: <Placeholder title="Checkout" /> },

      // Auth Routes
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <LoginPage /> },
          { path: 'signup', element: <SignupPage /> },
          { path: 'forgot-password', element: <Placeholder title="Forgot Password" /> },
          { path: 'reset-password', element: <Placeholder title="Reset Password" /> },
        ],
      },

      // User Account Routes
      {
        path: 'account',
        element: <AccountLayout />,
        children: [
          { index: true, element: <Navigate to="profile" replace /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'orders', element: <OrdersPage /> },
          { path: 'wishlist', element: <WishlistPage /> },
        ],
      },

      // Admin Routes
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <Placeholder title="Admin Dashboard" /> },
          { path: 'products', element: <Placeholder title="Manage Products" /> },
          { path: 'categories', element: <Placeholder title="Manage Categories" /> },
          { path: 'orders', element: <Placeholder title="Manage Orders" /> },
          { path: 'users', element: <Placeholder title="Manage Users" /> },
          { path: 'reviews', element: <Placeholder title="Manage Reviews" /> },
        ],
      },

      // Catch-all 404
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
