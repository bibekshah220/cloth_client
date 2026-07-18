
export interface CartItemProduct {
  _id: string;
  name: string;
  images: { path: string; public_id: string }[];
  price: number;
  offer_price?: number;
  is_offer_active: boolean;
  sizes: { size: string; stock: number }[];
  is_available: boolean;
}

export interface CartItem {
  product: CartItemProduct | string;
  size: string;
  quantity: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartRequest {
  product_id: string;
  size: string;
  quantity?: number;
}

export interface UpdateCartItemRequest {
  product_id: string;
  size: string;
  quantity: number;
}

export interface RemoveCartItemRequest {
  product_id: string;
  size: string;
}
