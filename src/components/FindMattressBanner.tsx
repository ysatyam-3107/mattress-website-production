import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const FindMattressBanner = () => (
  <section className="py-8">
    <div className="container">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E3A8A] via-[#2545a0] to-[#3B82F6] px-8 py-10 sm:px-14 sm:py-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-premium-lg">
        {/* Animated floating orbs */}
        <div className="absolute top-10 right-20 w-64 h-64 bg-white/[0.04] rounded-full float-orb pointer-events-none" />
        <div className="absolute -bottom-20 left-1/4 w-48 h-48 bg-white/[0.03] rounded-full float-orb-delay pointer-events-none" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-blue-300/[0.06] rounded-full float-orb pointer-events-none" style={{ animationDelay: '1s' }} />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />

        <div className="relative z-10 text-center md:text-left max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-blue-200 text-[10px] font-bold uppercase tracking-[0.15em] mb-5 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            Personalized For You
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-[1.1] font-playfair">
            Not Sure What{" "}
            <span className="text-gradient">to Choose?</span>
          </h3>
          <p className="text-base sm:text-lg text-blue-100/70 font-medium max-w-md font-montserrat leading-relaxed">
            Take our 60-second quiz and let our sleep algorithm find your perfect match.
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <a href="#sleep-quiz">
            <Button
              size="lg"
              className="bg-white text-[#1E3A8A] hover:bg-blue-50 font-bold px-10 h-16 rounded-2xl shadow-2xl text-lg transition-all btn-press group font-montserrat hover:-translate-y-1 hover:shadow-[0_20px_60px_-12px_rgba(255,255,255,0.3)]"
            >
              FIND MY MATTRESS
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Button>
          </a>
        </div>

        {/* Floating mattress layer visual — improved */}
        <div className="absolute right-8 bottom-0 hidden xl:flex flex-col items-center gap-1.5 opacity-10 pointer-events-none">
          <div className="w-40 h-3 bg-white rounded-full" />
          <div className="w-48 h-5 bg-white/80 rounded-full" />
          <div className="w-56 h-7 bg-white/60 rounded-full" />
          <div className="w-64 h-10 bg-white/40 rounded-xl" />
        </div>
      </div>
    </div>
  </section>
);

export default FindMattressBanner;
