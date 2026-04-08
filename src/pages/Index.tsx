import { Link } from "react-router-dom";
import { Shield, Truck, Clock, Moon, Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ProductCard, { ProductSkeleton } from "@/components/ProductCard";
import { products, testimonials } from "@/data/products";
import heroImg from "@/assets/hero-bedroom.jpg";
import memoryFoamImg from "@/assets/mattress-memory-foam.jpg";
import orthopedicImg from "@/assets/mattress-orthopedic.jpg";
import latexImg from "@/assets/mattress-latex.jpg";
import hybridImg from "@/assets/mattress-hybrid.jpg";

const features = [
  { icon: Clock, title: "100 Nights Free Trial", desc: "Sleep on it risk-free for 100 nights" },
  { icon: Shield, title: "10-Year Warranty", desc: "We stand behind every mattress we make" },
  { icon: Truck, title: "Free Delivery", desc: "Free doorstep delivery across India" },
  { icon: Moon, title: "Made for India", desc: "Designed for Indian sleep needs & climate" },
];

const categories = [
  { name: "Memory Foam", image: memoryFoamImg, desc: "Body-conforming comfort" },
  { name: "Orthopedic", image: orthopedicImg, desc: "Doctor-recommended support" },
  { name: "Latex", image: latexImg, desc: "Natural & breathable" },
  { name: "Hybrid", image: hybridImg, desc: "Best of both worlds" },
];

const Index = () => {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const bestsellers = products.filter((p) => p.bestseller);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
      } else {
        setTestimonialIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      }
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Premium bedroom" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/80 via-foreground/50 to-foreground/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
        </div>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-warning/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        <div className="container relative z-10 py-20">
          <div className="max-w-xl space-y-6">
            <span className="inline-block text-primary bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm text-sm font-medium px-4 py-1.5 rounded-full animate-fade-up border border-primary/20 shadow-lg">
              ✨ New Collection 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-up-delay-1">
              <span className="bg-gradient-to-r from-background via-background/90 to-primary bg-clip-text text-transparent">
                Sleep Better,
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-warning bg-clip-text text-transparent animate-gradient">
                Live Better
              </span>
            </h1>
            <p className="text-lg text-background/90 leading-relaxed animate-fade-up-delay-2 drop-shadow-sm">
              Premium mattresses designed for ultimate comfort. Experience the perfect night's sleep, every night.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up-delay-3">
              <Link to="/products">
                <Button size="lg" className="text-base px-8">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="text-base px-8 bg-background/10 border-background/30 text-background hover:bg-background/20">
                  Explore Mattresses
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-4 animate-fade-up-delay-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-background">50K+</p>
                <p className="text-xs text-background/60">Happy Customers</p>
              </div>
              <div className="w-px h-10 bg-background/20" />
              <div className="text-center">
                <p className="text-2xl font-bold text-background">4.8★</p>
                <p className="text-xs text-background/60">Average Rating</p>
              </div>
              <div className="w-px h-10 bg-background/20" />
              <div className="text-center">
                <p className="text-2xl font-bold text-background">100</p>
                <p className="text-xs text-background/60">Night Trial</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="text-center space-y-3 p-6 group hover-lift rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/30 hover:border-primary/20 transition-all duration-300">
                <div className="mx-auto w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-300">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Shop by Category</h2>
            <p className="text-muted-foreground">Find the perfect mattress for your sleep style</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link key={cat.name} to="/products" className="group">
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] hover-lift shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" width={400} height={500} />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent group-hover:from-foreground/90 transition-all duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-background text-sm mb-1">{cat.name}</h3>
                    <p className="text-xs text-background/80">{cat.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-20 bg-gradient-to-br from-muted/50 via-card/30 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-card/20 to-transparent" />
        <div className="container relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Bestsellers</h2>
              <p className="text-muted-foreground">Our most loved mattresses</p>
            </div>
            <Link to="/products" className="text-sm text-primary font-medium hover:underline hidden md:block hover:text-accent transition-colors duration-300">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => <ProductSkeleton key={i} />)
              : bestsellers.map((p) => <ProductCard key={p.id} product={p} />)
            }
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What Our Customers Say</h2>
            <p className="text-muted-foreground">Join thousands of happy sleepers</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div
              className="bg-card rounded-2xl p-8 border border-border/50 text-center space-y-4 shadow-xl hover:shadow-2xl transition-shadow duration-500 relative overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
              <div className="relative z-10">
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(testimonials[testimonialIdx].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-warning text-warning animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                <p className="text-lg leading-relaxed italic text-foreground/80 mb-6">
                  "{testimonials[testimonialIdx].text}"
                </p>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{testimonials[testimonialIdx].name}</p>
                  <p className="text-sm text-muted-foreground">{testimonials[testimonialIdx].location} • {testimonials[testimonialIdx].product}</p>
                </div>
                <div className="flex justify-center gap-2 pt-6">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                    onClick={() => setTestimonialIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {/* Testimonial indicators */}
                  <div className="flex gap-1">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setTestimonialIdx(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === testimonialIdx ? "bg-primary w-6" : "bg-muted-foreground/30"
                          }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                    onClick={() => setTestimonialIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-float" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container text-center space-y-6 relative z-10">
          <h2 className="text-3xl font-bold text-primary-foreground drop-shadow-lg">Trusted by 50,000+ Happy Customers</h2>
          <p className="text-primary-foreground/90 max-w-lg mx-auto leading-relaxed drop-shadow-sm">
            Join the SleepWell family and experience the comfort you deserve. Free trial, free delivery, no risk.
          </p>
          <Link to="/products">
            <Button size="lg" variant="secondary" className="text-base px-8 mt-4 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-white text-primary hover:bg-white/90">
              Find Your Perfect Mattress
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
