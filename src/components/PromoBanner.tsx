import { useState } from "react";
import { X, Tag } from "lucide-react";

const PromoBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-[#1E3A8A] via-[#2545a0] to-[#1E3A8A] text-white text-center py-2.5 px-4 relative z-[60] animate-fade-in">
      <div className="container flex items-center justify-center gap-2 text-sm font-medium font-montserrat">
        <Tag className="w-4 h-4 shrink-0 hidden sm:block" />
        <span className="hidden sm:inline">Use code</span>
        <span className="font-black bg-[#3B82F6] px-2.5 py-0.5 rounded text-xs tracking-widest">SLEEP10</span>
        <span>to Get up to <strong>40% off</strong> + Additional <strong>10% off</strong> with bank offers.</span>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
        aria-label="Dismiss promotion"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PromoBanner;
