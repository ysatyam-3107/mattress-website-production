import { useState, useMemo, useEffect, useRef } from "react";
import { X, ChevronRight, Bed, Cloud, Stethoscope, Leaf, RefreshCw } from "lucide-react";
import ProductCard, { ProductSkeleton } from "@/components/ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";

const mattressTypes = [
  { id: "all", label: "All Mattresses", icon: Bed },
  { id: "memory-foam", label: "Memory Foam", icon: Cloud },
  { id: "orthopedic", label: "Orthopedic", icon: Stethoscope },
  { id: "latex", label: "Latex", icon: Leaf },
  { id: "hybrid", label: "Hybrid", icon: RefreshCw },
];

const sizes = ["All", "Single", "Double", "Queen", "King"];
const firmnesses = ["all", "soft", "medium", "firm"] as const;

const Products = () => {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sizeFilter, setSizeFilter] = useState("All");
  const [firmnessFilter, setFirmnessFilter] = useState<string>("all");
  const [priceMax, setPriceMax] = useState<number>(30000);
  const [sortBy, setSortBy] = useState<string>("popular");
  const [isScrolled, setIsScrolled] = useState(false);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridContainerRef.current;
    if (!grid) return;

    const handleScroll = () => {
      setIsScrolled(grid.scrollTop > 50);
    };

    grid.addEventListener("scroll", handleScroll);
    return () => grid.removeEventListener("scroll", handleScroll);
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (typeFilter !== "all" && p.type !== typeFilter) return false;
      if (sizeFilter !== "All" && !p.sizes.includes(sizeFilter)) return false;
      if (firmnessFilter !== "all" && p.firmness !== firmnessFilter) return false;
      if (p.price > priceMax) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return b.rating - a.rating; // Default 'popular'
    });
  }, [typeFilter, sizeFilter, firmnessFilter, priceMax, sortBy]);

  const activeFilters = [
    typeFilter !== "all" && { type: "type", value: typeFilter, label: mattressTypes.find(t => t.id === typeFilter)?.label || typeFilter },
    sizeFilter !== "All" && { type: "size", value: sizeFilter, label: sizeFilter },
    firmnessFilter !== "all" && { type: "firmness", value: firmnessFilter, label: firmnessFilter }
  ].filter(Boolean);

  const removeFilter = (filter: { type: string; value: string; label: string }) => {
    if (filter.type === "type") setTypeFilter("all");
    if (filter.type === "size") setSizeFilter("All");
    if (filter.type === "firmness") setFirmnessFilter("all");
  };

  const clearAllFilters = () => {
    setTypeFilter("all");
    setSizeFilter("All");
    setFirmnessFilter("all");
    setPriceMax(30000);
  };

  return (
    <>
      <SEO 
        title="Shop All Mattresses" 
        description="Explore our complete collection of memory foam, orthopedic, and hybrid mattresses. Find your perfect fit based on size and firmness."
      />
      <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden bg-background">
        {/* Collapsible Local Header */}
        <div 
          className={`bg-white/95 backdrop-blur-md border-b border-primary/5 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden z-40 ${
            isScrolled ? "max-h-0 opacity-0 transform -translate-y-full" : "max-h-[300px] opacity-100 py-8"
          }`}
        >
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-black text-[#1E3A8A] mb-2 font-playfair tracking-tight">Mattresses</h1>
                <p className="text-muted-foreground text-sm font-medium">Explore our premium collection</p>
              </div>
              <div className="flex items-center gap-4">
                <select 
                  className="bg-secondary/20 border border-slate-200 dark:border-slate-700 text-foreground text-sm rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary/20"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort products"
                >
                  <option value="popular">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" role="tablist" aria-label="Filter by mattress type">
              {mattressTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setTypeFilter(type.id)}
                    role="tab"
                    aria-selected={typeFilter === type.id}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${typeFilter === type.id
                        ? "bg-[#1E3A8A] text-white shadow-lg"
                        : "bg-card border border-primary/20 text-foreground hover:border-primary hover:bg-primary/5"
                      }`}
                  >
                    <IconComponent className="w-4 h-4" /> {type.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Independent Scroll Panes */}
        <div className="flex flex-1 overflow-hidden container py-0 gap-0">
          {/* Left Sidebar (Filters) */}
          <div className="hidden lg:block w-72 h-full overflow-y-auto border-r border-primary/5 py-8 pr-8 scrollbar-hide">
            <div className="bg-card p-6 rounded-2xl border border-primary/10 shadow-sm">
              <h3 className="text-lg font-bold mb-6 text-[#1E3A8A] border-b border-primary/10 pb-4 font-playfair">Filters</h3>

              {/* Price Filter */}
              <div className="mb-8 font-montserrat">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400">Max Price</h4>
                  <span className="text-primary font-bold text-sm">₹{priceMax.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="5000" 
                  max="30000" 
                  step="1000"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-primary h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="border-t border-primary/10 my-6"></div>

              {/* Size Filter */}
              <div className="mb-6 font-montserrat">
                <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">Size</h4>
                <div className="space-y-3">
                  {sizes.map((s) => (
                    <label key={s} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={sizeFilter === s}
                        onChange={() => setSizeFilter(sizeFilter === s ? "All" : s)}
                        className="w-4 h-4 rounded border-primary/30 text-primary cursor-pointer"
                      />
                      <span className="ml-3 text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-primary/10 my-6"></div>

              {/* Firmness Filter */}
              <div className="mb-6 font-montserrat">
                <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">Firmness</h4>
                <div className="space-y-3">
                  {["all", "soft", "medium", "firm"].map((f) => (
                    <label key={f} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={firmnessFilter === f}
                        onChange={() => setFirmnessFilter(firmnessFilter === f ? "all" : f)}
                        className="w-4 h-4 rounded border-primary/30 text-primary cursor-pointer"
                      />
                      <span className="ml-3 text-sm font-bold text-slate-600 group-hover:text-primary transition-colors capitalize">
                        {f === "all" ? "All Firmness" : f}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {activeFilters.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="w-full text-primary hover:bg-primary/5 mt-4 font-bold text-xs uppercase tracking-widest"
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {/* Right Product Grid */}
          <div 
            ref={gridContainerRef}
            className="flex-1 h-full overflow-y-auto py-8 lg:pl-8 scroll-smooth"
          >
            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6 animate-fade-in">
                {(activeFilters as { type: string; value: string; label: string }[]).map((filter, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-primary/10 text-primary px-3 py-1 flex items-center gap-2"
                  >
                    {filter.label}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors"
                      onClick={() => removeFilter(filter)}
                    />
                  </Badge>
                ))}
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.length > 0
                ? filtered.map((p) => <ProductCard key={p.id} product={p} />)
                : (
                  <div className="col-span-full text-center py-20">
                    <p className="text-lg text-muted-foreground mb-4">No mattresses match your filters</p>
                    <Button onClick={clearAllFilters} className="bg-primary text-white">
                      Clear Filters
                    </Button>
                  </div>
                )
              }
            </div>

            {/* Results Count */}
            {filtered.length > 0 && (
              <div className="mt-12 mb-12 text-center text-xs font-bold uppercase tracking-widest text-[#1E3A8A]/40">
                End of Results • {filtered.length} Mattresses Found
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
