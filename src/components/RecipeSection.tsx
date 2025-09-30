import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, Clock, Users, ChefHat } from "lucide-react";
const RecipeSection = () => {
  return <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 fade-in">
            <h2 className="section-title mb-4 text-spice-earth slide-in-left py-0">Suswastik: Har Dish Mein Jadoo, Har Recipe Mein Chatpata Swad.</h2>
            <h3 className="text-2xl font-bold text-spice-paprika mb-4 slide-in-left" style={{
            animationDelay: '0.2s'
          }}>COOK PAV BHAJI WITH US</h3>
            <p className="text-gray-600 mb-6 slide-in-left" style={{
            animationDelay: '0.4s'
          }}>
              Learn how to prepare the perfect Mumbai-style Pav Bhaji with our high-quality spices. 
              This street food classic is bursting with flavors and is easy to make at home.
            </p>
            
            {/* Recipe stats with icons */}
            <div className="flex flex-wrap gap-4 mb-6 slide-in-left" style={{
            animationDelay: '0.6s'
          }}>
              <div className="flex items-center gap-2 bg-spice-cream/50 px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-spice-paprika" />
                <span className="text-sm font-medium">30 mins</span>
              </div>
              <div className="flex items-center gap-2 bg-spice-cream/50 px-3 py-2 rounded-lg">
                <Users className="w-4 h-4 text-spice-coriander" />
                <span className="text-sm font-medium">Serves 4</span>
              </div>
              <div className="flex items-center gap-2 bg-spice-cream/50 px-3 py-2 rounded-lg">
                <ChefHat className="w-4 h-4 text-spice-cumin" />
                <span className="text-sm font-medium">Easy</span>
              </div>
            </div>
            
            <Button asChild className="bg-spice-paprika hover:bg-spice-paprika/90 text-white transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl slide-in-left" style={{
            animationDelay: '0.8s'
          }}>
              <Link to="/recipes" className="flex items-center gap-2 px-[31px]">
                <ChefHat className="w-4 h-4" />
                Start Cooking
              </Link>
            </Button>
          </div>
          <div className="md:w-1/2 slide-in-right">
            <div className="relative rounded-lg overflow-hidden shadow-xl image-zoom group">
              <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" alt="Pav Bhaji Recipe" className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-all duration-300">
                <Button className="rounded-full w-16 h-16 bg-white/80 hover:bg-white transform transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl hover:shadow-2xl">
                  <Play className="h-8 w-8 text-spice-paprika ml-1 group-hover:scale-110 transition-transform duration-300" />
                </Button>
              </div>
              
              {/* Overlay info that appears on hover */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-bold text-lg mb-1">Mumbai Style Pav Bhaji</h4>
                <p className="text-sm opacity-90">Watch our chef prepare this delicious street food classic step by step</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default RecipeSection;