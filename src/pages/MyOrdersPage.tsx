import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Calendar, CreditCard, Truck, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Order } from "@/types";
import { useState } from "react";

const ORDERS_PER_PAGE = 5;

const MyOrdersPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: ordersData, isLoading, error } = useQuery({
    queryKey: ['my-orders', user?.id, currentPage],
    queryFn: async () => {
      if (!user?.id) {
        console.log('MyOrdersPage: No user ID available');
        return { orders: [], totalCount: 0 };
      }
      
      console.log('MyOrdersPage: Fetching orders for user:', user.id, 'page:', currentPage);
      
      try {
        const from = (currentPage - 1) * ORDERS_PER_PAGE;
        const to = from + ORDERS_PER_PAGE - 1;

        // Get total count first
        const { count } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        // Then get paginated data
        const { data, error } = await supabase
          .from('orders')
          .select(`
            id,
            created_at,
            status,
            total_price,
            customer_name,
            customer_email,
            customer_phone,
            shipping_address,
            order_items!fk_order_items_order_id (
              quantity,
              price,
              products!fk_order_items_product_id (
                name
              )
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .range(from, to);

        if (error) {
          console.error('MyOrdersPage: Error fetching orders:', error);
          throw error;
        }
        
        console.log('MyOrdersPage: Orders fetched successfully:', data);
        return { orders: data as Order[], totalCount: count || 0 };
      } catch (err) {
        console.error('MyOrdersPage: Query failed:', err);
        throw err;
      }
    },
    enabled: !!user?.id && !authLoading,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaced cacheTime)
  });

  const orders = ordersData?.orders || [];
  const totalCount = ordersData?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / ORDERS_PER_PAGE);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: Package,
      processing: Truck,
      completed: Package,
      cancelled: Package
    };
    const Icon = icons[status as keyof typeof icons] || Package;
    return <Icon className="h-3 sm:h-4 w-3 sm:w-4" />;
  };

  // Show loading while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
        <div className="container-custom">
          <h1 className="text-2xl sm:text-3xl font-bold text-spice-earth mb-6 sm:mb-8">My Orders</h1>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4 sm:p-6">
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show sign in message if no user
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-spice-earth mb-4">My Orders</h1>
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
              <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-sm sm:text-base text-gray-600 mb-4">Please sign in to view your orders.</p>
              <a 
                href="/auth" 
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while orders are loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
        <div className="container-custom">
          <h1 className="text-2xl sm:text-3xl font-bold text-spice-earth mb-6 sm:mb-8">My Orders</h1>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4 sm:p-6">
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    console.error('MyOrdersPage: Rendering error state:', error);
    return (
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
        <div className="container-custom">
          <h1 className="text-2xl sm:text-3xl font-bold text-spice-earth mb-6 sm:mb-8">My Orders</h1>
          <Card>
            <CardContent className="p-4 sm:p-6 text-center">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
              <p className="text-sm sm:text-base text-red-600 mb-4">Error loading orders. Please try again later.</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Retry
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="container-custom">
        <h1 className="text-2xl sm:text-3xl font-bold text-spice-earth mb-6 sm:mb-8">My Orders</h1>
        
        {orders.length === 0 ? (
          <Card>
            <CardContent className="p-8 sm:p-12 text-center">
              <Package className="h-12 sm:h-16 w-12 sm:w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">No orders yet</h3>
              <p className="text-sm sm:text-base text-gray-500 mb-6">When you place your first order, it will appear here.</p>
              <a 
                href="/products" 
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors"
              >
                Browse Products
              </a>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="space-y-4 sm:space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 border-b p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                      <div>
                        <CardTitle className="text-base sm:text-lg">Order #{order.id}</CardTitle>
                        <div className="flex items-center text-xs sm:text-sm text-gray-600 mt-1">
                          <Calendar className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                          {format(parseISO(order.created_at), "MMM dd, yyyy 'at' h:mm a")}
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(order.status)} flex items-center gap-1 text-xs sm:text-sm`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      {/* Order Items */}
                      <div>
                        <h4 className="font-semibold text-spice-earth mb-3 text-sm sm:text-base">Items Ordered</h4>
                        <div className="space-y-2">
                          {order.order_items?.slice(0, 3).map((item: any) => (
                            <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                              <div>
                                <p className="font-medium text-sm sm:text-base">{item.products?.name}</p>
                                <p className="text-xs sm:text-sm text-gray-600">Qty: {item.quantity}</p>
                              </div>
                              <p className="font-semibold text-sm sm:text-base">₹{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                          {order.order_items && order.order_items.length > 3 && (
                            <p className="text-xs text-gray-500">+{order.order_items.length - 3} more items</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Order Summary */}
                      <div>
                        <h4 className="font-semibold text-spice-earth mb-3 text-sm sm:text-base">Order Summary</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm sm:text-base">
                            <span>Total Items:</span>
                            <span>{order.order_items?.length || 0}</span>
                          </div>
                          <div className="flex justify-between font-semibold text-base sm:text-lg border-t pt-2">
                            <span>Total Amount:</span>
                            <span>₹{Number(order.total_price).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * ORDERS_PER_PAGE) + 1} to {Math.min(currentPage * ORDERS_PER_PAGE, totalCount)} of {totalCount} orders
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <span className="px-3 py-1 text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
