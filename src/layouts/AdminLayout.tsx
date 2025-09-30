
import React from "react";
import { Outlet } from "react-router-dom";
import { 
  Sidebar, 
  SidebarProvider, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Home, ShoppingBag, BarChart3, Package, ShoppingCart, Users } from "lucide-react";
import { Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center px-3 sm:px-4 py-2">
              <span className="text-lg sm:text-xl font-bold text-spice-earth">Suswastik Admin</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <Link to="/admin" className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition-colors">
                    <BarChart3 className="h-4 sm:h-5 w-4 sm:w-5" />
                    <span className="text-sm sm:text-base">Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Orders">
                  <Link to="/admin/orders" className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition-colors">
                    <ShoppingCart className="h-4 sm:h-5 w-4 sm:w-5" />
                    <span className="text-sm sm:text-base">Orders</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Products">
                  <Link to="/admin/products" className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition-colors">
                    <ShoppingBag className="h-4 sm:h-5 w-4 sm:w-5" />
                    <span className="text-sm sm:text-base">Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Inventory">
                  <Link to="/admin/inventory" className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition-colors">
                    <Package className="h-4 sm:h-5 w-4 sm:w-5" />
                    <span className="text-sm sm:text-base">Inventory</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Leads">
                  <Link to="/admin/leads" className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition-colors">
                    <Users className="h-4 sm:h-5 w-4 sm:w-5" />
                    <span className="text-sm sm:text-base">Leads</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Back to Store">
                  <Link to="/" className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition-colors">
                    <Home className="h-4 sm:h-5 w-4 sm:w-5" />
                    <span className="text-sm sm:text-base">Back to Store</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="px-3 sm:px-4 py-2 text-xs text-gray-500">
              © 2025 Suswastik
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          {/* Mobile sidebar trigger */}
          <div className="lg:hidden flex items-center p-4 border-b bg-white">
            <SidebarTrigger />
            <h1 className="ml-4 text-lg font-semibold">Admin Panel</h1>
          </div>
          <div className="container mx-auto py-4 sm:py-8 px-3 sm:px-4">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
