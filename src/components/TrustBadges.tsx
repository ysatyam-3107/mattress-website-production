import { ShieldCheck, Truck, RotateCcw, Award, Star, Flame, Fingerprint } from "lucide-react";

export const TrustBadges = ({ variant = "horizontal" }: { variant?: "horizontal" | "grid" | "vertical" | "compact" }) => {
  const badges = [
    { icon: Truck, text: "Free Fast Shipping", subtext: "Delivery in 5-7 days" },
    { icon: RotateCcw, text: "100 Night Trial", subtext: "Risk-free sleep" },
    { icon: ShieldCheck, text: "10-Year Warranty", subtext: "Built to last" },
    { icon: Award, text: "CertiPUR-US®", subtext: "Certified safe foams" },
    { icon: Fingerprint, text: "Anti-Microbial", subtext: "Hygienic protection" },
    { icon: Flame, text: "Eco-Friendly", subtext: "Sustainable materials" },
  ];

  if (variant === "grid") {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 py-10 border-t border-gray-100">
        {badges.map((badge, idx) => (
          <div key={idx} className="flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-gray-50 hover:border-blue-100 transition-colors shadow-sm">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3 text-[#3B82F6]">
              <badge.icon className="w-6 h-6" />
            </div>
            <p className="font-bold text-[#1E3A8A] text-sm font-montserrat">{badge.text}</p>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter mt-1">{badge.subtext}</p>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="grid grid-cols-2 gap-4 py-4">
        {badges.slice(0, 4).map((badge, idx) => (
          <div key={idx} className="flex gap-3 items-start p-2 rounded-xl bg-gray-50/50 border border-gray-100">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
              <badge.icon className="w-4 h-4 text-[#3B82F6]" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-[#111827] text-[10px] font-montserrat uppercase tracking-tight leading-tight truncate">{badge.text}</p>
              <p className="text-gray-400 text-[9px] font-medium leading-none truncate mt-0.5">{badge.subtext}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex ${variant === "vertical" ? "flex-col gap-6" : "flex-wrap gap-8"} justify-center py-8`}>
      {badges.slice(0, 4).map((badge, idx) => (
        <div key={idx} className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-[#3B82F6] group-hover:border-[#3B82F6] transition-all">
            <badge.icon className="w-5 h-5 text-[#3B82F6] group-hover:text-white transition-colors" />
          </div>
          <div>
            <p className="font-bold text-[#111827] text-xs font-montserrat uppercase tracking-wider">{badge.text}</p>
            <p className="text-gray-400 text-[10px] font-medium">{badge.subtext}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
