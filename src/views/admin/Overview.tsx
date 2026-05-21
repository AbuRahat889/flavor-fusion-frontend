"use client";

import { OverviewSk } from "@/components/Skleton/OverviewSk";
import { formatDate } from "@/lib/formatDate";
import { useGetOverviewQuery } from "@/redux/api/dashboard";
import {
  Calendar,
  ShoppingBag,
  Tag,
  TrendingUp,
  UtensilsCrossed,
} from "lucide-react";

interface recentOrders {
  id: string;
  customer: string;
  total: number;
  status: string;
  createdAt: string;
}
interface categoryBreakdown {
  id: string;
  name: string;
  totalItems: number;
}

const statusColors: Record<string, string> = {
  pending: "bg-gold/20 text-gold",
  preparing: "bg-primary/20 text-primary",
  delivered: "bg-green-500/20 text-green-500",
  cancelled: "bg-destructive/20 text-destructive",
};

const Overview = () => {
  const { data, isLoading, isError, isFetching } = useGetOverviewQuery("");
  const overview = data?.data;

  const stats = [
    {
      label: "Today's Orders",
      value: overview?.todaysOrders || 0,
      icon: Calendar,
      total: overview?.pendingOrders,
      sub: "pending",
    },
    {
      label: "Monthly Orders",
      value: overview?.monthlyOrders || 0,
      icon: ShoppingBag,
      total: `৳ ${overview?.monthlyRevenue}`,
      sub: "revenue",
    },
    {
      label: "Total Items",
      value: overview?.totalItems || 0,
      icon: UtensilsCrossed,
      sub: "in menu",
    },
    {
      label: "Categories",
      value: overview?.categories || 0,
      icon: Tag,
      sub: "active",
    },
  ];

  if (isLoading || isFetching) return <OverviewSk />;

  if (isError)
    return (
      <div className="text-center text-destructive">
        Failed to load overview data.
      </div>
    );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl font-bold text-foreground">
          Overview
        </h2>
        <p className="text-sm text-muted-foreground">
          Welcome back, here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border/50 bg-card p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </p>
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <s.icon className="w-4 h-4 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">{s.value}</p>
            <div className="flex items-center gap-1">
              <p className="text-xs text-[#ee5b2b] mt-1">{s.total}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Orders */}
        <div className="lg:col-span-2 rounded-xl border border-border/50 bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-xl font-semibold text-foreground">
              Recent Orders
            </h3>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div className="space-y-3">
            {overview?.recentOrders?.map((o: recentOrders) => (
              <div
                key={o.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
              >
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {o.customer}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(o.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary text-sm">
                    ${o.total}
                  </p>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${statusColors[o.status.toLowerCase()]}`}
                  >
                    {o.status.toLowerCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="rounded-xl border border-border/50 bg-card p-5">
          <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
            Category Breakdown
          </h3>
          <div className="space-y-3 border-b border-border/50">
            {overview?.categoryBreakdown.map((c: categoryBreakdown) => {
              const totalItems =
                overview?.categoryBreakdown?.reduce(
                  (sum: number, c: categoryBreakdown) => sum + c.totalItems,
                  0,
                ) || 0;
              const pct = totalItems ? (c.totalItems / totalItems) * 100 : 0;
              return (
                <div key={c.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{c.name}</span>
                    <span className="text-muted-foreground">
                      {c.totalItems}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
