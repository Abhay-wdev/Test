
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight } from "lucide-react";
import CartItem from "@/components/CartItem";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <div className="container-custom py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-spice-earth mb-4 sm:mb-6">Your Shopping Cart</h1>

      {cart.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-lg sm:text-xl font-bold text-spice-earth mb-3 sm:mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-3 sm:mb-4">
                <div className="flex justify-between text-sm sm:text-base text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-3 sm:pt-4 mb-4 sm:mb-6">
                <div className="flex justify-between font-bold text-base sm:text-lg">
                  <span>Total</span>
                  <span className="text-spice-paprika">₹{cartTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <Button asChild className="w-full bg-spice-paprika hover:bg-spice-paprika/90 text-white mb-3 sm:mb-4 text-sm sm:text-base">
                <Link to="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full border-spice-earth text-spice-earth hover:bg-spice-earth hover:text-white text-sm sm:text-base">
                <Link to="/products">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 sm:py-16 bg-white rounded-lg shadow-md">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-12 sm:h-16 w-12 sm:w-16 text-gray-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-spice-earth mb-2">Your cart is empty</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-4">Explore our collection and add some spices to your cart</p>
          <Button asChild className="bg-spice-paprika hover:bg-spice-paprika/90 text-white text-sm sm:text-base">
            <Link to="/products">
              Browse Products
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
