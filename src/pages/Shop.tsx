import { useSearchParams } from 'react-router-dom';
import { useProducts } from '@/hooks/use-products';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/States';
import { Search } from 'lucide-react';

export function ShopPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;
  
  // Minimal pagination for now
  const page = 1; 
  const limit = 24;

  const { data: productsData, isLoading } = useProducts({
    category,
    search,
    page,
    limit,
  });

  const title = search 
    ? `Results for "${search}"` 
    : category 
      ? category.charAt(0).toUpperCase() + category.slice(1) 
      : 'All Products';

  return (
    <div className="container-wide py-12 md:py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="editorial-heading text-3xl md:text-4xl text-stone-900 mb-2">
            {title}
          </h1>
          {!isLoading && productsData && (
            <p className="text-sm text-stone-500">
              {productsData.total} {productsData.total === 1 ? 'Product' : 'Products'}
            </p>
          )}
        </div>

        {/* Filters placeholder - in a real app this would be a full drawer/sidebar */}
        <div className="flex items-center gap-4">
          <select className="text-sm bg-transparent border-none text-stone-900 focus:ring-0 cursor-pointer uppercase tracking-wide">
            <option value="newest">Sort by: Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <ProductGridSkeleton count={12} />
      ) : productsData?.items.length === 0 ? (
        <EmptyState 
          icon={<Search size={48} strokeWidth={1} />}
          title="No products found"
          description="Try adjusting your search or filters to find what you're looking for."
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-y-16">
          {productsData?.items.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
