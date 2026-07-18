export interface ReviewUser {
  _id: string;
  first_name: string;
  last_name: string;
  email?: string;
}

export interface ReviewProduct {
  _id: string;
  name: string;
  images?: { path: string; public_id: string }[];
}

export interface Review {
  _id: string;
  user: ReviewUser | string;
  product: ReviewProduct | string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewRequest {
  product_id: string;
  rating: number;
  comment?: string;
}

export interface UpdateReviewRequest {
  rating?: number;
  comment?: string;
}

export interface ProductReviewsData {
  items: Review[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
  average_rating: number;
  total_reviews: number;
}
