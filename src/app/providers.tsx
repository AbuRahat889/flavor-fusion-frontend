"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { MenuProvider } from "@/context/MenuContext";
import { OrderProvider } from "@/context/OrderContext";
import { CategoryProvider } from "@/context/CategoryContext";
import { AdminAuthProvider } from "@/context/AdminAuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <CategoryProvider>
          <MenuProvider>
            <OrderProvider>
              <CartProvider>
                <TooltipProvider>
                  {children}
                  <Toaster />
                  <Sonner />
                </TooltipProvider>
              </CartProvider>
            </OrderProvider>
          </MenuProvider>
        </CategoryProvider>
      </AdminAuthProvider>
    </QueryClientProvider>
  );
}
