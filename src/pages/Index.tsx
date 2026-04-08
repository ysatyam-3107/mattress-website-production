import { Link } from "react-router-dom";
import {
  Shield, Truck, Clock, RefreshCw, Star, Check, ArrowRight, ArrowUpRight,
  ShoppingBag as ShoppingBagIcon,
  HeartPulse as HeartPulseIcon,
  Moon as MoonIcon,
  BarChart3 as BarChart3Icon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import SmartMattressFinder from "@/components/SmartMattressFinder";
import SleepScoreCalculator from "@/components/SleepScoreCalculator";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { products, testimonials, blogPosts } from "@/data/products";
import heroImg from "@/assets/hero-bedroom.jpg";
import memoryFoamImg from "@/assets/mattress-memory-foam.jpg";
import orthopedicImg from "@/assets/mattress-orthopedic.jpg";
import latexImg from "@/assets/mattress-latex.jpg";
import hybridImg from "@/assets/mattress-hybrid.jpg";

const categories = [
  { name: "Memory Foam", image: memoryFoamImg, desc: "Adaptive pressure relief", path: "/products" },
  { name: "Orthopedic", image: orthopedicImg, desc: "Doctor recommended support", path: "/products" },
  { name: "Latex", image: latexImg, desc: "100% natural & eco-friendly", path: "/products" },
  { name: "Hybrid", image: hybridImg, desc: "Best of both worlds", path: "/products" },
];

const Index = () => {
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 4);

  return (
    <div className="bg-secondary/20">
      <ExitIntentPopup />

      {/* 1. Hero Section (High Impact) */}
      <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 w-full h-full">
          <img src={heroImg} alt="Bright Premium Bedroom" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
        </div>
        
        <div className="relative z-10 container px-4">
          <div className="max-w-2xl space-y-6 animate-fade-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm tracking-wide">
              #1 Rated Mattress Brand
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight">
              Sleep Better,<br/> <span className="text-primary">Live Better.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
              India's most trusted mattresses for perfect comfort. Scientifically engineered for deep, uninterrupted sleep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/products">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-blue-700 text-white px-8 h-14 rounded-full text-lg shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-1">
                  Shop Now
                </Button>
              </Link>
              <a href="#sleep-quiz">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/5 px-8 h-14 rounded-full text-lg bg-white">
                  Take Sleep Quiz
                </Button>
              </a>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-accent text-accent" />)}
              </div>
              <span className="text-slate-600 font-medium">4.8/5 from 50,000+ reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar (Sticky-ish) */}
      <div className="bg-white border-y border-slate-200 py-6 sticky top-20 z-40 shadow-sm">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-slate-100">
            <div className="flex flex-col items-center justify-center gap-2">
              <Star className="w-6 h-6 text-accent fill-accent" />
              <span className="font-semibold text-sm text-slate-800">4.8 Rating</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <Clock className="w-6 h-6 text-primary" />
              <span className="font-semibold text-sm text-slate-800">100 Nights Trial</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <Truck className="w-6 h-6 text-primary" />
              <span className="font-semibold text-sm text-slate-800">Free Delivery</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <RefreshCw className="w-6 h-6 text-primary" />
              <span className="font-semibold text-sm text-slate-800">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Smart Mattress Finder */}
      <section id="sleep-quiz" className="py-24 bg-secondary">
        <div className="container">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Not sure what to choose?</h2>
            <p className="text-slate-600 text-lg">Take our 60-second quiz and let our sleep algorithm find your perfect match.</p>
          </div>
          <SmartMattressFinder />
        </div>
      </section>

      {/* 4. Product Categories */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Shop by Material</h2>
            <p className="text-slate-600 text-lg">Scientifically engineered for every body type.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link key={cat.name} to={cat.path} className="group cursor-pointer">
                <div className="bg-secondary/30 rounded-2xl overflow-hidden relative aspect-square transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                    <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">{cat.name}</h3>
                    <p className="text-white/90 text-sm mb-4 font-medium">{cat.desc}</p>
                    <div className="inline-flex items-center text-sm font-bold text-accent group-hover:text-white transition-colors">
                      Shop Now <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bestsellers Section */}
      <section className="py-24 bg-secondary">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Our Bestsellers</h2>
              <p className="text-slate-600 text-lg">The mattresses India loves the most.</p>
            </div>
            <Link to="/products" className="hidden sm:inline-flex text-primary font-semibold hover:underline items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link to="/products">
              <Button variant="outline" className="w-full bg-white text-primary border-primary">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us (Storytelling) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                Engineered for the <br/><span className="text-primary">Perfect Sleep</span>
              </h2>
              <p className="text-lg text-slate-600">We spent thousands of hours analyzing sleep patterns to create the ultimate comfort zones. Say goodbye to tossing and turning.</p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-1">Pressure Relief Technology</h4>
                    <p className="text-slate-600">Adaptive foam layers that cradle your body, completely eliminating pressure points on your hips and shoulders.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-1">Spinal Alignment</h4>
                    <p className="text-slate-600">Firmness concentrated at the core to ensure your spine remains straight, reducing morning backaches.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-1">Breathable Cooling Layers</h4>
                    <p className="text-slate-600">Open-cell structures and cooling gel infusions that draw heat away from your body all night long.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl transform translate-x-10 -translate-y-10" />
              <img src={orthopedicImg} alt="Mattress Technology" className="w-full h-auto rounded-3xl shadow-2xl relative z-10 border-4 border-white" />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4 border border-slate-100 animate-bounce">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-accent fill-accent" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">CertiPUR-US®</p>
                  <p className="text-sm text-slate-500">Certified safe foams</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Comparison Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4">The Smart Choice is Clear</h2>
            <p className="text-slate-400 text-lg">Compare and see why thousands are making the switch.</p>
          </div>
          
          <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-6 font-semibold text-lg text-slate-300 w-1/3">Features</th>
                  <th className="p-6 font-bold text-xl text-primary bg-primary/10 w-1/3 text-center border-x border-white/10">Sleepwell</th>
                  <th className="p-6 font-semibold text-lg text-slate-400 w-1/3 text-center">Others</th>
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
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-6 text-slate-300 font-medium">{row.feature}</td>
                    <td className="p-6 text-center font-bold text-white bg-primary/10 border-x border-white/10 bg-gradient-to-b from-transparent to-primary/5">
                      {row.us}
                    </td>
                    <td className="p-6 text-center text-slate-500">{row.them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Mini App: Sleep Score Calculator */}
      <section className="py-24 bg-secondary overflow-hidden">
        <div className="container relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Check Your Sleep Health</h2>
            <p className="text-slate-600 text-lg">Use our interactive calculator to see if you're getting the optimal rest your body needs.</p>
          </div>
          <SleepScoreCalculator />
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* 9. SLEEP GUIDE — Magazine-Quality Editorial Section           */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <section className="py-28 bg-white relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-50 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full bg-amber-50 blur-3xl pointer-events-none" />

        <div className="container relative z-10">
          {/* ── Header Row ── */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-20">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-10 bg-primary" />
                <span className="text-primary font-bold text-xs tracking-[0.2em] uppercase">
                  Sleep Guide
                </span>
              </div>
              <h2 className="text-4xl lg:text-[3.2rem] font-black text-slate-900 leading-[1.1] tracking-tight">
                Expert knowledge,<br />better nights.
              </h2>
            </div>
            <Link to="/blog" className="self-start lg:self-end">
              <Button className="group rounded-full bg-slate-900 text-white hover:bg-primary px-8 h-12 font-bold shadow-lg hover:shadow-primary/25 transition-all">
                Browse all articles
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* ── Bento Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 auto-rows-[1fr]">

            {/* ▸ FEATURED CARD — spans 7 cols, uses hero bedroom image */}
            <Link
              to="/blog"
              className="lg:col-span-7 group relative rounded-[28px] overflow-hidden min-h-[480px] flex flex-col justify-end shadow-xl hover:shadow-2xl transition-shadow duration-500"
            >
              {/* Cover Image */}
              <img
                src={heroImg}
                alt="Sleep guide cover"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

              {/* Content */}
              <div className="relative z-10 p-8 lg:p-12">
                {/* Category pill */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-1.5 bg-accent px-3 py-1 rounded-full text-[11px] font-black text-slate-900 uppercase tracking-wider shadow">
                    <ShoppingBagIcon className="w-3.5 h-3.5" />
                    {blogPosts[0].category}
                  </span>
                  <span className="text-white/70 text-sm flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5" /> {blogPosts[0].readTime}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-4 max-w-lg">
                  {blogPosts[0].title}
                </h3>
                <p className="text-white/60 text-base lg:text-lg line-clamp-2 max-w-md mb-8 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>

                {/* Author + CTA */}
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary font-black text-sm shadow-lg">
                      NK
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold">{blogPosts[0].author}</p>
                      <p className="text-white/40 text-xs">{blogPosts[0].authorRole}</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-slate-900 group-hover:border-white transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* ▸ RIGHT COLUMN — 5 cols, two stacked cards */}
            <div className="lg:col-span-5 grid grid-rows-2 gap-5">

              {/* Card 2 — uses mattress image */}
              <Link
                to="/blog"
                className="group relative rounded-[28px] overflow-hidden flex flex-col justify-end shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={orthopedicImg}
                  alt="Back pain guide"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-slate-900/10" />

                <div className="relative z-10 p-7">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 bg-red-500 px-2.5 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider">
                      <HeartPulseIcon className="w-3 h-3" />
                      {blogPosts[1].category}
                    </span>
                    <span className="text-white/60 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {blogPosts[1].readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white leading-snug mb-2 group-hover:text-slate-200 transition-colors">
                    {blogPosts[1].title}
                  </h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-white/50 text-xs font-medium">{blogPosts[1].author} · {blogPosts[1].date}</span>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>

              {/* Card 3 — clean white card, no image */}
              <Link
                to="/blog"
                className="group relative rounded-[28px] bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200/80 p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Decorative corner icon */}
                <div className="absolute -top-4 -right-4 w-28 h-28 rounded-full bg-primary/5 pointer-events-none" />
                <div className="absolute top-5 right-5 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <MoonIcon className="w-6 h-6 text-primary" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-primary font-black text-[10px] uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                      {blogPosts[2].category}
                    </span>
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {blogPosts[2].readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors pr-12">
                    {blogPosts[2].title}
                  </h3>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200 pt-5 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-[10px] font-black">SR</div>
                    <span className="text-xs text-slate-500 font-medium">{blogPosts[2].author}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900 group-hover:text-primary flex items-center gap-1 transition-colors">
                    Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* ── Bottom Strip — 4th article as a wide horizontal card ── */}
          <Link
            to="/blog"
            className="group mt-5 rounded-[28px] bg-slate-900 p-8 lg:p-10 flex flex-col md:flex-row items-center gap-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative"
          >
            {/* Decorative pattern */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
              <BarChart3Icon className="w-8 h-8 lg:w-10 lg:h-10 text-accent" />
            </div>

            <div className="flex-1 relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="bg-accent/20 text-accent text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  {blogPosts[3].category}
                </span>
                <span className="text-white/50 text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {blogPosts[3].readTime}
                </span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-slate-200 transition-colors">
                {blogPosts[3].title}
              </h3>
              <p className="text-white/50 text-sm line-clamp-1 max-w-2xl">{blogPosts[3].excerpt}</p>
            </div>

            <div className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-slate-900 group-hover:border-white transition-all duration-300">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
