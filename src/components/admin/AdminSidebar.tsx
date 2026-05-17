import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, UtensilsCrossed, ShoppingBag, Tag, Home, LogOut } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Overview", url: "/admin", icon: LayoutDashboard, end: true },
  { title: "Products", url: "/admin/products", icon: UtensilsCrossed },
  { title: "Orders", url: "/admin/orders", icon: ShoppingBag },
  { title: "Categories", url: "/admin/categories", icon: Tag },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="p-4 border-b border-border/50">
          {!collapsed ? (
            <div>
              <h2 className="font-serif text-lg font-bold text-foreground">
                Burger<span className="text-primary">Admin</span>
              </h2>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <UtensilsCrossed className="w-4 h-4 text-primary" />
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Manage</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = item.end ? pathname === item.url : pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active}>
                      <NavLink to={item.url} end={item.end} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    {!collapsed && <span>Back to Site</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} className="flex items-center gap-2 text-destructive">
                  <LogOut className="h-4 w-4" />
                  {!collapsed && <span>Logout</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
