"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  Utensils,
  Bike,
  Minus,
  ArrowRight,
  CheckCircle2,
  Plus,
  AlertCircle
} from "lucide-react";

const VegIcon = () => (
  <div className="w-3.5 h-3.5 rounded-md border-[1.5px] border-[#4CAF50] flex items-center justify-center p-[1.5px]">
    <div className="w-full h-full bg-[#4CAF50] rounded-full shadow-sm"></div>
  </div>
);
const NonVegIcon = () => (
  <div className="w-3.5 h-3.5 rounded-md border-[1.5px] border-[#FF6B6B] flex items-center justify-center p-[1.5px]">
    <div className="w-full h-full bg-[#FF6B6B] rounded-full shadow-sm"></div>
  </div>
);

import { usePhone } from "./phone-context";

const ClayCart = ({ onBack, onPayNow }: { onBack: () => void; onPayNow?: () => void }) => {
  const { cartItems, addToCart, removeFromCart, walletBalance, setWalletBalance, clearCart, addOrder, activeRestaurant } = usePhone();
  const [orderType, setOrderType] = useState("dine_in");
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const itemTotal = cartItems.reduce(
    (acc, item) => acc + parseInt(item.price) * item.qty,
    0,
  );
  const taxes = Math.round(itemTotal * 0.05);
  const grandTotal = itemTotal + taxes;

  const clayFloat =
    "bg-white shadow-[6px_6px_12px_rgba(214,198,186,0.5),_-3px_-3px_10px_rgba(255,255,255,0.8)] rounded-[1.5rem]";
  const clayInset =
    "bg-[#F5EFE8] shadow-[inset_3px_3px_6px_rgba(204,190,178,0.4),_inset_-3px_-3px_6px_rgba(255,255,255,0.8)] rounded-[1rem]";
  const clayToggleActive =
    "bg-[#FFF0E6] text-[#FF9E75] shadow-[inset_2px_2px_5px_rgba(204,190,178,0.4),_inset_-2px_-2px_5px_rgba(255,255,255,0.8)] scale-[0.98] rounded-[1.5rem]";
  const clayToggleInactive =
    "bg-white text-[#9C8C84] shadow-[5px_5px_10px_rgba(214,198,186,0.5),_-2px_-2px_5px_rgba(255,255,255,0.8)] hover:text-[#5C4D45] rounded-[1.5rem]";
  const clayButtonPrimary =
    "bg-[#FF9E75] text-white shadow-[5px_5px_10px_rgba(255,158,117,0.4),_-2px_-2px_5px_rgba(255,255,255,0.4)] active:scale-95 transition-all";

  const handlePayment = () => {
    if (cartItems.length === 0) return;
    if (walletBalance < grandTotal) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaymentSuccess(true);
      setWalletBalance(walletBalance - grandTotal);
      addOrder({
        id: Date.now(),
        restaurant: activeRestaurant?.name || "The Burger Joint",
        items: cartItems.map((i) => `${i.qty}x ${i.name}`).join(", "),
        price: `₹${grandTotal}`,
        date: "Just now",
        status: "preparing",
      });
      clearCart();
      setTimeout(() => {
        if (onPayNow) onPayNow();
      }, 1500);
    }, 1500);
  };

  return (
    <div className="w-full h-full relative flex flex-col bg-[#FFFBF7]">
      {/* Header */}
      <header className="px-5 pt-8 pb-3 flex items-center justify-between shrink-0 z-20">
        <button
          onClick={onBack}
          className={`${clayFloat} w-10 h-10 flex items-center justify-center text-[#5C4D45] active:scale-95 transition-transform`}
        >
          <ChevronLeft size={20} strokeWidth={3} />
        </button>
        <h1 className="text-lg font-black text-[#5C4D45] tracking-wide py-4">
          My Cart
        </h1>
        <div className="w-10"></div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-28">
        {/* Toggle */}
        <div className="px-5 py-3">
          <h2 className="text-[10px] font-bold text-[#9C8C84] uppercase tracking-wider mb-2 ml-2">
            Order Preference
          </h2>
          <div className="flex gap-3 h-14">
            <button
              onClick={() => setOrderType("dine_in")}
              className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-300 ${orderType === "dine_in" ? clayToggleActive : clayToggleInactive
                }`}
            >
              <div className="flex items-center gap-2">
                <Utensils size={16} strokeWidth={2.5} />
                <span className="text-[10px] font-black uppercase">
                  Dine In
                </span>
              </div>
            </button>
            <button
              onClick={() => setOrderType("takeaway")}
              className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-300 ${orderType === "takeaway" ? clayToggleActive : clayToggleInactive
                }`}
            >
              <div className="flex items-center gap-2">
                <Bike size={16} strokeWidth={2.5} />
                <span className="text-[10px] font-black uppercase">
                  Takeaway
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="px-5 py-1 flex flex-col gap-3">
          <h2 className="text-[10px] font-bold text-[#9C8C84] uppercase tracking-wider ml-2 mt-1">
            Items
          </h2>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className={`${clayFloat} p-3 flex items-center justify-between`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  {item.type === "veg" ? <VegIcon /> : <NonVegIcon />}
                  <h4 className="text-xs font-black text-[#5C4D45]">
                    {item.name}
                  </h4>
                </div>
                <span className="text-xs font-bold text-[#9C8C84] ml-6">
                  ₹{parseInt(item.price) * item.qty}
                </span>
              </div>
              <div className={`${clayInset} flex items-center h-8 px-1 ml-3`}>
                <button onClick={() => removeFromCart(item.id)} className="w-7 h-full flex items-center justify-center text-[#9C8C84] active:text-[#FF9E75] active:scale-90">
                  <Minus size={12} strokeWidth={3} />
                </button>
                <span className="w-5 text-center text-xs font-black text-[#5C4D45]">
                  {item.qty}
                </span>
                <button onClick={() => addToCart(item)} className="w-7 h-full flex items-center justify-center text-[#9C8C84] active:text-[#FF9E75] active:scale-90">
                  <Plus size={12} strokeWidth={3} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bill */}
        <div className="px-5 mt-6 mb-4">
          <div className={`${clayFloat} p-4 flex flex-col gap-2`}>
            <div className="flex justify-between text-xs font-bold text-[#9C8C84]">
              <span>Item Total</span>
              <span>₹{itemTotal}</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-[#9C8C84]">
              <span>Taxes (5%)</span>
              <span>₹{taxes}</span>
            </div>
            <div className="border-t-2 border-dashed border-[#F5EFE8] my-1"></div>
            <div className="flex justify-between text-base font-black text-[#5C4D45]">
              <span>To Pay</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 w-full px-5 z-40">
        <button
          onClick={handlePayment}
          disabled={isPaying || paymentSuccess || cartItems.length === 0}
          className={`${clayButtonPrimary} w-full h-14 rounded-[1.2rem] flex items-center justify-between px-2 pl-5 pr-2 group opacity-${(isPaying || paymentSuccess || cartItems.length === 0) ? '50' : '100'}`}
        >
          <div className="flex flex-col items-start">
            <span className="text-[9px] font-bold opacity-80 uppercase tracking-wider">
              Total
            </span>
            <span className="text-lg font-black leading-none">
              ₹{grandTotal}
            </span>
          </div>
          <div className="bg-white/20 h-10 px-4 rounded-[0.8rem] flex items-center justify-center gap-2 backdrop-blur-sm transition-all group-hover:pl-6">
            <span className="font-black text-xs uppercase tracking-wide">
              {isPaying ? "Processing..." : "Pay Now"}
            </span>
            {!isPaying && <ArrowRight size={16} strokeWidth={3} />}
          </div>
        </button>
      </div>

      {/* Success Overlay */}
      {paymentSuccess && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="bg-[#EAF8E6] text-[#4CAF50] p-4 rounded-full mb-4 shadow-[0_10px_20px_rgba(76,175,80,0.2)]">
            <CheckCircle2 size={48} strokeWidth={2.5} />
          </div>
          <h2 className="text-xl font-black text-[#5C4D45]">Payment Successful!</h2>
          <p className="text-sm font-bold text-[#9C8C84] mt-2">Redirecting to history...</p>
        </div>
      )}

      {/* Error Slide-up */}
      <div
        className={`absolute bottom-0 left-0 w-full bg-[#FFF0E6] p-5 rounded-t-[2rem] shadow-[0_-10px_40px_rgba(255,107,107,0.2)] z-50 transition-transform duration-300 ${
          showError ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="bg-[#FF6B6B] text-white p-2 rounded-full shadow-sm">
            <AlertCircle size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-sm font-black text-[#5C4D45]">Insufficient Funds</h3>
            <p className="text-xs font-bold text-[#9C8C84]">Please top up your wallet to continue.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClayCart;
