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
    <section className="py-20 bg-[#F9FAFB] dark:bg-background overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#111827] dark:text-gray-100 mb-3 font-playfair">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 font-montserrat">
            Join 50,000+ happy sleepers across India
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Cards track */}
          <div className="relative h-[280px] sm:h-[240px]">
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
                  <div className="bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-border p-8 sm:p-10 shadow-sm h-full flex flex-col justify-between">
                    {/* Quote icon */}
                    <div>
                      <Quote className="w-8 h-8 text-[#3B82F6]/20 mb-4" />
                      <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed font-montserrat italic">
                        "{t.text}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100 dark:border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white font-bold text-sm font-montserrat">
                          {t.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-bold text-[#111827] dark:text-gray-100 text-sm font-montserrat">{t.name}</p>
                          <p className="text-xs text-gray-400 font-montserrat">{t.location} · {t.product}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`w-4 h-4 ${s <= t.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 lg:-left-14 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-card shadow-lg border border-gray-100 dark:border-border flex items-center justify-center text-gray-600 hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 lg:-right-14 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-card shadow-lg border border-gray-100 dark:border-border flex items-center justify-center text-gray-600 hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-400 ${
                  i === active
                    ? "w-8 h-2.5 bg-[#3B82F6]"
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
