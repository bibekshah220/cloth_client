import type { OrderStatus, PaymentStatus } from './enums';

export interface OrderItem {
  product: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  full_name: string;
  phone: string;
  street: string;
  city: string;
  state?: string;
  postal_code?: string;
  country: string;
}

export interface Order {
  _id: string;
  user: string | { _id: string; first_name: string; last_name: string; email: string };
  items: OrderItem[];
  shipping_address: ShippingAddress;
  total_amount: number;
  status: OrderStatus;
  payment_status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  items: {
    product_id: string;
    size: string;
    quantity: number;
  }[];
  shipping_address: ShippingAddress;
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
}
