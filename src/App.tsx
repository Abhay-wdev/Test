
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AuthPage from "./pages/AuthPage";
import AdminSetupPage from "./pages/AdminSetupPage";
import ContactPage from "./pages/ContactPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProductsManagement from "./pages/admin/ProductsManagement";
import InventoryManagement from "./pages/admin/InventoryManagement";
import OrdersManagement from "./pages/admin/OrdersManagement";
import LeadsManagement from "./pages/admin/LeadsManagement";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen flex flex-col w-full">
                <Routes>
                  {/* Authentication route */}
                  <Route path="/auth" element={<AuthPage />} />
                  
                  {/* Admin setup route */}
                  <Route path="/admin-setup" element={<AdminSetupPage />} />
                  
                  {/* Customer-facing routes */}
                  <Route
                    path="/"
                    element={
                      <>
                        <Navbar />
                        <main className="flex-grow">
                          <Index />
                        </main>
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/products"
                    element={
                      <>
                        <Navbar />
                        <main className="flex-grow">
                          <ProductsPage />
                        </main>
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/product/:id"
                    element={
                      <>
                        <Navbar />
                        <main className="flex-grow">
                          <ProductDetail />
                        </main>
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <>
                        <Navbar />
                        <main className="flex-grow">
                          <CartPage />
                        </main>
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/contact"
                    element={
                      <>
                        <Navbar />
                        <main className="flex-grow">
                          <ContactPage />
                        </main>
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/my-orders"
                    element={
                      <ProtectedRoute>
                        <>
                          <Navbar />
                          <main className="flex-grow">
                            <MyOrdersPage />
                          </main>
                          <Footer />
                        </>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <>
                          <Navbar />
                          <main className="flex-grow">
                            <CheckoutPage />
                          </main>
                          <Footer />
                        </>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <>
                          <Navbar />
                          <main className="flex-grow">
                            <ProfilePage />
                          </main>
                          <Footer />
                        </>
                      </ProtectedRoute>
                    }
                  />
                  
                  {/* Admin routes */}
                  <Route
                    path="/admin" 
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <AdminLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Dashboard />} />
                    <Route path="orders" element={<OrdersManagement />} />
                    <Route path="products" element={<ProductsManagement />} />
                    <Route path="inventory" element={<InventoryManagement />} />
                    <Route path="leads" element={<LeadsManagement />} />
                  </Route>
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
