import { Link } from "react-router-dom";
import memoryFoamImg from "@/assets/mattress-memory-foam.jpg";
import orthopedicImg from "@/assets/mattress-orthopedic.jpg";
import latexImg from "@/assets/mattress-latex.jpg";
import hybridImg from "@/assets/mattress-hybrid.jpg";
import coolingImg from "@/assets/mattress-cooling.jpg";
import kidsImg from "@/assets/mattress-kids.jpg";

const categories = [
  { name: "Memory Foam", image: memoryFoamImg, path: "/products" },
  { name: "Orthopedic", image: orthopedicImg, path: "/products" },
  { name: "Natural Latex", image: latexImg, path: "/products" },
  { name: "Hybrid", image: hybridImg, path: "/products" },
  { name: "Cooling Gel", image: coolingImg, path: "/products" },
  { name: "Kids Mattress", image: kidsImg, path: "/products" },
];

const CategoryGrid = () => (
  <section className="py-16 bg-white dark:bg-background">
    <div className="container">
      <h2 className="text-3xl font-bold text-[#111827] dark:text-gray-100 mb-2 font-playfair">Shop By Categories</h2>
      <p className="text-gray-500 mb-10 font-montserrat">Find the perfect mattress for every need</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={cat.path}
            className="group flex flex-col items-center text-center"
          >
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 dark:bg-muted/30 border border-gray-100 dark:border-border/50 mb-3 transition-all duration-500 ease-out group-hover:shadow-[0_12px_40px_-8px_rgba(30,58,138,0.15)] group-hover:-translate-y-1.5 group-hover:border-[#3B82F6]/30">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <span className="text-sm font-bold text-[#111827] dark:text-gray-100 group-hover:text-[#3B82F6] transition-colors duration-300 font-montserrat">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoryGrid;
