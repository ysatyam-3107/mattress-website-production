import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Check, ChevronRight, ChevronLeft, CreditCard, Lock, ShieldCheck, Truck, AlertCircle } from "lucide-react";
import { useCartStore, useCartTotalPrice } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, CheckoutFormData } from "@/lib/schemas";

const Checkout = () => {
  const { items: cart, clearCart } = useCartStore();
  const subtotal = useCartTotalPrice();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const { register, handleSubmit, formState: { errors, isValid }, trigger, watch } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
    defaultValues: {
      paymentMethod: "card",
    }
  });

  const paymentMethod = watch("paymentMethod");

  // Prevent accessing step 2/3 if cart gets emptied mid-session
  useEffect(() => {
    if (cart.length === 0 && step !== 3) {
      setStep(1);
    }
  }, [cart, step]);

  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const handleNextStep = async () => {
    // Validate only shipping fields for step 1
    const isStep1Valid = await trigger(["email", "phone", "firstName", "lastName", "address", "city", "state", "pincode"]);
    if (isStep1Valid) {
      setStep(2);
    }
  };

  const onSubmit = async (data: CheckoutFormData) => {
    console.log("Order Processed Payload:", data);
    setStep(3);
    
    // In a real app, this is where we would call Shopify's Storefront Cart API to finalize checkout
    
    // Clear cart locally
    clearCart();
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-playfair font-bold text-[#1E3A8A] mb-4">Your cart is empty</h1>
        <Link to="/products">
          <Button size="lg" className="bg-[#3B82F6] hover:bg-blue-600 font-montserrat">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  // Error message helper renderer
  const ErrorMsg = ({ field }: { field: keyof CheckoutFormData }) => {
    if (!errors[field]) return null;
    return (
      <p className="border-l-2 border-red-500 pl-2 text-red-500 text-xs font-bold mt-1.5 flex items-center gap-1 font-montserrat animate-fade-in">
         <AlertCircle className="w-3 h-3" /> {errors[field]?.message}
      </p>
    );
  };

  return (
    <>
      <SEO title="Secure Checkout" description="Complete your secure checkout at Mustafa's Mattress." noIndex />
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
          <form className="grid grid-cols-1 lg:grid-cols-12 gap-10" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Main Form Area */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
               {step === 1 && (
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
                     <h2 className="text-2xl font-playfair font-bold text-[#1E3A8A] mb-6 border-b border-gray-100 pb-4">Contact Information</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 font-montserrat mb-10">
                        <div>
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Email Address</label>
                           <input {...register("email")} className={`w-full bg-gray-50 rounded-xl px-4 py-3 outline-none border transition-colors ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#3B82F6]'}`} placeholder="john@example.com" />
                           <ErrorMsg field="email" />
                        </div>
                        <div>
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Mobile Number</label>
                           <input type="tel" {...register("phone")} className={`w-full bg-gray-50 rounded-xl px-4 py-3 outline-none border transition-colors ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#3B82F6]'}`} placeholder="9876543210" />
                           <ErrorMsg field="phone" />
                        </div>
                     </div>

                     <h2 className="text-2xl font-playfair font-bold text-[#1E3A8A] mb-6 border-b border-gray-100 pb-4">Shipping Address</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 font-montserrat">
                        <div>
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">First Name</label>
                           <input {...register("firstName")} className={`w-full bg-gray-50 rounded-xl px-4 py-3 outline-none border transition-colors ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#3B82F6]'}`} placeholder="First Name" />
                           <ErrorMsg field="firstName" />
                        </div>
                        <div>
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Last Name</label>
                           <input {...register("lastName")} className={`w-full bg-gray-50 rounded-xl px-4 py-3 outline-none border transition-colors ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#3B82F6]'}`} placeholder="Last Name" />
                           <ErrorMsg field="lastName" />
                        </div>
                        <div className="md:col-span-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Address Line</label>
                           <input {...register("address")} className={`w-full bg-gray-50 rounded-xl px-4 py-3 outline-none border transition-colors ${errors.address ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#3B82F6]'}`} placeholder="123 Main Street" />
                           <ErrorMsg field="address" />
                        </div>
                        <div className="md:col-span-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Apartment, suite, etc. (Optional)</label>
                           <input {...register("apartment")} className="w-full bg-gray-50 rounded-xl px-4 py-3 outline-none border border-gray-200 focus:border-[#3B82F6]" placeholder="Apt 4B" />
                        </div>
                        <div>
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">City</label>
                           <input {...register("city")} className={`w-full bg-gray-50 rounded-xl px-4 py-3 outline-none border transition-colors ${errors.city ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#3B82F6]'}`} placeholder="Mumbai" />
                           <ErrorMsg field="city" />
                        </div>
                        <div>
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">State</label>
                           <input {...register("state")} className={`w-full bg-gray-50 rounded-xl px-4 py-3 outline-none border transition-colors ${errors.state ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#3B82F6]'}`} placeholder="Maharashtra" />
                           <ErrorMsg field="state" />
                        </div>
                        <div className="md:col-span-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">PIN Code</label>
                           <input {...register("pincode")} className={`w-full bg-gray-50 rounded-xl px-4 py-3 outline-none border transition-colors ${errors.pincode ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#3B82F6]'}`} placeholder="400001" />
                           <ErrorMsg field="pincode" />
                        </div>
                     </div>
                     <div className="mt-8 flex justify-end">
                        <Button type="button" size="lg" className="bg-[#1E3A8A] hover:bg-blue-900 w-full sm:w-auto rounded-xl font-bold font-montserrat btn-press h-14 px-8" onClick={handleNextStep}>
                          Proceed to Payment <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                     </div>
                  </div>
               )}

               {step === 2 && (
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
                     <h2 className="text-2xl font-playfair font-bold text-[#1E3A8A] mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                        <CreditCard className="w-6 h-6 text-[#3B82F6]" /> Secure Payment
                     </h2>
                     <div className="space-y-4 font-montserrat mt-2">
                        
                        {/* Card Option */}
                        <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-[#3B82F6] bg-blue-50/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                           <input type="radio" value="card" {...register("paymentMethod")} className="w-5 h-5 accent-[#3B82F6]" />
                           <span className={`font-bold ${paymentMethod === 'card' ? 'text-[#1E3A8A]' : 'text-gray-700'}`}>Credit / Debit Card</span>
                        </label>
                        
                        {/* Inline Card Details (only visible if Card is checked) */}
                        {paymentMethod === "card" && (
                          <div className="pl-14 pr-4 py-4 space-y-4 animate-fade-in bg-blue-50/30 rounded-xl border border-blue-100/50 ml-2 shadow-inner">
                             <div>
                               <input {...register("cardNumber")} className={`w-full bg-white rounded-xl px-4 py-3 outline-none border ${errors.cardNumber ? 'border-red-500' : 'border-gray-200 focus:border-[#3B82F6]'}`} placeholder="0000 0000 0000 0000" />
                               <ErrorMsg field="cardNumber" />
                             </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <input {...register("cardExpiry")} className={`w-full bg-white rounded-xl px-4 py-3 outline-none border ${errors.cardExpiry ? 'border-red-500' : 'border-gray-200 focus:border-[#3B82F6]'}`} placeholder="MM/YY" />
                                  <ErrorMsg field="cardExpiry" />
                                </div>
                                <div>
                                  <input {...register("cardCvc")} className={`w-full bg-white rounded-xl px-4 py-3 outline-none border ${errors.cardCvc ? 'border-red-500' : 'border-gray-200 focus:border-[#3B82F6]'}`} placeholder="CVC" />
                                  <ErrorMsg field="cardCvc" />
                                </div>
                             </div>
                          </div>
                        )}

                        {/* UPI Option */}
                        <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'upi' ? 'border-[#3B82F6] bg-blue-50/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                           <input type="radio" value="upi" {...register("paymentMethod")} className="w-5 h-5 accent-[#3B82F6]" />
                           <span className={`font-bold ${paymentMethod === 'upi' ? 'text-[#1E3A8A]' : 'text-gray-700'}`}>UPI / QR Code</span>
                        </label>

                        {/* COD Option */}
                        <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-[#3B82F6] bg-blue-50/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                           <input type="radio" value="cod" {...register("paymentMethod")} className="w-5 h-5 accent-[#3B82F6]" />
                           <span className={`font-bold ${paymentMethod === 'cod' ? 'text-[#1E3A8A]' : 'text-gray-700'}`}>Cash on Delivery</span>
                        </label>

                        <ErrorMsg field="paymentMethod" />
                     </div>
                     <div className="mt-8 flex justify-between items-center border-t border-gray-100 pt-6">
                        <Button type="button" variant="ghost" onClick={() => setStep(1)} className="font-montserrat font-bold text-gray-500 hover:text-gray-800">
                           <ChevronLeft className="w-4 h-4 mr-1" /> Back to Shipping
                        </Button>
                        <Button type="submit" size="lg" className="bg-[#3B82F6] hover:bg-blue-600 rounded-xl font-bold font-montserrat btn-press shadow-xl shadow-blue-500/20 h-14 px-8">
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
                        Your secure order has been placed successfully. You will receive a confirmation email and tracking link shortly.
                     </p>
                     <Link to="/">
                        <Button size="lg" className="bg-[#1E3A8A] hover:bg-blue-900 rounded-xl font-bold font-montserrat px-8 h-14 relative z-10 btn-press hover:-translate-y-1 transition-transform">
                           Return to Homepage
                        </Button>
                     </Link>
                  </div>
               )}
            </div>

            {/* Order Summary Sidebar */}
            <div className={`lg:col-span-5 xl:col-span-4 ${step === 3 ? 'hidden' : 'block'}`}>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 sticky top-24">
                 <h3 className="text-xl font-playfair font-bold text-[#1E3A8A] mb-6 border-b border-gray-100 pb-4">Order Summary</h3>
                 <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 scrollbar-hide">
                    {cart.map((item, idx) => (
                       <div key={idx} className="flex gap-4">
                          <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                             <img src={item.product.image} className="w-full h-full object-cover mix-blend-multiply" />
                          </div>
                          <div className="flex-1">
                             <p className="font-bold text-gray-900 text-sm font-montserrat leading-tight line-clamp-1">{item.product.name}</p>
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
                    <div className="flex justify-between items-center text-xl font-black text-[#1E3A8A] pt-4 border-t border-gray-100 mt-2">
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

          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
