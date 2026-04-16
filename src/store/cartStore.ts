import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/products";

interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  wishlist: string[];
  
  // Actions
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isCartOpen: false,
      wishlist: [],

      setIsCartOpen: (open) => set({ isCartOpen: open }),

      addToCart: (product, size) =>
        set((state) => {
          const itemSize = size || product.sizes[0];
          const existing = state.items.find(
            (i) => i.product.id === product.id && i.size === itemSize
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id && i.size === itemSize
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
              isCartOpen: true,
            };
          }
          return {
            items: [...state.items, { product, quantity: 1, size: itemSize }],
            isCartOpen: true,
          };
        }),

      removeFromCart: (productId, size) =>
        set((state) => ({
          items: size
            ? state.items.filter((i) => !(i.product.id === productId && i.size === size))
            : state.items.filter((i) => i.product.id !== productId),
        })),

      updateQuantity: (productId, size, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((i) => !(i.product.id === productId && i.size === size)),
            };
          }
          return {
            items: state.items.map((i) =>
              i.product.id === productId && i.size === size ? { ...i, quantity } : i
            ),
          };
        }),

      clearCart: () => set({ items: [] }),

      toggleWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.includes(productId)
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId],
        })),
    }),
    {
      name: "mustafas-mattress-store",
      partialize: (state) => ({ items: state.items, wishlist: state.wishlist }),
    }
  )
);

// Helper hooks for derived state to avoid re-rendering
export const useCartTotalItems = () => useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
export const useCartTotalPrice = () => useCartStore((state) => state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0));
