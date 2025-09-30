
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, User, Settings, Search, Gift } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { cart } = useCart();
  const { user } = useAuth();
  const { data: userRole } = useUserRole();
  const navigate = useNavigate();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleAdminClick = () => {
    console.log('Navbar: Admin button clicked, userRole:', userRole);
    console.log('Navbar: Attempting to navigate to /admin');
    try {
      navigate('/admin');
      setIsOpen(false);
      console.log('Navbar: Navigation to /admin successful');
    } catch (error) {
      console.error('Navbar: Navigation error:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setIsOpen(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      {/* Top Promotional Banner */}
      <div className="bg-green-600 text-white py-2 text-center text-sm">
        <div className="container-custom flex items-center justify-center gap-2">
          <Gift className="w-4 h-4" />
          <span className="font-medium">Free Shipping on Orders Above ₹500 | Use Code: FREESHIP</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex justify-between items-center h-16 sm:h-18">
            {/* Logo - Increased size */}
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/ad372e54-e6ca-4b4f-bbdd-1daa6ee2375d.png" 
                alt="Suswastik Logo" 
                className="h-16 sm:h-20 w-16 sm:w-20"
              />
            </Link>

            {/* Search Bar - Desktop with functionality */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for spices, masalas..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-green-600 transition-colors font-medium"
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-green-600 transition-colors font-medium"
              >
                Products
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-green-600 transition-colors font-medium"
              >
                Contact
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-green-600 transition-colors font-medium"
              >
                Become a Partner
              </Link>
              {user && (
                <Link 
                  to="/my-orders" 
                  className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                >
                  My Orders
                </Link>
              )}
              {user && userRole === 'admin' && (
                <button
                  onClick={handleAdminClick}
                  className="text-gray-700 hover:text-green-600 transition-colors flex items-center font-medium"
                >
                  <Settings className="h-4 w-4 mr-1" />
                  Admin
                </button>
              )}
            </div>

            {/* Right Side - Cart and Auth */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Cart - Increased icon size */}
              <div className="relative">
                <Link to="/cart" className="relative">
                  <Button variant="ghost" size="icon" className="relative h-10 w-10 hover:bg-green-50">
                    <ShoppingCart className="h-6 w-6 text-gray-700" />
                  </Button>
                </Link>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-3 right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold z-20">
                    {cartItemsCount}
                  </span>
                )}
              </div>

              {/* Authentication */}
              {user ? (
                <UserMenu />
              ) : (
                <Link to="/auth">
                  <Button className="hidden md:flex bg-green-600 hover:bg-green-700 text-white">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-10 w-10"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search with functionality */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for spices, masalas..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/"
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Products
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Become a Partner
                </Link>
                {user && (
                  <Link
                    to="/my-orders"
                    className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    My Orders
                  </Link>
                )}
                {user && userRole === 'admin' && (
                  <button
                    onClick={handleAdminClick}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 transition-colors font-medium"
                  >
                    Admin Dashboard
                  </button>
                )}
                {!user && (
                  <Link
                    to="/auth"
                    className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Category Navigation */}
      <div className="bg-gray-50 border-b border-gray-200 pt-3">
        <div className="container-custom">
          <div className="flex items-center justify-center space-x-8 overflow-x-auto">
            <Link to="/products?category=seasonings" className="flex flex-col items-center space-y-1 text-gray-600 hover:text-green-600 transition-colors whitespace-nowrap">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-lg">🧂</span>
              </div>
              <span className="text-sm font-medium">Seasonings</span>
            </Link>
            <Link to="/products?category=powdered-spices" className="flex flex-col items-center space-y-1 text-gray-600 hover:text-green-600 transition-colors whitespace-nowrap">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 text-lg">🥄</span>
              </div>
              <span className="text-sm font-medium">Powdered</span>
            </Link>
            <Link to="/products?category=blended-spices" className="flex flex-col items-center space-y-1 text-gray-600 hover:text-green-600 transition-colors whitespace-nowrap">
              <div className="w-10 h-10 bg-brown-100 rounded-full flex items-center justify-center">
                <span className="text-brown-600 text-lg">🍲</span>
              </div>
              <span className="text-sm font-medium">Blended Spices</span>
            </Link>
            <Link to="/products?category=whole-spices" className="flex flex-col items-center space-y-1 text-gray-600 hover:text-green-600 transition-colors whitespace-nowrap">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-lg">🌿</span>
              </div>
              <span className="text-sm font-medium">Whole Spices</span>
            </Link>
            <Link to="/products?category=combo-packs" className="flex flex-col items-center space-y-1 text-gray-600 hover:text-green-600 transition-colors whitespace-nowrap">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-lg">🎁</span>
              </div>
              <span className="text-sm font-medium">Combo Packs</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
