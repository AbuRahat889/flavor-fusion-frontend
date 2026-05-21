"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  Tag,
  Home,
  LogOut,
} from "lucide-react";
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
import { cn } from "@/lib/utils";

const items = [
  { title: "Overview", url: "/admin", icon: LayoutDashboard, end: true },
  { title: "Products", url: "/admin/products", icon: UtensilsCrossed },
  { title: "Orders", url: "/admin/orders", icon: ShoppingBag },
  { title: "Categories", url: "/admin/categories", icon: Tag },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = usePathname();

  const router = useRouter();

  const handleLogout = () => {
    router.replace("/admin/login");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className=" flex items-center border-b border-border/50 pb-2">
          {!collapsed ? (
            <div className="px-4 py-[2px]">
              <h2 className="font-serif text-lg font-bold text-foreground">
                Burger<span className="text-primary">Admin</span>
              </h2>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          ) : (
            <div className="p-2">
              <div className=" rounded-full  flex items-center justify-center ">
                <UtensilsCrossed className="w-8 h-8 text-primary" />
              </div>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Manage</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = item.end
                  ? pathname === item.url
                  : pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link
                        href={item.url}
                        className={cn(
                          "flex items-center gap-2 py-5 hover:bg-[#241510]",
                          active && "bg-primary",
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
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
                  <Link
                    href="/"
                    className="flex items-center gap-2 hover:bg-[#241510] rounded-md py-5"
                  >
                    <Home className="h-4 w-4" />
                    {!collapsed && <span>Back to Site</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-destructive"
                >
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
