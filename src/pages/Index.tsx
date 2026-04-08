import { Link } from "react-router-dom";
import { Shield, Truck, Clock, Moon, Star, ChevronLeft, ChevronRight, ArrowRight, Lightbulb, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ProductCard, { ProductSkeleton } from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
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
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Premium bedroom" className="w-full h-full object-cover" width={1920} height={1080} />
          {/* Enhanced dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/45" />
          {/* Content */}
          <div className="relative z-10 container px-4 py-20 text-center max-w-3xl mx-auto">
            <div className="space-y-8">
              <div className="space-y-3 animate-fade-up">
                <p className="text-white/90 text-lg md:text-xl font-light tracking-widest uppercase">
                  Experience Ultimate Comfort
                </p>
                <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight drop-shadow-lg">
                  Perfect Sleep,<br />Every Night
                </h1>
              </div>

              <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed max-w-2xl mx-auto font-light animate-fade-up-delay-1">
                Discover our premium collection of mattresses designed for the perfect balance of comfort and support. Crafted with the finest materials for your ultimate sleep experience.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-up-delay-2">
                <Link to="/products">
                  <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-base px-8 py-7 rounded-full shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105 active:scale-95">
                    Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/products">
                  <Button size="lg" variant="outline" className="text-white border-white/80 hover:bg-white/15 hover:border-white text-base px-8 py-7 rounded-full backdrop-blur-sm transition-all duration-300 font-medium">
                    Explore Collection
                  </Button>
                </Link>
              </div>

              {/* Trust Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-8 animate-fade-up-delay-3 max-w-xl mx-auto">
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary-foreground">50K+</p>
                  <p className="text-sm text-primary-foreground/70 mt-1">Happy Customers</p>
                </div>
                <div className="h-12 w-px bg-primary-foreground/20 mx-auto"></div>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary-foreground">4.8★</p>
                  <p className="text-sm text-primary-foreground/70 mt-1">Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <div className="flex flex-col items-center gap-2">
              <span className="text-primary-foreground/60 text-sm">Scroll to explore</span>
              <ChevronLeft className="h-5 w-5 text-primary-foreground/60 -rotate-90" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-white to-accent/5 border-b border-primary/10">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">What sets our mattresses apart from the competition</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="group text-center space-y-4 p-8 bg-white rounded-2xl border border-primary/5 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary group-hover:to-accent group-hover:text-white transition-all duration-300">
                  <f.icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Shop by Type</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Find the perfect mattress type for your comfort needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link key={cat.name} to="/products" className="group">
                <div className="relative rounded-lg overflow-hidden aspect-[4/5] shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" width={400} height={500} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-bold text-white text-xl mb-2">{cat.name}</h3>
                    <p className="text-gray-200 text-sm">{cat.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Carousel */}
      <section className="py-24 bg-gradient-to-br from-background via-primary/2 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)] bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.08),transparent_50%)]" />
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Bestsellers</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Discover our most loved and recommended mattresses</p>
          </div>
          <ProductCarousel products={bestsellers.length > 0 ? bestsellers : products} />
          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" variant="outline" className="px-8 py-6 border-primary text-primary hover:bg-primary/5">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Join thousands of satisfied sleepers who've transformed their sleep</p>
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

      {/* Sleep Tips Preview */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-t border-primary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Sleep Better Tonight</h2>
            <p className="text-lg text-muted-foreground">Discover science-backed tips and expert advice for improving your sleep quality</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="group bg-white rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Moon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Sleep Schedule</h3>
              <p className="text-sm text-muted-foreground">Sleep at the same time daily to regulate your circadian rhythm.</p>
            </div>

            <div className="group bg-white rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Heart className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Cool Room</h3>
              <p className="text-sm text-muted-foreground">Keep your bedroom at 65-68°F for optimal sleep quality.</p>
            </div>

            <div className="group bg-white rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Lightbulb className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-lg mb-2">No Screens</h3>
              <p className="text-sm text-muted-foreground">Avoid screens 1-2 hours before bed to improve sleep onset.</p>
            </div>

            <div className="group bg-white rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Star className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Good Mattress</h3>
              <p className="text-sm text-muted-foreground">Your mattress affects 90% of your sleep comfort.</p>
            </div>
          </div>

          <div className="text-center">
            <Link to="/blog">
              <Button size="lg" variant="outline" className="px-8 py-6 border-primary text-primary hover:bg-primary/5">
                Read Our Complete Sleep Guide <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust / CTA */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-24 h-24 bg-white/15 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '0.5s' }} />
        </div>
        <div className="container text-center space-y-8 relative z-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-xl">Trusted by 50,000+ Happy Customers</h2>
            <p className="text-white/95 max-w-2xl mx-auto leading-relaxed text-lg drop-shadow-lg">
              Join the SleepWell family and experience the comfort you deserve. Free trial, free delivery, no risk. Your perfect night's sleep is just a click away.
            </p>
          </div>
          <Link to="/products">
            <Button size="lg" className="bg-white text-primary hover:bg-white/95 text-base px-10 py-7 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 font-semibold">
              Find Your Perfect Mattress <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
