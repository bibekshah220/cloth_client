import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import type { Product } from '@/types';

interface LuxuryProductCardProps {
  product: Product;
  className?: string;
}

export function LuxuryProductCard({ product, className }: LuxuryProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const hasDiscount = product.is_offer_active && product.offer_price;
  const displayPrice = hasDiscount ? product.offer_price : product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.offer_price!) / product.price) * 100)
    : 0;

  const mainImage = product.images[0]?.path;
  const hoverImage = product.images[1]?.path || mainImage;

  return (
    <motion.div
      className={cn('group relative', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
        <Link to={`/product/${product._id}`}>
          {/* Main Image */}
          <img
            src={mainImage}
            alt={product.name}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-all duration-700',
              isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            )}
          />
          {/* Hover Image */}
          <img
            src={hoverImage}
            alt={product.name}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-all duration-700',
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            )}
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {hasDiscount && (
            <span className="px-2.5 py-1 bg-red-500 text-white text-[10px] font-medium tracking-wider uppercase">
              -{discountPercent}%
            </span>
          )}
          {product.is_featured && (
            <span className="px-2.5 py-1 bg-stone-900 text-white text-[10px] font-medium tracking-wider uppercase">
              Featured
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={cn(
            'absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300',
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2',
            isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-stone-700 hover:bg-stone-900 hover:text-white'
          )}
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Actions */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 p-4 flex gap-2 transition-all duration-500',
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          <button className="flex-1 py-3 bg-stone-900 text-white text-xs font-medium tracking-wider uppercase hover:bg-stone-800 transition-colors flex items-center justify-center gap-2">
            <ShoppingBag size={14} />
            Add to Bag
          </button>
          <Link
            to={`/product/${product._id}`}
            className="w-12 h-12 flex items-center justify-center bg-white text-stone-900 hover:bg-stone-100 transition-colors"
          >
            <Eye size={16} />
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        {/* Category */}
        <p className="text-[10px] font-medium text-stone-400 tracking-wider uppercase">
          {typeof product.category === 'object' ? product.category.name : 'Fashion'}
        </p>

        {/* Name */}
        <Link to={`/product/${product._id}`}>
          <h3 className="text-sm font-medium text-stone-900 group-hover:text-stone-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < 4 ? 'text-amber-400 fill-amber-400' : 'text-stone-300'}
            />
          ))}
          <span className="text-xs text-stone-400 ml-1">(24)</span>
        </div>

        {/* Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex items-center gap-1.5">
            {product.sizes.slice(0, 4).map((sizeItem, i) => {
              const sizeLabel = typeof sizeItem === 'object' && sizeItem !== null ? (sizeItem as { size: string }).size : String(sizeItem);
              return (
                <span
                  key={i}
                  className="w-7 h-7 flex items-center justify-center text-[10px] border border-stone-200 text-stone-500 hover:border-stone-900 hover:text-stone-900 cursor-pointer transition-colors"
                >
                  {sizeLabel}
                </span>
              );
            })}
            {product.sizes.length > 4 && (
              <span className="text-[10px] text-stone-400">+{product.sizes.length - 4}</span>
            )}
          </div>
        )}

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 4).map((color, i) => (
              <span
                key={i}
                className="w-4 h-4 rounded-full border border-stone-200 cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: String(color).toLowerCase() }}
                title={String(color)}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-stone-400">+{product.colors.length - 4}</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-base font-semibold text-stone-900">
            ${displayPrice?.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-stone-400 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
