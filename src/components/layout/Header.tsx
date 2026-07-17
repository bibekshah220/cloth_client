import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, User, LogOut, LayoutDashboard, ChevronDown, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';
import { useCart } from '@/hooks/use-cart';
import { useLogout } from '@/hooks/use-auth';
import { cn } from '@/utils/cn';
import { useState, useRef, useEffect } from 'react';
import { Role } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'New In', href: '/shop?sort=newest' },
  { label: 'Men', href: '/shop?category=men', hasMega: true },
  { label: 'Women', href: '/shop?category=women', hasMega: true },
  { label: 'Collections', href: '/collections' },
  { label: 'Sale', href: '/shop?sale=true', highlight: true },
];

const MEGA_MENU_CONTENT = {
  men: {
    categories: [
      { title: 'Clothing', items: ['T-Shirts', 'Shirts', 'Trousers', 'Jackets', 'Suits', 'Knitwear'] },
      { title: 'Accessories', items: ['Bags', 'Belts', 'Watches', 'Sunglasses', 'Wallets'] },
    ],
    featured: { image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800', title: 'New Season', subtitle: 'Refined essentials for him' },
  },
  women: {
    categories: [
      { title: 'Clothing', items: ['Dresses', 'Tops', 'Skirts', 'Trousers', 'Outerwear', 'Knitwear'] },
      { title: 'Accessories', items: ['Handbags', 'Jewelry', 'Scarves', 'Belts', 'Sunglasses'] },
    ],
    featured: { image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=800', title: 'Spring Collection', subtitle: 'Effortless elegance for her' },
  },
};

export function Header() {
  const location = useLocation();
  const { user, isAuthenticated } = useAuthStore();
  const { openCartDrawer, openMobileMenu, isMobileMenuOpen, closeMobileMenu, openSearch } = useUIStore();
  const { data: cart } = useCart();
  const logout = useLogout();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  const cartItemCount = cart?.items?.length ?? 0;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setActiveMegaMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    closeMobileMenu();
    setActiveMegaMenu(null);
  }, [location.pathname, closeMobileMenu]);

  const handleNavHover = (label: string, hasMega?: boolean) => {
    if (hasMega) {
      setActiveMegaMenu(label.toLowerCase());
    } else {
      setActiveMegaMenu(null);
    }
  };

  return (
    <>
      <header 
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-white/80 backdrop-blur-xl border-b border-stone-200/50 shadow-sm" 
            : "bg-white/95 backdrop-blur-sm border-b border-stone-200"
        )}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: Mobile menu + nav */}
            <div className="flex items-center gap-8">
              <button
                onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}
                className="lg:hidden p-1.5 text-stone-700 hover:text-stone-900 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

              <nav 
                ref={megaMenuRef}
                className="hidden lg:flex items-center gap-1" 
                aria-label="Main navigation"
              >
                {NAV_LINKS.map((link) => (
                  <div 
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => handleNavHover(link.label, link.hasMega)}
                  >
                    <Link
                      to={link.href}
                      className={cn(
                        'px-4 py-2 text-[0.8125rem] font-normal tracking-wide transition-all duration-200 flex items-center gap-1 rounded-full',
                        link.highlight 
                          ? 'text-red-600 hover:bg-red-50' 
                          : location.pathname === link.href
                            ? 'text-stone-900 bg-stone-100'
                            : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                      )}
                    >
                      {link.label}
                      {link.hasMega && <ChevronDown size={14} className={cn(
                        "transition-transform duration-200",
                        activeMegaMenu === link.label.toLowerCase() && "rotate-180"
                      )} />}
                    </Link>
                  </div>
                ))}
              </nav>
            </div>

            {/* Center: Logo */}
            <Link
              to="/"
              className="absolute left-1/2 -translate-x-1/2 text-xl md:text-2xl font-semibold tracking-[0.2em] uppercase text-stone-900 hover:opacity-70 transition-opacity"
            >
              ELITE THREADS
            </Link>

            {/* Right: Actions */}
            <div className="flex items-center gap-0.5 md:gap-1">
              <button
                onClick={openSearch}
                className="p-2.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-all"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {isAuthenticated && (
                <Link
                  to="/account/wishlist"
                  className="hidden md:flex p-2.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-all"
                  aria-label="Wishlist"
                >
                  <Heart size={20} />
                </Link>
              )}

              <button
                onClick={openCartDrawer}
                className="relative p-2.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-all"
                aria-label={`Shopping bag (${cartItemCount} items)`}
              >
                <ShoppingBag size={20} />
                {cartItemCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-stone-900 text-stone-50 text-[0.625rem] font-medium flex items-center justify-center"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </button>

              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="p-2.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-all"
                    aria-label="Account menu"
                  >
                    <User size={20} />
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-56 bg-white border border-stone-200 shadow-xl py-1.5 rounded-xl z-50 overflow-hidden"
                      >
                        <div className="px-4 py-3 bg-stone-50 border-b border-stone-100">
                          <p className="text-sm font-medium text-stone-900 truncate">
                            {user?.first_name} {user?.last_name}
                          </p>
                          <p className="text-xs text-stone-400 truncate">{user?.email}</p>
                        </div>

                        <Link
                          to="/account/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                        >
                          <User size={16} /> My Profile
                        </Link>
                        <Link
                          to="/account/orders"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                        >
                          <ShoppingBag size={16} /> My Orders
                        </Link>
                        <Link
                          to="/account/wishlist"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                        >
                          <Heart size={16} /> Wishlist
                        </Link>

                        {user?.role === Role.ADMIN && (
                          <Link
                            to="/admin"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                          >
                            <LayoutDashboard size={16} /> Admin Dashboard
                          </Link>
                        )}

                        <div className="border-t border-stone-100 mt-1.5 pt-1.5">
                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              logout.mutate();
                            }}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut size={16} /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/auth/login"
                  className="hidden md:flex px-4 py-2 text-[0.8125rem] font-medium text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {activeMegaMenu && MEGA_MENU_CONTENT[activeMegaMenu as keyof typeof MEGA_MENU_CONTENT] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 bg-white border-t border-stone-100 shadow-xl overflow-hidden"
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <div className="container-wide py-10">
                <div className="grid grid-cols-4 gap-12">
                  {/* Categories */}
                  {MEGA_MENU_CONTENT[activeMegaMenu as keyof typeof MEGA_MENU_CONTENT].categories.map((cat) => (
                    <div key={cat.title}>
                      <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-4">{cat.title}</h4>
                      <ul className="space-y-2.5">
                        {cat.items.map((item) => (
                          <li key={item}>
                            <Link 
                              to={`/shop?category=${activeMegaMenu}&subcategory=${item.toLowerCase()}`}
                              className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Featured */}
                  <div className="col-span-2">
                    <div className="relative aspect-[2/1] overflow-hidden rounded-lg group">
                      <img 
                        src={MEGA_MENU_CONTENT[activeMegaMenu as keyof typeof MEGA_MENU_CONTENT].featured.image}
                        alt="Featured"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                        <div className="p-8">
                          <span className="text-amber-400 text-xs tracking-wider uppercase">{MEGA_MENU_CONTENT[activeMegaMenu as keyof typeof MEGA_MENU_CONTENT].featured.title}</span>
                          <h3 className="text-white text-2xl font-light mt-2 mb-4">{MEGA_MENU_CONTENT[activeMegaMenu as keyof typeof MEGA_MENU_CONTENT].featured.subtitle}</h3>
                          <Link 
                            to={`/shop?category=${activeMegaMenu}`}
                            className="inline-flex items-center gap-2 text-white text-sm hover:gap-3 transition-all"
                          >
                            Shop Now <ArrowRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white pt-16 lg:hidden"
          >
            <nav className="flex flex-col p-8 gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "py-4 text-2xl font-light text-stone-900 border-b border-stone-100 transition-colors",
                    link.highlight && "text-red-600"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {!isAuthenticated && (
                <Link
                  to="/auth/login"
                  className="mt-8 py-4 text-center text-lg font-medium text-white bg-stone-900 rounded-full"
                >
                  Sign In
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
