import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, Shield, Truck, RotateCcw, Check, Award, ChevronRight, ChevronLeft, MapPin, Tag, CreditCard } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchShopifyProducts } from "@/api/products";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { SEO } from "@/components/SEO";
import { SizeGuideModal } from "@/components/SizeGuideModal";
import { TrustBadges } from "@/components/TrustBadges";

const ProductDetail = () => {
  const { slug } = useParams();
  const { data: storeProducts = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchShopifyProducts,
  });
  const product = storeProducts.find((p) => p.slug === slug);
  const { addToCart } = useCartStore();
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [isStickyCTAVisible, setIsStickyCTAVisible] = useState(false);
  const [pincode, setPincode] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState<"idle" | "checking" | "success" | "error">("idle");
  const ctaRef = useRef<HTMLDivElement>(null);

  const checkDelivery = () => {
    if (pincode.length !== 6) {
      setDeliveryStatus("error");
      return;
    }
    setDeliveryStatus("checking");
    setTimeout(() => {
      setDeliveryStatus("success");
    }, 800);
  };

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

  if (isLoading) {
    return (
      <div className="container py-20 text-center animate-pulse">
        <div className="w-64 h-8 bg-gray-200 rounded mx-auto mb-8"></div>
        <div className="w-1/2 aspect-video bg-gray-200 mx-auto rounded-3xl"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4 font-playfair text-[#1E3A8A]">Product not found</h1>
        <Link to="/products"><Button className="bg-[#3B82F6] hover:bg-blue-600 font-montserrat">Browse Mattresses</Button></Link>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const related = storeProducts.filter((p) => p.id !== product.id && p.type === product.type).slice(0, 3);
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
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": product.name,
          "image": [product.image],
          "description": product.description,
          "sku": product.id,
          "brand": {
            "@type": "Brand",
            "name": "Mustafa's Mattress"
          },
          "offers": {
            "@type": "Offer",
            "url": `https://mustafasmattress.in/product/${product.slug}`,
            "priceCurrency": "INR",
            "price": product.price,
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating,
            "reviewCount": product.reviews
          }
        })}
      </script>
      
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

        <div className="container mb-12">
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-10">
            {/* Image Gallery (Wakefit Style: Vertical Thumbs Left, Main Image Right) */}
            <div className="lg:w-[55%] flex flex-col md:flex-row gap-4 select-none">
              {/* Vertical Thumbnails */}
              {gallery.length > 1 && (
                <div className="hidden md:flex flex-col gap-3 w-24 shrink-0 overflow-y-auto max-h-[600px] scrollbar-hide pr-1">
                  {gallery.map((img, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setActiveImage(idx)}
                      className={`w-full aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-[#1E3A8A] opacity-100' : 'border-transparent opacity-60 hover:opacity-100 bg-gray-50'}`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover mix-blend-multiply" />
                    </button>
                  ))}
                </div>
              )}
              
              {/* Main Image */}
              <div className="flex-1 aspect-[4/3] md:aspect-auto md:h-[600px] rounded-2xl overflow-hidden bg-[#F8F9FA] relative group">
                <img 
                  src={gallery[activeImage]} 
                  alt={product.name} 
                  className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105" 
                />
                
                {product.bestseller && (
                  <div className="absolute top-4 left-4 bg-[#1E3A8A] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm font-montserrat">
                    Bestseller
                  </div>
                )}
                
                {/* Arrow Nav (Mobile) */}
                {gallery.length > 1 && (
                   <div className="md:hidden absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                     <button onClick={() => setActiveImage(prev => prev === 0 ? gallery.length - 1 : prev - 1)} className="w-10 h-10 rounded-full bg-white/90 shadow text-gray-800 flex items-center justify-center">
                        <ChevronLeft className="w-5 h-5" />
                     </button>
                     <button onClick={() => setActiveImage(prev => prev === gallery.length - 1 ? 0 : prev + 1)} className="w-10 h-10 rounded-full bg-white/90 shadow text-gray-800 flex items-center justify-center">
                        <ChevronRight className="w-5 h-5" />
                     </button>
                   </div>
                )}
              </div>
              
              {/* Mobile Thumbnails */}
              {gallery.length > 1 && (
                <div className="md:hidden flex gap-4 overflow-x-auto pb-2 w-full mt-4 scrollbar-hide">
                  {gallery.map((img, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setActiveImage(idx)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${activeImage === idx ? 'border-[#1E3A8A]' : 'border-transparent bg-gray-50'}`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover mix-blend-multiply" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Right Side */}
            <div className="lg:w-[45%] flex flex-col">
              <div className="mb-6">
                <h1 className="text-3xl font-black text-[#111827] mb-2 font-montserrat tracking-tight">{product.name}</h1>
                <p className="text-sm text-gray-500 font-montserrat mb-4">Single | 72" x 36" x 6" | 1.83m x 91.4cm x 15.2cm</p>
                
                <div className="flex flex-wrap items-center gap-4 font-montserrat">
                  <div className="flex items-center border border-gray-200 px-3 py-1.5 rounded-md">
                    <span className="font-bold text-gray-800 text-sm mr-1">{product.rating}</span>
                    <Star className="w-3.5 h-3.5 fill-[#059669] text-[#059669] mr-2" />
                    <span className="text-gray-400 text-sm border-l border-gray-200 pl-2">{product.reviews.toLocaleString()}L</span>
                  </div>
                  <span className="text-sm font-medium flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200">
                    <ShoppingCart className="w-3.5 h-3.5 text-gray-400" /> 3,100+ added to the cart past week
                  </span>
                </div>
              </div>

              {/* Promo Banner Mock */}
              <div className="bg-[#E0E7FF] text-[#3730A3] text-xs font-bold px-4 py-2 rounded-md mb-6 inline-flex items-center gap-2 self-start uppercase tracking-wider font-montserrat">
                <Tag className="w-4 h-4" /> Living Sale Ends On 28th Apr
              </div>

              {/* Price Block */}
              <div className="mb-6 flex items-end gap-3 flex-wrap">
                <span className="text-4xl font-black text-[#111827] font-montserrat tracking-tight">₹{product.price.toLocaleString()}</span>
                <span className="text-base text-gray-400 line-through font-montserrat font-medium mb-1">MRP ₹{product.originalPrice.toLocaleString()}</span>
                <span className="text-[#059669] text-sm font-bold mb-1 font-montserrat">
                  {discount}% off <span className="text-gray-400 font-normal ml-1">(Incl of all Taxes)</span>
                </span>
              </div>

              {/* Action Blocks: Pincode & Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {/* Pincode Check */}
                <div>
                  <p className="text-sm font-bold text-gray-900 font-montserrat mb-2">Check Delivery Date</p>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Enter Pincode" 
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="w-full border-2 border-gray-200 rounded-lg h-12 pl-4 pr-16 text-sm font-montserrat focus:outline-none focus:border-[#1E3A8A] transition-colors"
                    />
                    <button 
                      onClick={checkDelivery}
                      className="absolute right-2 top-2 bottom-2 px-3 text-[#1E3A8A] font-bold text-sm font-montserrat hover:bg-blue-50 rounded-md transition-colors"
                    >
                      {deliveryStatus === "checking" ? "..." : "CHECK"}
                    </button>
                  </div>
                  {deliveryStatus === "success" && <p className="text-xs text-green-600 mt-1.5 font-montserrat font-medium flex items-center gap-1"><Check className="w-3 h-3"/> Delivery by {new Date(Date.now() + 86400000 * 3).toLocaleDateString('en-IN', {day: 'numeric', month: 'short'})}</p>}
                  {deliveryStatus === "error" && <p className="text-xs text-red-500 mt-1.5 font-montserrat">Enter a valid 6-digit pincode</p>}
                </div>

                {/* Size Selector */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                     <p className="text-sm font-bold text-gray-900 font-montserrat">Choose Size</p>
                     <SizeGuideModal />
                  </div>
                  <div className="relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1E3A8A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap z-10 shadow-sm font-montserrat">
                      116 Standard & Custom options
                    </div>
                    <select 
                      value={selectedSize || product.sizes[0]}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full border-2 border-[#1E3A8A] rounded-lg h-12 px-4 text-sm font-montserrat font-semibold text-[#1E3A8A] appearance-none bg-blue-50 focus:outline-none cursor-pointer relative"
                    >
                      {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <div className="absolute top-0 right-4 h-full flex items-center pointer-events-none">
                       <div className="w-5 h-5 bg-[#1E3A8A] rounded-full flex items-center justify-center">
                          <ChevronRight className="w-3 h-3 text-white rotate-90" />
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <div ref={ctaRef} className="mb-8">
                <Button 
                   size="lg" 
                   className="w-full bg-[#1E3A8A] hover:bg-blue-900 text-white h-14 rounded-xl text-lg transition-all font-bold font-montserrat flex items-center justify-center gap-2" 
                   onClick={() => addToCart(product, size)}
                >
                  <ShoppingCart className="w-5 h-5" /> Go To Cart
                </Button>
              </div>

              {/* Offers Mock */}
              <div className="mb-6">
                 <p className="text-sm font-bold text-gray-900 font-montserrat mb-4">Save Extra with Below Offers</p>
                 <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {/* Lowest Price Offer */}
                    <div className="border border-pink-200 bg-pink-50/30 rounded-xl p-4 min-w-[180px] shrink-0 relative overflow-hidden">
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-pink-100 text-pink-700 text-[10px] font-bold px-2 py-0.5 rounded-b-md uppercase font-montserrat whitespace-nowrap">Lowest Price</div>
                       <p className="text-sm text-gray-800 font-montserrat mt-2 font-bold">₹{Math.round(product.price / 3).toLocaleString()}/months(3)</p>
                       <p className="text-xs text-gray-500 mt-1 flex items-center gap-1 font-montserrat"><CreditCard className="w-3 h-3"/> EMI</p>
                    </div>
                    {/* Card Offer Placeholder */}
                    <div className="border border-gray-200 rounded-xl p-4 min-w-[180px] shrink-0 relative">
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-b-md uppercase font-montserrat whitespace-nowrap">Card Offer</div>
                       <p className="text-sm text-gray-600 font-montserrat mt-2">Get it for <span className="font-bold text-gray-900">₹{(product.price - 500).toLocaleString()}</span></p>
                       <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 font-montserrat"><Award className="w-3 h-3"/> Bank Discounts</div>
                    </div>
                 </div>
              </div>
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

        {/* Reviews Section (Wakefit Style) */}
        <div className="container max-w-6xl mx-auto mb-20 bg-white p-8 lg:p-12 rounded-3xl border border-gray-100 shadow-sm">
           <div className="mb-8 border-b-4 border-[#1E3A8A] w-max pb-1">
              <h2 className="text-2xl font-black text-slate-900 font-montserrat">Reviews</h2>
           </div>
           
           <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#059669] text-white font-bold text-xl px-3 py-1.5 rounded-md flex items-center gap-1 font-montserrat">
                 {product.rating} <Star className="w-5 h-5 fill-white text-white" />
              </div>
              <div>
                 <p className="text-gray-900 font-medium font-montserrat text-lg">{product.reviews.toLocaleString()} Ratings</p>
                 <p className="text-sm text-gray-500 font-montserrat">Overall customer rating across all platforms.</p>
              </div>
           </div>

           <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 font-montserrat">Images / Videos posted by Customers</h3>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                 {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="w-32 h-32 md:w-40 md:h-40 rounded-xl bg-gray-100 shrink-0 border border-gray-200 overflow-hidden relative group cursor-pointer">
                       <img src={gallery[0]} alt="Review img" className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity" />
                       {i === 6 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-colors group-hover:bg-black/60">
                             <span className="text-white text-xs font-bold border border-white/50 px-3 py-1.5 rounded-md uppercase tracking-wider backdrop-blur-sm">View All</span>
                          </div>
                       )}
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="container max-w-6xl mx-auto">
            <div className="mb-8 border-b-4 border-[#1E3A8A] w-max pb-1">
               <h2 className="text-2xl font-black text-slate-900 font-montserrat">You May Also Like</h2>
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
