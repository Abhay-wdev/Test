
import { useQuery } from '@tanstack/react-query';

// Mock categories data until categories table is properly integrated
const mockCategories = [
  {
    id: 1,
    name: 'Seasonings',
    description: 'Flavorful seasoning blends for all dishes',
    image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Powdered Spices',
    description: 'Finely ground spices for instant flavor',
    image_url: 'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Blended Spices',
    description: 'Traditional spice blends and masalas',
    image_url: 'https://images.unsplash.com/photo-1573055418049-c8e0b7e3403b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    name: 'Whole Spices',
    description: 'Premium whole spices for authentic flavors',
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    created_at: new Date().toISOString()
  },
  {
    id: 5,
    name: 'Combo Packs',
    description: 'Curated spice combinations for special dishes',
    image_url: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    created_at: new Date().toISOString()
  }
];

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      // For now, return mock data
      // TODO: Replace with actual Supabase query once categories table is accessible
      return mockCategories;
    },
  });
};
