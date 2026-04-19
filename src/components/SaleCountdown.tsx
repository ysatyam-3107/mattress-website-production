import { useState, useEffect } from "react";
import { Clock, Users, Truck, RotateCcw, Shield, Sparkles } from "lucide-react";

// Admin-configurable sale end date — change this to set a new sale deadline
const SALE_END_DATE = new Date("2026-04-30T23:59:59");

const calculateTimeLeft = (endDate: Date) => {
  const diff = endDate.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0, expired: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    mins: Math.floor((diff / (1000 * 60)) % 60),
    secs: Math.floor((diff / 1000) % 60),
    expired: false,
  };
};

const trustBadges = [
  { icon: Users, label: "50K+", sublabel: "Happy Sleepers" },
  { icon: Truck, label: "Free", sublabel: "Shipping" },
  { icon: RotateCcw, label: "100-Night", sublabel: "Trial" },
  { icon: Shield, label: "10-Year", sublabel: "Warranty" },
];

const SaleCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(SALE_END_DATE));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(SALE_END_DATE));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="text-center group">
      <div className="relative bg-gradient-to-br from-[#1E3A8A] to-[#0f1d47] text-white font-extrabold text-xl sm:text-2xl w-14 sm:w-16 h-14 sm:h-16 rounded-2xl flex items-center justify-center shadow-premium font-montserrat border border-white/5 overflow-hidden">
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-2xl" />
        <span className="relative z-10 tabular-nums">{String(value).padStart(2, "0")}</span>
      </div>
      <span className="text-[10px] text-warm-gray font-bold uppercase tracking-widest mt-2 block font-montserrat">{label}</span>
    </div>
  );

  return (
    <div className="relative bg-white dark:bg-card border-y border-gray-100/80 dark:border-border py-5 overflow-hidden">
      {/* Subtle animated gradient ribbon */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/50 to-transparent dark:via-blue-900/5 animate-gradient-slow opacity-60" />
      
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: Countdown */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-glow-gold">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-black text-[#111827] dark:text-gray-100 text-sm sm:text-base whitespace-nowrap font-montserrat block leading-tight">
                  {timeLeft.expired ? "Sale Ended" : "Flash Sale"}
                </span>
                {!timeLeft.expired && (
                  <span className="text-[10px] text-gold-dark font-bold uppercase tracking-wider font-montserrat">Ends soon</span>
                )}
              </div>
            </div>
            {!timeLeft.expired && (
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                <TimeBox value={timeLeft.days} label="Days" />
                <span className="text-xl font-black text-[#1E3A8A]/30 pb-5 select-none">:</span>
                <TimeBox value={timeLeft.hours} label="Hrs" />
                <span className="text-xl font-black text-[#1E3A8A]/30 pb-5 select-none">:</span>
                <TimeBox value={timeLeft.mins} label="Mins" />
                <span className="text-xl font-black text-[#1E3A8A]/30 pb-5 select-none">:</span>
                <TimeBox value={timeLeft.secs} label="Secs" />
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-14 bg-gradient-to-b from-transparent via-gray-200 dark:via-border to-transparent" />

          {/* Right: Trust Badges */}
          <div className="flex items-center gap-5 sm:gap-7">
            {trustBadges.map((badge) => (
              <div key={badge.sublabel} className="flex items-center gap-2.5 group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center group-hover:bg-[#3B82F6] group-hover:shadow-glow-blue transition-all duration-400 border border-blue-100/50 dark:border-blue-800/30">
                  <badge.icon className="w-4.5 h-4.5 text-[#3B82F6] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-extrabold text-[#111827] dark:text-gray-100 leading-tight font-montserrat">{badge.label}</p>
                  <p className="text-[10px] text-warm-gray font-medium font-montserrat">{badge.sublabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleCountdown;
