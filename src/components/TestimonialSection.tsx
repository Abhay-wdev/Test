import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [{
  id: 1,
  name: "Priya Singh",
  role: "Loyal Customer",
  image: "https://randomuser.me/api/portraits/women/43.jpg",
  content: "The spices from Suswastik are incredibly fresh and aromatic. The Garam Masala completely transformed my cooking, adding a depth of flavor I've never experienced before. Highly recommended for anyone who appreciates authentic Indian flavors!"
}, {
  id: 2,
  name: "Raj Mehta",
  role: "Home Chef",
  image: "https://randomuser.me/api/portraits/men/32.jpg",
  content: "I've been using Suswastik spices for over a year now, and the quality is consistently excellent. The turmeric has such a vibrant color and flavor compared to what I used to buy at the supermarket. My family can taste the difference!"
}, {
  id: 3,
  name: "Ananya Patel",
  role: "Food Blogger",
  image: "https://randomuser.me/api/portraits/women/65.jpg",
  content: "As someone who reviews food products professionally, I can confidently say that Suswastik spices are among the best I've tried. The freshness and authenticity come through in every dish. My readers have noticed the improvement in my recipes!"
}];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextTestimonial = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
  };
  const prevTestimonial = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  return <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title text-center">Asli Moments. Asli Reviews.</h2>
        
        <div className="mt-12 relative">
          <Button variant="ghost" size="icon" className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex bg-white/80 hover:bg-white shadow-md" onClick={prevTestimonial}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{
            transform: `translateX(-${currentIndex * 100}%)`
          }}>
              {testimonials.map(testimonial => <div key={testimonial.id} className="min-w-full">
                  <Card className="max-w-3xl mx-auto">
                    <CardContent className="p-8 rounded-3xl">
                      <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-shrink-0 mb-4 md:mb-0">
                          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-spice-turmeric/30">
                            <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div>
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-spice-turmeric text-spice-turmeric" />)}
                          </div>
                          <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                          <div>
                            <h4 className="font-bold text-spice-earth">{testimonial.name}</h4>
                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>)}
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex bg-white/80 hover:bg-white shadow-md" onClick={nextTestimonial}>
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, index) => <button key={index} className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-spice-paprika' : 'bg-gray-300'}`} onClick={() => setCurrentIndex(index)} />)}
        </div>
      </div>
    </section>;
};

export default TestimonialSection;
