
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";

type CartItemProps = {
  item: CartItemType;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
};

const CartItem = ({ item, updateQuantity, removeFromCart }: CartItemProps) => {
  const [quantity, setQuantity] = useState<number>(item.quantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const totalPrice = item.price * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row items-center py-4 border-b border-gray-200">
      {/* Product Image */}
      <div className="w-full sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow px-4">
        <h3 className="text-lg font-medium text-spice-earth">{item.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
        <span className="text-spice-paprika font-medium">₹{item.price.toFixed(2)}</span>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      {/* Total and Remove */}
      <div className="flex items-center justify-between mt-4 sm:mt-0 w-full sm:w-auto sm:ml-4">
        <span className="font-bold text-spice-earth">₹{totalPrice.toFixed(2)}</span>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-700 ml-4"
          onClick={handleRemove}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
