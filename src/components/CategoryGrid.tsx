import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import memoryFoamImg from "@/assets/mattress-memory-foam.jpg";
import orthopedicImg from "@/assets/mattress-orthopedic.jpg";
import latexImg from "@/assets/mattress-latex.jpg";
import hybridImg from "@/assets/mattress-hybrid.jpg";
import coolingImg from "@/assets/mattress-cooling.jpg";
import kidsImg from "@/assets/mattress-kids.jpg";

const categories = [
  { name: "Memory Foam", image: memoryFoamImg, path: "/products", color: "from-blue-500/80 to-blue-700/80" },
  { name: "Orthopedic", image: orthopedicImg, path: "/products", color: "from-emerald-500/80 to-emerald-700/80" },
  { name: "Natural Latex", image: latexImg, path: "/products", color: "from-green-500/80 to-green-700/80" },
  { name: "Hybrid", image: hybridImg, path: "/products", color: "from-indigo-500/80 to-indigo-700/80" },
  { name: "Cooling Gel", image: coolingImg, path: "/products", color: "from-cyan-500/80 to-cyan-700/80" },
  { name: "Kids Mattress", image: kidsImg, path: "/products", color: "from-pink-500/80 to-pink-700/80" },
];

const CategoryGrid = () => (
  <section className="py-14 bg-white dark:bg-background relative overflow-hidden">
    {/* Decorative background orbs */}
    <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-50/60 dark:bg-blue-900/5 blur-3xl pointer-events-none" />
    <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-blue-100/30 dark:bg-blue-900/5 blur-3xl pointer-events-none" />

    <div className="container relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-px w-10 bg-[#3B82F6]" />
          <span className="text-[#3B82F6] font-bold text-[11px] tracking-[0.2em] uppercase font-montserrat">
            Categories
          </span>
          <div className="h-px w-10 bg-[#3B82F6]" />
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-[#111827] dark:text-gray-100 mb-3 font-playfair">Shop By Category</h2>
        <p className="text-gray-500 font-montserrat">Find the perfect mattress for every need</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6">
        {categories.map((cat, idx) => (
          <Link
            key={cat.name}
            to={cat.path}
            className="group flex flex-col items-center text-center"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            {/* Circle thumbnail with ring */}
            <div className="relative w-full aspect-square max-w-[160px] mx-auto mb-4">
              <div className="w-full h-full rounded-full overflow-hidden border-[3px] border-gray-100 dark:border-border/50 shadow-soft group-hover:border-[#3B82F6]/50 group-hover:shadow-premium transition-all duration-500 ease-out group-hover:-translate-y-2">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-115"
                  loading="lazy"
                />
                {/* Hover overlay with arrow */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-t ${cat.color} opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center`}>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Label with animated underline */}
            <span className="relative text-sm font-bold text-[#111827] dark:text-gray-100 group-hover:text-[#3B82F6] transition-colors duration-300 font-montserrat">
              {cat.name}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-0.5 bg-[#3B82F6] transition-all duration-400 rounded-full" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoryGrid;
