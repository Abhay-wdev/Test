
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Package, Truck, CheckCircle, XCircle, Play, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useOrders, useProcessOrderMutation, useCancelOrderMutation } from "@/hooks/useOrders";
import OrderDetailsModal from "@/components/OrderDetailsModal";
import { Order } from "@/types";

const PAGE_SIZE = 10;

const OrdersManagement = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useOrders({
    page: currentPage,
    pageSize: PAGE_SIZE,
    status: selectedStatus
  });

  const orders = useMemo(() => data?.orders || [], [data]);
  const totalOrdersCount = useMemo(() => data?.count || 0, [data]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const processOrderMutation = useProcessOrderMutation();
  const cancelOrderMutation = useCancelOrderMutation();

  // The hook now handles status filtering, so filteredOrders is just the orders from the current page
  const filteredOrders = orders;

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleProcessOrder = (orderId: number) => {
    processOrderMutation.mutate(orderId);
  };

  const handleCancelOrder = (orderId: number) => {
    cancelOrderMutation.mutate(orderId);
  };

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { variant: "secondary" as const, icon: Package },
      processing: { variant: "default" as const, icon: Truck },
      completed: { variant: "default" as const, icon: CheckCircle },
      cancelled: { variant: "destructive" as const, icon: XCircle }
    };
    
    const { variant, icon: Icon } = config[status as keyof typeof config] || config.pending;
    
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getTotalRevenue = () => {
    // This will calculate revenue for the current page.
    // For global revenue, a separate query/logic would be needed.
    return filteredOrders.reduce((total, order) => total + Number(order.total_price), 0);
  };

  const getOrdersCount = () => {
    // Counts for current page, total is global
    return {
      total: totalOrdersCount,
      pending: filteredOrders.filter(o => o.status === 'pending').length,
      processing: filteredOrders.filter(o => o.status === 'processing').length,
      completed: filteredOrders.filter(o => o.status === 'completed').length,
      cancelled: filteredOrders.filter(o => o.status === 'cancelled').length,
    };
  };
  
  const totalPages = Math.ceil(totalOrdersCount / PAGE_SIZE);

  if (isLoading && !data) { // Show loading only on initial fetch or if data is not yet available
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-spice-earth">Orders Management</h1>
          <p className="text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-spice-earth">Orders Management</h1>
          <p className="text-red-600">Error loading orders: {error.message}</p>
        </div>
      </div>
    );
  }

  const orderStats = getOrdersCount();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-spice-earth">Orders Management</h1>
        <p className="text-muted-foreground">View and manage customer orders.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{orderStats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{orderStats.processing}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{orderStats.completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{getTotalRevenue().toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => { setSelectedStatus("all"); setCurrentPage(1); }}
            >
              All Orders
            </Button>
            <Button
              variant={selectedStatus === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => { setSelectedStatus("pending"); setCurrentPage(1); }}
            >
              Pending
            </Button>
            <Button
              variant={selectedStatus === "processing" ? "default" : "outline"}
              size="sm"
              onClick={() => { setSelectedStatus("processing"); setCurrentPage(1); }}
            >
              Processing
            </Button>
            <Button
              variant={selectedStatus === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => { setSelectedStatus("completed"); setCurrentPage(1); }}
            >
              Completed
            </Button>
            <Button
              variant={selectedStatus === "cancelled" ? "default" : "outline"}
              size="sm"
              onClick={() => { setSelectedStatus("cancelled"); setCurrentPage(1); }}
            >
              Cancelled
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredOrders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer_name || 'Guest'}</div>
                        <div className="text-sm text-muted-foreground">{order.customer_email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{format(parseISO(order.created_at), "MMM dd, yyyy")}</TableCell>
                    <TableCell>{order.order_items?.length || 0} items</TableCell>
                    <TableCell>₹{Number(order.total_price).toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(order)}
                        className="mr-2"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {order.status === 'pending' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleProcessOrder(order.id)}
                          disabled={processOrderMutation.isPending || cancelOrderMutation.isPending}
                          className="text-blue-600 hover:text-blue-700 border-blue-600 hover:border-blue-700"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          {processOrderMutation.isPending && processOrderMutation.variables === order.id ? 'Processing...' : 'Process'}
                        </Button>
                      )}
                      {order.status !== 'cancelled' && order.status !== 'completed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelOrder(order.id)}
                          disabled={processOrderMutation.isPending || cancelOrderMutation.isPending}
                          className="text-red-600 hover:text-red-700 border-red-600 hover:border-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          {cancelOrderMutation.isPending && cancelOrderMutation.variables === order.id ? 'Cancelling...' : 'Cancel'}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              <div className="text-center">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No orders found</p>
                <p className="text-sm">
                  {selectedStatus === "all" 
                    ? "Orders will appear here once customers start purchasing" 
                    : `No ${selectedStatus} orders found`}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1 || isLoading}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages || isLoading}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default OrdersManagement;
