import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const SizeGuideModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm text-[#3B82F6] hover:underline hover:text-[#1E3A8A] font-semibold transition-colors">
          Size Guide
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair font-bold text-[#1E3A8A]">Mattress Size Guide</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-gray-600 mb-6 font-montserrat">
            Find the perfect mattress size for your room. All dimensions are in inches (W x L).
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left font-montserrat">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="p-4 font-bold text-[#111827]">Size</th>
                  <th className="p-4 font-bold text-[#111827]">Dimensions (Inches)</th>
                  <th className="p-4 font-bold text-[#111827]">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                <tr className="hover:bg-gray-50/50">
                  <td className="p-4 font-bold text-[#3B82F6]">Single</td>
                  <td className="p-4 text-gray-700">36" x 72" / 75" / 78"</td>
                  <td className="p-4 text-gray-500">Solo sleepers, kids, small guest rooms.</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="p-4 font-bold text-[#3B82F6]">Double</td>
                  <td className="p-4 text-gray-700">48" x 72" / 75" / 78"</td>
                  <td className="p-4 text-gray-500">Single adults who need space, teens.</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="p-4 font-bold text-[#3B82F6]">Queen</td>
                  <td className="p-4 text-gray-700">60" x 72" / 75" / 78"</td>
                  <td className="p-4 text-gray-500">Couples, primary bedrooms, most popular.</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="p-4 font-bold text-[#3B82F6]">King</td>
                  <td className="p-4 text-gray-700">72" x 72" / 75" / 78"</td>
                  <td className="p-4 text-gray-500">Couples needing extra space, co-sleeping with kids/pets.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-blue-50 mt-6 p-4 rounded-xl border border-blue-100 flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center text-white font-bold shrink-0">!</div>
            <p className="text-sm font-medium text-[#1E3A8A] leading-relaxed">
              <strong>Measuring Tip:</strong> Always measure your bed frame from the inside edge to inside edge (where the mattress sits) before ordering. When in doubt, a slightly smaller mattress is better than one that's too big.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
