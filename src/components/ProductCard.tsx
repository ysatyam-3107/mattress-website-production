import { Star, Heart, ShoppingCart, Eye, Award, Zap, Check, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useCompareStore } from "@/store/compareStore";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Product Skeleton Component — premium shimmer
export const ProductSkeleton = () => (
  <div className="bg-white dark:bg-card rounded-2xl border border-border/50 overflow-hidden">
    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 dark:from-muted dark:to-muted/50 shimmer"></div>
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-100 dark:bg-muted rounded-lg w-3/4 shimmer"></div>
      <div className="h-3 bg-gray-100 dark:bg-muted rounded-lg w-1/2 shimmer" style={{ animationDelay: '0.15s' }}></div>
      <div className="h-6 bg-gray-100 dark:bg-muted rounded-lg w-1/4 shimmer" style={{ animationDelay: '0.3s' }}></div>
      <div className="h-10 bg-gray-100 dark:bg-muted rounded-xl w-full shimmer" style={{ animationDelay: '0.45s' }}></div>
    </div>
  </div>
);

// Quick View Modal Component
const ProductQuickView = ({ product, onClose }: { product: Product; onClose: () => void }) => {
  const { addToCart } = useCartStore();
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-playfair text-xl">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
            {product.bestseller && (
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white border-0 shadow-lg">
                <Award className="w-3 h-3 mr-1" /> Bestseller
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
              <Badge variant="secondary" className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 font-bold">
                {discount}% OFF
              </Badge>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
            <div className="space-y-2 text-sm bg-gray-50 dark:bg-muted/30 p-4 rounded-xl">
              <p><strong>Type:</strong> {product.type.replace("-", " ")}</p>
              <p><strong>Firmness:</strong> {product.firmness}</p>
              <p><strong>Sizes:</strong> {product.sizes.join(", ")}</p>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={() => addToCart(product)} className="flex-1 bg-[#3B82F6] hover:bg-blue-500 text-white btn-press btn-sweep font-montserrat rounded-xl">
                <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
              </Button>
              <Link to={`/product/${product.slug}`} className="flex-1">
                <Button variant="outline" className="w-full border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white btn-press font-montserrat rounded-xl">View Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, wishlist, toggleWishlist } = useCartStore();
  const { toggleCompare, selectedIds } = useCompareStore();
  const [showQuickView, setShowQuickView] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const isWished = wishlist.includes(product.id);
  const isComparing = selectedIds.includes(product.id);

  return (
    <>
      <div className="group bg-white dark:bg-card rounded-2xl border border-gray-100/80 dark:border-border/50 overflow-hidden shadow-soft hover:shadow-premium-lg transition-all duration-500 ease-out flex flex-col relative w-full translate-y-0 hover:-translate-y-2">
        <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-gray-50 dark:bg-muted/30">
          <Link to={`/product/${product.slug}`} className="block w-full h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            {/* Cinematic vignette on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
          
          {/* Compare Checkbox — improved */}
          <div 
            className="absolute bottom-3 right-3 z-20 flex items-center gap-2 glass-card px-2.5 py-1.5 rounded-full shadow-sm cursor-pointer hover:bg-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleCompare(product.id);
            }}
          >
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${isComparing ? 'bg-[#1E3A8A] border-[#1E3A8A] scale-110' : 'border-slate-300'}`}>
              {isComparing && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-tighter">Compare</span>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.bestseller && (
              <span className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 uppercase tracking-wider font-montserrat border border-white/10">
                <Award className="w-3.5 h-3.5" /> Bestseller
              </span>
            )}
            <span className="bg-white/95 dark:bg-card/95 backdrop-blur-sm text-gray-800 dark:text-gray-100 text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1 uppercase font-montserrat border border-gray-100/50 dark:border-border/50">
              <Zap className="w-3.5 h-3.5 text-emerald-500" /> {discount}% OFF
            </span>
          </div>

          {/* Action Buttons: Wishlist & Quick View */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-400 ease-out">
            <button
              onClick={() => toggleWishlist(product.id)}
              className="h-10 w-10 rounded-xl glass-card shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110 text-gray-500 hover:text-red-500"
            >
              <Heart className={`h-4 w-4 transition-all ${isWished ? "fill-red-500 text-red-500 scale-110" : ""}`} />
            </button>
            <button
              onClick={() => setShowQuickView(true)}
              className="h-10 w-10 rounded-xl glass-card shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110 text-gray-500 hover:text-[#1E3A8A]"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Card Body */}
        <div className="p-5 flex flex-col flex-1">
          <Link to={`/product/${product.slug}`} className="mb-2">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg group-hover:text-[#3B82F6] transition-colors duration-300 line-clamp-1 font-playfair">{product.name}</h3>
          </Link>

          {/* Rating with gold glow */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`h-3.5 w-3.5 ${star <= Math.floor(product.rating) ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_3px_rgba(251,191,36,0.4)]" : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"}`} />
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
            <p className="text-xs font-medium text-gray-400 mb-4 font-montserrat flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              EMI from ₹{Math.round(product.price / 12).toLocaleString()}/mo
            </p>
            
            {/* Gradient accent line */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#3B82F6]/15 to-transparent mb-4" />
            
            <Button 
              className="w-full bg-[#1E3A8A] hover:bg-[#3B82F6] text-white rounded-xl h-11 font-bold shadow-sm transition-all duration-300 text-sm btn-press btn-sweep font-montserrat" 
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
