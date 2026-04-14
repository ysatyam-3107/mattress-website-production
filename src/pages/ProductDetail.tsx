import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, Shield, Truck, RotateCcw, Check, Award, ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { SEO } from "@/components/SEO";
import { SizeGuideModal } from "@/components/SizeGuideModal";
import { TrustBadges } from "@/components/TrustBadges";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [isStickyCTAVisible, setIsStickyCTAVisible] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStickyCTAVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4 font-playfair text-[#1E3A8A]">Product not found</h1>
        <Link to="/products"><Button className="bg-[#3B82F6] hover:bg-blue-600 font-montserrat">Browse Mattresses</Button></Link>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const related = products.filter((p) => p.id !== product.id && p.type === product.type).slice(0, 3);
  const size = selectedSize || product.sizes[0];

  // Mock product gallery images
  const gallery = [product.image, product.image, product.image];

  return (
    <>
      <SEO 
        title={product.name}
        description={product.description}
        image={product.image}
        type="product"
      />
      
      {/* Sticky Mobile Add to Cart */}
      <div className={`fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 lg:hidden transform transition-transform duration-300 ${isStickyCTAVisible ? 'translate-y-0' : 'translate-y-full'}`}>
         <div className="flex items-center justify-between max-w-md mx-auto gap-4">
            <div>
               <p className="font-bold text-[#1E3A8A] text-sm leading-none m-0">{product.name}</p>
               <p className="font-bold text-[#3B82F6] text-lg leading-none m-0 pt-1">₹{product.price.toLocaleString()}</p>
            </div>
            <Button className="bg-[#3B82F6] hover:bg-blue-600 text-white font-montserrat shadow-lg px-8 rounded-full h-12 flex-1 max-w-[160px]" onClick={() => addToCart(product, size)}>
              <ShoppingCart className="w-4 h-4 mr-2" /> Add
            </Button>
         </div>
      </div>

      <div className="min-h-screen bg-slate-50 pb-20">
        <div className="container py-6">
          <p className="text-sm text-gray-500 font-montserrat flex items-center gap-2">
            <Link to="/" className="hover:text-[#3B82F6] transition-colors">Home</Link> <ChevronRight className="w-3 h-3" />
            <Link to="/products" className="hover:text-[#3B82F6] transition-colors">Mattresses</Link> <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </p>
        </div>

        <div className="container mb-20">
          <div className="bg-white rounded-3xl p-6 lg:p-12 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Image Gallery */}
            <div className="lg:w-1/2 select-none">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-4 relative group">
                <img 
                  src={gallery[activeImage]} 
                  alt={product.name} 
                  className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105" 
                />
                
                {product.bestseller && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5 font-montserrat">
                    <Award className="w-4 h-4" /> Bestseller
                  </div>
                )}
                
                {/* Arrow Nav */}
                {gallery.length > 1 && (
                   <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                     <button onClick={() => setActiveImage(prev => prev === 0 ? gallery.length - 1 : prev - 1)} className="w-10 h-10 rounded-full bg-white/90 shadow text-gray-800 flex items-center justify-center hover:bg-white hover:text-[#3B82F6] transition-colors backdrop-blur">
                        <ChevronLeft className="w-5 h-5" />
                     </button>
                     <button onClick={() => setActiveImage(prev => prev === gallery.length - 1 ? 0 : prev + 1)} className="w-10 h-10 rounded-full bg-white/90 shadow text-gray-800 flex items-center justify-center hover:bg-white hover:text-[#3B82F6] transition-colors backdrop-blur">
                        <ChevronRight className="w-5 h-5" />
                     </button>
                   </div>
                )}
              </div>
              
              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {gallery.map((img, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setActiveImage(idx)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${activeImage === idx ? 'border-[#3B82F6] opacity-100 shadow-md ring-2 ring-[#3B82F6]/20' : 'border-transparent opacity-60 hover:opacity-100 bg-gray-100'}`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover mix-blend-multiply" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              <div className="mb-8">
                <h1 className="text-4xl lg:text-5xl font-black text-[#111827] mb-4 font-playfair tracking-tight">{product.name}</h1>
                <div className="flex flex-wrap items-center gap-3 font-montserrat">
                  <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1.5" />
                    <span className="font-bold text-gray-800 text-sm">{product.rating}</span>
                    <span className="text-gray-400 text-sm ml-1.5">• {product.reviews.toLocaleString()} Reviews</span>
                  </div>
                  <span className="text-[#3B82F6] text-sm font-semibold flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors">
                    Read Reviews <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-8 font-montserrat font-medium">
                 {product.description}
              </p>

              {/* Price Block */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8">
                <div className="flex items-end gap-4 mb-2 flex-wrap">
                  <span className="text-4xl font-black text-[#1E3A8A] font-montserrat">₹{product.price.toLocaleString()}</span>
                  <span className="text-xl text-gray-400 line-through font-montserrat font-medium mb-1">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full mb-1 border border-green-200">
                    Save {discount}%
                  </span>
                </div>
                <div className="text-sm font-montserrat text-gray-500 font-medium flex items-center gap-2">
                   EMI starts at <span className="font-bold text-gray-800">₹{Math.round(product.price / 12).toLocaleString()}/mo</span>
                   <span className="w-1 h-1 rounded-full bg-gray-300" /> No cost EMI available
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-10 relative z-20">
                <div className="flex items-center justify-between mb-4">
                   <p className="font-bold text-gray-900 font-montserrat">Select Size</p>
                   {/* SIZE GUIDE MODAL */}
                   <SizeGuideModal />
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-montserrat">
                  {product.sizes.map((s) => (
                    <button 
                      key={s} 
                      onClick={() => setSelectedSize(s)}
                      className={`py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all ${
                         size === s 
                         ? "border-[#3B82F6] bg-blue-50 text-[#1E3A8A] shadow-sm" 
                         : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div ref={ctaRef} className="flex gap-4">
                <Button 
                   size="lg" 
                   className="flex-1 bg-[#1E3A8A] hover:bg-blue-900 text-white h-14 rounded-2xl text-lg shadow-xl shadow-blue-900/20 hover:shadow-blue-900/40 transition-all hover:-translate-y-0.5 font-bold font-montserrat btn-press flex items-center justify-center gap-2" 
                   onClick={() => addToCart(product, size)}
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </Button>
              </div>

              {/* Enhanced Trust Badges Grid */}
              <TrustBadges variant="grid" />
            </div>
          </div>
        </div>

        {/* Info Grid Section */}
        <div className="container max-w-6xl mx-auto mb-24">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Features List */}
              <div className="bg-white p-8 lg:p-12 rounded-3xl border border-gray-100 shadow-sm h-full flex flex-col justify-center">
                 <h2 className="text-3xl font-black text-slate-900 mb-8 font-playfair">Why this mattress?</h2>
                 <div className="space-y-6">
                 {product.features.map((f, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0 border border-green-100 group-hover:bg-green-500 group-hover:text-white transition-colors">
                         <Check className="w-4 h-4" />
                      </div>
                      <p className="text-lg text-slate-700 font-medium pt-1 shrink font-montserrat leading-snug">{f}</p>
                    </div>
                 ))}
                 </div>
              </div>

              {/* Anatomy Box */}
              <div className="bg-slate-900 p-8 lg:p-12 rounded-3xl shadow-2xl h-full flex flex-col items-center justify-center text-center relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-transparent opacity-50 block" />
                 
                 <div className="relative z-10">
                    <h3 className="text-3xl font-black text-white mb-6 font-playfair">Engineered for Comfort</h3>
                    <div className="space-y-4 max-w-sm mx-auto mb-8">
                       <div className="bg-white/10 backdrop-blur border border-white/20 p-4 rounded-xl text-white font-montserrat font-semibold hover:bg-white/20 transition-colors">1. Premium Fabric Cover</div>
                       <div className="bg-[#3B82F6] border border-blue-400 p-4 rounded-xl text-white font-montserrat font-bold shadow-lg hover:bg-blue-400 transition-colors">2. Adaptive Pressure Core</div>
                       <div className="bg-white/5 border border-white/10 p-5 rounded-xl text-slate-300 font-montserrat font-semibold hover:bg-white/10 transition-colors">3. High-Density Support Base</div>
                    </div>
                    <p className="text-blue-200">Discover the multilayered support system <br/>designed for ultimate rest.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="container">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-3xl font-bold font-playfair text-slate-900">You May Also Like</h2>
               <Link to="/products" className="text-[#3B82F6] font-bold hover:underline hidden sm:block">View All</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
