
import Hero from "@/components/Hero";
import UspRibbonSection from "@/components/UspRibbonSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import TestimonialSection from "@/components/TestimonialSection";
import RecipeSection from "@/components/RecipeSection";
import MembershipBanner from "@/components/MembershipBanner";
import ProductShowcase from "@/components/ProductShowcase";
import { Badge } from "@/components/ui/badge";
import { Truck, Shield, Award, Star, Gift } from "lucide-react";

const Index = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <Hero />

      {/* USP Ribbon Section */}
      <UspRibbonSection />

      {/* Product Showcase Section */}
      <section className="pt-0 pb-8 sm:pb-12 bg-white">
        <ProductShowcase />
      </section>
      
      {/* Special Offers Banner */}
      <section className="py-6 sm:py-8 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="container mx-auto px-4">
          <div className="text-center text-white space-y-3 sm:space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-xl sm:text-2xl font-bold">Limited Time Offers</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">Buy 2 Get 1 Free</h3>
                <p className="text-xs sm:text-sm opacity-90">On selected spice blends</p>
              </div>
              <div className="bg-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">Flat 30% Off</h3>
                <p className="text-xs sm:text-sm opacity-90">On orders above ₹1000</p>
              </div>
              <div className="bg-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">Free Shipping</h3>
                <p className="text-xs sm:text-sm opacity-90">On all orders above ₹500</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <FeaturedProducts />
      </section>
      
      {/* Recipe Section */}
      <section className="py-8 sm:py-12 bg-white">
        <RecipeSection />
      </section>
      
      {/* Testimonials Section */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <TestimonialSection />
      </section>
      
      {/* Benefits Section - Updated Modern Design */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Why Choose Suswastik</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              At Suswastik, quality and authenticity are our top priorities - स्वाद से बढ़कर कुछ नहीं
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Free Shipping */}
            <div className="text-center space-y-3 sm:space-y-4 group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-green-200 transition-all duration-300 shadow-lg">
                <Truck className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">Free Shipping</h3>
              <p className="text-gray-600 text-sm leading-relaxed px-2">
                Free delivery on orders above ₹500 across India
              </p>
            </div>
            
            {/* Quality Assured */}
            <div className="text-center space-y-3 sm:space-y-4 group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-orange-200 transition-all duration-300 shadow-lg">
                <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-orange-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">Quality Assured</h3>
              <p className="text-gray-600 text-sm leading-relaxed px-2">
                100% pure and authentic spices with quality guarantee
              </p>
            </div>
            
            {/* Premium Quality */}
            <div className="text-center space-y-3 sm:space-y-4 group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-yellow-200 transition-all duration-300 shadow-lg">
                <Award className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">Premium Quality</h3>
              <p className="text-gray-600 text-sm leading-relaxed px-2">
                Carefully selected spices from trusted farmers
              </p>
            </div>
            
            {/* Customer Rated */}
            <div className="text-center space-y-3 sm:space-y-4 group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-200 transition-all duration-300 shadow-lg">
                <Star className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">Customer Rated</h3>
              <p className="text-gray-600 text-sm leading-relaxed px-2">
                Trusted by thousands of satisfied customers
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Membership Banner */}
      
    </div>
  );
};

export default Index;
