import { useState } from "react";
import { X, Tag, Sparkles } from "lucide-react";

const PromoBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-gradient-to-r from-[#1E3A8A] via-[#2d4da6] to-[#1E3A8A] text-white text-center py-3 px-4 z-[60] overflow-hidden animate-gradient-slow" style={{ backgroundSize: '200% 200%' }}>
      {/* Animated shimmer overlay */}
      <div className="absolute inset-0 shimmer pointer-events-none" />
      
      {/* Subtle decorative dots */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '16px 16px'
      }} />

      <div className="container relative z-10 flex items-center justify-center gap-2 text-sm font-medium font-montserrat">
        <Sparkles className="w-4 h-4 shrink-0 hidden sm:block text-gold-light animate-pulse" />
        <span className="hidden sm:inline">Use code</span>
        <span className="font-black bg-white/15 backdrop-blur-sm px-3 py-0.5 rounded-md text-xs tracking-[0.15em] border border-white/20 shadow-inner">SLEEP10</span>
        <span>to get up to <strong className="text-gold-light">40% off</strong> + Additional <strong className="text-gold-light">10% off</strong> with bank offers.</span>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
        aria-label="Dismiss promotion"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PromoBanner;
