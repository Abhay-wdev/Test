import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export const useUserRole = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  return useQuery({
    queryKey: ['userRole', user?.id],
    queryFn: async () => {
      if (!user?.id) {
        console.log('useUserRole: No user ID, returning null');
        return null;
      }
      
      console.log('useUserRole: Fetching role for user:', user.id);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('useUserRole: Error fetching user role:', error);
        return 'customer';
      }
      
      console.log('useUserRole: Fetched data:', data);
      const role = data?.role || 'customer';
      console.log('useUserRole: Final role:', role);
      
      return role;
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime)
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: 'admin' | 'customer' }) => {
      const { data, error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userRole'] });
      toast({
        title: "Success",
        description: "User role updated successfully!",
      });
    },
    onError: (error: any) => {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
