import { useState, useMemo } from "react";
import { X, ChevronRight } from "lucide-react";
import ProductCard, { ProductSkeleton } from "@/components/ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mattressTypes = [
  { id: "all", label: "All Mattresses", icon: "🛏️" },
  { id: "memory-foam", label: "Memory Foam", icon: "☁️" },
  { id: "orthopedic", label: "Orthopedic", icon: "🏥" },
  { id: "latex", label: "Latex", icon: "🌿" },
  { id: "hybrid", label: "Hybrid", icon: "🔄" },
];

const sizes = ["All", "Single", "Double", "Queen", "King"];
const firmnesses = ["all", "soft", "medium", "firm"] as const;

const Products = () => {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sizeFilter, setSizeFilter] = useState("All");
  const [firmnessFilter, setFirmnessFilter] = useState<string>("all");
  const [priceMax, setPriceMax] = useState<number>(30000);
  const [sortBy, setSortBy] = useState<string>("popular");
  const [isLoading, setIsLoading] = useState(false);

  const filtered = useMemo(() => {
    setIsLoading(true);
    const result = products.filter((p) => {
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
    setTimeout(() => setIsLoading(false), 300);
    return result;
  }, [typeFilter, sizeFilter, firmnessFilter]);

  const activeFilters = [
    typeFilter !== "all" && { type: "type", value: typeFilter, label: mattressTypes.find(t => t.id === typeFilter)?.label || typeFilter },
    sizeFilter !== "All" && { type: "size", value: sizeFilter, label: sizeFilter },
    firmnessFilter !== "all" && { type: "firmness", value: firmnessFilter, label: firmnessFilter }
  ].filter(Boolean);

  const removeFilter = (filter: any) => {
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b border-primary/10 py-8 sticky top-20 z-40">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Mattresses</h1>
              <p className="text-muted-foreground">Explore our premium collection</p>
            </div>
            <div className="flex items-center gap-4">
              <select 
                className="bg-secondary/20 border border-slate-200 text-slate-800 text-sm rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary/20"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Horizontal Category Tabs */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {mattressTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setTypeFilter(type.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${typeFilter === type.id
                    ? "bg-primary text-white shadow-lg"
                    : "bg-card border border-primary/20 text-foreground hover:border-primary hover:bg-primary/5"
                  }`}
              >
                <span>{type.icon}</span> {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-lg border border-primary/10 sticky top-32">
              <h3 className="text-lg font-bold mb-6 text-slate-900 border-b border-primary/10 pb-4">Filters</h3>

              {/* Price Filter */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-sm text-slate-900">Max Price</h4>
                  <span className="text-primary font-bold text-sm">₹{priceMax.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="5000" 
                  max="30000" 
                  step="1000"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="border-t border-primary/10 my-4"></div>

              {/* Size Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-3 text-foreground">Size</h4>
                <div className="space-y-2">
                  {sizes.map((s) => (
                    <label key={s} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={sizeFilter === s}
                        onChange={() => setSizeFilter(sizeFilter === s ? "All" : s)}
                        className="w-4 h-4 rounded border-primary/30 text-primary cursor-pointer"
                      />
                      <span className="ml-3 text-sm text-foreground/70 group-hover:text-primary transition-colors">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-primary/10 my-4"></div>

              {/* Firmness Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-3 text-foreground">Firmness</h4>
                <div className="space-y-2">
                  {["all", "soft", "medium", "firm"].map((f) => (
                    <label key={f} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={firmnessFilter === f}
                        onChange={() => setFirmnessFilter(firmnessFilter === f ? "all" : f)}
                        className="w-4 h-4 rounded border-primary/30 text-primary cursor-pointer"
                      />
                      <span className="ml-3 text-sm text-foreground/70 group-hover:text-primary transition-colors capitalize">
                        {f === "all" ? "All Firmness" : f}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-primary/10 my-4"></div>

              {/* Clear Filters */}
              {activeFilters.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="w-full text-primary hover:bg-primary/5 mt-4"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3">
            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6 animate-fade-in">
                {activeFilters.map((filter: any, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-primary/10 text-primary px-3 py-1 flex items-center gap-2 animate-fade-in"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
                : filtered.length > 0
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
            {!isLoading && filtered.length > 0 && (
              <div className="mt-8 text-center text-sm text-muted-foreground">
                Showing {filtered.length} mattress{filtered.length !== 1 ? "es" : ""} • Sorted by popularity
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
