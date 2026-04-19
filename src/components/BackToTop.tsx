import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
      
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG circle parameters
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#1E3A8A] text-white shadow-premium hover:shadow-glow-blue flex items-center justify-center transition-all duration-500 group ${
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-90 pointer-events-none"
      }`}
    >
      {/* Progress ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="rgba(59, 130, 246, 0.2)"
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-all duration-200 ease-out"
        />
      </svg>
      <ArrowUp className="w-5 h-5 relative z-10 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
};

export default BackToTop;
