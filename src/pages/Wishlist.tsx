import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useCartStore();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <>
      <SEO
        title="My Wishlist"
        description="View your saved mattresses and add them to cart when you're ready."
        noIndex
      />
      <div className="min-h-screen bg-background">
        <div className="bg-card border-b border-border/50 py-10">
          <div className="container">
            <h1 className="text-3xl font-bold mb-2 font-playfair text-[#1E3A8A]">
              <Heart className="inline w-8 h-8 mr-2 text-red-500 fill-red-500" />
              My Wishlist
            </h1>
            <p className="text-muted-foreground font-montserrat">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? "item" : "items"} saved
            </p>
          </div>
        </div>

        <div className="container py-12">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-20 space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                <Heart className="w-12 h-12 text-red-300" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-playfair">
                  Your wishlist is empty
                </h2>
                <p className="text-muted-foreground font-montserrat">
                  Browse our collection and save items you love.
                </p>
              </div>
              <Link to="/products">
                <Button className="bg-[#1E3A8A] hover:bg-blue-900 font-montserrat font-bold">
                  Browse Mattresses
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistProducts.map((product) => {
                const discount = Math.round(
                  ((product.originalPrice - product.price) / product.originalPrice) * 100
                );
                return (
                  <div
                    key={product.id}
                    className="bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-border/50 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
                  >
                    <Link to={`/product/${product.slug}`} className="block">
                      <div className="aspect-square overflow-hidden bg-gray-50 dark:bg-muted/30 relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <span className="absolute top-3 left-3 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-lg">
                          {discount}% OFF
                        </span>
                      </div>
                    </Link>
                    <div className="p-5 space-y-3">
                      <Link to={`/product/${product.slug}`}>
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-[#3B82F6] transition-colors font-playfair">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-end gap-2">
                        <span className="text-xl font-extrabold text-gray-900 dark:text-gray-100 font-montserrat">
                          ₹{product.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-400 line-through font-montserrat">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button
                          className="flex-1 bg-[#1E3A8A] hover:bg-[#3B82F6] text-white font-montserrat font-bold text-sm"
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-1.5" /> Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => toggleWishlist(product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
