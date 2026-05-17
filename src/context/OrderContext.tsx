import { createContext, useContext, useState, ReactNode } from "react";
import { Order, OrderStatus } from "@/types/admin";

const today = new Date();
const iso = (d: Date) => d.toISOString();
const daysAgo = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return iso(d);
};

const initial: Order[] = [
  { id: "ORD-1001", customer: "John Doe", items: [{ name: "Classic Cheese Burger", quantity: 2, price: 10.99 }], total: 21.98, status: "pending", createdAt: iso(today) },
  { id: "ORD-1002", customer: "Sarah Smith", items: [{ name: "Bacon Deluxe", quantity: 1, price: 13.99 }, { name: "BBQ Stack", quantity: 1, price: 14.99 }], total: 28.98, status: "preparing", createdAt: iso(today) },
  { id: "ORD-1003", customer: "Mike Johnson", items: [{ name: "Spicy Jalapeño", quantity: 3, price: 11.99 }], total: 35.97, status: "delivered", createdAt: daysAgo(1) },
  { id: "ORD-1004", customer: "Emma Wilson", items: [{ name: "Double Stack", quantity: 1, price: 15.99 }], total: 15.99, status: "delivered", createdAt: daysAgo(3) },
  { id: "ORD-1005", customer: "Liam Brown", items: [{ name: "Mushroom Swiss", quantity: 2, price: 12.49 }], total: 24.98, status: "cancelled", createdAt: daysAgo(8) },
  { id: "ORD-1006", customer: "Olivia Davis", items: [{ name: "BBQ Stack", quantity: 2, price: 14.99 }], total: 29.98, status: "delivered", createdAt: daysAgo(15) },
  { id: "ORD-1007", customer: "Noah Miller", items: [{ name: "Classic Cheese Burger", quantity: 4, price: 10.99 }], total: 43.96, status: "delivered", createdAt: daysAgo(40) },
];

interface NewOrderInput {
  customer: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
}

interface OrderContextType {
  orders: Order[];
  updateStatus: (id: string, status: OrderStatus) => void;
  addOrder: (input: NewOrderInput) => Order;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(initial);

  const updateStatus = (id: string, status: OrderStatus) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));

  const addOrder = (input: NewOrderInput): Order => {
    const nextNum = 1000 + orders.length + 1;
    const order: Order = {
      id: `ORD-${nextNum}`,
      customer: input.customer,
      items: input.items,
      total: input.total,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  return (
    <OrderContext.Provider value={{ orders, updateStatus, addOrder }}>{children}</OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};
