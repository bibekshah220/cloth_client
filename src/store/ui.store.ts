import { create } from 'zustand';

interface UIState {
  isCartDrawerOpen: boolean;
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  openSearch: () => void;
  closeSearch: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartDrawerOpen: false,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  openCartDrawer: () => set({ isCartDrawerOpen: true }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  toggleCartDrawer: () =>
    set((s) => ({ isCartDrawerOpen: !s.isCartDrawerOpen })),
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
}));
