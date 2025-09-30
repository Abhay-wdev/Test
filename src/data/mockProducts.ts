
import { Product, categoryNames } from '@/types';

// Mock data for products - in a real app, this would come from Supabase
export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Organic Turmeric Powder",
    description: "Premium organic turmeric with high curcumin content. Perfect for curries, golden milk, and medicinal purposes.",
    image_url: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    image_urls: ["https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
    price: 120,
    stock_quantity: 50,
    category_id: 1,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Red Chilli Powder",
    description: "Hot and vibrant red chilli powder, perfect for adding heat and color to any dish.",
    image_url: "https://images.unsplash.com/photo-1573055418049-c8e0b7e3403b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    image_urls: ["https://images.unsplash.com/photo-1573055418049-c8e0b7e3403b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
    price: 90,
    stock_quantity: 45,
    category_id: 1,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 3,
    name: "Cumin Seeds",
    description: "Aromatic cumin seeds with a distinctive warm and earthy flavor.",
    image_url: "https://images.unsplash.com/photo-1621677395757-40220d8cd6cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    image_urls: ["https://images.unsplash.com/photo-1621677395757-40220d8cd6cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
    price: 75,
    stock_quantity: 60,
    category_id: 2,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 4,
    name: "Garam Masala",
    description: "A balanced blend of ground spices used in traditional Indian cuisine.",
    image_url: "https://images.unsplash.com/photo-1596046605910-9c8678b17c14?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    image_urls: ["https://images.unsplash.com/photo-1596046605910-9c8678b17c14?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
    price: 150,
    stock_quantity: 30,
    category_id: 3,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 5,
    name: "Green Cardamom Pods",
    description: "Fragrant green cardamom pods for sweet and savory dishes.",
    image_url: "https://images.unsplash.com/photo-1532336414824-2f5acd7f6b42?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    image_urls: ["https://images.unsplash.com/photo-1532336414824-2f5acd7f6b42?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
    price: 240,
    stock_quantity: 25,
    category_id: 2,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 6,
    name: "Coriander Seeds",
    description: "Aromatic coriander seeds with citrusy notes, essential for many Indian dishes.",
    image_url: "https://images.unsplash.com/photo-1599909366516-6c1b120a9d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    image_urls: ["https://images.unsplash.com/photo-1599909366516-6c1b120a9d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
    price: 65,
    stock_quantity: 40,
    category_id: 2,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 7,
    name: "Rajasthani Laal Maas Masala",
    description: "Traditional Rajasthani spice blend for the famous Laal Maas curry.",
    image_url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    image_urls: ["https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
    price: 180,
    stock_quantity: 20,
    category_id: 3,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 8,
    name: "Saffron Threads",
    description: "Premium quality saffron threads from the fields of Rajasthan.",
    image_url: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    image_urls: ["https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
    price: 450,
    stock_quantity: 15,
    category_id: 4,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z"
  }
];
