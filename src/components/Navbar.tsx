import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Heart, Search, Menu, X, Sun, Moon } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Mattresses", to: "/products" },
  { label: "About", to: "/about" },
  { label: "Sleep Guide", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const [isDark, setIsDark] = useState(false);
  const { totalItems, setIsCartOpen, wishlist } = useCart();
  const location = useLocation();

  // Enhanced search with autocomplete
  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.type.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-primary/10 shadow-md">
      <div className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="flex items-center">
            <span className="text-3xl font-bold text-primary">Sleep</span>
            <span className="text-3xl font-bold text-foreground">Company</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${location.pathname === link.to
                  ? "text-primary bg-primary/10"
                  : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setSearchOpen(!searchOpen)} className="text-muted-foreground hover:text-foreground">
            <Search className="h-5 w-5" />
          </Button>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            className="text-muted-foreground hover:text-foreground"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Link to="/products">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-medium">
                  {wishlist.length}
                </span>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)} className="relative text-muted-foreground hover:text-foreground">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-medium">
                {totalItems}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border/50 p-4 animate-fade-up bg-surface/95 backdrop-blur-sm">
          <div className="container max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search mattresses, guides..."
                className="w-full bg-muted rounded-lg px-4 py-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-4 bg-card rounded-lg border border-border/50 shadow-lg max-h-96 overflow-y-auto">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={clearSearch}
                    className="flex items-center gap-3 p-3 hover:bg-accent transition-colors border-b border-border/30 last:border-b-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{product.name}</h4>
                      <p className="text-xs text-muted-foreground">₹{product.price.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {searchQuery && searchResults.length === 0 && (
              <div className="mt-4 text-center text-muted-foreground text-sm">
                No products found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      )}

      {mobileOpen && (
        <nav className="md:hidden border-t border-border/50 bg-surface animate-fade-up">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-6 py-3 text-sm font-medium border-b border-border/30 transition-colors ${location.pathname === link.to ? "text-primary bg-accent" : "text-foreground"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
