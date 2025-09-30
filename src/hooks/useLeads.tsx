
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  source: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const useLeads = () => {
  return useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      console.log('Fetching leads...');
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching leads:', error);
        throw error;
      }
      
      console.log('Leads fetched:', data);
      return data as Lead[];
    },
  });
};
