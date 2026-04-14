import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider, useCart } from "@/contexts/CartContext";
import { CompareProvider } from "@/contexts/CompareContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";
import PromoBanner from "@/components/PromoBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CompareBar } from "@/components/CompareBar";
import BackToTop from "@/components/BackToTop";
import { lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/Index"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Checkout = lazy(() => import("./pages/Checkout"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Floating Action Button Component
const FloatingCartButton = () => {
  const { totalItems, setIsCartOpen } = useCart();

  if (totalItems === 0) return null;

  return (
    <Button
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-50 md:hidden bg-primary hover:bg-primary/90 animate-fade-in"
      onClick={() => setIsCartOpen(true)}
      aria-label={`Open cart with ${totalItems} items`}
    >
      <ShoppingCart className="h-6 w-6" />
      <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium animate-pulse">
        {totalItems}
      </span>
    </Button>
  );
};

// Premium loading skeleton
const PageSkeleton = () => (
  <div className="min-h-[60vh] bg-background animate-pulse">
    <div className="container py-12 space-y-8">
      <div className="h-[40vh] bg-gray-100 dark:bg-muted rounded-2xl" />
      <div className="space-y-3 max-w-xl">
        <div className="h-6 bg-gray-100 dark:bg-muted rounded w-2/3" />
        <div className="h-4 bg-gray-100 dark:bg-muted rounded w-1/2" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => (
          <div key={i} className="space-y-3">
            <div className="aspect-square bg-gray-100 dark:bg-muted rounded-2xl" />
            <div className="h-4 bg-gray-100 dark:bg-muted rounded w-3/4" />
            <div className="h-4 bg-gray-100 dark:bg-muted rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <CompareProvider>
            <Toaster />
          <Sonner />
          <BrowserRouter>
            <PromoBanner />
            <Navbar />
            <CartDrawer />
            <FloatingCartButton />
            <main>
              <Suspense fallback={<PageSkeleton />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <CompareBar />
            <BackToTop />
          </BrowserRouter>
          </CompareProvider>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
