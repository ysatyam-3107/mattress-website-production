import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, Shield, Truck, RotateCcw, Check, Award } from "lucide-react";
import { useState } from "react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("");

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/products"><Button>Browse Mattresses</Button></Link>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const related = products.filter((p) => p.id !== product.id && p.type === product.type).slice(0, 3);
  const size = selectedSize || product.sizes[0];

  return (
    <div className="min-h-screen">
      <div className="container py-4">
        <p className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/products" className="hover:text-primary">Mattresses</Link> / {product.name}
        </p>
      </div>

      <div className="container pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-muted/50 rounded-2xl overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500" width={800} height={800} />
          </div>

          {/* Details */}
          <div className="space-y-6">
            {product.bestseller && (
              <span className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider w-max">
                <Award className="w-4 h-4" /> Bestseller
              </span>
            )}
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-warning text-warning" : "text-muted"}`} />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">₹{product.price.toLocaleString()}</span>
              <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="bg-success/10 text-success text-sm font-medium px-2 py-0.5 rounded">{discount}% OFF</span>
            </div>
            <p className="text-sm text-muted-foreground">EMI from ₹{Math.round(product.price / 12).toLocaleString()}/month | No cost EMI available</p>

            <p className="text-foreground/80 leading-relaxed">{product.description}</p>

            {/* Size selector */}
            <div>
              <p className="text-sm font-medium mb-3">Select Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <Button key={s} variant={size === s ? "default" : "outline"} size="sm" onClick={() => setSelectedSize(s)}>
                    {s}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button size="lg" className="flex-1" onClick={() => addToCart(product, size)}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Button size="lg" variant="secondary" className="flex-1">
                Buy Now
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { icon: Truck, text: "Free Delivery" },
                { icon: RotateCcw, text: "100 Night Trial" },
                { icon: Shield, text: "10-Year Warranty" },
              ].map((item) => (
                <div key={item.text} className="text-center p-3 bg-muted/50 rounded-lg">
                  <item.icon className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs font-medium">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-3">Key Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-success flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Deep Content: Mattress Anatomy Diagram */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">What's Inside?</h2>
            <p className="text-slate-600">Discover the science of perfect sleep with our multi-layered support system.</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* 3D-ish Stack */}
            <div className="flex-1 w-full flex flex-col gap-2 perspective-1000 rotate-x-12 transform-gpu hover:rotate-0 transition-all duration-700 cursor-pointer group">
              <div className="bg-blue-100 h-16 w-full rounded-2xl shadow-sm border-t-2 border-blue-200 flex items-center justify-center -mb-4 relative z-40 hover:-translate-y-4 transition-transform">
                <span className="font-semibold text-blue-800 tracking-wider text-sm uppercase">1. Cooling Tech Cover</span>
              </div>
              <div className="bg-blue-300 h-20 w-full rounded-2xl shadow-md flex items-center justify-center -mb-4 relative z-30 hover:-translate-y-4 transition-transform">
                <span className="font-semibold text-blue-900 tracking-wider text-sm uppercase">2. Pressure Relief Core</span>
              </div>
              <div className="bg-yellow-200 h-24 w-full rounded-2xl shadow-lg flex items-center justify-center -mb-4 relative z-20 hover:-translate-y-4 transition-transform">
                <span className="font-semibold text-yellow-800 tracking-wider text-sm uppercase">3. Adaptive Transition Zone</span>
              </div>
              <div className="bg-slate-300 h-32 w-full rounded-xl shadow-xl flex items-center justify-center relative z-10 hover:-translate-y-4 transition-transform">
                <span className="font-semibold text-slate-700 tracking-wider text-sm uppercase">4. High-Density Base</span>
              </div>
            </div>
            
            <div className="flex-1 space-y-6">
              {[
                { title: "Cooling Tech Cover", desc: "Instantly cool to the touch, pulling heat away from your body." },
                { title: "Pressure Relief Core", desc: "Adapts to your curves, eliminating pain off shoulders and hips." },
                { title: "Adaptive Transition Zone", desc: "Ensures you don't sink too far while isolating motion." },
                { title: "High-Density Base", desc: "Provides heavy-duty structural support for longevity." },
              ].map((layer, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{layer.title}</h4>
                    <p className="text-slate-600 text-sm mt-1">{layer.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
