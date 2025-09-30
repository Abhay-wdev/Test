
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useProductById } from "@/hooks/useProducts";
import { categoryNames } from "@/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ImageModal from "@/components/ImageModal";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string>("");
  const { addToCart } = useCart();
  
  const { data: product, isLoading, error } = useProductById(id || "");

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (product && newQuantity > product.stock_quantity) return;
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (product) {
      const cartProduct = {
        ...product,
        quantity: quantity,
        image_urls: product.image_urls ?? []
      };
      addToCart(cartProduct);
    }
  };

  if (isLoading) {
    return (
      <div className="container-custom py-8 sm:py-12">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 animate-pulse">
          <div className="md:w-1/2 bg-gray-300 h-64 sm:h-96 rounded-lg"></div>
          <div className="md:w-1/2">
            <div className="h-6 sm:h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 sm:h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="h-3 sm:h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-3 sm:h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-3 sm:h-4 bg-gray-300 rounded w-3/4 mb-8"></div>
            <div className="h-8 sm:h-10 bg-gray-300 rounded w-full mb-4"></div>
            <div className="h-8 sm:h-10 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container-custom py-8 sm:py-12 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-spice-earth mb-4">Product Not Found</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6">The product you are looking for does not exist.</p>
        <Button asChild className="bg-spice-paprika hover:bg-spice-paprika/90 text-white">
          <Link to="/products">
            Back to Products
          </Link>
        </Button>
      </div>
    );
  }

  const categoryName = categoryNames[product.category_id] || 'Unknown Category';

  return (
    <>
      <div className="container-custom py-8 sm:py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 overflow-x-auto">
          <Link to="/" className="hover:text-spice-paprika whitespace-nowrap">Home</Link>
          <span className="mx-1 sm:mx-2">/</span>
          <Link to="/products" className="hover:text-spice-paprika whitespace-nowrap">Products</Link>
          <span className="mx-1 sm:mx-2">/</span>
          <span className="text-spice-paprika truncate">{product.name}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
          {/* Product Image */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              {/* Multi-image support: show all images as a gallery, fallback to image_url */}
              {product.image_urls && product.image_urls.length > 0 ? (
                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    {product.image_urls.map((url, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <div className="relative flex aspect-square items-center justify-center p-6">
                            <img
                              src={url}
                              alt={`${product.name} image ${index + 1}`}
                              className="w-full h-full object-contain rounded-lg cursor-pointer"
                              onClick={() => {
                                setCurrentImage(url);
                                setIsModalOpen(true);
                              }}
                            />
                            <div
                              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg cursor-pointer"
                              onClick={() => {
                                setCurrentImage(url);
                                setIsModalOpen(true);
                              }}
                            >
                              <Search className="h-8 w-8 text-white" />
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              ) : (
                <div
                  className="relative flex aspect-square items-center justify-center p-6"
                  onClick={() => {
                    setCurrentImage(product.image_url);
                    setIsModalOpen(true);
                  }}
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-contain rounded-lg cursor-pointer"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg cursor-pointer"
                  >
                    <Search className="h-8 w-8 text-white" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2">
            <h1 className="text-2xl sm:text-3xl font-bold text-spice-earth mb-2">{product.name}</h1>
            <p className="text-xl sm:text-2xl font-bold text-spice-paprika mb-4 sm:mb-6">₹{product.price.toFixed(2)}</p>
            
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{product.description}</p>
            
            <div className="mb-4 sm:mb-6 space-y-2">
              <p className="text-sm sm:text-base text-gray-700">
                <span className="font-semibold">Category:</span> {categoryName}
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                <span className="font-semibold">Stock:</span> {product.stock_quantity} available
              </p>
              {product.weight && (
                <p className="text-sm sm:text-base text-gray-700">
                  <span className="font-semibold">Weight:</span> {product.weight}
                </p>
              )}
            </div>
            
            <div className="flex items-center mb-4 sm:mb-6">
              <span className="mr-3 sm:mr-4 font-semibold text-sm sm:text-base">Quantity:</span>
              <button
                className="w-8 h-8 bg-gray-200 rounded-l-md flex items-center justify-center text-lg"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 h-8 text-center border-t border-b border-gray-200 focus:outline-none text-sm sm:text-base"
              />
              <button
                className="w-8 h-8 bg-gray-200 rounded-r-md flex items-center justify-center text-lg"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock_quantity}
              >
                +
              </button>
            </div>
            
            <Button
              className="w-full bg-spice-paprika hover:bg-spice-paprika/90 text-white mb-3 sm:mb-4 text-sm sm:text-base"
              onClick={handleAddToCart}
              disabled={product.stock_quantity === 0}
            >
              <ShoppingCart className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
              {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            
            <Button
              variant="outline"
              className="w-full border-spice-earth text-spice-earth hover:bg-spice-earth hover:text-white text-sm sm:text-base"
              asChild
            >
              <Link to="/cart">
                View Cart
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={currentImage}
        altText={product?.name || "Product Image"}
      />
    </>
  );
};

export default ProductDetail;
