
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Order, OrderStatus } from '@/types'; // Assuming OrderStatus is 'pending' | 'processing' | 'completed' | 'cancelled'

interface UseOrdersParams {
  page?: number;
  pageSize?: number;
  status?: string; // For potential server-side filtering
}

export const useOrders = ({ page = 1, pageSize = 10, status }: UseOrdersParams = {}) => {
  return useQuery({
    queryKey: ['orders', page, pageSize, status],
    queryFn: async () => {
      console.log(`Fetching orders... Page: ${page}, PageSize: ${pageSize}, Status: ${status}`);
      
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from('orders')
        .select(`
          *,
          order_items!fk_order_items_order_id (
            *,
            products!fk_order_items_product_id (*)
          )
        `, { count: 'exact' }) // Request total count
        .order('created_at', { ascending: false })
        .range(from, to);

      if (status && status !== 'all') {
        query = query.eq('status', status);
      }

      const { data, error, count } = await query;

      if (error) {
        console.error('Error fetching orders:', error);
        throw error;
      }
      
      console.log('Orders fetched:', data, 'Total count:', count);
      return { orders: data as Order[], count: count ?? 0 };
    },
  });
};

// Function to update order status in Supabase
const updateOrderStatus = async ({ orderId, status }: { orderId: number; status: OrderStatus }) => {
  console.log(`Updating order ${orderId} to status ${status}...`);
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single(); // .single() ensures we get the updated record or an error if not found/multiple found

  if (error) {
    console.error(`Error updating order ${orderId} to ${status}:`, error);
    throw error;
  }

  console.log(`Order ${orderId} updated to ${status}:`, data);
  return data as Order;
};

export const useProcessOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderId: number) => updateOrderStatus({ orderId, status: 'processing' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['orders-analytics'] }); // Also invalidate analytics
    },
    // onError, onSettled can be added for more robust error handling/feedback
  });
};

export const useCancelOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderId: number) => updateOrderStatus({ orderId, status: 'cancelled' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['orders-analytics'] });
    },
  });
};

export const useOrdersAnalytics = () => {
  return useQuery({
    queryKey: ['orders-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          total_price,
          status,
          created_at,
          order_items!fk_order_items_order_id (
            quantity,
            products!fk_order_items_product_id (
              category_id
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders analytics:', error);
        throw error;
      }
      
      return data;
    },
  });
};
