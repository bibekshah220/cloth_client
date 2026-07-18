import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { Product } from '@/types';
import { useAuthStore } from '@/store/auth.store';
import { useAddToWishlist, useRemoveFromWishlist, useWishlist } from '@/hooks/use-wishlist';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { data: wishlist } = useWishlist();
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  const isWishlisted = wishlist?.products?.some((p) => p._id === product._id) ?? false;

  const categoryName = typeof product.category === 'object' ? product.category.name : '';

  const mainImage = product.images[0]?.path;
  const hoverImage = product.images[1]?.path;

  const effectivePrice = product.is_offer_active && product.offer_price
    ? product.offer_price
    : product.price;

  const discount = product.is_offer_active && product.offer_price
    ? Math.round(((product.price - product.offer_price) / product.price) * 100)
    : 0;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return;

    if (isWishlisted) {
      removeFromWishlist.mutate(product._id);
    } else {
      addToWishlist.mutate({ product_id: product._id });
    }
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className={cn('group block', className)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-3">
        {mainImage && (
          <img
            src={mainImage}
            alt={product.name}
            loading="lazy"
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
              hoverImage ? 'group-hover:opacity-0' : ''
            )}
          />
        )}
        {hoverImage && (
          <img
            src={hoverImage}
            alt={`${product.name} alternate view`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}

        {!product.is_available && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="caption text-stone-600">Sold Out</span>
          </div>
        )}

        {discount > 0 && product.is_available && (
          <span className="absolute top-3 left-3 caption text-red-600 bg-white/90 px-2 py-1">
            -{discount}%
          </span>
        )}

        {isAuthenticated && (
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 p-2 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={18}
              className={cn(
                'transition-all duration-200',
                isWishlisted
                  ? 'fill-stone-900 text-stone-900'
                  : 'fill-none text-stone-700 hover:fill-stone-900 hover:text-stone-900'
              )}
            />
          </button>
        )}
      </div>

      <div className="space-y-1 px-0.5">
        {categoryName && (
          <p className="caption text-stone-400">{categoryName}</p>
        )}
        <h3 className="text-sm font-normal text-stone-900 line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-stone-900">
            ${effectivePrice.toFixed(2)}
          </span>
          {discount > 0 && (
            <span className="text-sm text-stone-400 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
