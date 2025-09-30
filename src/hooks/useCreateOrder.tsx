
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CreateOrderData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  total_price: number;
  items: Array<{
    product_id: number;
    quantity: number;
    price: number;
  }>;
  payment_method: string;
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: CreateOrderData) => {
      console.log('Creating order with data:', orderData);
      
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Current user:', user);
      
      // Check stock availability first
      for (const item of orderData.items) {
        const { data: product, error: productError } = await supabase
          .from('products')
          .select('stock_quantity, name')
          .eq('id', item.product_id)
          .single();

        if (productError) {
          console.error('Error checking product stock:', productError);
          throw new Error(`Failed to check stock for product ${item.product_id}`);
        }

        if (product.stock_quantity < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name}. Available: ${product.stock_quantity}, Requested: ${item.quantity}`);
        }
      }

      // First, create the order
      const orderInsertData = {
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        customer_phone: orderData.customer_phone,
        shipping_address: orderData.shipping_address,
        total_price: orderData.total_price,
        status: 'pending',
        ...(user && { user_id: user.id }) // Add user_id if user is logged in
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderInsertData)
        .select()
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
        throw new Error(`Failed to create order: ${orderError.message}`);
      }

      console.log('Order created successfully:', order);

      // Then, create the order items
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      }));

      console.log('Creating order items:', orderItems);

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Error creating order items:', itemsError);
        // Try to delete the order if order items failed
        await supabase.from('orders').delete().eq('id', order.id);
        throw new Error(`Failed to create order items: ${itemsError.message}`);
      }

      console.log('Order items created successfully');

      // Update inventory - reduce stock quantities
      console.log('Updating inventory...');
      for (const item of orderData.items) {
        // Get current stock first
        const { data: currentProduct, error: fetchError } = await supabase
          .from('products')
          .select('stock_quantity')
          .eq('id', item.product_id)
          .single();

        if (fetchError) {
          console.error('Error fetching current stock:', fetchError);
          continue;
        }

        const newStock = currentProduct.stock_quantity - item.quantity;

        const { error: stockError } = await supabase
          .from('products')
          .update({ stock_quantity: newStock })
          .eq('id', item.product_id);

        if (stockError) {
          console.error('Error updating stock:', stockError);
          // Note: In a production app, you might want to implement a rollback mechanism here
          // For now, we'll just log the error but not fail the order
        }
      }

      console.log('Inventory updated successfully');

      return order;
    },
    onSuccess: () => {
      // Invalidate and refetch orders data
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['my-orders'] });
      queryClient.invalidateQueries({ queryKey: ['orders-analytics'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Order placed successfully!');
    },
    onError: (error) => {
      console.error('Order creation failed:', error);
      toast.error(`Failed to place order: ${error.message}`);
    },
  });
};
