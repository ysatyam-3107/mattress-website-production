import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { X, ChevronRight, Bed, Cloud, Stethoscope, Leaf, RefreshCw, SlidersHorizontal, Check, ChevronDown, Search } from "lucide-react";
import ProductCard, { ProductSkeleton } from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { fetchShopifyProducts } from "@/api/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";

const collections = [
  { id: "all", label: "All Collections", icon: Bed },
  { id: "ortho-memory-foam", label: "Ortho Memory Foam", icon: Cloud },
  { id: "dual-comfort", label: "Dual Comfort", icon: RefreshCw },
  { id: "ecolatex", label: "EcoLatex", icon: Leaf },
  { id: "xpertgrid", label: "XpertGrid", icon: Stethoscope },
  { id: "utility", label: "Utility Mattresses", icon: Bed },
  { id: "puresleep", label: "PureSleep Series", icon: Cloud },
];

const materials = [
  { id: "memory-foam", label: "Memory Foam" },
  { id: "orthopedic", label: "Orthopedic" },
  { id: "latex", label: "Latex" },
  { id: "hybrid", label: "Hybrid" },
];

const sizes = ["All", "Single", "Double", "Queen", "King"];
const firmnesses = ["all", "soft", "medium", "firm"] as const;

// Premium Accordion for Sidebar
const FilterAccordion = ({ title, children, defaultOpen = true }: any) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-6 font-montserrat border-b border-primary/10 pb-6 last:border-0 last:pb-0">
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left group"
      >
        <h4 className="font-bold text-[11px] uppercase tracking-widest text-slate-500 group-hover:text-[#001166] transition-colors">{title}</h4>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
};

// Premium Checkbox Component
const CustomRadio = ({ checked, label, onChange }: any) => (
  <label className="flex items-center cursor-pointer group">
    <input 
      type="checkbox" 
      className="hidden" 
      checked={checked} 
      onChange={onChange} 
    />
    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 mr-3 shadow-sm ${checked ? 'bg-[#001166] border-[#001166] scale-105' : 'bg-white border-gray-300 group-hover:border-[#001166]'}`}>
      {checked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
    </div>
    <span className={`text-sm font-bold transition-colors ${checked ? 'text-[#001166]' : 'text-slate-600 group-hover:text-slate-900 capitalize'}`}>
      {label}
    </span>
  </label>
);

const Products = () => {
  const [searchParams] = useSearchParams();
  const [typeFilter, setTypeFilter] = useState<string>(searchParams.get("type") || "all");
  const [sizeFilter, setSizeFilter] = useState(searchParams.get("size") || "All");
  const [firmnessFilter, setFirmnessFilter] = useState<string>(searchParams.get("firmness") || "all");
  const [priceMax, setPriceMax] = useState<number>(30000);
  const [sortBy, setSortBy] = useState<string>("popular");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const { data: storeProducts = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchShopifyProducts,
  });

  const filtered = useMemo(() => {
    return storeProducts.filter((p) => {
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
  }, [storeProducts, typeFilter, sizeFilter, firmnessFilter, priceMax, sortBy]);

  const activeFilters = [
    typeFilter !== "all" && { type: "type", value: typeFilter, label: [...collections, ...materials].find(t => t.id === typeFilter)?.label || typeFilter },
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

  const FilterContent = () => (
    <>
      <FilterAccordion title="Collections" defaultOpen={true}>
        {collections.filter(c => c.id !== "all").map((c) => (
          <CustomRadio key={c.id} checked={typeFilter === c.id} label={c.label} onChange={() => setTypeFilter(typeFilter === c.id ? "all" : c.id)} />
        ))}
      </FilterAccordion>

      <FilterAccordion title="Material Types" defaultOpen={true}>
        {materials.map((m) => (
          <CustomRadio key={m.id} checked={typeFilter === m.id} label={m.label} onChange={() => setTypeFilter(typeFilter === m.id ? "all" : m.id)} />
        ))}
      </FilterAccordion>

      <FilterAccordion title="Size" defaultOpen={true}>
        {sizes.map((s) => (
          <CustomRadio key={s} checked={sizeFilter === s} label={s} onChange={() => setSizeFilter(sizeFilter === s ? "All" : s)} />
        ))}
      </FilterAccordion>

      <FilterAccordion title="Firmness" defaultOpen={true}>
        {firmnesses.map((f) => (
          <CustomRadio key={f} checked={firmnessFilter === f} label={f === "all" ? "All Firmness" : f} onChange={() => setFirmnessFilter(firmnessFilter === f ? "all" : f)} />
        ))}
      </FilterAccordion>

      <FilterAccordion title="Max Price" defaultOpen={true}>
        <div className="pt-2 pb-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-primary font-bold text-sm bg-blue-50 px-3 py-1 rounded-md">₹{priceMax.toLocaleString()}</span>
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
      </FilterAccordion>
    </>
  );

  return (
    <>
      <SEO 
        title="Shop All Mattresses" 
        description="Explore our complete collection of memory foam, orthopedic, and hybrid mattresses. Find your perfect fit based on size and firmness."
      />
      <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden bg-background">
        {/* Local Header */}
        <div className="bg-white/95 backdrop-blur-md border-b border-primary/5 py-6 sm:py-8 z-40 shrink-0">
          <div className="container">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-4xl font-black text-[#001166] mb-1 sm:mb-2 font-playfair tracking-tight">Mattresses</h1>
                <p className="text-muted-foreground text-xs sm:text-sm font-medium">Explore our premium collection</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 shrink-0 self-start sm:self-auto w-full sm:w-auto">
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#001166] text-white px-4 py-2.5 rounded-xl text-sm font-bold font-montserrat shadow-sm"
                >
                  <SlidersHorizontal className="w-4 h-4" /> Filter
                </button>
                <select 
                  className="bg-white border-2 border-slate-100 text-slate-800 font-bold font-montserrat text-xs sm:text-sm rounded-xl px-3 sm:px-4 py-2.5 outline-none focus:border-[#001166] transition-colors flex-1 sm:flex-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort products"
                >
                  <option value="popular">Popularity</option>
                  <option value="price-low">Price: Low → High</option>
                  <option value="price-high">Price: High → Low</option>
                </select>
              </div>
            </div>

            {/* Mobile Top Bar Collections Scroll */}
            <div className="lg:hidden flex gap-3 overflow-x-auto pb-2 scrollbar-hide" role="tablist" aria-label="Filter by collection">
              {collections.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setTypeFilter(type.id)}
                    role="tab"
                    aria-selected={typeFilter === type.id}
                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap flex items-center gap-2 border-2 ${typeFilter === type.id
                        ? "bg-[#001166] text-white border-[#001166] shadow-md"
                        : "bg-white border-slate-100 text-slate-600 hover:border-slate-300"
                      }`}
                  >
                    <IconComponent className="w-4 h-4" /> {type.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Filter Bottom Sheet */}
        {mobileFilterOpen && (
          <>
            <div className="fixed inset-0 bg-[#001166]/20 backdrop-blur-sm z-50 lg:hidden" onClick={() => setMobileFilterOpen(false)} />
            <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white dark:bg-card rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] h-[85vh] flex flex-col animate-fade-up">
              <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
                <h3 className="text-xl font-black text-[#001166] font-playfair">Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                <FilterContent />
              </div>
              <div className="p-5 border-t border-gray-100 flex gap-3 shrink-0 bg-white">
                <Button variant="outline" onClick={clearAllFilters} className="flex-1 font-bold text-sm h-12 rounded-xl border-slate-200 text-slate-600 font-montserrat">Clear All</Button>
                <Button onClick={() => setMobileFilterOpen(false)} className="flex-[2] bg-[#001166] hover:bg-blue-900 font-bold text-sm h-12 rounded-xl shadow-md font-montserrat">Show {filtered.length} Results</Button>
              </div>
            </div>
          </>
        )}

        {/* Independent Scroll Panes */}
        <div className="flex flex-1 overflow-hidden container py-0 gap-0">
          {/* Left Sidebar (Filters) — Desktop Only */}
          <div className="hidden lg:flex w-[280px] h-full flex-col border-r border-slate-100 py-8 pr-8 bg-transparent">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-[#001166] font-playfair flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#2563EB]" /> Filters
              </h3>
              {activeFilters.length > 0 && (
                <button onClick={clearAllFilters} className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors">
                  Clear All
                </button>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto scrollbar-hide pr-2">
              <FilterContent />
            </div>
          </div>

          {/* Right Product Grid */}
          <div 
            ref={gridContainerRef}
            className="flex-1 h-full overflow-y-auto py-8 lg:pl-8 scroll-smooth"
          >
            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8 animate-fade-in">
                {(activeFilters as { type: string; value: string; label: string }[]).map((filter, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-[#001166]/5 text-[#001166] border border-[#001166]/10 px-3 py-1.5 flex items-center gap-2 text-xs font-bold rounded-lg shadow-sm font-montserrat"
                  >
                    {filter.label}
                    <div 
                      className="bg-white rounded-full p-0.5 cursor-pointer hover:bg-red-50 hover:text-red-500 transition-colors shadow-sm border border-slate-100"
                      onClick={() => removeFilter(filter)}
                    >
                      <X className="h-3 w-3" />
                    </div>
                  </Badge>
                ))}
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
              ) : filtered.length > 0
                ? filtered.map((p) => <ProductCard key={p.id} product={p} />)
                : (
                  <div className="col-span-full flex flex-col items-center justify-center text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                      <Search className="w-8 h-8 text-[#2563EB]" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2 font-playfair">No mattresses found</h3>
                    <p className="text-sm text-slate-500 mb-6 font-montserrat max-w-sm">Try adjusting your filters or clearing them to see more results.</p>
                    <Button onClick={clearAllFilters} className="bg-[#001166] text-white rounded-xl h-12 px-8 font-bold font-montserrat shadow-md">
                      Clear All Filters
                    </Button>
                  </div>
                )
              }
            </div>

            {/* Results Count */}
            {filtered.length > 0 && (
              <div className="mt-16 mb-12 text-center text-xs font-black uppercase tracking-widest text-slate-300 font-montserrat flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-slate-200" />
                {filtered.length} Mattresses Found
                <div className="h-px w-12 bg-slate-200" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
