import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Check if mouse leaves through the top of the window (indicates going to tabs/URL bar)
      if (e.clientY <= 0 && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasTriggered]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in px-4">
      <div className="bg-white rounded-2xl max-w-lg w-full relative overflow-hidden shadow-2xl">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
          <h3 className="text-3xl font-extrabold text-slate-800 mb-2">Wait! Don't leave your sleep to chance.</h3>
          <p className="text-muted-foreground mb-6">Get 10% OFF your first mattress order. Experience the perfect sleep tonight.</p>
          
          <div className="bg-secondary/10 border-2 border-dashed border-secondary/50 rounded-xl p-4 mb-6">
            <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-1">Use Code</p>
            <p className="text-3xl font-black text-slate-800 tracking-widest">SLEEP10</p>
          </div>

          <Button className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            Shop Now with Discount
          </Button>
          
          <button onClick={() => setIsOpen(false)} className="mt-4 text-sm text-muted-foreground hover:underline">
            No thanks, I prefer sleeping poorly
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
