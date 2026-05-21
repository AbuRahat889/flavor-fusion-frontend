"use client";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { CategoryProvider } from "@/context/CategoryContext";
import { MenuProvider } from "@/context/MenuContext";
import { OrderProvider } from "@/context/OrderContext";
import ReduxProvider from "@/redux/provider/ReduxProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>
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
      </ReduxProvider>
    </QueryClientProvider>
  );
}
