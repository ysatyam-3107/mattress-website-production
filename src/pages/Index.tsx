import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import {
  Shield, Truck, Clock, RefreshCw, Star, Check, ArrowRight, ArrowUpRight,
  ShoppingBag as ShoppingBagIcon,
  HeartPulse as HeartPulseIcon,
  Moon as MoonIcon,
  BarChart3 as BarChart3Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
const SmartMattressFinder = lazy(() => import("@/components/SmartMattressFinder"));
const SleepScoreCalculator = lazy(() => import("@/components/SleepScoreCalculator"));
const ExitIntentPopup = lazy(() => import("@/components/ExitIntentPopup"));
import { products, blogPosts } from "@/data/products";
import heroImg from "@/assets/hero-bedroom.jpg";
import orthopedicImg from "@/assets/mattress-orthopedic.jpg";

const toSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

import HeroCarousel from "@/components/HeroCarousel";
import SaleCountdown from "@/components/SaleCountdown";
import CategoryGrid from "@/components/CategoryGrid";
import FindMattressBanner from "@/components/FindMattressBanner";
const TopSellers = lazy(() => import("@/components/TopSellers"));
const TestimonialsCarousel = lazy(() => import("@/components/TestimonialsCarousel"));
const SleepersGallery = lazy(() => import("@/components/SleepersGallery").then(m => ({ default: m.SleepersGallery })));
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { SEO } from "@/components/SEO";

const Index = () => {
  const reveal1 = useScrollReveal();
  const reveal2 = useScrollReveal();
  const reveal3 = useScrollReveal();
  const staggerReveal1 = useStaggerReveal();
  
  return (
    <>
      <SEO 
        title="Premium Sleep, Perfected" 
        description="Experience luxury and comfort with Mustafa's Mattress. Memory foam, orthopedic, and hybrid mattresses with a 100-night risk-free trial."
      />
      <div className="bg-background">
        <Suspense fallback={null}>
          <ExitIntentPopup />
        </Suspense>

      {/* 1. Hero Carousel */}
      <HeroCarousel />

      <Suspense fallback={<div className="h-40 flex items-center justify-center">Loading...</div>}>

      {/* 2. Sale Timer + Trust Badges */}
      <div ref={reveal1} className="reveal-section">
        <SaleCountdown />
      </div>

      {/* 3. Shop by Categories */}
      <div ref={staggerReveal1} className="reveal-section stagger-children">
        <CategoryGrid />
      </div>

      {/* 4. "Confused? Find Your Mattress" CTA */}
      <FindMattressBanner />

      {/* 5. Top Selling Products */}
      <div ref={reveal2} className="reveal-section">
        <TopSellers />
      </div>

      {/* 6. Smart Mattress Finder */}
      <section id="sleep-quiz" ref={reveal3} className="py-28 relative overflow-hidden bg-[#1E3A8A] reveal-section">
        {/* Decorative orbs */}
        <div className="absolute -top-40 right-10 w-[500px] h-[500px] bg-[#3B82F6]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 left-10 w-[400px] h-[400px] bg-blue-300/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="container relative z-10">
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-playfair text-white mb-6 font-bold leading-tight">
              Not sure what to choose?
            </h2>
            <p className="text-blue-200/80 text-lg md:text-xl font-light tracking-wide leading-relaxed font-montserrat">
              Take our 60-second quiz and let our sleep algorithm find your perfect match.
            </p>
          </div>
          <SmartMattressFinder />
        </div>
      </section>

      {/* 7. Comparison Section */}
      <section className="py-24 bg-[#111827]">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white font-playfair">The Smart Choice is Clear</h2>
            <p className="text-gray-400 text-lg font-montserrat">Compare and see why thousands are making the switch.</p>
          </div>
          
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-6 font-semibold text-lg text-gray-300 w-1/3 font-montserrat">Features</th>
                  <th className="p-6 font-bold text-xl text-[#3B82F6] bg-[#3B82F6]/10 w-1/3 text-center border-x border-white/10 font-playfair">Mustafa's</th>
                  <th className="p-6 font-semibold text-lg text-gray-400 w-1/3 text-center font-montserrat">Others</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { feature: "Trial Period", us: "100 Nights", them: "None / 30 Nights" },
                  { feature: "Warranty", us: "10 Years", them: "1-5 Years" },
                  { feature: "Delivery", us: "Free in India", them: "Extra Charge" },
                  { feature: "Materials", us: "CertiPUR-US® Safe", them: "Unknown chemicals" },
                  { feature: "Returns", us: "100% Free", them: "Return fee applies" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors duration-300">
                    <td className="p-6 text-gray-300 font-medium font-montserrat">{row.feature}</td>
                    <td className="p-6 text-center font-bold text-white bg-[#3B82F6]/5 border-x border-white/10 font-montserrat">
                      {row.us}
                    </td>
                    <td className="p-6 text-center text-gray-500 font-montserrat">{row.them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 8. Sleep Score Calculator */}
      <section className="py-28 relative overflow-hidden bg-gradient-to-br from-[#0f1d47] to-[#1E3A8A]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3B82F6]/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-6xl font-playfair text-white mb-6 font-bold leading-tight">
              Check Your Sleep Health
            </h2>
            <p className="text-blue-200/80 text-lg md:text-xl font-light tracking-wide leading-relaxed font-montserrat">
              Use our interactive calculator to see if you're getting the optimal rest your body needs.
            </p>
          </div>
          <SleepScoreCalculator />
        </div>
      </section>

      {/* 8.5 Testimonials */}
      <TestimonialsCarousel />

      {/* 8.6 Sleepers Gallery (Social Proof) */}
      <SleepersGallery />

      {/* 9. SLEEP GUIDE — Magazine-Quality Editorial Section */}
      <section className="py-28 bg-[#F9FAFB] dark:bg-card relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-50 dark:bg-blue-900/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full bg-blue-100/30 dark:bg-blue-900/10 blur-3xl pointer-events-none" />

        <div className="container relative z-10">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-20">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-10 bg-[#3B82F6]" />
                <span className="text-[#3B82F6] font-bold text-xs tracking-[0.2em] uppercase font-montserrat">
                  Sleep Guide
                </span>
              </div>
              <h2 className="text-4xl lg:text-[3.2rem] font-bold text-[#111827] dark:text-gray-100 leading-[1.1] tracking-tight font-playfair">
                Expert knowledge,<br />better nights.
              </h2>
            </div>
            <Link to="/blog" className="self-start lg:self-end">
              <Button className="group rounded-full bg-[#1E3A8A] text-white hover:bg-[#3B82F6] px-8 h-12 font-bold shadow-lg hover:shadow-blue-500/25 transition-all btn-press font-montserrat">
                Browse all articles
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 auto-rows-[1fr]">

            {/* FEATURED CARD */}
            <Link
              to={`/blog/${toSlug(blogPosts[0].title)}`}
              className="lg:col-span-7 group relative rounded-2xl overflow-hidden min-h-[480px] flex flex-col justify-end shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={heroImg}
                alt="Sleep guide cover"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/60 to-transparent" />

              <div className="relative z-10 p-8 lg:p-12">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-1.5 bg-[#3B82F6] text-white px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider shadow font-montserrat">
                    <ShoppingBagIcon className="w-3.5 h-3.5" />
                    {blogPosts[0].category}
                  </span>
                  <span className="text-white/70 text-sm flex items-center gap-1.5 font-medium font-montserrat">
                    <Clock className="w-3.5 h-3.5" /> {blogPosts[0].readTime}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4 max-w-lg font-playfair">
                  {blogPosts[0].title}
                </h3>
                <p className="text-white/60 text-base lg:text-lg line-clamp-2 max-w-md mb-8 leading-relaxed font-montserrat">
                  {blogPosts[0].excerpt}
                </p>

                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center text-white font-bold text-sm shadow-lg font-montserrat">
                      NK
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold font-montserrat">{blogPosts[0].author}</p>
                      <p className="text-white/40 text-xs font-montserrat">{blogPosts[0].authorRole}</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center text-white group-hover:bg-[#3B82F6] group-hover:border-[#3B82F6] transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-5 grid grid-rows-2 gap-5">

              {/* Card 2 */}
              <Link
                to={`/blog/${toSlug(blogPosts[1].title)}`}
                className="group relative rounded-2xl overflow-hidden flex flex-col justify-end shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={orthopedicImg}
                  alt="Back pain guide"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/95 via-[#111827]/50 to-[#111827]/10" />

                <div className="relative z-10 p-7">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 bg-red-500 px-2.5 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider font-montserrat">
                      <HeartPulseIcon className="w-3 h-3" />
                      {blogPosts[1].category}
                    </span>
                    <span className="text-white/60 text-xs flex items-center gap-1 font-montserrat">
                      <Clock className="w-3 h-3" /> {blogPosts[1].readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white leading-snug mb-2 group-hover:text-blue-200 transition-colors font-playfair">
                    {blogPosts[1].title}
                  </h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-white/50 text-xs font-medium font-montserrat">{blogPosts[1].author} · {blogPosts[1].date}</span>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>

              {/* Card 3 */}
              <Link
                to={`/blog/${toSlug(blogPosts[2].title)}`}
                className="group relative rounded-2xl bg-white dark:bg-card border border-gray-100 dark:border-border p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute -top-4 -right-4 w-28 h-28 rounded-full bg-[#3B82F6]/5 pointer-events-none" />
                <div className="absolute top-5 right-5 w-12 h-12 rounded-2xl bg-[#1E3A8A]/10 flex items-center justify-center">
                  <MoonIcon className="w-6 h-6 text-[#1E3A8A] dark:text-blue-400" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[#3B82F6] font-bold text-[10px] uppercase tracking-widest bg-[#3B82F6]/10 px-3 py-1 rounded-lg font-montserrat">
                      {blogPosts[2].category}
                    </span>
                    <span className="text-gray-400 text-xs flex items-center gap-1 font-montserrat">
                      <Clock className="w-3 h-3" /> {blogPosts[2].readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-snug group-hover:text-[#3B82F6] transition-colors pr-12 font-playfair">
                    {blogPosts[2].title}
                  </h3>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 dark:border-border pt-5 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-[#1E3A8A] dark:text-blue-400 text-[10px] font-bold font-montserrat">SR</div>
                    <span className="text-xs text-gray-500 font-medium font-montserrat">{blogPosts[2].author}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-[#3B82F6] flex items-center gap-1 transition-colors font-montserrat">
                    Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Bottom Strip */}
          <Link
            to={`/blog/${toSlug(blogPosts[3].title)}`}
            className="group mt-5 rounded-2xl bg-[#111827] p-8 lg:p-10 flex flex-col md:flex-row items-center gap-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-[#3B82F6]/15 border border-[#3B82F6]/10 flex items-center justify-center shrink-0">
              <BarChart3Icon className="w-8 h-8 lg:w-10 lg:h-10 text-[#3B82F6]" />
            </div>

            <div className="flex-1 relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="bg-[#3B82F6]/20 text-[#3B82F6] text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider font-montserrat">
                  {blogPosts[3].category}
                </span>
                <span className="text-white/50 text-xs flex items-center gap-1 font-montserrat">
                  <Clock className="w-3 h-3" /> {blogPosts[3].readTime}
                </span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors font-playfair">
                {blogPosts[3].title}
              </h3>
              <p className="text-white/50 text-sm line-clamp-1 max-w-2xl font-montserrat">{blogPosts[3].excerpt}</p>
            </div>

            <div className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center text-white shrink-0 group-hover:bg-[#3B82F6] group-hover:border-[#3B82F6] transition-all duration-300">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </Link>
        </div>
      </section>
      </Suspense>
    </div>
    </>
  );
};

export default Index;
