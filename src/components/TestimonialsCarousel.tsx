import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/products";

const TestimonialsCarousel = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [next, paused]);

  return (
    <section className="py-14 bg-[#F9FAFB] dark:bg-background overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-blue-50/50 dark:bg-blue-900/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full bg-blue-100/30 dark:bg-blue-900/5 blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-10 bg-gold" />
            <span className="text-gold-dark font-bold text-[11px] tracking-[0.2em] uppercase font-montserrat">
              Testimonials
            </span>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-[#111827] dark:text-gray-100 mb-4 font-playfair leading-tight">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 font-montserrat text-lg">
            Join 50,000+ happy sleepers across India
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Large decorative quote watermark */}
          <div className="absolute -top-10 left-8 z-0 opacity-[0.04] pointer-events-none">
            <Quote className="w-40 h-40 text-[#1E3A8A]" strokeWidth={1} />
          </div>

          {/* Cards track */}
          <div className="relative h-[300px] sm:h-[260px]">
            {testimonials.map((t, i) => {
              const offset = i - active;
              const isActive = i === active;

              return (
                <div
                  key={t.id}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    isActive
                      ? "opacity-100 translate-x-0 scale-100 z-10"
                      : offset > 0
                      ? "opacity-0 translate-x-full scale-95 z-0"
                      : "opacity-0 -translate-x-full scale-95 z-0"
                  }`}
                >
                  <div className="bg-white dark:bg-card rounded-3xl border border-gray-100/80 dark:border-border p-8 sm:p-10 shadow-premium h-full flex flex-col justify-between relative overflow-hidden">
                    {/* Decorative gradient corner */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#3B82F6]/5 to-transparent rounded-full pointer-events-none" />
                    
                    {/* Quote content */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-1 mb-4">
                        <Quote className="w-5 h-5 text-[#3B82F6]/30 -mt-1" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed font-montserrat italic">
                        "{t.text}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100/80 dark:border-border relative z-10">
                      <div className="flex items-center gap-3">
                        {/* Gradient ring avatar */}
                        <div className="ring-gradient p-[2px] rounded-full">
                          <div className="w-11 h-11 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white font-bold text-sm font-montserrat">
                            {t.name.split(" ").map(n => n[0]).join("")}
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-[#111827] dark:text-gray-100 text-sm font-montserrat">{t.name}</p>
                          <p className="text-xs text-gray-400 font-montserrat">{t.location} · {t.product}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`w-4 h-4 ${s <= t.rating ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_3px_rgba(251,191,36,0.3)]" : "text-gray-200 dark:text-gray-600"}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows — premium */}
          <button
            onClick={prev}
            className="absolute left-0 lg:-left-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white dark:bg-card shadow-premium border border-gray-100/80 dark:border-border flex items-center justify-center text-gray-600 hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] hover:shadow-glow-blue transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 lg:-right-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white dark:bg-card shadow-premium border border-gray-100/80 dark:border-border flex items-center justify-center text-gray-600 hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] hover:shadow-glow-blue transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot Indicators — premium */}
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-400 ${
                  i === active
                    ? "w-10 h-2.5 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] shadow-sm"
                    : "w-2.5 h-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
