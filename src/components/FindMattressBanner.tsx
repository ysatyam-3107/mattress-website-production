import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FindMattressBanner = () => (
  <section className="py-6">
    <div className="container">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1E3A8A] via-[#2d4da6] to-[#3B82F6] px-8 py-10 sm:px-12 sm:py-14 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 pointer-events-none" />

        <div className="relative z-10 text-center md:text-left">
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight font-playfair">
            Confused?
          </h3>
          <p className="text-lg sm:text-xl text-blue-100/80 font-medium max-w-md font-montserrat">
            Find your perfect mattress! Take our 60-second quiz and get a personalized recommendation.
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <a href="#sleep-quiz">
            <Button
              size="lg"
              className="bg-white text-[#1E3A8A] hover:bg-blue-50 font-bold px-8 h-14 rounded-xl shadow-xl text-lg transition-all btn-press hover:shadow-2xl group font-montserrat"
            >
              FIND MY MATTRESS
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>

        {/* Floating mattress layer visual */}
        <div className="absolute right-8 bottom-0 hidden xl:flex flex-col items-center gap-1 opacity-15 pointer-events-none">
          <div className="w-48 h-4 bg-white rounded-full" />
          <div className="w-52 h-6 bg-white/80 rounded-full" />
          <div className="w-56 h-8 bg-white/60 rounded-full" />
          <div className="w-60 h-12 bg-white/40 rounded-lg" />
        </div>
      </div>
    </div>
  </section>
);

export default FindMattressBanner;
