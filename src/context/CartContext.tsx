import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  weight?: string;
  description: string;
  image_urls: string[];
  stock_quantity: number;
  category_id: number;
  is_active: boolean;
  created_at: string;
}

interface CartState {
  cart: CartItem[];
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: Omit<CartItem, "quantity"> }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: { id: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }
    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    }
    case "CLEAR_CART": {
      return { ...state, cart: [] };
    }
    case "LOAD_CART": {
      return { ...state, cart: action.payload };
    }
    default:
      return state;
  }
};

interface CartContextType extends CartState {
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

// In-memory fallback when localStorage is unavailable or full
let memoryCart: CartItem[] = [];
let useMemoryFallback = false;

const saveToStorage = (cart: CartItem[]) => {
  try {
    // Try to save to localStorage first
    const cartData = JSON.stringify(cart);
    localStorage.setItem("cart", cartData);
    
    // If successful and we were using memory fallback, notify user
    if (useMemoryFallback && cart.length > 0) {
      useMemoryFallback = false;
      toast.success("Cart saved successfully!");
    }
  } catch (error) {
    console.warn("Failed to save cart to localStorage:", error);
    
    // Fallback to memory storage
    memoryCart = [...cart];
    
    if (!useMemoryFallback) {
      useMemoryFallback = true;
      
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        toast.error("Storage is full. Cart will be saved temporarily.", {
          description: "Your cart items will be lost when you refresh the page. Please clear some browser data."
        });
      } else {
        toast.warning("Using temporary cart storage", {
          description: "Cart items will be lost when you refresh the page."
        });
      }
    }
  }
};

const loadFromStorage = (): CartItem[] => {
  try {
    // Try to load from localStorage first
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      return Array.isArray(parsedCart) ? parsedCart : [];
    }
  } catch (error) {
    console.warn("Failed to load cart from localStorage:", error);
  }
  
  // Fallback to memory storage
  if (useMemoryFallback && memoryCart.length > 0) {
    return [...memoryCart];
  }
  
  return [];
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  // Load cart from storage on mount
  useEffect(() => {
    const savedCart = loadFromStorage();
    if (savedCart.length > 0) {
      dispatch({ type: "LOAD_CART", payload: savedCart });
    }
  }, []);

  // Save cart to storage whenever it changes
  useEffect(() => {
    saveToStorage(state.cart);
  }, [state.cart]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
    toast.success(`${item.name} added to cart!`);
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const removeFromCart = (id: number) => {
    const item = state.cart.find(item => item.id === id);
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
    if (item) {
      toast.success(`${item.name} removed from cart`);
    }
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast.success("Cart cleared");
  };

  const cartTotal = state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
