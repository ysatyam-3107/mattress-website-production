import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

const HeroCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="relative w-full" id="hero-carousel">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0 relative h-[50vh] sm:h-[60vh] lg:h-[75vh] overflow-hidden">
              {/* Background image with subtle zoom animation */}
              <img
                src={slide.image}
                alt={slide.title}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${
                  i === selectedIndex ? "scale-110" : "scale-100"
                }`}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : undefined}
              />
              {/* Deep blue gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f1d47]/90 via-[#1E3A8A]/60 to-transparent" />
              
              <div className="absolute inset-0 flex items-center">
                <div className="container px-4">
                  <div className={`max-w-xl space-y-5 ${i === selectedIndex ? "animate-fade-up" : "opacity-0"}`}>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#3B82F6] text-white font-bold text-[11px] tracking-widest uppercase shadow-lg font-montserrat">
                      {slide.badge}
                    </span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] drop-shadow-lg font-playfair">
                      {slide.title}
                    </h2>
                    <p className="text-lg sm:text-xl text-blue-100/90 font-medium max-w-md font-montserrat">
                      {slide.subtitle}
                    </p>
                    <Link to={slide.ctaLink}>
                      <Button size="lg" className="bg-[#3B82F6] hover:bg-blue-400 text-white font-bold px-8 h-13 rounded-xl shadow-xl hover:shadow-blue-500/30 btn-press mt-2 font-montserrat text-base">
                        {slide.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-all duration-300 z-10 btn-press"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-all duration-300 z-10 btn-press"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === selectedIndex ? "w-8 bg-[#3B82F6]" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
