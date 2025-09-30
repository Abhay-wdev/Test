
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 9; // Number of products per page

  // Map category slug to ID
  const categoryMap: { [key: string]: number } = useMemo(() => ({
    'ground-spices': 1,
    'whole-spices': 2,
    'spice-blends': 3,
    'gourmet-spices': 4,
    'seasonings': 1,
    'powdered-spices': 1,
    'blended-spices': 3,
    'combo-packs': 4
  }), []);

  // Get the category and search from URL query params
  useEffect(() => {
    const category = searchParams.get("category") || "";
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "0");
    setActiveCategory(category);
    setSearchTerm(search);
    setCurrentPage(page);
  }, [searchParams]);

  const categoryId = activeCategory ? categoryMap[activeCategory] : null;

  const { data, isLoading, error } = useProducts(
    currentPage,
    pageSize,
    categoryId,
    searchTerm
  );

  const products = data?.data || [];
  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  // Get all unique categories
  const categories = useMemo(() => [
    { id: "all", name: "All Categories" },
    { id: "ground-spices", name: "Ground Spices" },
    { id: "whole-spices", name: "Whole Spices" },
    { id: "spice-blends", name: "Spice Blends" },
    { id: "gourmet-spices", name: "Gourmet Spices" }
  ], []);

  // Memoized handlers to prevent unnecessary re-renders
  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId === "all" ? "" : categoryId);
    setCurrentPage(0); // Reset to first page on category change
    setSearchParams(prev => {
      if (categoryId === "all") {
        prev.delete("category");
      } else {
        prev.set("category", categoryId);
      }
      prev.set("page", "0");
      return prev;
    }, { replace: true });
  }, [setSearchParams]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(0); // Reset to first page on search change
    setSearchParams(prev => {
      if (value) {
        prev.set("search", value);
      } else {
        prev.delete("search");
      }
      prev.set("page", "0");
      return prev;
    }, { replace: true });
  }, [setSearchParams]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    setSearchParams(prev => {
      prev.set("page", page.toString());
      return prev;
    }, { replace: true });
  }, [setSearchParams]);

  if (error) {
    return (
      <div className="py-8 sm:py-12">
        <div className="container-custom text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-red-600 mb-4">Error Loading Products</h1>
          <p className="text-sm sm:text-base text-gray-600">There was an error loading the products. Please try again later.</p>
        </div>
      </div>
    );
  }

  const currentSearchTerm = searchParams.get("search");

  return (
    <div className="py-8 sm:py-12">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl font-bold text-spice-earth mb-2 sm:mb-4">Our Products</h1>
          {currentSearchTerm ? (
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Search results for "{currentSearchTerm}"
            </p>
          ) : (
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Browse our collection of premium Rajasthani spices and find the perfect flavors for your next culinary creation.
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          {/* Filters Sidebar - Mobile Optimized */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-lg sm:text-xl font-bold text-spice-earth mb-3 sm:mb-4">Categories</h2>
              
              {/* Mobile: Horizontal scroll categories */}
              <div className="lg:hidden">
                <div className="flex overflow-x-auto gap-2 pb-2 mb-4">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`whitespace-nowrap py-2 px-3 rounded-md transition-all text-sm ${
                        (category.id === "all" && !activeCategory) || activeCategory === category.id
                          ? "bg-spice-paprika text-white"
                          : "bg-gray-100 hover:bg-spice-paprika/10"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Desktop: Vertical list */}
              <ul className="space-y-2 hidden lg:block">
                {categories.map(category => (
                  <li key={category.id}>
                    <button
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full text-left py-2 px-3 rounded-md transition-all ${
                        (category.id === "all" && !activeCategory) || activeCategory === category.id
                          ? "bg-spice-paprika text-white"
                          : "hover:bg-spice-paprika/10"
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 sm:mt-8">
                <h2 className="text-lg sm:text-xl font-bold text-spice-earth mb-3 sm:mb-4">Search</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="input-field text-sm sm:text-base"
                  />
                  <svg
                    className="w-4 sm:w-5 h-4 sm:h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid - Mobile Optimized */}
          <div className="lg:w-3/4">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(pageSize)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden h-72 sm:h-80 animate-pulse">
                    <div className="h-32 sm:h-48 bg-gray-300"></div>
                    <div className="p-3 sm:p-4">
                      <div className="h-3 sm:h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-3 sm:h-4 bg-gray-300 rounded w-1/2"></div>
                      <div className="flex items-center justify-between mt-3 sm:mt-4">
                        <div className="h-3 sm:h-4 bg-gray-300 rounded w-1/4"></div>
                        <div className="h-6 sm:h-8 bg-gray-300 rounded w-1/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 0}
                          />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink
                              onClick={() => handlePageChange(i)}
                              isActive={i === currentPage}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage >= totalPages - 1}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <h3 className="text-lg sm:text-xl font-medium text-gray-600">No products found</h3>
                <p className="text-sm sm:text-base text-gray-500 mt-2">
                  {currentSearchTerm
                    ? `No products found for "${currentSearchTerm}". Try a different search term.`
                    : "Try changing your search or filter criteria"
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
