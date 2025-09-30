import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useCreateOrder } from "@/hooks/useCreateOrder";

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const createOrder = useCreateOrder();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    paymentMethod: "cod"
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    console.log('Starting checkout submission...');
    console.log('Cart:', cart);
    console.log('Form data:', formData);
    
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        customer_name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        customer_email: formData.email.trim(),
        customer_phone: formData.phone.trim(),
        shipping_address: {
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          postalCode: formData.postalCode.trim(),
        },
        total_price: cartTotal,
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        payment_method: formData.paymentMethod
      };

      console.log('Order data to submit:', orderData);

      await createOrder.mutateAsync(orderData);
      console.log('Order submitted successfully');
      clearCart();
      navigate("/");
    } catch (error) {
      console.error('Error placing order:', error);
      // Error handling is done in the mutation's onError callback
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (cart.length === 0) {
    return (
      <div className="container-custom py-12 text-center">
        <h1 className="text-3xl font-bold text-spice-earth mb-4">Checkout</h1>
        <p className="text-gray-600 mb-6">Your cart is empty. Add some products before checking out.</p>
        <Button asChild className="bg-spice-paprika hover:bg-spice-paprika/90 text-white">
          <Link to="/products">
            Browse Products
          </Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold text-spice-earth mb-6">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Shipping and Payment Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-spice-earth mb-4">Shipping Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 mb-1">First Name *</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`input-field ${errors.firstName ? "border-red-500" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-gray-700 mb-1">Last Name *</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`input-field ${errors.lastName ? "border-red-500" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field ${errors.email ? "border-red-500" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-1">Phone Number *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`input-field ${errors.phone ? "border-red-500" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="address" className="block text-gray-700 mb-1">Address *</label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className={`input-field ${errors.address ? "border-red-500" : ""}`}
                disabled={isSubmitting}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div>
                <label htmlFor="city" className="block text-gray-700 mb-1">City *</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  className={`input-field ${errors.city ? "border-red-500" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="state" className="block text-gray-700 mb-1">State *</label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  value={formData.state}
                  onChange={handleChange}
                  className={`input-field ${errors.state ? "border-red-500" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="postalCode" className="block text-gray-700 mb-1">Postal Code *</label>
                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className={`input-field ${errors.postalCode ? "border-red-500" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                )}
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-spice-earth mb-4">Payment Method</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <input
                  id="cod"
                  name="paymentMethod"
                  type="radio"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleChange}
                  className="h-4 w-4 text-spice-paprika"
                  disabled={isSubmitting}
                />
                <label htmlFor="cod" className="ml-2 text-gray-700">Cash on Delivery</label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="bankTransfer"
                  name="paymentMethod"
                  type="radio"
                  value="bankTransfer"
                  checked={formData.paymentMethod === "bankTransfer"}
                  onChange={handleChange}
                  className="h-4 w-4 text-spice-paprika"
                  disabled={isSubmitting}
                />
                <label htmlFor="bankTransfer" className="ml-2 text-gray-700">Bank Transfer</label>
              </div>
              
              <p className="text-sm text-gray-500 mt-2">
                Note: Online payment integration will be available soon!
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-spice-paprika hover:bg-spice-paprika/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold text-spice-earth mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between border-b border-gray-100 pb-2">
                  <div className="flex">
                    <span className="font-medium">{item.quantity} x</span>
                    <span className="ml-2 text-gray-800">{item.name}</span>
                  </div>
                  <span className="text-spice-earth font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-spice-paprika">₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/cart">
                Back to Cart
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
