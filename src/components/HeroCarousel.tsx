import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import heroImg from "@/assets/hero-bedroom.jpg";
import memoryFoamImg from "@/assets/mattress-memory-foam.jpg";
import orthopedicImg from "@/assets/mattress-orthopedic.jpg";
import hybridImg from "@/assets/mattress-hybrid.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const slides = [
  {
    image: heroImg,
    badge: "BIGGEST SALE",
    title: "Sleep Better, Save More",
    subtitle: "Up to 40% OFF on all premium mattresses",
    cta: "Shop Now",
    ctaLink: "/products",
  },
  {
    image: memoryFoamImg,
    badge: "BESTSELLER",
    title: "CloudRest Memory Foam",
    subtitle: "Adaptive pressure relief with cooling gel technology",
    cta: "Explore Memory Foam",
    ctaLink: "/products",
  },
  {
    image: orthopedicImg,
    badge: "DOCTOR RECOMMENDED",
    title: "SpineGuard Orthopedic",
    subtitle: "Advanced spinal alignment for back pain relief",
    cta: "Shop Orthopedic",
    ctaLink: "/products",
  },
  {
    image: hybridImg,
    badge: "NEW ARRIVAL",
    title: "DreamFusion Hybrid",
    subtitle: "Pocketed springs + memory foam — best of both worlds",
    cta: "View Hybrid Range",
    ctaLink: "/products",
  },
];

const AUTO_PLAY_INTERVAL = 5000;

const HeroCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setProgress(0);
    };
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  // Auto-rotate every 5 seconds with progress tracking
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, AUTO_PLAY_INTERVAL);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + (100 / (AUTO_PLAY_INTERVAL / 50));
      });
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [emblaApi]);

  return (
    <section className="relative w-full" id="hero-carousel">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0 relative h-[55vh] sm:h-[65vh] lg:h-[80vh] overflow-hidden bg-[#0f172a]">
              {/* Background image with subtle zoom animation */}
              <img
                src={slide.image}
                alt={slide.title}
                className={`absolute inset-0 w-full h-full object-cover [transition-duration:8000ms] [transition-property:transform] ease-out ${
                  i === selectedIndex ? "scale-110" : "scale-100"
                }`}
                loading={i === 0 ? "eager" : "lazy"}
                fetchpriority={i === 0 ? "high" : undefined}
              />
              {/* Multi-layer gradient overlay for cinematic depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#1E3A8A]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/40 via-transparent to-transparent" />
              
              <div className="absolute inset-0 flex items-center">
                <div className="container px-4">
                  <div className={`max-w-xl space-y-6 ${i === selectedIndex ? "animate-fade-up" : "opacity-0"}`}>
                    {/* Glowing badge */}
                    <span className="inline-block px-5 py-2 rounded-full bg-[#3B82F6]/90 text-white font-bold text-[11px] tracking-[0.15em] uppercase shadow-lg badge-glow font-montserrat backdrop-blur-sm border border-white/10">
                      {slide.badge}
                    </span>
                    {/* Gradient headline */}
                    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.05] drop-shadow-2xl font-playfair">
                      <span className="text-gradient">{slide.title}</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-blue-100/80 font-medium max-w-md font-montserrat leading-relaxed">
                      {slide.subtitle}
                    </p>
                    <Link to={slide.ctaLink}>
                      <Button size="lg" className="bg-white text-[#1E3A8A] hover:bg-blue-50 font-bold px-10 h-14 rounded-full shadow-xl hover:shadow-2xl btn-press btn-sweep mt-2 font-montserrat text-base group transition-all duration-300">
                        {slide.cta}
                        <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows — glassmorphic */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-card text-white flex items-center justify-center hover:bg-white/30 transition-all duration-300 z-10 btn-press group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-card text-white flex items-center justify-center hover:bg-white/30 transition-all duration-300 z-10 btn-press group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Progress Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-500 relative overflow-hidden ${
              i === selectedIndex ? "w-12 bg-white/30" : "w-3 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          >
            {i === selectedIndex && (
              <div 
                className="absolute left-0 top-0 h-full bg-white rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 scroll-indicator hidden lg:flex flex-col items-center gap-1 text-white/40 z-10" style={{ left: 'calc(50% + 120px)' }}>
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] font-montserrat">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
};

export default HeroCarousel;
