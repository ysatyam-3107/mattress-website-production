import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
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
      <div className="group bg-card rounded-xl border border-border/50 overflow-hidden hover-lift shadow-sm hover:shadow-xl transition-all duration-500 hover:border-primary/20 hover-scale">
        <div className="relative overflow-hidden">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
              width={400}
              height={400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          {product.bestseller && (
            <span className="absolute top-3 left-3 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full shadow-lg animate-pulse">
              Bestseller
            </span>
          )}
          <span className="absolute top-3 right-12 bg-gradient-to-r from-success to-success/80 text-success-foreground text-xs font-medium px-2 py-1 rounded-full shadow-lg">
            {discount}% OFF
          </span>
          <button
            onClick={() => toggleWishlist(product.id)}
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-surface/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-surface hover:scale-110 shadow-lg"
          >
            <Heart className={`h-4 w-4 transition-colors duration-300 ${isWished ? "fill-destructive text-destructive" : "text-muted-foreground group-hover:text-destructive"}`} />
          </button>
          <button
            onClick={() => setShowQuickView(true)}
            className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100"
          >
            <Eye className="h-6 w-6 text-white drop-shadow-lg" />
          </button>
        </div>
        <div className="p-4 space-y-2">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-sm group-hover:text-primary transition-colors duration-300 line-clamp-2">{product.name}</h3>
          </Link>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">₹{product.price.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
          </div>
          <p className="text-xs text-muted-foreground">EMI from ₹{Math.round(product.price / 12).toLocaleString()}/mo</p>
          <Button className="w-full mt-2" size="sm" onClick={() => addToCart(product)}>
            <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
          </Button>
        </div>
      </div>

      {showQuickView && (
        <ProductQuickView product={product} onClose={() => setShowQuickView(false)} />
      )}
    </>
  );
};

export default ProductCard;
