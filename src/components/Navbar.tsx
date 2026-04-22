import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Heart, Search, Menu, X, Sun, Moon } from "lucide-react";
import { useCartStore, useCartTotalItems } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { products, megaMenuCategories } from "@/data/products";

const bottomTabs = [
  { label: "Home", to: "/" },
  { label: "Mattresses", to: "/products", hasMegaMenu: true },
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
  const totalItems = useCartTotalItems();
  const { setIsCartOpen, wishlist } = useCartStore();
  const location = useLocation();

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

  const handleSearch = (query: string) => setSearchQuery(query);

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchOpen(false);
  };

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
      className={`sticky top-0 z-50 bg-[#3B1286] text-white transition-all duration-300 ${
        scrolled ? "shadow-lg" : "shadow-none"
      } relative`}
    >
      <div className="flex flex-col w-full z-[51] relative">
        {/* TOP ROW */}
        <div className="container flex items-center justify-between h-[64px] gap-4">
          
          {/* Hamburger + Logo */}
          <div className="flex items-center gap-3 lg:gap-4 shrink-0">
            <button className="text-white hover:bg-white/10 p-1.5 rounded-md" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link to="/" className="flex items-center group">
              <span className="text-2xl lg:text-3xl font-extrabold font-playfair tracking-tight text-white/90 group-hover:text-white transition-colors">Mustafa's</span>
            </Link>
          </div>

          {/* Large Center Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl relative" onMouseLeave={() => setSearchOpen(false)}>
            <div className="w-full relative flex items-center bg-white rounded-md overflow-hidden">
              <Search className="absolute left-4 text-gray-500 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setSearchOpen(true)}
                onChange={(e) => {
                  handleSearch(e.target.value);
                  setSearchOpen(true);
                }}
                placeholder="Search for Bed"
                className="w-full bg-transparent text-gray-900 placeholder:text-gray-500 px-12 py-3 text-[15px] outline-none font-montserrat"
              />
              {searchQuery && (
                <button onClick={clearSearch} className="absolute right-4 text-gray-400 hover:text-gray-600">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {searchOpen && searchResults.length > 0 && (
              <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white dark:bg-[#1E1E24] rounded-md shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden z-50">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    onClick={clearSearch}
                    className="flex items-center gap-3 p-3 hover:bg-purple-50 dark:hover:bg-white/5 transition-colors border-b border-gray-50 dark:border-white/10 last:border-b-0 group"
                  >
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[14px] text-gray-900 dark:text-gray-100 font-montserrat group-hover:text-[#3B1286] dark:group-hover:text-purple-300">{product.name}</h4>
                      <p className="text-[13px] font-bold text-[#3B1286] dark:text-purple-400">₹{product.price.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 lg:gap-4 shrink-0">
            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-white/10 rounded-full" onClick={() => setSearchOpen(!searchOpen)}>
                 <Search className="h-[22px] w-[22px]" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)} className="text-white hover:bg-white/10 rounded-full">
                {isDark ? <Sun className="h-[22px] w-[22px]" /> : <Moon className="h-[22px] w-[22px]" />}
              </Button>
              <Link to="/wishlist" className="hidden sm:block">
                <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10 rounded-full">
                  <Heart className="h-[22px] w-[22px]" />
                  {wishlist.length > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-pink-500 text-white text-[10px] flex items-center justify-center font-bold">
                      {wishlist.length}
                    </span>
                  )}
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="hidden sm:flex text-white hover:bg-white/10 rounded-full">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)} className="relative text-white hover:bg-white/10 rounded-full">
                <ShoppingCart className="h-[22px] w-[22px]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-[18px] w-[18px] rounded-full bg-pink-500 border-2 border-[#3B1286] text-white text-[10px] flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Search - Drops down directly beneath Top Row */}
        {searchOpen && (
          <div className="lg:hidden px-4 pb-3 animate-fade-in bg-[#3B1286]">
            <div className="w-full relative flex items-center bg-white rounded-md overflow-hidden shadow-inner">
              <Search className="absolute left-3 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setSearchOpen(true)}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for Bed"
                className="w-full bg-transparent text-gray-900 placeholder:text-gray-500 px-10 py-2.5 text-sm outline-none font-montserrat"
                autoFocus
              />
              {searchQuery && (
                <button onClick={clearSearch} className="absolute right-3 text-gray-400 hover:text-gray-600">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {searchResults.length > 0 && (
               <div className="mt-2 bg-white dark:bg-card rounded-md shadow-xl overflow-hidden max-h-[50vh] overflow-y-auto">
                 {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    onClick={clearSearch}
                    className="flex items-center gap-3 p-3 border-b border-gray-100 dark:border-white/10 last:border-b-0"
                  >
                    <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                    <div>
                      <h4 className="font-semibold text-[13px] text-gray-900 dark:text-gray-100 font-montserrat">{product.name}</h4>
                      <p className="text-[12px] font-bold text-[#3B1286] dark:text-purple-400">₹{product.price.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
               </div>
            )}
          </div>
        )}

        {/* BOTTOM ROW: CATEGORY TABS (Desktop Only) */}
        <div className="hidden lg:block border-t border-white/20 bg-[#3B1286] relative">
          <div className="container flex">
            {bottomTabs.map((tab) => {
              const isMega = tab.hasMegaMenu;
              return (
                <div key={tab.label} className="group/nav float-left">
                  <Link
                    to={tab.to}
                    className={`block px-6 py-2.5 text-[14px] font-bold font-montserrat transition-all tracking-wide ${
                      isMega 
                      ? "text-white group-hover/nav:bg-white group-hover/nav:text-[#3B1286] group-hover/nav:border-t-4 group-hover/nav:border-blue-400 border-t-4 border-transparent"
                      : "text-white hover:bg-white/10 border-t-4 border-transparent"
                    }`}
                  >
                    {tab.label}
                  </Link>

                  {/* MEGA MENU - Absolute to the containing relative block, but because tabs wrap, we position it fixed to viewport width */}
                  {isMega && (
                    <div className="absolute top-[100%] left-0 w-full opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-100 z-[60] bg-white text-gray-900 border-t border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)]">
                      <div className="container py-8">
                        {/* We use our existing multi-column map logic here */}
                        <div className="grid grid-cols-7 gap-x-4 gap-y-6">
                          {megaMenuCategories.map((column, idx) => (
                            <div key={idx} className="space-y-4">
                              <h4 className="font-bold text-[13px] text-[#3B1286] border-b-2 pb-1.5 border-gray-200/50 uppercase tracking-widest font-montserrat truncate">
                                {column.title}
                              </h4>
                              <ul className="space-y-2.5">
                                {column.links.map((sublink, lidx) => (
                                  <li key={lidx}>
                                    <Link 
                                      to={sublink.href} 
                                      className="text-[13.5px] font-medium text-gray-600 hover:text-[#3B1286] hover:translate-x-1 block transition-all font-montserrat"
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
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* MOBILE FULLSCREEN MENU */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-[calc(100%+1px)] left-0 w-full h-[calc(100vh-64px)] bg-[#3B1286] overflow-y-auto animate-fade-in z-40 border-t border-white/10">
          <nav className="flex flex-col">
            {bottomTabs.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="px-6 py-4 text-base font-semibold text-white border-b border-white/10 font-montserrat"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
