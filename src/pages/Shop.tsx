import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '@/hooks/use-products';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/States';
import { Button } from '@/components/ui/Button';
import { Search, SlidersHorizontal, X, Check } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { Product } from '@/types';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Alphabetical' },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]['value'];

const PAGE_SIZE = 12;

function getCategoryName(product: Product): string {
  return typeof product.category === 'object' ? product.category.name : '';
}

function getEffectivePrice(product: Product): number {
  return product.is_offer_active && product.offer_price ? product.offer_price : product.price;
}

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;
  const sort = (searchParams.get('sort') as SortValue) || 'newest';

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { data: productsData, isLoading } = useProducts({ search, limit: 48 });

  const allItems = useMemo(() => productsData?.items ?? [], [productsData]);

  // Build category list from available products
  const categories = useMemo(() => {
    const set = new Set<string>();
    allItems.forEach((p) => {
      const name = getCategoryName(p);
      if (name) set.add(name);
    });
    return Array.from(set).sort();
  }, [allItems]);

  // Filter + sort client-side for a fully functional experience
  const filtered = useMemo(() => {
    let items = [...allItems];

    if (category) {
      items = items.filter(
        (p) => getCategoryName(p).toLowerCase() === category.toLowerCase()
      );
    }

    switch (sort) {
      case 'price-asc':
        items.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
        break;
      case 'price-desc':
        items.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
        break;
      case 'name-asc':
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        items.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    return items;
  }, [allItems, category, sort]);

  const visibleItems = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const title = search
    ? `Results for "${search}"`
    : category
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : 'All Products';

  const updateParam = (key: string, value?: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="container-wide py-12 md:py-20">
      {/* Header */}
      <div className="mb-10 md:mb-14">
        <span className="caption text-stone-400 mb-3 block">Shop</span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h1 className="editorial-heading text-4xl md:text-6xl text-stone-900">{title}</h1>
          {!isLoading && (
            <p className="text-sm text-stone-500 md:pb-2">
              {filtered.length} {filtered.length === 1 ? 'Item' : 'Items'}
            </p>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 border-y border-stone-200 py-4 mb-10 sticky top-16 md:top-20 z-30 bg-stone-50/90 backdrop-blur-md">
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="flex items-center gap-2 caption text-stone-700 hover:text-stone-900 transition-colors"
          aria-expanded={filtersOpen}
        >
          <SlidersHorizontal size={16} />
          Filters
          {category && <span className="w-1.5 h-1.5 rounded-full bg-stone-900" />}
        </button>

        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="caption text-stone-400 hidden sm:block">
            Sort by
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => updateParam('sort', e.target.value)}
            className="caption text-stone-900 bg-transparent border-none focus:ring-0 focus:outline-none cursor-pointer pr-2"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter panel */}
      {filtersOpen && categories.length > 0 && (
        <div className="mb-10 -mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={() => updateParam('category', undefined)}
            className={cn(
              'caption px-4 py-2 border transition-colors',
              !category
                ? 'bg-stone-900 text-white border-stone-900'
                : 'border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-900'
            )}
          >
            All
          </button>
          {categories.map((cat) => {
            const active = category?.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => updateParam('category', active ? undefined : cat)}
                className={cn(
                  'caption px-4 py-2 border transition-colors inline-flex items-center gap-2',
                  active
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-900'
                )}
              >
                {active && <Check size={12} />}
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Active filter chip */}
      {category && (
        <div className="mb-8 flex items-center gap-3">
          <span className="caption text-stone-400">Filtered by</span>
          <button
            onClick={() => updateParam('category', undefined)}
            className="caption inline-flex items-center gap-2 bg-stone-100 text-stone-900 px-3 py-1.5 hover:bg-stone-200 transition-colors"
          >
            {category}
            <X size={12} />
          </button>
        </div>
      )}

      {/* Grid */}
      {isLoading ? (
        <ProductGridSkeleton count={12} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Search size={48} strokeWidth={1} />}
          title="No products found"
          description="Try adjusting your search or filters to find what you're looking for."
        />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-y-16">
            {visibleItems.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-16">
              <Button
                variant="outline"
                size="lg"
                className="px-12"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              >
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

