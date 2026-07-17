import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useUIStore } from '@/store/ui.store';
import { motion, AnimatePresence } from 'framer-motion';

export function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    if (isSearchOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isSearchOpen, closeSearch]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
        closeSearch();
      }
    },
    [query, navigate, closeSearch]
  );

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-white"
        >
          <div className="container-narrow pt-6">
            <div className="flex items-center justify-end mb-8">
              <button
                onClick={closeSearch}
                className="p-2 text-stone-500 hover:text-stone-900"
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-3 border-b-2 border-stone-900 pb-3">
                <Search size={20} className="text-stone-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full text-2xl md:text-3xl font-light bg-transparent text-stone-900 placeholder:text-stone-300 focus:outline-none"
                  aria-label="Search products"
                />
              </div>
            </form>

            <p className="mt-6 text-sm text-stone-400">
              Press Enter to search or Escape to close.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
