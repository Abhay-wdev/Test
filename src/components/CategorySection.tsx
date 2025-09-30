
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Category type definition
type CategoryProps = {
  id: number;
  name: string;
  description: string;
  image: string;
  slug: string;
};

// Array of category data
const categories: CategoryProps[] = [
  {
    id: 1,
    name: "Ground Spices",
    description: "Finely ground spices for everyday cooking",
    image: `/lovable-uploads/7.png?v=${new Date().getTime()}`,
    slug: "ground-spices"
  },
  {
    id: 2,
    name: "Whole Spices",
    description: "Premium whole spices with intense flavors",
    image: `/lovable-uploads/8.png?v=${new Date().getTime()}`,
    slug: "whole-spices"
  },
  {
    id: 3,
    name: "Spice Blends",
    description: "Traditional masala blends for authentic taste",
    image: `/lovable-uploads/9.png?v=${new Date().getTime()}`,
    slug: "spice-blends"
  }
];

const CategorySection = () => {
  return (
    <section className="pb-8 bg-white">
      <div className="container-custom">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Shop by Categories</h2>
        <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Discover our premium spice collection, carefully sourced and packaged to bring authentic flavors to your kitchen.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="relative">
                <div className="absolute top-4 right-4 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
                  Premium
                </div>
                <div className="h-64 p-6 flex items-center justify-center">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-contain rounded-xl" 
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{category.name}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl">
                  <Link to="/products">
                    Shop Now
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
