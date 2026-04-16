import { X, Check, ShoppingCart, Info } from "lucide-react";
import { useCompareStore, useCompareProducts } from "@/store/compareStore";
import { useCartStore } from "@/store/cartStore";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const CompareModal = () => {
  const { isCompareOpen, setIsCompareOpen } = useCompareStore();
  const selectedProducts = useCompareProducts();
  const { addToCart } = useCartStore();

  const specs = [
    { label: "Price", key: "price", format: (v: number) => `₹${v.toLocaleString()}` },
    { label: "Material", key: "type", format: (v: string) => v.charAt(0).toUpperCase() + v.slice(1).replace("-", " ") },
    { label: "Firmness", key: "firmness", format: (v: string) => v.charAt(0).toUpperCase() + v.slice(1) },
    { label: "Thickness", key: "thickness" },
    { label: "Support Layers", key: "layers" },
    { label: "Warranty", key: "warranty" },
    { label: "Trial Period", key: "trialPeriod" },
    { label: "Rating", key: "rating", format: (v: number) => `${v} / 5` },
  ];

  return (
    <Dialog open={isCompareOpen} onOpenChange={setIsCompareOpen}>
      <DialogContent className="max-w-5xl h-[85vh] overflow-hidden flex flex-col p-0 gap-0 border-none rounded-[2rem] shadow-2xl">
        <DialogHeader className="p-8 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-3xl font-black font-playfair text-[#1E3A8A]">Compare Mattresses</DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto p-0 scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-white sticky top-0 z-10">
                <th className="p-8 w-1/4 bg-slate-50/50 backdrop-blur border-b border-r border-slate-100">
                   <div className="flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 rounded-full bg-blue-100 text-[#3B82F6] flex items-center justify-center mb-4">
                         <Info className="w-6 h-6" />
                      </div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Technical Specifications</p>
                   </div>
                </th>
                {selectedProducts.map((p) => (
                  <th key={p.id} className="p-8 w-1/4 border-b border-slate-100 font-montserrat min-w-[200px]">
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-24 bg-slate-50 rounded-2xl p-2 mb-4 overflow-hidden border border-slate-100 translate-y-0 group-hover:-translate-y-1 transition-transform">
                        <img src={p.image} className="w-full h-full object-cover mix-blend-multiply" alt={p.name} />
                      </div>
                      <h4 className="text-sm font-black text-[#111827] text-center mb-1 leading-tight">{p.name}</h4>
                      <p className="text-[#3B82F6] font-bold text-sm mb-4">₹{p.price.toLocaleString()}</p>
                      <Button 
                         size="sm" 
                         className="w-full bg-[#1E3A8A] hover:bg-blue-900 rounded-xl"
                         onClick={() => addToCart(p)}
                      >
                         <ShoppingCart className="w-4 h-4 mr-2" /> Add
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-montserrat">
              {specs.map((spec) => (
                <tr key={spec.key} className="group hover:bg-blue-50/30 transition-colors">
                  <td className="p-6 bg-slate-50/30 font-bold text-slate-500 text-xs uppercase tracking-wider border-r border-slate-100">{spec.label}</td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="p-6 text-center text-sm font-semibold text-slate-700">
                      {spec.format ? spec.format((p as any)[spec.key]) : (p as any)[spec.key]}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-6 bg-slate-50/30 font-bold text-slate-500 text-xs uppercase tracking-wider border-r border-slate-100 align-top">Key Features</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-6">
                    <ul className="space-y-2">
                      {p.features.slice(0, 4).map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-[10px] font-bold text-slate-600 bg-white border border-slate-100 p-2 rounded-lg leading-tight uppercase tracking-tighter">
                          <Check className="w-3 h-3 text-green-500 mt-0.5 shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
