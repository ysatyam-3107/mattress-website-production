import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ChevronRight, CreditCard, Lock, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const Checkout = () => {
  const { items: cart, totalPrice: subtotal } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-playfair font-bold text-[#1E3A8A] mb-4">Your cart is empty</h1>
        <Link to="/products">
          <Button size="lg" className="bg-[#3B82F6] hover:bg-blue-600 font-montserrat">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO title="Secure Checkout" description="Complete your secure checkout at Mustafa's Mattress." />
      <div className="bg-gray-50 min-h-screen pb-20">
        <div className="bg-white border-b border-gray-200 py-6">
          <div className="container max-w-6xl flex justify-center">
             <div className="flex items-center gap-4 text-sm font-montserrat font-bold text-gray-400">
                <span className={`flex items-center gap-2 ${step >= 1 ? "text-[#1E3A8A]" : ""}`}>
                   <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${step >= 1 ? "bg-[#1E3A8A]" : "bg-gray-300"}`}>1</span> Shipping
                </span>
                <ChevronRight className="w-4 h-4" />
                <span className={`flex items-center gap-2 ${step >= 2 ? "text-[#1E3A8A]" : ""}`}>
                   <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${step >= 2 ? "bg-[#1E3A8A]" : "bg-gray-300"}`}>2</span> Payment
                </span>
                <ChevronRight className="w-4 h-4" />
                <span className={`flex items-center gap-2 ${step >= 3 ? "text-[#1E3A8A]" : ""}`}>
                   <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${step >= 3 ? "bg-[#1E3A8A]" : "bg-gray-300"}`}>3</span> Confirm
                </span>
             </div>
          </div>
        </div>

        <div className="container max-w-6xl py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Main Form Area */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
               {step === 1 && (
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
                     <h2 className="text-2xl font-playfair font-bold text-[#1E3A8A] mb-6">Shipping Address</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-montserrat">
                        <input className="w-full bg-gray-50 rounded-xl px-4 py-3 outline-none border border-gray-200 focus:border-[#3B82F6]" placeholder="First Name" />
                        <input className="w-full bg-gray-50 rounded-xl px-4 py-3 outline-none border border-gray-200 focus:border-[#3B82F6]" placeholder="Last Name" />
                        <input className="w-full bg-gray-50 rounded-xl px-4 py-3 outline-none border border-gray-200 focus:border-[#3B82F6] md:col-span-2" placeholder="Address Line 1" />
                        <input className="w-full bg-gray-50 rounded-xl px-4 py-3 outline-none border border-gray-200 focus:border-[#3B82F6] md:col-span-2" placeholder="Address Line 2 (Optional)" />
                        <input className="w-full bg-gray-50 rounded-xl px-4 py-3 outline-none border border-gray-200 focus:border-[#3B82F6]" placeholder="City" />
                        <input className="w-full bg-gray-50 rounded-xl px-4 py-3 outline-none border border-gray-200 focus:border-[#3B82F6]" placeholder="PIN Code" />
                     </div>
                     <div className="mt-8 flex justify-end">
                        <Button size="lg" className="bg-[#1E3A8A] hover:bg-blue-900 w-full sm:w-auto rounded-xl font-bold font-montserrat btn-press" onClick={() => setStep(2)}>
                          Proceed to Payment <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                     </div>
                  </div>
               )}

               {step === 2 && (
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
                     <h2 className="text-2xl font-playfair font-bold text-[#1E3A8A] mb-6 flex items-center gap-2">
                        <CreditCard className="w-6 h-6 text-[#3B82F6]" /> Payment Method
                     </h2>
                     <div className="space-y-4 font-montserrat">
                        <label className="flex items-center gap-4 p-4 border border-[#3B82F6] bg-blue-50/50 rounded-xl cursor-pointer">
                           <input type="radio" name="payment" className="w-5 h-5 accent-[#3B82F6]" defaultChecked />
                           <span className="font-bold text-[#1E3A8A]">Credit / Debit Card</span>
                        </label>
                        <div className="pl-14 pr-4 space-y-4">
                           <input className="w-full bg-white rounded-xl px-4 py-3 outline-none border border-gray-200 focus:border-[#3B82F6]" placeholder="Card Number" />
                           <div className="grid grid-cols-2 gap-4">
                              <input className="w-full bg-white rounded-xl px-4 py-3 outline-none border border-gray-200 focus:border-[#3B82F6]" placeholder="MM/YY" />
                              <input className="w-full bg-white rounded-xl px-4 py-3 outline-none border border-gray-200 focus:border-[#3B82F6]" placeholder="CVC" />
                           </div>
                        </div>
                        <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                           <input type="radio" name="payment" className="w-5 h-5 accent-[#3B82F6]" />
                           <span className="font-bold text-gray-700">UPI / QR Code</span>
                        </label>
                        <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                           <input type="radio" name="payment" className="w-5 h-5 accent-[#3B82F6]" />
                           <span className="font-bold text-gray-700">Cash on Delivery</span>
                        </label>
                     </div>
                     <div className="mt-8 flex justify-between">
                        <Button variant="ghost" onClick={() => setStep(1)} className="font-montserrat">Back</Button>
                        <Button size="lg" className="bg-[#3B82F6] hover:bg-blue-600 rounded-xl font-bold font-montserrat btn-press" onClick={() => setStep(3)}>
                          <Lock className="w-4 h-4 mr-2" /> Pay ₹{total.toLocaleString()}
                        </Button>
                     </div>
                  </div>
               )}

               {step === 3 && (
                  <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center animate-fade-in relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-green-400/10 rounded-full blur-3xl pointer-events-none" />
                     <div className="flex justify-center mb-6 relative z-10">
                        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                           <Check className="w-12 h-12 text-green-600" />
                        </div>
                     </div>
                     <h2 className="text-4xl font-playfair font-black text-[#1E3A8A] mb-4 relative z-10">Order Confirmed!</h2>
                     <p className="text-gray-500 font-montserrat mb-8 relative z-10 max-w-md mx-auto">
                        Your order #ORD-{(Math.random() * 100000).toFixed(0)} has been placed successfully. You will receive a confirmation email shortly.
                     </p>
                     <Link to="/">
                        <Button size="lg" className="bg-[#1E3A8A] hover:bg-blue-900 rounded-xl font-bold font-montserrat px-8 relative z-10">Continue Shopping</Button>
                     </Link>
                  </div>
               )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 sticky top-24">
                 <h3 className="text-xl font-playfair font-bold text-[#1E3A8A] mb-6">Order Summary</h3>
                 <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 scrollbar-hide">
                    {cart.map((item, idx) => (
                       <div key={idx} className="flex gap-4">
                          <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                             <img src={item.product.image} className="w-full h-full object-cover mix-blend-multiply" />
                          </div>
                          <div>
                             <p className="font-bold text-gray-900 text-sm font-montserrat leading-tight">{item.product.name}</p>
                             <p className="text-gray-500 text-xs font-montserrat mt-1">{item.size} • Qty: {item.quantity}</p>
                             <p className="font-bold text-[#3B82F6] text-sm font-montserrat mt-1">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                          </div>
                       </div>
                    ))}
                 </div>
                 <div className="space-y-3 font-montserrat text-sm border-t border-gray-100 pt-6 mb-6">
                    <div className="flex justify-between text-gray-600">
                       <span>Subtotal</span>
                       <span className="font-medium text-gray-900">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                       <span>GST (18%)</span>
                       <span className="font-medium text-gray-900">₹{Math.round(tax).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                       <span>Shipping</span>
                       <span className="font-bold uppercase tracking-wider">Free</span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold text-[#1E3A8A] pt-4 border-t border-gray-100">
                       <span>Total</span>
                       <span>₹{Math.round(total).toLocaleString()}</span>
                    </div>
                 </div>

                 <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-[#1E3A8A] font-medium font-montserrat">
                       <ShieldCheck className="w-5 h-5 text-[#3B82F6]" /> Secure 256-bit Encryption
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#1E3A8A] font-medium font-montserrat">
                       <Truck className="w-5 h-5 text-[#3B82F6]" /> Free Delivery in 5-7 Days
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
