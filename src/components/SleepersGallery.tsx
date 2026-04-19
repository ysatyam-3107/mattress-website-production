import { sleepersGallery } from "@/data/gallery";
import { Camera, MapPin, Quote } from "lucide-react";
import { motion } from "framer-motion";

export const SleepersGallery = () => {
  return (
    <section className="py-14 bg-white overflow-hidden">
      <div className="container">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#3B82F6] text-xs font-bold uppercase tracking-widest mb-6">
            <Camera className="w-4 h-4" /> Real Homes, Real Sleep
          </div>
          <h2 className="text-5xl font-black text-[#111827] mb-6 font-playfair leading-tight">
            The Sleepers <span className="text-[#3B82F6]">Gallery</span>
          </h2>
          <p className="text-xl text-slate-500 font-montserrat leading-relaxed">
            See how Mustafa's Mattresses look and feel in actual bedrooms across the country. Join 50,000+ happy sleepers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[250px] gap-4">
          {sleepersGallery.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`group relative rounded-[2rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 ${item.gridSpan}`}
            >
              <img 
                src={item.image} 
                alt={item.userName} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2">
                    <MapPin className="w-3 h-3" /> {item.location}
                  </div>
                  <h4 className="text-white font-black text-xl font-playfair mb-2">{item.userName}</h4>
                  <p className="text-blue-300 font-bold text-xs mb-4 uppercase tracking-tighter">Model: {item.mattressName}</p>
                  <div className="flex gap-2 items-start bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                    <Quote className="w-4 h-4 text-white/40 shrink-0" />
                    <p className="text-white/90 text-sm font-medium italic italic leading-tight">{item.quote}</p>
                  </div>
                </div>
              </div>

              {/* Tag in inactive state */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-bold text-[#1E3A8A] uppercase tracking-tighter shadow-sm group-hover:opacity-0 transition-opacity">
                 {item.userName} — {item.location}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
           <div className="inline-block p-1 rounded-full bg-slate-100 border border-slate-200">
              <button className="px-10 py-5 bg-[#1E3A8A] text-white rounded-full font-black font-montserrat shadow-xl shadow-blue-900/20 hover:bg-blue-900 hover:-translate-y-1 transition-all flex items-center gap-3">
                 Share Your Bedroom Photo <Camera className="w-5 h-5" />
              </button>
           </div>
           <p className="mt-6 text-slate-400 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
              <span className="w-8 h-[1px] bg-slate-200" /> Use #MustafaSleep on Instagram to be featured <span className="w-8 h-[1px] bg-slate-200" />
           </p>
        </div>
      </div>
    </section>
  );
};
