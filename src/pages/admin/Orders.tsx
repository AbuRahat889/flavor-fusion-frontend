import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useOrders } from "@/context/OrderContext";
import { OrderStatus } from "@/types/admin";
import { toast } from "sonner";

const statuses: OrderStatus[] = ["pending", "preparing", "delivered", "cancelled"];

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-gold/20 text-gold",
  preparing: "bg-primary/20 text-primary",
  delivered: "bg-green-500/20 text-green-500",
  cancelled: "bg-destructive/20 text-destructive",
};

const Orders = () => {
  const { orders, updateStatus } = useOrders();
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const sorted = [...filtered].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  const handleStatus = (id: string, s: OrderStatus) => {
    updateStatus(id, s);
    toast.success(`Order ${id} marked as ${s}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-3xl font-bold text-foreground">Orders</h2>
          <p className="text-sm text-muted-foreground">View and manage customer orders</p>
        </div>
        <div className="w-48">
          <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statuses.map((s) => (
                <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
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
              {sorted.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium text-foreground">{o.id}</TableCell>
                  <TableCell>{o.customer}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-xs">
                    {o.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                  </TableCell>
                  <TableCell className="font-semibold text-primary">${o.total.toFixed(2)}</TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${statusColors[o.status]}`}>
                      {o.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Select value={o.status} onValueChange={(v) => handleStatus(o.id, v as OrderStatus)}>
                      <SelectTrigger className="w-36 ml-auto"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {statuses.map((s) => (
                          <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
              {sorted.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-12">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
