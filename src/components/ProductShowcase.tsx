
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Eye, Percent, Award, Building2, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { DbProduct } from "@/types";

const ProductShowcase = () => {
  const categories = [
    {
      id: 1,
      name: "Ground Spices",
      description: "Finely ground spices for everyday cooking",
      image: "/lovable-uploads/7.png",
      icon: "🌶️",
      color: "from-red-500 to-orange-500"
    },
    {
      id: 2,
      name: "Whole Spices",
      description: "Premium whole spices with intense flavors",
      image: "/lovable-uploads/8.png",
      icon: "🌿",
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      name: "Spice Blends",
      description: "Traditional masala blends for authentic taste",
      image: "/lovable-uploads/9.png",
      icon: "🍛",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const featuredProducts: DbProduct[] = [
    {
      id: 1,
      name: "Red Chilli Powder",
      description: "Pure & Spicy",
      image_url: "/lovable-uploads/ff4f188a-c541-4687-a7ee-fe10d5b2242d.png",
      price: 120,
      category_id: 1,
      stock_quantity: 50,
      is_active: true,
      created_at: new Date().toISOString(),
      image_urls: ["/lovable-uploads/ff4f188a-c541-4687-a7ee-fe10d5b2242d.png"],
      weight: "100g",
      sku: "RC001"
    },
    {
      id: 2,
      name: "Haldi Powder",
      description: "Premium Quality Turmeric",
      image_url: "/lovable-uploads/5c94f6e1-2672-4d54-a2d2-4706bc113cae.png",
      price: 95,
      category_id: 1,
      stock_quantity: 75,
      is_active: true,
      created_at: new Date().toISOString(),
      image_urls: ["/lovable-uploads/5c94f6e1-2672-4d54-a2d2-4706bc113cae.png"],
      weight: "100g",
      sku: "HP001"
    },
    {
      id: 3,
      name: "Garam Masala",
      description: "Traditional Blend",
      image_url: "/lovable-uploads/2e231bb7-d71e-473b-ae58-db8884dfc8e4.png",
      price: 200,
      category_id: 3,
      stock_quantity: 30,
      is_active: true,
      created_at: new Date().toISOString(),
      image_urls: ["/lovable-uploads/2e231bb7-d71e-473b-ae58-db8884dfc8e4.png"],
      weight: "100g",
      sku: "GM001"
    }
  ];

  return (
    <div className="container-custom">
      {/* Main Heading */}
      <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight px-2">
          Shop by Categories
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
          Discover our premium spice collection, carefully sourced and packaged to bring authentic flavors to your kitchen.
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
            
            <div className="relative p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl lg:text-4xl">{category.icon}</div>
                <Badge className="bg-white/80 text-gray-700 hover:bg-white text-xs sm:text-sm">
                  <Award className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                  Premium
                </Badge>
              </div>
              
              <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-gray-50 p-2 sm:p-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-lg sm:rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {category.description}
                </p>
              </div>
              
              <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-2 sm:py-3 text-sm sm:text-base font-medium transition-all duration-200 hover:scale-105">
                <Link to="/products">
                  Shop Now
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Special Offer Banner - Bigger image on mobile */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden mb-6 sm:mb-8">
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 animate-pulse">
          <Percent className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold">Special Combo Offers</h3>
            <p className="text-sm sm:text-base lg:text-lg opacity-90">
              Buy any 3 spices and get 25% off on your entire order. Limited time offer!
            </p>
            <Button asChild className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-xl text-sm sm:text-base">
              <Link to="/products">
                Shop Combo Deals
              </Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <img
              src="/lovable-uploads/10.png"
              alt="Combo Offer"
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover rounded-xl sm:rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* B2B Section - Increased size on mobile */}
      <div className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 mb-6 sm:mb-8">
        <div className="relative p-6 sm:p-8 lg:p-12 space-y-6 sm:space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600" />
              </div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">SUSWASTIK B2B</span>
            </div>
            <Badge className="bg-yellow-500 text-white px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base font-bold">
              NEW
            </Badge>
          </div>
          
          <div className="aspect-[2/1] sm:aspect-[3/1] rounded-xl sm:rounded-2xl overflow-hidden bg-gray-50 p-4 sm:p-6">
            <img
              src="/lovable-uploads/11.png"
              alt="B2B Spices"
              className="h-full w-auto object-contain mx-auto rounded-lg sm:rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
              Perfect Blend of Quality & Convenience
            </h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Unlock exclusive wholesale pricing on bulk orders. Perfect for restaurants, retailers, and distributors.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-xl px-4 py-3 sm:px-6 sm:py-4 border border-gray-100">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              <span className="text-sm sm:text-base font-semibold text-gray-700">Bulk Orders</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-xl px-4 py-3 sm:px-6 sm:py-4 border border-gray-100">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              <span className="text-sm sm:text-base font-semibold text-gray-700">Wholesale Pricing</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-xl px-4 py-3 sm:px-6 sm:py-4 border border-gray-100">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              <span className="text-sm sm:text-base font-semibold text-gray-700">100% Pure</span>
            </div>
          </div>
          
          <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 text-black rounded-xl py-4 sm:py-5 text-base sm:text-lg font-medium transition-all duration-200 hover:scale-105">
            <Link to="/contact">
              Get Wholesale Prices
            </Link>
          </Button>
        </div>
      </div>

      {/* Featured Products */}
      <div className="space-y-6 sm:space-y-8">
        <div className="text-center space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Featured Products</h2>
          <p className="text-sm sm:text-base text-gray-600">Hand-picked bestsellers loved by our customers</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
