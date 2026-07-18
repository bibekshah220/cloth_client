import type { OrderStatus } from './enums';

export interface DashboardOverview {
  total_users: number;
  total_products: number;
  total_categories: number;
  total_orders: number;
  total_reviews: number;
  total_revenue: number;
  completed_orders: number;
}

export interface LowStockProduct {
  _id: string;
  name: string;
  total_stock: number;
  is_available: boolean;
  images: { path: string; public_id: string }[];
}

export interface RecentOrder {
  _id: string;
  user: { _id: string; first_name: string; last_name: string; email: string };
  total_amount: number;
  status: OrderStatus;
  payment_status: string;
  createdAt: string;
}

export interface TopSellingProduct {
  _id: string;
  name: string;
  total_sold: number;
  total_revenue: number;
  images: { path: string; public_id: string }[];
}

export interface DashboardStats {
  overview: DashboardOverview;
  order_status_breakdown: Record<string, number>;
  low_stock_products: LowStockProduct[];
  recent_orders: RecentOrder[];
  top_selling_products: TopSellingProduct[];
}

export interface DailySale {
  date: string;
  total_amount: number;
  order_count: number;
}

export interface CategorySale {
  _id: string;
  category_name: string;
  total_sold: number;
  total_revenue: number;
}

export interface SalesAnalytics {
  period_days: number;
  daily_sales: DailySale[];
  category_sales: CategorySale[];
}
