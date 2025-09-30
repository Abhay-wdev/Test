
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DbProduct } from '@/types';

export const useProducts = (
  page: number = 0,
  pageSize: number = 10,
  categoryId: number | null = null,
  searchTerm: string = ''
) => {
  return useQuery({
    queryKey: ['products', page, pageSize, categoryId, searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*', { count: 'exact' })
        .eq('is_active', true);

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }

      const start = page * pageSize;
      const end = start + pageSize - 1;

      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(start, end);

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
      
      console.log("[useProducts] Supabase result:", { data, count, error });
      return {
        data: data as DbProduct[],
        count: count || 0
      };
    },
  });
};

export const useProductById = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', parseInt(id))
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        throw error;
      }
      
      return data as DbProduct;
    },
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (product: {
      name: string;
      description: string;
      price: number;
      category_id: number;
      image_url: string;
      image_urls?: string[]; // Multi-image support
      stock_quantity: number;
      weight?: string;
      sku?: string;
      is_active?: boolean;
    }) => {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          ...product,
          is_active: product.is_active ?? true,
          image_urls: product.image_urls && product.image_urls.length > 0
            ? product.image_urls
            : product.image_url
              ? [product.image_url]
              : []
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Success",
        description: "Product created successfully!",
      });
    },
    onError: (error: any) => {
      console.error('Error creating product:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<DbProduct> & { id: number }) => {
      const { data, error } = await supabase
        .from('products')
        .update({
          ...updates,
          image_urls: updates.image_urls && updates.image_urls.length > 0
            ? updates.image_urls
            : updates.image_url
              ? [updates.image_url]
              : []
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Success",
        description: "Product updated successfully!",
      });
    },
    onError: (error: any) => {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Success",
        description: "Product deleted successfully!",
      });
    },
    onError: (error: any) => {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
