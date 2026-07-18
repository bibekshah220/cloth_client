export interface ProductImage {
  path: string;
  public_id: string;
}

export interface ProductSize {
  size: string;
  stock: number;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string | { _id: string; name: string };
  images: ProductImage[];
  price: number;
  offer_price?: number;
  is_offer_active: boolean;
  sizes: ProductSize[];
  total_stock: number;
  is_available: boolean;
  created_by: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}
