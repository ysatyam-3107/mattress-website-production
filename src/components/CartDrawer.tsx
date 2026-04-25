import { X, Plus, Minus, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCartStore, useCartTotalPrice } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { TrustBadges } from "@/components/TrustBadges";
import { createShopifyCheckout } from "@/api/cart";
import { Loader2 } from "lucide-react";

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useCartStore();
  const totalPrice = useCartTotalPrice();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const checkoutUrl = await createShopifyCheckout(items);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to initiate checkout. Please try again.");
      setIsCheckingOut(false);
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50" onClick={() => setIsCartOpen(false)} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-surface z-50 shadow-2xl flex flex-col animate-fade-up">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <ShoppingBag className="h-12 w-12" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" loading="lazy" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.product.name}</h3>
                    <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                    <p className="text-sm font-semibold text-primary mt-1">₹{item.product.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="ml-auto text-xs text-destructive" onClick={() => removeFromCart(item.product.id, item.size)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-border space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-sm">₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-medium text-success uppercase text-[10px] tracking-wider">Free</span>
              </div>
              <Button 
                onClick={handleCheckout} 
                disabled={isCheckingOut}
                className="w-full mt-4 bg-[#1E3A8A] hover:bg-blue-900 border-[#1E3A8A] border h-10 text-sm font-montserrat font-bold shadow-md btn-press"
              >
                {isCheckingOut ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Redirecting...</>
                ) : (
                  `Checkout — ₹${totalPrice.toLocaleString()}`
                )}
              </Button>
              <div className="flex items-center justify-center gap-1.5 pt-1 text-[#3B82F6]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-[10px] font-montserrat font-bold uppercase tracking-tight">Secure Payment</span>
              </div>
              
              {/* Compact Trust Badges */}
              <div className="pt-3 border-t border-gray-100 mt-4">
                <TrustBadges variant="compact" />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
