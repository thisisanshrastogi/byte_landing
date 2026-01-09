"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  Utensils,
  Bike,
  Minus,
  Plus,
  FileText,
  ArrowRight,
} from "lucide-react";

const VegIcon = () => (
  <div className="w-4 h-4 rounded-md border-2 border-[#4CAF50] flex items-center justify-center p-[2px]">
    <div className="w-full h-full bg-[#4CAF50] rounded-full shadow-sm"></div>
  </div>
);
const NonVegIcon = () => (
  <div className="w-4 h-4 rounded-md border-2 border-[#FF6B6B] flex items-center justify-center p-[2px]">
    <div className="w-full h-full bg-[#FF6B6B] rounded-full shadow-sm"></div>
  </div>
);

const ClayCart = ({ onBack }: { onBack: () => void }) => {
  const [orderType, setOrderType] = useState("dine_in");
  const [cartItems] = useState([
    { id: 1, name: "Truffle Mushroom Burger", price: 450, type: "veg", qty: 2 },
    { id: 2, name: "Spicy Chicken Wings", price: 320, type: "non-veg", qty: 1 },
    { id: 3, name: "Coke", price: 60, type: "veg", qty: 2 },
  ]);

  const itemTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const taxes = Math.round(itemTotal * 0.05);
  const grandTotal = itemTotal + taxes;

  const clayFloat =
    "bg-white shadow-[8px_8px_16px_rgba(214,198,186,0.5),_-4px_-4px_12px_rgba(255,255,255,0.8)] rounded-[2rem]";
  const clayInset =
    "bg-[#F5EFE8] shadow-[inset_4px_4px_8px_rgba(204,190,178,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-[1.5rem]";
  const clayToggleActive =
    "bg-[#FFF0E6] text-[#FF9E75] shadow-[inset_3px_3px_6px_rgba(204,190,178,0.4),_inset_-3px_-3px_6px_rgba(255,255,255,0.8)] scale-[0.98] rounded-[2rem]";
  const clayToggleInactive =
    "bg-white text-[#9C8C84] shadow-[6px_6px_12px_rgba(214,198,186,0.5),_-2px_-2px_6px_rgba(255,255,255,0.8)] hover:text-[#5C4D45] rounded-[2rem]";
  const clayButtonPrimary =
    "bg-[#FF9E75] text-white shadow-[6px_6px_12px_rgba(255,158,117,0.4),_-2px_-2px_6px_rgba(255,255,255,0.4)] active:scale-95 transition-all";

  return (
    <div className="w-full h-full relative flex flex-col bg-[#FFFBF7]">
      {/* 1. Header (Static) */}
      <header className="px-6 pt-12 pb-4 flex items-center justify-between shrink-0">
        <button
          onClick={onBack}
          className={`${clayFloat} w-12 h-12 flex items-center justify-center text-[#5C4D45] active:scale-95 transition-transform`}
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <h1 className="text-xl font-black text-[#5C4D45] tracking-wide">
          Order Details
        </h1>
        <div className="w-12"></div>
      </header>

      {/* 2. Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-32">
        {/* Toggle */}
        <div className="px-6 py-4">
          <h2 className="text-xs font-bold text-[#9C8C84] uppercase tracking-wider mb-3 ml-2">
            Order Preference
          </h2>
          <div className="flex gap-4 h-20">
            <button
              onClick={() => setOrderType("dine_in")}
              className={`flex-1 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                orderType === "dine_in" ? clayToggleActive : clayToggleInactive
              }`}
            >
              <Utensils size={20} strokeWidth={2.5} />{" "}
              <span className="text-xs font-black uppercase">Dine In</span>
            </button>
            <button
              onClick={() => setOrderType("takeaway")}
              className={`flex-1 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                orderType === "takeaway" ? clayToggleActive : clayToggleInactive
              }`}
            >
              <Bike size={20} strokeWidth={2.5} />{" "}
              <span className="text-xs font-black uppercase">Takeaway</span>
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="px-6 py-2 flex flex-col gap-4">
          <h2 className="text-xs font-bold text-[#9C8C84] uppercase tracking-wider mb-1 ml-2 mt-2">
            Items
          </h2>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className={`${clayFloat} p-4 flex items-center justify-between`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {item.type === "veg" ? <VegIcon /> : <NonVegIcon />}
                  <h4 className="text-sm font-black text-[#5C4D45]">
                    {item.name}
                  </h4>
                </div>
                <span className="text-sm font-bold text-[#9C8C84] ml-6">
                  ₹{item.price * item.qty}
                </span>
              </div>
              <div className={`${clayInset} flex items-center h-10 px-1 ml-4`}>
                <button className="w-8 h-full flex items-center justify-center text-[#9C8C84] active:text-[#FF9E75] active:scale-90">
                  <Minus size={14} strokeWidth={3} />
                </button>
                <span className="w-6 text-center text-sm font-black text-[#5C4D45]">
                  {item.qty}
                </span>
                <button className="w-8 h-full flex items-center justify-center text-[#9C8C84] active:text-[#FF9E75] active:scale-90">
                  <Plus size={14} strokeWidth={3} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bill */}
        <div className="px-6 mt-8 mb-6">
          <div className={`${clayFloat} p-6 flex flex-col gap-3`}>
            <div className="flex justify-between text-sm font-bold text-[#9C8C84]">
              <span>Item Total</span>
              <span>₹{itemTotal}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#9C8C84]">
              <span>Taxes (5%)</span>
              <span>₹{taxes}</span>
            </div>
            <div className="border-t-2 border-dashed border-[#F5EFE8] my-1"></div>
            <div className="flex justify-between text-lg font-black text-[#5C4D45]">
              <span>To Pay</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Absolute Footer */}
      <div className="absolute bottom-6 w-full px-6 z-40">
        <button
          className={`${clayButtonPrimary} w-full h-16 rounded-[1.5rem] flex items-center justify-between px-2 pl-6 pr-2 group`}
        >
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-bold opacity-80 uppercase tracking-wider">
              Total
            </span>
            <span className="text-xl font-black leading-none">
              ₹{grandTotal}
            </span>
          </div>
          <div className="bg-white/20 h-12 px-6 rounded-[1rem] flex items-center justify-center gap-2 backdrop-blur-sm transition-all group-hover:pl-8">
            <span className="font-black text-sm uppercase tracking-wide">
              Pay Now
            </span>
            <ArrowRight size={18} strokeWidth={3} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ClayCart;
