
export interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string; // Legacy: main image for backward compatibility
  image_urls: string[]; // New: all product images (first is main)
  price: number;
  sale_price?: number; // Optional sale price for discounted items
  stock_quantity: number;
  category_id: number;
  quantity?: number; // Optional quantity for cart items
  is_active: boolean;
  weight?: string;
  sku?: string;
  created_at: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: CustomerAddress;
}

// Updated Order interface to match database structure
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export interface Order {
  id: number;
  user_id?: string;
  total_price: number;
  status: OrderStatus;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  shipping_address?: any; // JSONB
  created_at: string;
  updated_at?: string;
  order_items?: OrderItem[];
  profiles?: any;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at: string;
  products?: Product;
}

// Database types to match actual schema
export interface DbProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  image_url: string;
  image_urls?: string[]; // New: optional array of image URLs for multi-image support
  stock_quantity: number;
  is_active: boolean;
  weight?: string;
  sku?: string;
  created_at: string;
}

export interface DbCategory {
  id: number;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
}

export interface DbOrder {
  id: number;
  user_id: string;
  order_date: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  shipping_address: any; // JSONB
  created_at: string;
  updated_at: string;
}

export interface DbProfile {
  id: string;
  email?: string;
  full_name?: string;
  phone?: string;
  address?: any; // JSONB
  role: 'admin' | 'customer';
  created_at: string;
}

// Helper function to convert DbProduct to Product
export const dbProductToProduct = (dbProduct: DbProduct): Product => ({
  ...dbProduct,
  category_id: dbProduct.category_id || 1,
  sale_price: undefined,
  image_urls: dbProduct.image_urls && dbProduct.image_urls.length > 0
    ? dbProduct.image_urls
    : dbProduct.image_url
      ? [dbProduct.image_url]
      : [],
});

// Categories mapping for frontend display
export const categoryNames: { [key: number]: string } = {
  1: 'Seasonings',
  2: 'Powdered Spices',
  3: 'Blended Spices',
  4: 'Whole Spices',
  5: 'Combo Packs'
};
