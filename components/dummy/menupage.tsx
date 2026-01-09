"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  Star,
  Heart,
  Share2,
  Search,
  Clock,
  ShoppingBag,
} from "lucide-react";

const VegIcon = () => (
  <div className="w-3 h-3 rounded text-[6px] border border-[#4CAF50] flex items-center justify-center p-[1px]">
    <div className="w-full h-full bg-[#4CAF50] rounded-full shadow-sm"></div>
  </div>
);

const NonVegIcon = () => (
  <div className="w-3 h-3 rounded text-[6px] border border-[#FF6B6B] flex items-center justify-center p-[1px]">
    <div className="w-full h-full bg-[#FF6B6B] rounded-full shadow-sm"></div>
  </div>
);

const ClayMenuPage = ({
  onBack,
  onCartClick,
}: {
  onBack: () => void;
  onCartClick: () => void;
}) => {
  const [activeCategory, setActiveCategory] = useState("Recommended");
  const cartCount = 2;

  const clayFloat =
    "bg-white shadow-[6px_6px_12px_rgba(214,198,186,0.5),_-3px_-3px_10px_rgba(255,255,255,0.8)] rounded-[1.5rem]";
  const claySheet =
    "bg-[#FFFBF7] shadow-[0px_-8px_20px_rgba(214,198,186,0.6)] rounded-t-[2rem]";
  const clayButtonPrimary =
    "bg-[#FF9E75] text-white shadow-[5px_5px_10px_rgba(255,158,117,0.4),_-2px_-2px_5px_rgba(255,255,255,0.4)] active:scale-95 transition-all";
  const clayButtonSmall =
    "bg-white text-[#FF9E75] shadow-[4px_4px_8px_rgba(214,198,186,0.5),_-2px_-2px_6px_rgba(255,255,255,0.8)] active:scale-95 rounded-[0.8rem]";

  const menuItems = [
    {
      id: 1,
      name: "Truffle Burger",
      price: "450",
      desc: "Swiss cheese, truffle mayo, caramelized onions.",
      type: "veg",
      image: "🍔",
      isBestSeller: true,
    },
    {
      id: 2,
      name: "Spicy Wings",
      price: "320",
      desc: "6pcs wings tossed in ghost pepper sauce.",
      type: "non-veg",
      image: "🍗",
      isBestSeller: false,
    },
    {
      id: 3,
      name: "Classic Fries",
      price: "180",
      desc: "Salted shoestring fries with dip.",
      type: "veg",
      image: "🍟",
      isBestSeller: false,
    },
    {
      id: 4,
      name: "Hazelnut Coffee",
      price: "240",
      desc: "Creamy blend with roasted hazelnut.",
      type: "veg",
      image: "🥤",
      isBestSeller: true,
    },
  ];

  return (
    <div className="w-full h-full relative flex flex-col bg-orange-100  overflow-hidden -mt-4">
      {/* Hero */}
      <div className="h-40 w-full bg-orange-100  relative shrink-0 mt-4">
        <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-20 select-none">
          🍔
        </div>
        <div className="absolute top-10 left-0 w-full px-5 flex justify-between items-center z-10">
          <button
            onClick={onBack}
            className={`${clayFloat} w-9 h-9 flex items-center justify-center text-[#5C4D45] active:scale-95`}
          >
            <ChevronLeft size={18} strokeWidth={3} />
          </button>
          <div className="flex gap-2">
            <button
              className={`${clayFloat} w-9 h-9 flex items-center justify-center text-[#5C4D45] active:scale-95`}
            >
              <Search size={18} strokeWidth={3} />
            </button>
            <button
              className={`${clayFloat} w-9 h-9 flex items-center justify-center text-[#5C4D45] active:scale-95`}
            >
              <Share2 size={18} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

      {/* Sheet */}
      <div
        className={`${claySheet} -mt-8 relative z-20 flex-1 flex flex-col overflow-hidden`}
      >
        <div className="px-5 pt-6 pb-2 shrink-0">
          <div className="flex justify-between items-start mb-1">
            <h1 className="text-xl font-black text-[#5C4D45]">
              The Burger Joint
            </h1>
            <button
              className={`${clayButtonSmall} w-8 h-8 flex items-center justify-center !rounded-full`}
            >
              <Heart size={16} strokeWidth={3} />
            </button>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-bold text-[#9C8C84]">
            <span className="flex items-center gap-1">
              <Star size={12} className="fill-[#FF9E75] text-[#FF9E75]" /> 4.8
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> 25 mins
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="shrink-0 bg-[#FFFBF7]/95 backdrop-blur-sm py-2 pl-5 overflow-x-auto scrollbar-hide border-b border-[#F5EFE8]">
          <div className="flex gap-2 pr-5">
            {["Recommended", "Starters", "Mains", "Desserts"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full font-bold text-[10px] whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? `bg-[#5C4D45] text-white shadow-md`
                    : `${clayFloat} text-[#5C4D45]`
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-4 flex flex-col gap-4 bg-[#FFFBF7] pb-28">
          <h3 className="text-sm font-black text-[#5C4D45]">
            {activeCategory}
          </h3>
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`${clayFloat} p-3 flex justify-between gap-3 group shrink-0`}
            >
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-1.5 mb-1">
                  {item.type === "veg" ? <VegIcon /> : <NonVegIcon />}
                  {item.isBestSeller && (
                    <span className="text-[8px] font-extrabold text-[#FF9E75] uppercase tracking-wide bg-[#FFF0E6] px-1 py-0.5 rounded">
                      Bestseller
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-black text-[#5C4D45] leading-tight mb-0.5">
                  {item.name}
                </h4>
                <span className="text-xs font-bold text-[#5C4D45] mb-1">
                  ₹{item.price}
                </span>
                <p className="text-[10px] font-bold text-[#9C8C84] line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="relative w-24 flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-[#F5EFE8] rounded-[1rem] flex items-center justify-center text-4xl shadow-inner mb-[-12px] z-0">
                  {item.image}
                </div>
                <div className="relative z-10">
                  <button
                    className={`${clayButtonSmall} px-4 py-1.5 font-black text-[10px] uppercase tracking-wide hover:scale-105 transition-transform`}
                  >
                    ADD
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart */}
      {cartCount > 0 && (
        <div className="absolute bottom-6 w-full px-5 z-40">
          <button
            onClick={onCartClick}
            className={`${clayButtonPrimary} w-full h-14 rounded-[1.2rem] flex items-center justify-between px-5 animate-in slide-in-from-bottom-10`}
          >
            <div className="flex flex-col items-start">
              <span className="text-[9px] font-bold opacity-80 uppercase tracking-wider">
                {cartCount} Items
              </span>
              <span className="text-lg font-black">
                ₹{parseInt(menuItems[0].price) + parseInt(menuItems[1].price)}
              </span>
            </div>
            <div className="flex items-center gap-2 font-black text-sm tracking-wide">
              View Cart <ShoppingBag size={18} strokeWidth={3} />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ClayMenuPage;
