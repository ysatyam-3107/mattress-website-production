import { X, ArrowRightLeft, LayoutGrid, Trash2 } from "lucide-react";
import { useCompare } from "@/contexts/CompareContext";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { CompareModal } from "./CompareModal";

export const CompareBar = () => {
  const { selectedProducts, removeFromCompare, clearCompare, isCompareOpen, setIsCompareOpen } = useCompare();

  if (selectedProducts.length === 0) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[95%] max-w-2xl"
        >
          <div className="bg-[#1E3A8A] text-white p-4 rounded-3xl shadow-[0_20px_50px_rgba(30,58,138,0.3)] border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-4 flex-1">
                <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-white/10 items-center justify-center">
                  <ArrowRightLeft className="w-6 h-6 text-blue-200" />
                </div>
                <div className="flex gap-2">
                  {selectedProducts.map((p) => (
                    <div key={p.id} className="group relative">
                      <div className="w-14 h-14 rounded-xl bg-white/20 p-1 border border-white/20 overflow-hidden shadow-inner">
                        <img src={p.image} className="w-full h-full object-cover mix-blend-screen opacity-90" alt={p.name} />
                      </div>
                      <button 
                        onClick={() => removeFromCompare(p.id)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-[#1E3A8A] opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}
                  {/* Empty slots */}
                  {[...Array(3 - selectedProducts.length)].map((_, i) => (
                    <div key={i} className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center dashed border-dashed">
                      <LayoutGrid className="w-4 h-4 text-white/20" />
                    </div>
                  ))}
                </div>
                <div>
                   <p className="text-sm font-bold font-montserrat tracking-tight leading-none">{selectedProducts.length} Selected</p>
                   <p className="text-[10px] text-blue-200 font-medium uppercase tracking-wider mt-1.5 flex items-center gap-2 cursor-pointer hover:text-white transition-colors" onClick={clearCompare}>
                    <Trash2 className="w-3 h-3" /> Clear items
                   </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button 
                  disabled={selectedProducts.length < 2}
                  onClick={() => setIsCompareOpen(true)}
                  className={`h-14 px-8 rounded-2xl font-bold font-montserrat shadow-xl transition-all ${
                    selectedProducts.length >= 2 
                    ? "bg-[#3B82F6] hover:bg-blue-400 text-white" 
                    : "bg-white/10 text-white/50 cursor-not-allowed"
                  }`}
                >
                  {selectedProducts.length < 2 ? "Select at least 2" : "Compare Now"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <CompareModal />
    </>
  );
};
