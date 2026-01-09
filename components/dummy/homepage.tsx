"use client";
import React, { useState } from "react";
import {
  Search,
  MapPin,
  ShoppingBag,
  Star,
  Home,
  User,
  Clock,
  Bike,
} from "lucide-react";

const ClayRestaurantHome = ({
  onWalletClick,
  onRestaurantClick,
  onHistoryClick,
}: {
  onWalletClick: () => void;
  onRestaurantClick: () => void;
  onHistoryClick: () => void;
}) => {
  const clayFloat =
    "bg-white shadow-[8px_8px_16px_rgba(214,198,186,0.5),_-4px_-4px_12px_rgba(255,255,255,0.8)] rounded-[2rem]";
  const clayInset =
    "bg-[#F5EFE8] shadow-[inset_4px_4px_8px_rgba(204,190,178,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-[2rem]";
  const clayButtonPrimary =
    "bg-[#FF9E75] text-white shadow-[6px_6px_12px_rgba(255,158,117,0.4),_-2px_-2px_6px_rgba(255,255,255,0.4)] active:scale-95 transition-all";
  const clayBadge =
    "bg-white text-[#5C4D45] shadow-sm rounded-full px-3 py-1 font-bold text-xs flex items-center gap-1";

  const [activeCategory, setActiveCategory] = useState("All");

  const restaurants = [
    {
      id: 1,
      name: "The Burger Joint",
      rating: 4.8,
      time: "15-20 m",
      delivery: "Free",
      icon: "🍔",
      bg: "bg-orange-50",
    },
    {
      id: 2,
      name: "Sushi Master",
      rating: 4.5,
      time: "30-45 m",
      delivery: "$2.50",
      icon: "🍣",
      bg: "bg-red-50",
    },
    {
      id: 3,
      name: "Pizzeria Uno",
      rating: 4.2,
      time: "25-35 m",
      delivery: "$1.00",
      icon: "🍕",
      bg: "bg-yellow-50",
    },
    {
      id: 4,
      name: "Taco Fiesta",
      rating: 4.6,
      time: "20-30 m",
      delivery: "Free",
      icon: "🌮",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="w-full h-full relative flex flex-col bg-[#FFFBF7]">
      {/* 1. HEADER (Static at top) */}
      <header className="px-6 pt-14 pb-4 flex justify-between items-center shrink-0">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-[#9C8C84] mb-1 ml-1 uppercase tracking-wider">
            Delivering to
          </span>
          <button
            className={`${clayFloat} px-4 py-2 flex items-center gap-2 active:scale-95 transition-transform`}
          >
            <MapPin size={16} className="text-[#FF9E75] fill-[#FF9E75]" />
            <span className="font-extrabold text-xs text-[#5C4D45]">
              Downtown, Apt 4B
            </span>
          </button>
        </div>
        <button
          onClick={onWalletClick}
          className={`${clayFloat} w-12 h-12 flex items-center justify-center relative active:scale-95 transition-transform`}
        >
          <ShoppingBag size={20} className="text-[#5C4D45]" strokeWidth={2.5} />
          <span className="absolute top-0 right-0 w-4 h-4 bg-[#FF6B6B] rounded-full border-2 border-white shadow-sm"></span>
        </button>
      </header>

      {/* 2. SCROLLABLE CONTENT AREA */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-28">
        {/* Search */}
        <div className="px-6 my-2">
          <div className={`${clayInset} h-12 flex items-center px-4 gap-3`}>
            <Search size={18} className="text-[#9C8C84]" />
            <input
              type="text"
              placeholder="Search food..."
              className="bg-transparent w-full h-full outline-none font-bold text-sm text-[#5C4D45] placeholder-[#9C8C84]"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="pl-6 mb-6 overflow-x-auto no-scrollbar py-2 -my-2 scrollbar-hide">
          <div className="flex gap-3 pr-6 my-2">
            {["All", "Burgers", "Vegan", "Asian", "Mexican", "Italian"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full font-bold text-xs whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? clayButtonPrimary
                      : `${clayFloat} text-[#5C4D45]`
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </div>

        {/* List */}
        <div className="px-6 flex flex-col gap-5">
          <div className="flex justify-between items-end px-1">
            <h3 className="text-lg font-black text-[#5C4D45]">Restaurants</h3>
            <span className="text-[#FF9E75] font-bold text-[10px]">
              See all
            </span>
          </div>
          {restaurants.map((res) => (
            <div
              key={res.id}
              onClick={onRestaurantClick}
              className={`${clayFloat} p-3 flex flex-col relative active:scale-[0.98] transition-transform duration-200 cursor-pointer`}
            >
              <div
                className={`w-full h-32 ${res.bg} rounded-[1.5rem] relative flex items-center justify-center mb-3`}
              >
                <span className="text-5xl drop-shadow-md filter saturate-150">
                  {res.icon}
                </span>
                <div className={`absolute top-3 right-3 ${clayBadge}`}>
                  <Star
                    size={10}
                    fill="currentColor"
                    className="text-yellow-500"
                  />{" "}
                  {res.rating}
                </div>
              </div>
              <div className="px-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-base font-black text-[#5C4D45]">
                    {res.name}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-[#FF9E75] bg-[#FFF0E6] px-2 py-1 rounded-lg">
                    <Clock size={10} /> {res.time}
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t-2 border-[#F5EFE8] flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#5C4D45]">
                    <Bike size={12} className="text-[#FF9E75]" />
                    {res.delivery === "Free" ? "Free Delivery" : res.delivery}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. DOCK (Absolute at bottom inside container) */}
      <div className="absolute bottom-6 w-full px-6 pointer-events-none z-50">
        <nav
          className={`${clayFloat} pointer-events-auto mx-auto max-w-[280px] px-2 py-2 flex items-center justify-between rounded-full bg-white/95 backdrop-blur shadow-2xl`}
        >
          <button
            className={`${clayButtonPrimary} w-10 h-10 rounded-full flex items-center justify-center`}
          >
            <Home size={18} strokeWidth={3} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-[#9C8C84] hover:bg-[#F5EFE8] rounded-full transition-colors">
            <Search size={18} strokeWidth={3} />
          </button>
          <button
            onClick={onWalletClick}
            className="w-10 h-10 flex items-center justify-center text-[#9C8C84] hover:bg-[#F5EFE8] rounded-full transition-colors"
          >
            <ShoppingBag size={18} strokeWidth={3} />
          </button>
          <button
            onClick={onHistoryClick}
            className="w-10 h-10 flex items-center justify-center text-[#9C8C84] hover:bg-[#F5EFE8] rounded-full transition-colors"
          >
            <User size={18} strokeWidth={3} />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ClayRestaurantHome;
