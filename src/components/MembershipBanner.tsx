import { Sparkles } from "lucide-react";
const MembershipBanner = () => {
  return <section className="relative py-16 overflow-hidden">
      {/* Enhanced parallax background with transform */}
      <div className="parallax-container absolute inset-0" style={{
      transform: 'translateZ(0)',
      willChange: 'transform'
    }}>
        <div className="parallax-bg absolute inset-0 bg-cover bg-center bg-no-repeat scale-110" style={{
        backgroundImage: `url('/lovable-uploads/203e5c04-a012-419f-8cdd-922e00e0ebba.png')`,
        transform: 'translate3d(0, -15%, 0) scale(1.1)',
        willChange: 'transform'
      }}>
          {/* Enhanced overlay for better image visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/45 to-black/35"></div>
        </div>
      </div>
      
      <div className="container-custom relative z-20">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          {/* NEW Badge */}
          <div className="relative mb-8 transform transition-all duration-500 hover:scale-110">
            <div className="bg-yellow-400 text-black font-bold text-lg px-6 py-3 rounded-full transform -rotate-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:-rotate-6">
              NEW
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-white fade-in mb-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 transform transition-all duration-700 hover:scale-105">
              <span className="block">PERFECT BLEND OF</span>
              <span className="block text-yellow-300">QUALITY & CONVENIENCE</span>
            </h2>
            
            {/* Brand Section */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="border-2 border-yellow-400 px-6 py-3 rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-yellow-400/10">
                <span className="text-yellow-400 font-bold text-2xl">SUSWASTIK</span>
                <span className="text-white text-xl ml-2">B2B</span>
              </div>
              <span className="text-3xl md:text-4xl font-bold text-white">Discounts</span>
            </div>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Unlock exclusive wholesale pricing on bulk orders. Perfect for restaurants, retailers, and distributors.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Get Wholesale Prices
              </button>
              <div className="flex items-center gap-2 text-green-400">
                <span className="inline-block w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                <span className="font-semibold">Limited Time Offer - Join Now!</span>
              </div>
            </div>
          </div>
          
          {/* Bottom Text */}
          <div className="text-xs text-white/60 mt-6">
            * Images are for illustration purpose
          </div>
        </div>
      </div>
      
      {/* Decorative elements with enhanced animations */}
      
    </section>;
};
export default MembershipBanner;