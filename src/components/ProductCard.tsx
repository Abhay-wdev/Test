
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { DbProduct, dbProductToProduct } from "@/types";

type ProductCardProps = {
  product: DbProduct;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const productToAdd = dbProductToProduct(product);
    console.log('Adding product to cart:', productToAdd.name, 'quantity:', quantity);
    
    // Add items one by one for the specified quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(productToAdd);
    }
    setQuantity(1);
  };
  
  const increaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity < product.stock_quantity) {
      setQuantity(prev => prev + 1);
    }
  };
  
  const decreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const isOutOfStock = product.stock_quantity === 0;
  
  // Calculate discount percentage for demo
  const numericPrice = typeof product.price === 'string' ? parseFloat(product.price) : Number(product.price);
  const originalPrice = numericPrice * 1.25; // Assume 20% discount
  const discountPercentage = originalPrice > 0 ? Math.round(((originalPrice - numericPrice) / originalPrice) * 100) : 0;
  
  // Random bestseller badge for demo
  const isBestseller = product.id % 3 === 0;
  const isNew = product.id % 4 === 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <div className="h-48 overflow-hidden bg-gray-50">
            <img
              src={
                product.image_urls && product.image_urls.length > 0
                  ? product.image_urls[0]
                  : product.image_url || ''
              }
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 space-y-1">
            {isBestseller && (
              <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                BESTSELLER
              </Badge>
            )}
            {isNew && (
              <Badge className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                NEW
              </Badge>
            )}
          </div>
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
              {discountPercentage}% OFF
            </div>
          )}
          
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge className="bg-red-500 text-white text-sm px-3 py-1">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-4 space-y-3">
          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-xs text-gray-500 ml-1">(4.5)</span>
          </div>
          
          <h3 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-green-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
          
          {product.weight && (
            <p className="text-xs text-gray-500">Weight: {product.weight}</p>
          )}
          
          {/* Price Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-bold text-lg">₹{numericPrice.toFixed(0)}</span>
              {discountPercentage > 0 && (
                <span className="text-gray-400 line-through text-sm">₹{originalPrice.toFixed(0)}</span>
              )}
            </div>
            <span className="text-xs text-gray-500">Stock: {product.stock_quantity}</span>
          </div>
          
          {/* Quantity and Add to Cart */}
          {!isOutOfStock && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button 
                    onClick={decreaseQuantity}
                    className="p-1 hover:bg-gray-100 transition-colors rounded-l-lg"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-3 w-3 text-gray-600" />
                  </button>
                  <span className="px-3 py-1 text-sm font-medium border-x border-gray-200">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="p-1 hover:bg-gray-100 transition-colors rounded-r-lg"
                    disabled={quantity >= product.stock_quantity}
                  >
                    <Plus className="h-3 w-3 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                ADD TO CART
              </Button>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
