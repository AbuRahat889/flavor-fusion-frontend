export type OrderStatus = "PENDING" | "PREPARING" | "DELIVERED" | "CANCELLED";

export interface Order {
  id: string;
  customer: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: OrderStatus;
  createdAt: string; // ISO
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  productCount?: number;
}
