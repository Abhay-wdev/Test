
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag, Award, Percent } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const Hero = () => {
  // Auto-rotation effect for carousel
  const [api, setApi] = useState<any>();
  
  useEffect(() => {
    if (!api) return;
    
    // Auto rotate slides every 5 seconds
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [api]);
  
  return (
    <div className="pb-0 mb-0">
      <div className="container-custom pb-0 mb-0">
        {/* Promotional Banner Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
            className="w-full"
          >
            {/* Responsive height for carousel slides */}
            <div className="h-[240px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
            <CarouselContent className="h-full">
              {/* Slide 1 - Mega Spice Sale */}
              <CarouselItem className="h-full">
                <div className="rounded-2xl overflow-hidden h-full relative flex justify-center items-center p-1 sm:p-2">
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-orange-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold animate-pulse">
                    LIMITED TIME
                  </div>
                  <img
                    src="/lovable-uploads/1.png"
                    alt="Premium Spices"
                    className="h-full w-full object-contain max-w-full"
                  />
                </div>
              </CarouselItem>
              
              {/* Slide 2 - Authentic Taste */}
              <CarouselItem className="h-full">
                <div className="rounded-2xl overflow-hidden h-full relative flex justify-center items-center p-1 sm:p-2">
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-green-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold">
                    AUTHENTIC
                  </div>
                  <img
                    src="/lovable-uploads/2.png"
                    alt="Authentic Spices"
                    className="h-full w-full object-contain max-w-full"
                  />
                </div>
              </CarouselItem>
              
              {/* Slide 3 - Combo Packs */}
              <CarouselItem className="h-full">
                <div className="rounded-2xl overflow-hidden h-full relative flex justify-center items-center p-1 sm:p-2">
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-yellow-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold">
                    SPECIAL OFFER
                  </div>
                  <img
                    src="/lovable-uploads/3.png"
                    alt="Combo Packs"
                    className="h-full w-full object-contain max-w-full"
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
            
            <CarouselPrevious className="left-1 sm:left-2 lg:left-4 bg-white/70 hover:bg-white border-none text-green-600 h-6 w-6 sm:h-8 sm:w-8" />
            <CarouselNext className="right-1 sm:right-2 lg:right-4 bg-white/70 hover:bg-white border-none text-green-600 h-6 w-6 sm:h-8 sm:w-8" />
            
            {/* Carousel indicators - fixed smaller size and spacing */}
            <div className="flex justify-center gap-2 mt-3 mb-0">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  className="w-2 h-2 rounded-full bg-gray-300 hover:bg-green-500 focus:outline-none transition-colors"
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Hero;
