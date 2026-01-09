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
  <div className="w-4 h-4 rounded-md border-2 border-[#4CAF50] flex items-center justify-center p-[2px]">
    <div className="w-full h-full bg-[#4CAF50] rounded-full shadow-sm"></div>
  </div>
);

const NonVegIcon = () => (
  <div className="w-4 h-4 rounded-md border-2 border-[#FF6B6B] flex items-center justify-center p-[2px]">
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
    "bg-white shadow-[8px_8px_16px_rgba(214,198,186,0.5),_-4px_-4px_12px_rgba(255,255,255,0.8)] rounded-[2rem]";
  const claySheet =
    "bg-[#FFFBF7] shadow-[0px_-10px_30px_rgba(214,198,186,0.6)] rounded-t-[2.5rem]";
  const clayButtonPrimary =
    "bg-[#FF9E75] text-white shadow-[6px_6px_12px_rgba(255,158,117,0.4),_-2px_-2px_6px_rgba(255,255,255,0.4)] active:scale-95 transition-all";
  const clayButtonSmall =
    "bg-white text-[#FF9E75] shadow-[4px_4px_8px_rgba(214,198,186,0.5),_-2px_-2px_6px_rgba(255,255,255,0.8)] active:scale-95 rounded-[1rem]";

  const menuItems = [
    {
      id: 1,
      name: "Truffle Mushroom Burger",
      price: "450",
      desc: "Swiss cheese, truffle mayo, caramelized onions.",
      type: "veg",
      image: "🍔",
      isBestSeller: true,
    },
    {
      id: 2,
      name: "Spicy Chicken Wings",
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
      name: "Hazelnut Cold Coffee",
      price: "240",
      desc: "Creamy blend with roasted hazelnut.",
      type: "veg",
      image: "🥤",
      isBestSeller: true,
    },
  ];

  return (
    <div className="w-full h-full relative flex flex-col bg-[#F0E6DC] ">
      {/* Hero */}
      <div className="h-48 w-full bg-orange-100 relative shrink-0">
        <div className="absolute inset-0 flex items-center justify-center text-9xl opacity-20 select-none">
          🍔
        </div>
        <div className="absolute top-12 left-0 w-full px-6 flex justify-between items-center z-10">
          <button
            onClick={onBack}
            className={`${clayFloat} w-10 h-10 flex items-center justify-center text-[#5C4D45] active:scale-95`}
          >
            <ChevronLeft size={20} strokeWidth={3} />
          </button>
          <div className="flex gap-3">
            <button
              className={`${clayFloat} w-10 h-10 flex items-center justify-center text-[#5C4D45] active:scale-95`}
            >
              <Search size={20} strokeWidth={3} />
            </button>
            <button
              className={`${clayFloat} w-10 h-10 flex items-center justify-center text-[#5C4D45] active:scale-95`}
            >
              <Share2 size={20} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

      {/* Sheet */}
      <div
        className={`${claySheet} -mt-10 relative z-20 flex-1 flex flex-col overflow-hidden`}
      >
        <div className="px-6 pt-8 pb-4 shrink-0">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-black text-[#5C4D45]">
              The Burger Joint
            </h1>
            <button
              className={`${clayButtonSmall} w-10 h-10 flex items-center justify-center !rounded-full`}
            >
              <Heart size={18} strokeWidth={3} />
            </button>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-[#9C8C84]">
            <span className="flex items-center gap-1">
              <Star size={14} className="fill-[#FF9E75] text-[#FF9E75]" /> 4.8
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> 25 mins
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="shrink-0 bg-[#FFFBF7]/95 backdrop-blur-sm py-2 pl-6 overflow-x-auto no-scrollbar border-b border-[#F5EFE8]">
          <div className="flex gap-3 pr-6">
            {["Recommended", "Starters", "Mains"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-bold text-xs whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? `bg-[#5C4D45] text-white shadow-lg`
                    : `${clayFloat} text-[#5C4D45]`
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="px-6 py-6 flex flex-col gap-6 overflow-y-auto scrollbar-hide bg-[#FFFBF7] pb-24">
          <h3 className="text-lg font-black text-[#5C4D45]">
            {activeCategory}
          </h3>
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`${clayFloat} p-4 flex justify-between gap-4 group`}
            >
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  {item.type === "veg" ? <VegIcon /> : <NonVegIcon />}
                  {item.isBestSeller && (
                    <span className="text-[10px] font-extrabold text-[#FF9E75] uppercase tracking-wide bg-[#FFF0E6] px-1.5 py-0.5 rounded">
                      Bestseller
                    </span>
                  )}
                </div>
                <h4 className="text-base font-black text-[#5C4D45] leading-tight mb-1">
                  {item.name}
                </h4>
                <span className="text-sm font-bold text-[#5C4D45] mb-2">
                  ₹{item.price}
                </span>
                <p className="text-xs font-bold text-[#9C8C84] line-clamp-2">
                  {item.desc}
                </p>
              </div>
              <div className="relative w-28 flex flex-col items-center">
                <div className="w-24 h-24 bg-[#F5EFE8] rounded-[1.25rem] flex items-center justify-center text-5xl shadow-inner mb-[-14px] z-0">
                  {item.image}
                </div>
                <div className="relative z-10">
                  <button
                    className={`${clayButtonSmall} px-6 py-2 font-black text-sm uppercase tracking-wide hover:scale-105 transition-transform`}
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
        <div className="absolute bottom-6 w-full px-6 z-40">
          <button
            onClick={onCartClick}
            className={`${clayButtonPrimary} w-full h-16 rounded-[1.5rem] flex items-center justify-between px-6 animate-in slide-in-from-bottom-10`}
          >
            <div className="flex flex-col items-start">
              <span className="text-xs font-bold opacity-80 uppercase tracking-wider">
                {cartCount} Items
              </span>
              <span className="text-lg font-black">
                ₹{parseInt(menuItems[0].price) + parseInt(menuItems[1].price)}
              </span>
            </div>
            <div className="flex items-center gap-2 font-black text-base tracking-wide">
              View Cart <ShoppingBag size={20} strokeWidth={3} />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ClayMenuPage;
