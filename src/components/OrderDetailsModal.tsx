
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format, parseISO } from 'date-fns';
import { Order } from '@/types';

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, isOpen, onClose }) => {
  if (!order) return null;

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { variant: "secondary" as const },
      processing: { variant: "default" as const },
      completed: { variant: "default" as const },
      cancelled: { variant: "destructive" as const }
    };
    
    const { variant } = config[status as keyof typeof config] || config.pending;
    
    return (
      <Badge variant={variant}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details - #{order.id}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Order Information</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Order ID:</span> #{order.id}</p>
                <p><span className="font-medium">Date:</span> {format(parseISO(order.created_at), "MMM dd, yyyy 'at' h:mm a")}</p>
                <p><span className="font-medium">Status:</span> {getStatusBadge(order.status)}</p>
                <p><span className="font-medium">Total:</span> ₹{Number(order.total_price).toLocaleString()}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Customer Information</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Name:</span> {order.customer_name || 'N/A'}</p>
                <p><span className="font-medium">Email:</span> {order.customer_email || 'N/A'}</p>
                <p><span className="font-medium">Phone:</span> {order.customer_phone || 'N/A'}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Shipping Address */}
          {order.shipping_address && (
            <>
              <div>
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <div className="text-sm bg-gray-50 p-3 rounded-md">
                  <p>{order.shipping_address.address}</p>
                  <p>{order.shipping_address.city}, {order.shipping_address.state}</p>
                  <p>{order.shipping_address.postalCode}</p>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Order Items */}
          <div>
            <h3 className="font-semibold mb-2">Order Items</h3>
            <div className="space-y-2">
              {order.order_items?.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div className="flex-1">
                    <p className="font-medium">{item.products?.name || 'Product'}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm text-gray-600">Unit Price: ₹{Number(item.price).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{(Number(item.price) * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              )) || (
                <p className="text-gray-500">No items found</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Order Total */}
          <div className="flex justify-between items-center font-semibold text-lg">
            <span>Total Amount:</span>
            <span>₹{Number(order.total_price).toLocaleString()}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
