import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUIStore } from '@/store/ui.store';
import { useCart, useUpdateCartItem, useRemoveCartItem } from '@/hooks/use-cart';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/States';
import type { CartItem as CartItemType, CartItemProduct } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

function isPopulatedProduct(product: CartItemType['product']): product is CartItemProduct {
  return typeof product === 'object' && '_id' in product;
}

function CartItemRow({ item }: { item: CartItemType }) {
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();

  if (!isPopulatedProduct(item.product)) return null;

  const product = item.product;
  const price = product.is_offer_active && product.offer_price
    ? product.offer_price
    : product.price;
  const mainImage = product.images[0]?.path;

  return (
    <div className="flex gap-4 py-4 border-b border-stone-100">
      <div className="w-20 h-24 bg-stone-100 shrink-0 overflow-hidden">
        {mainImage && (
          <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h4 className="text-sm font-normal text-stone-900 truncate">
              {product.name}
            </h4>
            <p className="text-xs text-stone-400 mt-0.5">Size: {item.size}</p>
          </div>
          <button
            onClick={() =>
              removeItem.mutate({
                product_id: product._id,
                size: item.size,
              })
            }
            className="p-1 text-stone-400 hover:text-stone-900"
            aria-label="Remove item"
          >
            <X size={14} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-stone-200">
            <button
              onClick={() =>
                item.quantity > 1 &&
                updateItem.mutate({
                  product_id: product._id,
                  size: item.size,
                  quantity: item.quantity - 1,
                })
              }
              className="p-1.5 text-stone-500 hover:text-stone-900 disabled:opacity-30"
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center text-xs font-medium text-stone-900">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                updateItem.mutate({
                  product_id: product._id,
                  size: item.size,
                  quantity: item.quantity + 1,
                })
              }
              className="p-1.5 text-stone-500 hover:text-stone-900"
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </button>
          </div>
          <span className="text-sm font-medium text-stone-900">
            ${(price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer } = useUIStore();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { data: cart } = useCart();

  const items = cart?.items ?? [];

  const subtotal = items.reduce((sum, item) => {
    if (!isPopulatedProduct(item.product)) return sum;
    const price = item.product.is_offer_active && item.product.offer_price
      ? item.product.offer_price
      : item.product.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-50"
            onClick={closeCartDrawer}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col"
            aria-label="Shopping bag"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-14 border-b border-stone-200 shrink-0">
              <h2 className="text-sm font-medium tracking-wide uppercase text-stone-900">
                Bag ({items.length})
              </h2>
              <button
                onClick={closeCartDrawer}
                className="p-1 text-stone-500 hover:text-stone-900"
                aria-label="Close bag"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6">
              {!isAuthenticated ? (
                <EmptyState
                  title="Sign in to view your bag"
                  action={{ label: 'Sign In', onClick: closeCartDrawer }}
                />
              ) : items.length === 0 ? (
                <EmptyState
                  icon={<ShoppingBag size={48} strokeWidth={1} />}
                  title="Your bag is empty"
                  description="Looks like you haven't added anything yet."
                />
              ) : (
                items.map((item, i) => <CartItemRow key={i} item={item} />)
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-stone-200 p-6 space-y-4 shrink-0">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-stone-500">Subtotal</span>
                  <span className="text-base font-medium text-stone-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-stone-400">Shipping calculated at checkout.</p>
                <div className="space-y-2">
                  <Link to="/checkout" onClick={closeCartDrawer}>
                    <Button fullWidth>Checkout</Button>
                  </Link>
                  <Link to="/cart" onClick={closeCartDrawer}>
                    <Button variant="outline" fullWidth>
                      View Bag
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
