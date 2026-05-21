"use client";

import { ProductsTableSk } from "@/components/Skleton/ProductsTableSk";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/formatDate";
import { handleApiResponse } from "@/lib/handleRTKResponse";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/api/ordersApi";
import { OrderStatus } from "@/types/admin";
import { useState } from "react";

const statuses: OrderStatus[] = [
  "PENDING",
  "PREPARING",
  "DELIVERED",
  "CANCELLED",
];

const statusColors: Record<OrderStatus, string> = {
  PENDING: "bg-gold/20 text-gold",
  PREPARING: "bg-primary/20 text-primary",
  DELIVERED: "bg-green-500/20 text-green-500",
  CANCELLED: "bg-destructive/20 text-destructive",
};

const Orders = () => {
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");

  const { data, isLoading, isFetching, isError } = useGetAllOrdersQuery({
    status: filter === "all" ? undefined : filter,
  });
  const ordersData = data?.data?.items || [];

  const [updateStatusFN] = useUpdateOrderStatusMutation();
  const handleStatus = async (id: string, s: OrderStatus) => {
    const payload = {
      status: s,
    };
    await handleApiResponse(
      updateStatusFN,
      { id, datas: payload },
      `Order ${id} marked as ${s}`,
    );
  };

  if (isError) {
    return (
      <div className="text-center py-20">
        <p className="text-destructive text-lg">Failed to load orders.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-3xl font-bold text-foreground">
            Orders
          </h2>
          <p className="text-sm text-muted-foreground">
            View and manage customer orders
          </p>
        </div>
        <div className="w-48">
          <Select
            value={filter}
            onValueChange={(v) => setFilter(v as typeof filter)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statuses.map((s) => (
                <SelectItem key={s} value={s} className="capitalize">
                  {s?.toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
        {isLoading || isFetching ? (
          <ProductsTableSk />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Update</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordersData?.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-medium text-foreground">
                      {o.id.slice(0, 8)}
                    </TableCell>
                    <TableCell>{o.customer}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-xs">
                      {o.items
                        .map((i) => `${i.quantity}× ${i.name}`)
                        .join(", ")}
                    </TableCell>
                    <TableCell className="font-semibold text-primary">
                      ${o.total.toFixed(2)}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                      {formatDate(o.createdAt)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`text-xs px-2 py-1 rounded-full capitalize ${statusColors[o.status]}`}
                      >
                        {o.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Select
                        value={o.status}
                        onValueChange={(v) =>
                          handleStatus(o.id, v as OrderStatus)
                        }
                      >
                        <SelectTrigger className="w-36 ml-auto">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map((s) => (
                            <SelectItem
                              key={s}
                              value={s}
                              className="capitalize"
                            >
                              {s.toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
                {ordersData.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center text-muted-foreground py-12"
                    >
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
