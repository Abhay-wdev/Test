import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DbProduct } from '@/types';

// Hook specifically for admin pages to fetch all products without pagination
export const useAllProducts = (searchTerm: string = '') => {
  return useQuery({
    queryKey: ['all-products', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true);

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }

      const { data, error } = await query
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all products:', error);
        throw error;
      }
      
      return data as DbProduct[];
    },
  });
};