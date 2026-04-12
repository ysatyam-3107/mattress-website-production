import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Heart, Search, Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { products, megaMenuCategories } from "@/data/products";

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
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      const isDarkSet = document.documentElement.classList.contains('dark');
      if (!isDarkSet && localStorage.getItem('theme') !== 'light') {
        document.documentElement.classList.add('dark');
        return true;
      }
      return isDarkSet;
    }
    return true;
  });
  const { totalItems, setIsCartOpen, wishlist } = useCart();
  const location = useLocation();

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

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

  // Close mobile menu and search on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (searchOpen) setSearchOpen(false);
        if (mobileOpen) setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [searchOpen, mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 bg-[#1E3A8A] text-white transition-shadow duration-500 ${
        scrolled ? "shadow-[0_4px_30px_-5px_rgba(30,58,138,0.4)]" : "shadow-none"
      }`}
    >
      <div className="container flex items-stretch justify-between h-16 lg:h-[72px] gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <div className="flex items-center">
            <span className="text-xl lg:text-2xl font-bold text-white font-playfair tracking-wide group-hover:opacity-80 transition-opacity">Mustafa's</span>
            <span className="text-xl lg:text-2xl font-bold ml-1.5 text-blue-200 font-montserrat group-hover:opacity-80 transition-opacity">Mattress</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-stretch gap-0">
          {navLinks.map((link) => {
            if (link.label === "Mattresses") {
              return (
                <div key={link.to} className="relative group/nav flex items-stretch">
                  <Link
                    to={link.to}
                    className={`px-4 xl:px-5 flex items-center text-sm font-semibold tracking-wide transition-all duration-300 gap-1 font-montserrat ${
                      location.pathname.startsWith("/products")
                        ? "bg-white/15 text-white"
                        : "text-blue-100 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5 group-hover/nav:rotate-180 transition-transform duration-300" />
                  </Link>

                  {/* Full Width Mega Menu */}
                  <div className="fixed top-[64px] lg:top-[72px] left-0 w-full opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 z-50">
                    <div className="bg-white dark:bg-card w-full border-b border-border shadow-[0_20px_60px_-15px_rgba(30,58,138,0.12)]">
                      <div className="container py-8">
                        <div className="grid grid-cols-7 gap-6">
                          {megaMenuCategories.map((column, idx) => (
                            <div key={idx} className="space-y-3">
                              <h4 className="font-bold text-[12px] text-[#1E3A8A] dark:text-blue-400 uppercase tracking-wider border-b-2 border-[#3B82F6]/30 pb-2 font-montserrat">
                                {column.title}
                              </h4>
                              <ul className="space-y-2.5">
                                {column.links.map((sublink, lidx) => (
                                  <li key={lidx}>
                                    <Link 
                                      to={sublink.href} 
                                      className="text-[13px] font-medium text-gray-600 dark:text-gray-300 hover:text-[#3B82F6] transition-colors duration-200 block font-montserrat"
                                    >
                                      {sublink.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div key={link.to} className="flex items-stretch">
                <Link
                  to={link.to}
                  className={`px-4 lg:px-5 flex items-center text-sm font-medium tracking-wide transition-all duration-300 font-montserrat ${location.pathname === link.to
                      ? "text-white bg-white/15"
                      : "text-blue-100 hover:text-white hover:bg-white/10"
                    }`}
                >
                  {link.label}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm relative group/search self-center" onMouseLeave={() => setSearchOpen(false)}>
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                handleSearch(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search mattresses..."
              className="w-full bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-gray-900 placeholder:text-blue-200/60 focus:placeholder:text-gray-400 rounded-lg px-4 py-2 pl-10 text-sm outline-none transition-all duration-300 font-montserrat focus:shadow-lg"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200/60 group-focus-within/search:text-gray-400 transition-colors" />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200/60 hover:text-white group-focus-within/search:text-gray-500 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {searchOpen && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-card rounded-xl border border-border shadow-2xl overflow-hidden z-50 animate-fade-in">
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={clearSearch}
                  className="flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors border-b border-border/30 last:border-b-0"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-11 h-11 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate text-gray-900 dark:text-gray-100 font-montserrat">{product.name}</h4>
                    <p className="text-xs font-bold text-[#3B82F6]">₹{product.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1 shrink-0">
          <Button variant="ghost" size="icon" className="md:hidden text-blue-100 hover:text-white hover:bg-white/10" onClick={() => setSearchOpen(!searchOpen)}>
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            className="text-blue-100 hover:text-white hover:bg-white/10"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Link to="/products" className="flex items-center">
            <Button variant="ghost" size="icon" className="relative text-blue-100 hover:text-white hover:bg-white/10" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-[#3B82F6] text-white text-[10px] flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Button>
          </Link>

          <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)} className="relative text-blue-100 hover:text-white hover:bg-white/10" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-[#3B82F6] text-white text-[10px] flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden text-blue-100 hover:text-white hover:bg-white/10" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      {searchOpen && (
        <div className="md:hidden border-t border-white/10 p-4 animate-fade-in bg-[#1E3A8A]">
          <div className="container relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search mattresses..."
              className="w-full bg-white/10 rounded-lg px-4 py-3 pr-10 text-sm text-white placeholder:text-blue-200/60 outline-none focus:bg-white/15 font-montserrat"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-7 top-1/2 -translate-y-1/2 text-blue-200/60"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {searchResults.length > 0 && (
            <div className="mt-2 container max-h-[50vh] overflow-y-auto">
               <div className="bg-white dark:bg-card rounded-lg border border-border shadow-lg overflow-hidden">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={clearSearch}
                    className="flex items-center gap-3 p-3 border-b border-border/30 last:border-b-0"
                  >
                    <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 font-montserrat">{product.name}</h4>
                      <p className="text-xs text-[#3B82F6] font-bold">₹{product.price.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-white/10 bg-[#1E3A8A] animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-6 py-3.5 text-sm font-medium border-b border-white/5 transition-colors font-montserrat ${location.pathname === link.to ? "text-white bg-white/10" : "text-blue-100 hover:text-white hover:bg-white/5"
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
