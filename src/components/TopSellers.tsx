import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Heart, Award, ShoppingCart, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchShopifyProducts } from "@/api/products";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";

const TopSellers = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { addToCart, wishlist, toggleWishlist } = useCartStore();

  const { data: storeProducts = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchShopifyProducts,
  });

  const bestsellers = storeProducts.filter((p) => p.bestseller);

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
    <section className="py-14 bg-[#F9FAFB] dark:bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3B82F6]/20 to-transparent" />
      
      <div className="container">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-gold" />
              <span className="text-gold-dark font-bold text-[11px] tracking-[0.2em] uppercase font-montserrat">
                Trending Now
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#111827] dark:text-gray-100 font-playfair">Top Selling Mattresses</h2>
            <p className="text-gray-500 mt-2 font-montserrat">The mattresses India trusts the most</p>
          </div>
          <Link
            to="/products"
            className="text-[#3B82F6] font-bold text-sm hover:underline hidden sm:flex items-center gap-1 font-montserrat group"
          >
            View All
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Scrollable Row */}
        <div className="relative group/scroll">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white dark:bg-card shadow-premium border border-gray-100/80 dark:border-border flex items-center justify-center text-[#111827] dark:text-gray-100 hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] transition-all duration-300 opacity-0 group-hover/scroll:opacity-100"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {bestsellers.map((product, idx) => {
              const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
              const isWished = wishlist.includes(product.id);
              const isFirst = idx === 0;

              return (
                <div
                  key={product.id}
                  className="flex-none w-[270px] sm:w-[290px] bg-white dark:bg-card rounded-2xl border border-gray-100/80 dark:border-border/50 overflow-hidden group hover:shadow-premium-lg transition-all duration-500 ease-out hover:-translate-y-2 relative"
                >
                  {/* #1 Bestseller Ribbon for first card */}
                  {isFirst && (
                    <div className="absolute top-4 -left-1 z-20">
                      <div className="flex items-center gap-1.5 bg-gradient-to-r from-gold-dark to-gold text-white text-[10px] font-black px-3 py-1.5 rounded-r-lg shadow-glow-gold uppercase tracking-wider font-montserrat">
                        <Crown className="w-3.5 h-3.5" /> #1 Bestseller
                      </div>
                      <div className="w-0 h-0 border-t-[6px] border-t-gold-dark border-l-[6px] border-l-transparent ml-0" />
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 dark:bg-muted/30">
                    <Link to={`/product/${product.slug}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      {/* Gradient vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </Link>

                    {/* Best Seller Badge */}
                    {!isFirst && (
                      <span className="absolute top-3 left-3 bg-[#1E3A8A] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider flex items-center gap-1 shadow-md font-montserrat">
                        <Award className="w-3 h-3" /> Best Seller
                      </span>
                    )}

                    {/* Wishlist */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-white/90 dark:bg-card/90 backdrop-blur-sm shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110 border border-white/50"
                      aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart className={`w-4 h-4 transition-colors ${isWished ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <Link to={`/product/${product.slug}`}>
                      <h3 className="font-bold text-[#111827] dark:text-gray-100 text-sm mb-2.5 line-clamp-1 group-hover:text-[#3B82F6] transition-colors duration-300 font-playfair">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-0.5 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-md font-montserrat shadow-sm">
                        {product.rating} <Star className="w-3 h-3 fill-white" />
                      </div>
                      <span className="text-xs text-gray-400 font-medium font-montserrat">
                        {product.reviews.toLocaleString()} reviews
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-end gap-2 mb-4">
                      <span className="text-xl font-extrabold text-[#111827] dark:text-gray-100 font-montserrat">₹{product.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-400 line-through font-montserrat">₹{product.originalPrice.toLocaleString()}</span>
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-md font-montserrat">{discount}% off</span>
                    </div>

                    {/* Gradient bottom accent */}
                    <div className="h-px bg-gradient-to-r from-transparent via-[#3B82F6]/20 to-transparent mb-4" />

                    <Button
                      size="sm"
                      className="w-full bg-[#1E3A8A] hover:bg-[#3B82F6] text-white rounded-xl h-10 text-xs font-bold btn-press btn-sweep transition-all duration-300 font-montserrat shadow-sm"
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
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white dark:bg-card shadow-premium border border-gray-100/80 dark:border-border flex items-center justify-center text-[#111827] dark:text-gray-100 hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] transition-all duration-300 opacity-0 group-hover/scroll:opacity-100 animate-bounce-gentle"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <Link to="/products">
            <Button variant="outline" className="w-full border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white btn-press font-montserrat rounded-xl h-12 font-bold">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
