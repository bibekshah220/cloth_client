export interface WishlistProduct {
  _id: string;
  name: string;
  images: { path: string; public_id: string }[];
  price: number;
  offer_price?: number;
  is_offer_active: boolean;
  is_available: boolean;
}

export interface Wishlist {
  _id: string;
  user: string;
  products: WishlistProduct[];
  createdAt: string;
  updatedAt: string;
}

export interface AddToWishlistRequest {
  product_id: string;
}
