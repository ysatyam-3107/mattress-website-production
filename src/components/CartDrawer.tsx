import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice } = useCart();

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
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-md" loading="lazy" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.product.name}</h3>
                    <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                    <p className="text-sm font-semibold text-primary mt-1">₹{item.product.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="ml-auto text-xs text-destructive" onClick={() => removeFromCart(item.product.id)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-border space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-medium text-success">FREE</span>
              </div>
              <Button className="w-full" size="lg">
                Checkout — ₹{totalPrice.toLocaleString()}
              </Button>
              <p className="text-xs text-center text-muted-foreground">EMI options available from ₹999/month</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
