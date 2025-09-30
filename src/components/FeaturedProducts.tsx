
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Award, TrendingUp } from "lucide-react";

const FeaturedProducts = () => {
  const { data, isLoading, error } = useProducts();
  const products = data?.data || [];

  if (error) {
    console.error("Error fetching products:", error);
  }

  // Get first 4 products for featured section
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
            <span className="text-orange-500 font-semibold text-base sm:text-lg">Trending Now</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 px-2">Customer Favorites</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Discover our most popular spices, handpicked for their exceptional quality and authentic flavors that our customers love.
          </p>
        </div>

        {/* Promotional Banner */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-8 sm:mb-12 border border-green-200">
          <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              <div>
                <h3 className="font-bold text-green-800 text-base sm:text-lg">Quality Guarantee</h3>
                <p className="text-green-700 text-sm sm:text-base">100% authentic spices with money-back guarantee</p>
              </div>
            </div>
            <div className="bg-orange-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold text-xs sm:text-sm animate-pulse">
              FREE SHIPPING ON ₹500+
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-80 sm:h-96 animate-pulse">
                <div className="h-40 sm:h-48 bg-gray-200"></div>
                <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-2 sm:h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/3"></div>
                  </div>
                  <div className="h-8 sm:h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-500 text-base sm:text-lg">No products available at the moment.</p>
          </div>
        )}

        <div className="mt-8 sm:mt-12 text-center">
          <Button asChild className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
            <Link to="/products">
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
