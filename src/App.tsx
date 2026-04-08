import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider, useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Floating Action Button Component
const FloatingCartButton = () => {
  const { totalItems, setIsCartOpen } = useCart();

  if (totalItems === 0) return null;

  return (
    <Button
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-50 md:hidden bg-primary hover:bg-primary/90 animate-fade-in"
      onClick={() => setIsCartOpen(true)}
    >
      <ShoppingCart className="h-6 w-6" />
      <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium animate-pulse">
        {totalItems}
      </span>
    </Button>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <CartDrawer />
          <FloatingCartButton />
          <main>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
