import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { MenuProvider } from "@/context/MenuContext";
import { OrderProvider } from "@/context/OrderContext";
import { CategoryProvider } from "@/context/CategoryContext";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import RequireAdmin from "@/components/admin/RequireAdmin";
import Index from "./pages/Index";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import Overview from "./pages/admin/Overview";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Categories from "./pages/admin/Categories";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminAuthProvider>
      <CategoryProvider>
        <MenuProvider>
          <OrderProvider>
            <CartProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route
                      path="/admin"
                      element={
                        <RequireAdmin>
                          <AdminLayout />
                        </RequireAdmin>
                      }
                    >
                      <Route index element={<Overview />} />
                      <Route path="products" element={<Products />} />
                      <Route path="orders" element={<Orders />} />
                      <Route path="categories" element={<Categories />} />
                    </Route>
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </CartProvider>
          </OrderProvider>
        </MenuProvider>
      </CategoryProvider>
    </AdminAuthProvider>
  </QueryClientProvider>
);

export default App;
