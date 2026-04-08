import { Star, Heart, ShoppingCart, Eye, Award, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Product Skeleton Component
export const ProductSkeleton = () => (
  <div className="bg-card rounded-xl border border-border/50 overflow-hidden animate-pulse">
    <div className="aspect-square bg-muted"></div>
    <div className="p-4 space-y-2">
      <div className="h-4 bg-muted rounded w-3/4"></div>
      <div className="h-3 bg-muted rounded w-1/2"></div>
      <div className="h-6 bg-muted rounded w-1/4"></div>
      <div className="h-8 bg-muted rounded w-full"></div>
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
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-lg"
            />
            {product.bestseller && (
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-primary to-accent">
                Bestseller
              </Badge>
            )}
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-warning text-warning" : "text-muted-foreground"}`} />
              ))}
              <span className="text-sm font-medium ml-2">{product.rating} ({product.reviews.toLocaleString()} reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">₹{product.price.toLocaleString()}</span>
              <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
              <Badge variant="secondary" className="bg-success/10 text-success">
                {discount}% OFF
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{product.description}</p>
            <div className="space-y-2">
              <p className="text-sm"><strong>Type:</strong> {product.type.replace("-", " ")}</p>
              <p className="text-sm"><strong>Firmness:</strong> {product.firmness}</p>
              <p className="text-sm"><strong>Sizes:</strong> {product.sizes.join(", ")}</p>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={() => addToCart(product)} className="flex-1">
                <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
              </Button>
              <Link to={`/product/${product.id}`} className="flex-1">
                <Button variant="outline" className="w-full">View Details</Button>
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
  const [showQuickView, setShowQuickView] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const isWished = wishlist.includes(product.id);

  return (
    <>
      <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col relative w-full translate-y-0 hover:-translate-y-2">
        <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-slate-50">
          <Link to={`/product/${product.id}`} className="block w-full h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              loading="lazy"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          
          {/* Top-Left Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.bestseller && (
              <span className="bg-primary text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 uppercase tracking-wider backdrop-blur-md">
                <Award className="w-3.5 h-3.5" /> Bestseller
              </span>
            )}
            <span className="bg-white/95 text-slate-800 text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 uppercase">
              <Zap className="w-3.5 h-3.5 text-accent" /> {discount}% OFF
            </span>
          </div>

          {/* Action Buttons: Wishlist & Quick View */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={() => toggleWishlist(product.id)}
              className="h-9 w-9 rounded-full bg-white/95 shadow-sm flex items-center justify-center transition-transform hover:scale-110 text-slate-400 hover:text-red-500"
            >
              <Heart className={`h-4 w-4 transition-colors ${isWished ? "fill-red-500 text-red-500" : ""}`} />
            </button>
            <button
              onClick={() => setShowQuickView(true)}
              className="h-9 w-9 rounded-full bg-white/95 shadow-sm flex items-center justify-center transition-transform hover:scale-110 text-slate-400 hover:text-slate-800"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Card Body */}
        <div className="p-5 flex flex-col flex-1 bg-white">
          <Link to={`/product/${product.id}`} className="mb-2">
            <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
          </Link>

          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`h-3.5 w-3.5 ${star <= Math.floor(product.rating) ? "fill-accent text-accent" : "fill-slate-200 text-slate-200"}`} />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-700">{product.rating}</span>
            <span className="text-xs font-medium text-slate-400">({product.reviews.toLocaleString()})</span>
          </div>

          <div className="mt-auto">
            <div className="flex items-end gap-2 mb-1">
              <span className="text-2xl font-black text-slate-900 leading-none">₹{product.price.toLocaleString()}</span>
              <span className="text-sm font-semibold text-slate-400 line-through mb-0.5">₹{product.originalPrice.toLocaleString()}</span>
            </div>
            <p className="text-xs font-medium text-slate-500 mb-4">EMI from ₹{Math.round(product.price / 12).toLocaleString()}/mo</p>
            
            <Button 
              className="w-full bg-slate-900 hover:bg-primary text-white rounded-xl h-11 font-bold shadow-sm transition-colors text-sm" 
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
