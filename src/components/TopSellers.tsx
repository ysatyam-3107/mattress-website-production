import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Heart, Award, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

const TopSellers = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { addToCart, wishlist, toggleWishlist } = useCart();

  const bestsellers = products.filter((p) => p.bestseller);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener("scroll", checkScroll);
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <section className="py-16 bg-[#F9FAFB] dark:bg-background">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#111827] dark:text-gray-100 font-playfair">Top Selling Products</h2>
            <p className="text-gray-500 mt-1 font-montserrat">The mattresses India loves the most</p>
          </div>
          <Link
            to="/products"
            className="text-[#3B82F6] font-bold text-sm hover:underline hidden sm:block font-montserrat"
          >
            View All
          </Link>
        </div>

        {/* Scrollable Row */}
        <div className="relative group/scroll">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-card shadow-xl border border-gray-100 dark:border-border flex items-center justify-center text-[#111827] dark:text-gray-100 hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] transition-all duration-300 opacity-0 group-hover/scroll:opacity-100"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {bestsellers.map((product) => {
              const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
              const isWished = wishlist.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="flex-none w-[260px] sm:w-[280px] bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-border/50 overflow-hidden group hover:shadow-[0_16px_48px_-8px_rgba(30,58,138,0.12)] transition-all duration-500 ease-out hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 dark:bg-muted/30">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    </Link>

                    {/* Best Seller Badge */}
                    <span className="absolute top-3 left-3 bg-[#1E3A8A] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider flex items-center gap-1 shadow-md font-montserrat">
                      <Award className="w-3 h-3" /> Best Seller
                    </span>

                    {/* Wishlist */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-white/90 dark:bg-card/90 shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110"
                      aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart className={`w-4 h-4 ${isWished ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-bold text-[#111827] dark:text-gray-100 text-sm mb-2 line-clamp-1 group-hover:text-[#3B82F6] transition-colors duration-300 font-playfair">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex items-center gap-0.5 bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded font-montserrat">
                        {product.rating} <Star className="w-3 h-3 fill-white" />
                      </div>
                      <span className="text-xs text-gray-400 font-medium font-montserrat">
                        {product.reviews.toLocaleString()}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-end gap-2 mb-3">
                      <span className="text-lg font-extrabold text-[#111827] dark:text-gray-100 font-montserrat">₹{product.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-400 line-through font-montserrat">₹{product.originalPrice.toLocaleString()}</span>
                      <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded font-montserrat">{discount}% off</span>
                    </div>

                    <Button
                      size="sm"
                      className="w-full bg-[#1E3A8A] hover:bg-[#3B82F6] text-white rounded-xl h-9 text-xs font-bold btn-press transition-all duration-300 font-montserrat"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="w-3.5 h-3.5 mr-1.5" /> Add to Cart
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-card shadow-xl border border-gray-100 dark:border-border flex items-center justify-center text-[#111827] dark:text-gray-100 hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] transition-all duration-300 opacity-0 group-hover/scroll:opacity-100"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Mobile View All */}
        <div className="mt-6 text-center sm:hidden">
          <Link to="/products">
            <Button variant="outline" className="w-full border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white btn-press font-montserrat">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
