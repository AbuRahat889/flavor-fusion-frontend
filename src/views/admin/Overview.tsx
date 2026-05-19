"use client";

import { ShoppingBag, Calendar, UtensilsCrossed, Tag, DollarSign, TrendingUp } from "lucide-react";
import { useOrders } from "@/context/OrderContext";
import { useMenu } from "@/context/MenuContext";
import { useCategories } from "@/context/CategoryContext";

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const isSameMonth = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

const statusColors: Record<string, string> = {
  pending: "bg-gold/20 text-gold",
  preparing: "bg-primary/20 text-primary",
  delivered: "bg-green-500/20 text-green-500",
  cancelled: "bg-destructive/20 text-destructive",
};

const Overview = () => {
  const { orders } = useOrders();
  const { burgers } = useMenu();
  const { categories } = useCategories();

  const now = new Date();
  const todayOrders = orders.filter((o) => isSameDay(new Date(o.createdAt), now));
  const monthOrders = orders.filter((o) => isSameMonth(new Date(o.createdAt), now));
  const monthRevenue = monthOrders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);

  const stats = [
    { label: "Today's Orders", value: todayOrders.length, icon: Calendar, sub: `${todayOrders.filter((o) => o.status === "pending").length} pending` },
    { label: "Monthly Orders", value: monthOrders.length, icon: ShoppingBag, sub: `$${monthRevenue.toFixed(2)} revenue` },
    { label: "Total Items", value: burgers.length, icon: UtensilsCrossed, sub: "in menu" },
    { label: "Categories", value: categories.length, icon: Tag, sub: "active" },
  ];

  const recent = [...orders].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl font-bold text-foreground">Overview</h2>
        <p className="text-sm text-muted-foreground">Welcome back, here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border/50 bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <s.icon className="w-4 h-4 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-border/50 bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-xl font-semibold text-foreground">Recent Orders</h3>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div className="space-y-3">
            {recent.map((o) => (
              <div key={o.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium text-foreground text-sm">{o.id}</p>
                  <p className="text-xs text-muted-foreground">{o.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary text-sm">${o.total.toFixed(2)}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusColors[o.status]}`}>{o.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border/50 bg-card p-5">
          <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {categories.map((c) => {
              const count = burgers.filter((b) => b.category === c.name).length;
              const pct = burgers.length ? (count / burgers.length) * 100 : 0;
              return (
                <div key={c.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{c.name}</span>
                    <span className="text-muted-foreground">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 pt-4 border-t border-border/50 flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Catalog value:</span>
            <span className="font-semibold text-foreground">${burgers.reduce((s, b) => s + b.price, 0).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
