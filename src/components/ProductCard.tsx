import { Star, Heart, ShoppingCart, Eye, Award, Zap, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useCompare } from "@/contexts/CompareContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Product Skeleton Component
export const ProductSkeleton = () => (
  <div className="bg-white dark:bg-card rounded-2xl border border-border/50 overflow-hidden animate-pulse">
    <div className="aspect-square bg-gray-100 dark:bg-muted"></div>
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-100 dark:bg-muted rounded w-3/4"></div>
      <div className="h-3 bg-gray-100 dark:bg-muted rounded w-1/2"></div>
      <div className="h-6 bg-gray-100 dark:bg-muted rounded w-1/4"></div>
      <div className="h-10 bg-gray-100 dark:bg-muted rounded w-full"></div>
    </div>
  </div>
);

// Quick View Modal Component
const ProductQuickView = ({ product, onClose }: { product: Product; onClose: () => void }) => {
  const { addToCart } = useCart();
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-playfair">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-xl"
            />
            {product.bestseller && (
              <Badge className="absolute top-3 left-3 bg-[#1E3A8A] text-white">
                Bestseller
              </Badge>
            )}
          </div>
          <div className="space-y-4 font-montserrat">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 dark:text-gray-600"}`} />
              ))}
              <span className="text-sm font-medium ml-2">{product.rating} ({product.reviews.toLocaleString()} reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">₹{product.price.toLocaleString()}</span>
              <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
              <Badge variant="secondary" className="bg-green-50 dark:bg-green-900/30 text-green-600 font-bold">
                {discount}% OFF
              </Badge>
            </div>
            <p className="text-sm text-gray-500">{product.description}</p>
            <div className="space-y-2 text-sm">
              <p><strong>Type:</strong> {product.type.replace("-", " ")}</p>
              <p><strong>Firmness:</strong> {product.firmness}</p>
              <p><strong>Sizes:</strong> {product.sizes.join(", ")}</p>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={() => addToCart(product)} className="flex-1 bg-[#3B82F6] hover:bg-blue-500 text-white btn-press font-montserrat">
                <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
              </Button>
              <Link to={`/product/${product.id}`} className="flex-1">
                <Button variant="outline" className="w-full border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white btn-press font-montserrat">View Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const { toggleCompare, selectedIds } = useCompare();
  const [showQuickView, setShowQuickView] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const isWished = wishlist.includes(product.id);
  const isComparing = selectedIds.includes(product.id);

  return (
    <>
      <div className="group bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-border/50 overflow-hidden shadow-sm hover:shadow-[0_20px_60px_-12px_rgba(30,58,138,0.15)] transition-all duration-500 ease-out flex flex-col relative w-full translate-y-0 hover:-translate-y-2">
        <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-gray-50 dark:bg-muted/30">
          <Link to={`/product/${product.id}`} className="block w-full h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
          
          {/* Compare Checkbox */}
          <div 
            className="absolute bottom-3 right-3 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full shadow-sm border border-slate-100 cursor-pointer hover:bg-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleCompare(product.id);
            }}
          >
            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isComparing ? 'bg-[#1E3A8A] border-[#1E3A8A]' : 'border-slate-300'}`}>
              {isComparing && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="text-[10px] font-bold text-slate-900 uppercase tracking-tighter">Compare</span>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.bestseller && (
              <span className="bg-[#1E3A8A] text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-lg shadow-md flex items-center gap-1.5 uppercase tracking-wider font-montserrat">
                <Award className="w-3.5 h-3.5" /> Bestseller
              </span>
            )}
            <span className="bg-white/95 dark:bg-card/95 text-gray-800 dark:text-gray-100 text-[10px] sm:text-xs font-bold px-3 py-1 rounded-lg shadow-sm flex items-center gap-1 uppercase font-montserrat">
              <Zap className="w-3.5 h-3.5 text-[#3B82F6]" /> {discount}% OFF
            </span>
          </div>

          {/* Action Buttons: Wishlist & Quick View */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-400 ease-out">
            <button
              onClick={() => toggleWishlist(product.id)}
              className="h-9 w-9 rounded-xl bg-white/95 dark:bg-card/95 shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110 text-gray-400 hover:text-red-500"
            >
              <Heart className={`h-4 w-4 transition-colors ${isWished ? "fill-red-500 text-red-500" : ""}`} />
            </button>
            <button
              onClick={() => setShowQuickView(true)}
              className="h-9 w-9 rounded-xl bg-white/95 dark:bg-card/95 shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110 text-gray-400 hover:text-[#1E3A8A]"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Card Body */}
        <div className="p-5 flex flex-col flex-1">
          <Link to={`/product/${product.id}`} className="mb-2">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg group-hover:text-[#3B82F6] transition-colors duration-300 line-clamp-1 font-playfair">{product.name}</h3>
          </Link>

          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`h-3.5 w-3.5 ${star <= Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"}`} />
              ))}
            </div>
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 font-montserrat">{product.rating}</span>
            <span className="text-xs font-medium text-gray-400 font-montserrat">({product.reviews.toLocaleString()})</span>
          </div>

          <div className="mt-auto">
            <div className="flex items-end gap-2 mb-1">
              <span className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 leading-none font-montserrat">₹{product.price.toLocaleString()}</span>
              <span className="text-sm font-semibold text-gray-400 line-through mb-0.5 font-montserrat">₹{product.originalPrice.toLocaleString()}</span>
            </div>
            <p className="text-xs font-medium text-gray-400 mb-4 font-montserrat">EMI from ₹{Math.round(product.price / 12).toLocaleString()}/mo</p>
            
            <Button 
              className="w-full bg-[#1E3A8A] hover:bg-[#3B82F6] text-white rounded-xl h-11 font-bold shadow-sm transition-all duration-300 text-sm btn-press font-montserrat" 
              onClick={() => addToCart(product)}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {showQuickView && (
        <ProductQuickView product={product} onClose={() => setShowQuickView(false)} />
      )}
    </>
  );
};

export default ProductCard;
