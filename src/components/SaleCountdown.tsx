import { useState, useEffect } from "react";
import { Clock, Users, Truck, RotateCcw, Shield } from "lucide-react";

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
  { icon: Users, label: "50K+", sublabel: "Customers" },
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
    <div className="text-center">
      <div className="bg-[#1E3A8A] text-white font-extrabold text-xl sm:text-2xl w-12 sm:w-14 h-12 sm:h-14 rounded-xl flex items-center justify-center shadow-md font-montserrat">
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1 block font-montserrat">{label}</span>
    </div>
  );

  return (
    <div className="bg-white dark:bg-card border-y border-gray-100 dark:border-border py-4">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: Countdown */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#3B82F6]" />
              <span className="font-bold text-[#111827] dark:text-gray-100 text-sm sm:text-base whitespace-nowrap font-montserrat">
                {timeLeft.expired ? "Sale Ended" : "Sale Ends In:"}
              </span>
            </div>
            {!timeLeft.expired && (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <TimeBox value={timeLeft.days} label="Days" />
                <span className="text-xl font-bold text-[#1E3A8A] pb-5">:</span>
                <TimeBox value={timeLeft.hours} label="Hrs" />
                <span className="text-xl font-bold text-[#1E3A8A] pb-5">:</span>
                <TimeBox value={timeLeft.mins} label="Mins" />
                <span className="text-xl font-bold text-[#1E3A8A] pb-5">:</span>
                <TimeBox value={timeLeft.secs} label="Secs" />
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-12 bg-gray-200 dark:bg-border" />

          {/* Right: Trust Badges */}
          <div className="flex items-center gap-6 sm:gap-8">
            <span className="text-[#1E3A8A] dark:text-blue-400 font-bold text-sm hidden sm:block whitespace-nowrap font-montserrat">
              Why Mustafa's?
            </span>
            {trustBadges.map((badge) => (
              <div key={badge.sublabel} className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                  <badge.icon className="w-4 h-4 text-[#3B82F6]" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-bold text-[#111827] dark:text-gray-100 leading-tight font-montserrat">{badge.label}</p>
                  <p className="text-[10px] text-gray-400 font-montserrat">{badge.sublabel}</p>
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
