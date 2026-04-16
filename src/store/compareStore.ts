import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import { Product, products } from "@/data/products";

interface CompareState {
  selectedIds: string[];
  isCompareOpen: boolean;
  
  setIsCompareOpen: (open: boolean) => void;
  toggleCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      selectedIds: [],
      isCompareOpen: false,

      setIsCompareOpen: (open) => set({ isCompareOpen: open }),

      toggleCompare: (id) =>
        set((state) => {
          if (state.selectedIds.includes(id)) {
            return { selectedIds: state.selectedIds.filter((i) => i !== id) };
          }
          if (state.selectedIds.length >= 3) {
            toast.error("You can only compare up to 3 mattresses at once.", {
              description: "Remove one item to add another.",
            });
            return state;
          }
          toast.success("Added to comparison", {
            description: "Select more or view comparison now.",
          });
          return { selectedIds: [...state.selectedIds, id] };
        }),

      removeFromCompare: (id) =>
        set((state) => ({
          selectedIds: state.selectedIds.filter((i) => i !== id),
        })),

      clearCompare: () => set({ selectedIds: [] }),
    }),
    {
      name: "mustafas-mattress-compare",
      partialize: (state) => ({ selectedIds: state.selectedIds }),
    }
  )
);

// Helper hook
export const useCompareProducts = () => {
  const selectedIds = useCompareStore((state) => state.selectedIds);
  return selectedIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => !!p);
};
