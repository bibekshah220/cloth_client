import { useWishlist, useRemoveFromWishlist } from '@/hooks/use-wishlist';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/States';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function WishlistPage() {
  const { data: wishlist, isLoading } = useWishlist();
  const remove = useRemoveFromWishlist();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-medium mb-8">My Wishlist</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <Skeleton key={i} className="aspect-[3/4] w-full" />)}
        </div>
      </div>
    );
  }

  if (!wishlist || wishlist.products.length === 0) {
    return (
      <EmptyState
        icon={<Heart size={48} strokeWidth={1} />}
        title="Your wishlist is empty"
        description="Save items you love to your wishlist to easily find them later."
        action={{ label: 'Explore Products', onClick: () => window.location.href = '/shop' }}
      />
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-medium text-stone-900 mb-8">
        My Wishlist ({wishlist.products.length})
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10">
        {wishlist.products.map((product) => {
          const mainImage = product.images[0]?.path;
          const effectivePrice = product.is_offer_active && product.offer_price
            ? product.offer_price
            : product.price;

          return (
            <div key={product._id} className="group relative">
              <Link to={`/product/${product._id}`} className="block">
                <div className="aspect-[3/4] bg-stone-100 mb-3 overflow-hidden">
                  {mainImage && (
                    <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <h3 className="text-sm font-normal text-stone-900 line-clamp-1">{product.name}</h3>
                <p className="text-sm font-medium mt-1">${effectivePrice.toFixed(2)}</p>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  remove.mutate(product._id);
                }}
                className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-sm backdrop-blur-sm transition-all"
                aria-label="Remove from wishlist"
              >
                <Heart size={16} className="fill-stone-900 text-stone-900" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
