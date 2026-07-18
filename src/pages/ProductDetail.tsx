import { useParams } from 'react-router-dom';
import { useProduct } from '@/hooks/use-products';
import { useAddToCart } from '@/hooks/use-cart';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/States';
import { useState } from 'react';
import { toast } from 'sonner';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useProduct(id!);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const addToCart = useAddToCart();
  const { isAuthenticated } = useAuthStore();
  const { openCartDrawer } = useUIStore();

  if (isLoading) {
    return (
      <div className="container-wide py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
        <Skeleton className="aspect-3/4 w-full" />
        <div className="space-y-6 pt-10">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return <ErrorState title="Product not found" />;
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to your bag');
      return;
    }
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    addToCart.mutate(
      { product_id: product._id, size: selectedSize, quantity: 1 },
      { onSuccess: () => openCartDrawer() }
    );
  };

  const effectivePrice = product.is_offer_active && product.offer_price
    ? product.offer_price
    : product.price;

  return (
    <div className="container-wide py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Images */}
        <div className="grid gap-4">
          {product.images.map((img, idx) => (
            <div key={idx} className="bg-stone-100 aspect-3/4 overflow-hidden">
              <img src={img.path} alt={`${product.name} - view ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="md:sticky md:top-24 self-start space-y-8">
          <div>
            <h1 className="editorial-heading text-3xl md:text-4xl text-stone-900 mb-3">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 text-lg">
              <span className="font-medium text-stone-900">
                ${effectivePrice.toFixed(2)}
              </span>
              {product.is_offer_active && product.offer_price && (
                <span className="text-stone-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div className="prose prose-stone text-sm">
            <p>{product.description}</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium tracking-wide uppercase">Size</span>
              <button className="text-xs text-stone-500 underline underline-offset-4">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.sizes.map((s) => {
                const isOutOfStock = s.stock === 0;
                return (
                  <button
                    key={s.size}
                    disabled={isOutOfStock}
                    onClick={() => setSelectedSize(s.size)}
                    className={`
                      h-12 border text-sm font-medium transition-colors
                      ${isOutOfStock ? 'opacity-30 cursor-not-allowed border-stone-200 text-stone-400' : 'cursor-pointer'}
                      ${selectedSize === s.size 
                        ? 'border-stone-900 bg-stone-900 text-stone-50' 
                        : 'border-stone-200 text-stone-900 hover:border-stone-900'}
                    `}
                  >
                    {s.size}
                  </button>
                );
              })}
            </div>
          </div>

          <Button 
            size="lg" 
            fullWidth 
            onClick={handleAddToCart}
            disabled={!product.is_available || addToCart.isPending}
            isLoading={addToCart.isPending}
          >
            {product.is_available ? 'Add to Bag' : 'Sold Out'}
          </Button>
        </div>
      </div>
    </div>
  );
}
