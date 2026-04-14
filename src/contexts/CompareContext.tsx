import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { Product, products } from "@/data/products";
import { toast } from "sonner";

interface CompareContextType {
  selectedIds: string[];
  selectedProducts: Product[];
  toggleCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
}

const COMPARE_STORAGE_KEY = "mustafas-mattress-compare";

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Load from storage
  useEffect(() => {
    const stored = localStorage.getItem(COMPARE_STORAGE_KEY);
    if (stored) {
      try {
        setSelectedIds(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse compare data", e);
      }
    }
  }, []);

  // Save to storage
  useEffect(() => {
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(selectedIds));
  }, [selectedIds]);

  const toggleCompare = useCallback((id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      }
      if (prev.length >= 3) {
        toast.error("You can only compare up to 3 mattresses at once.", {
          description: "Remove one item to add another.",
        });
        return prev;
      }
      toast.success("Added to comparison", {
        description: "Select more or view comparison now.",
      });
      return [...prev, id];
    });
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  }, []);

  const clearCompare = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const selectedProducts = selectedIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => !!p);

  return (
    <CompareContext.Provider
      value={{
        selectedIds,
        selectedProducts,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        isCompareOpen,
        setIsCompareOpen,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare must be used within CompareProvider");
  return context;
};
