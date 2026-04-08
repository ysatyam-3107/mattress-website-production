import { useState, useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard, { ProductSkeleton } from "@/components/ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const types = ["all", "memory-foam", "orthopedic", "latex", "hybrid"] as const;
const sizes = ["All", "Single", "Double", "Queen", "King"];
const firmnesses = ["all", "soft", "medium", "firm"] as const;

const Products = () => {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sizeFilter, setSizeFilter] = useState("All");
  const [firmnessFilter, setFirmnessFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const filtered = useMemo(() => {
    setIsLoading(true);
    const result = products.filter((p) => {
      if (typeFilter !== "all" && p.type !== typeFilter) return false;
      if (sizeFilter !== "All" && !p.sizes.includes(sizeFilter)) return false;
      if (firmnessFilter !== "all" && p.firmness !== firmnessFilter) return false;
      return true;
    });
    setTimeout(() => setIsLoading(false), 300); // Simulate loading
    return result;
  }, [typeFilter, sizeFilter, firmnessFilter]);

  const activeFilters = [
    typeFilter !== "all" && { type: "type", value: typeFilter, label: typeFilter.replace("-", " ") },
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
  };

  return (
    <div className="min-h-screen">
      <div className="bg-card border-b border-border/50 py-10">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">Our Mattresses</h1>
          <p className="text-muted-foreground">Find the perfect mattress for your best night's sleep</p>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="gap-2 hover-scale">
            <SlidersHorizontal className="h-4 w-4" /> Filters
            {activeFilters.length > 0 && (
              <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {activeFilters.length}
              </span>
            )}
          </Button>
          {types.filter((t) => t !== "all").map((t) => (
            <Button
              key={t}
              variant={typeFilter === t ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter(typeFilter === t ? "all" : t)}
              className="capitalize hover-scale transition-all duration-300"
            >
              {t.replace("-", " ")}
            </Button>
          ))}
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 animate-fade-in">
            {activeFilters.map((filter: any, index) => (
              <Badge key={index} variant="secondary" className="bg-primary/10 text-primary px-3 py-1 flex items-center gap-2 animate-fade-in">
                {filter.label}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors"
                  onClick={() => removeFilter(filter)}
                />
              </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-muted-foreground hover:text-foreground">
              Clear all
            </Button>
          </div>
        )}

        {showFilters && (
          <div className="bg-card rounded-xl border border-border/50 p-6 mb-6 animate-fade-up shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Advanced Filters</h3>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Size</p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <Button
                      key={s}
                      variant={sizeFilter === s ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSizeFilter(s)}
                      className="hover-scale"
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Firmness</p>
                <div className="flex flex-wrap gap-2">
                  {firmnesses.map((f) => (
                    <Button
                      key={f}
                      variant={firmnessFilter === f ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFirmnessFilter(f)}
                      className="capitalize hover-scale"
                    >
                      {f}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-6">{filtered.length} products found</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
            : filtered.map((p) => <ProductCard key={p.id} product={p} />)
          }
        </div>
        {filtered.length === 0 && !isLoading && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg mb-2">No mattresses match your filters</p>
            <Button variant="link" onClick={clearAllFilters} className="hover-scale">Clear all filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
