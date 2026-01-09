"use client";
import React, { useState } from "react";
import {
  Search,
  MapPin,
  Star,
  Home,
  User,
  Clock,
  Bike,
  Wallet,
  ShoppingCartIcon,
} from "lucide-react";

const ClayRestaurantHome = ({
  onCartClick,
  onWalletClick,
  onRestaurantClick,
  onHistoryClick,
}: {
  onCartClick: () => void;
  onWalletClick: () => void;
  onRestaurantClick: () => void;
  onHistoryClick: () => void;
}) => {
  const clayFloat =
    "bg-white shadow-[6px_6px_12px_rgba(214,198,186,0.5),_-3px_-3px_10px_rgba(255,255,255,0.8)] rounded-[1.5rem]";
  const clayInset =
    "bg-[#F5EFE8] shadow-[inset_3px_3px_6px_rgba(204,190,178,0.4),_inset_-3px_-3px_6px_rgba(255,255,255,0.8)] rounded-[1.2rem]";
  const clayButtonPrimary =
    "bg-[#FF9E75] text-white shadow-[5px_5px_10px_rgba(255,158,117,0.4),_-2px_-2px_5px_rgba(255,255,255,0.4)] active:scale-95 transition-all";
  const clayBadge =
    "bg-white text-[#5C4D45] shadow-sm rounded-full px-2 py-0.5 font-bold text-[10px] flex items-center gap-1";

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
      delivery: "$2.5",
      icon: "🍣",
      bg: "bg-red-50",
    },
    {
      id: 3,
      name: "Pizzeria Uno",
      rating: 4.2,
      time: "25-35 m",
      delivery: "$1.0",
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
    <div className="w-full h-full relative flex flex-col bg-[#FFFBF7] pt-4">
      {/* Header */}
      <header className="px-5 pt-8 pb-2 flex justify-between items-center shrink-0 z-20">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-[#9C8C84] mb-0.5 ml-1 uppercase tracking-wider">
            Delivering to
          </span>
          <button
            className={`${clayFloat} px-3 py-1.5 flex items-center gap-2 active:scale-95 transition-transform`}
          >
            <MapPin size={14} className="text-[#FF9E75] fill-[#FF9E75]" />
            <span className="font-extrabold text-xs text-[#5C4D45]">
              Downtown, Apt 4B
            </span>
          </button>
        </div>
        <button
          onClick={onWalletClick}
          className={`${clayFloat} w-10 h-10 flex items-center justify-center relative active:scale-95 transition-transform`}
        >
          <Wallet size={18} className="text-[#5C4D45]" strokeWidth={2.5} />
          <span className="absolute top-0 right-0 w-3 h-3 bg-[#FF6B6B] rounded-full border-2 border-white shadow-sm"></span>
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
        {/* Search */}
        <div className="px-5 my-2">
          <div className={`${clayInset} h-10 flex items-center px-3 gap-2`}>
            <Search size={16} className="text-[#9C8C84]" />
            <input
              type="text"
              placeholder="Search food..."
              className="bg-transparent w-full h-full outline-none font-bold text-xs text-[#5C4D45] placeholder-[#9C8C84]"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="w-full overflow-x-auto no-scrollbar scrollbar-hide py-4">
          <div className="flex gap-2 px-5">
            {["All", "Burgers", "Vegan", "Asian", "Mexican", "Italian"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full font-bold text-[11px] whitespace-nowrap transition-all ${
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
        <div className="px-5 flex flex-col gap-4 mt-1">
          <div className="flex justify-between items-end px-1">
            <h3 className="text-base font-black text-[#5C4D45]">Restaurants</h3>
            <span className="text-[#FF9E75] font-bold text-[10px]">
              See all
            </span>
          </div>
          {restaurants.map((res) => (
            <div
              key={res.id}
              onClick={onRestaurantClick}
              className={`${clayFloat} p-2.5 flex flex-col relative active:scale-[0.98] transition-transform duration-200 cursor-pointer`}
            >
              <div
                className={`w-full h-28 ${res.bg} rounded-[1.2rem] relative flex items-center justify-center mb-2`}
              >
                <span className="text-4xl drop-shadow-md filter saturate-150">
                  {res.icon}
                </span>
                <div className={`absolute top-2 right-2 ${clayBadge}`}>
                  <Star
                    size={8}
                    fill="currentColor"
                    className="text-yellow-500"
                  />{" "}
                  {res.rating}
                </div>
              </div>

              <div className="px-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-black text-[#5C4D45]">
                    {res.name}
                  </h4>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-[#FF9E75] bg-[#FFF0E6] px-1.5 py-0.5 rounded-lg">
                    <Clock size={10} /> {res.time}
                  </div>
                </div>
                <div className="mt-1.5 pt-1.5 border-t border-[#F5EFE8] flex items-center gap-4">
                  <div className="flex items-center gap-1 text-[9px] font-bold text-[#5C4D45]">
                    <Bike size={10} className="text-[#FF9E75]" />
                    {res.delivery === "Free" ? "Free Delivery" : res.delivery}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dock */}
      <div className="absolute bottom-5 w-full px-5 pointer-events-none z-50">
        <nav
          className={`${clayFloat} pointer-events-auto mx-auto max-w-[240px] px-1.5 py-1.5 flex items-center justify-between rounded-full bg-white/95 backdrop-blur shadow-2xl`}
        >
          <button
            className={`${clayButtonPrimary} w-9 h-9 rounded-full flex items-center justify-center`}
          >
            <Home size={16} strokeWidth={3} />
          </button>

          <button
            onClick={onWalletClick}
            className="w-9 h-9 flex items-center justify-center text-[#9C8C84] hover:bg-[#F5EFE8] rounded-full transition-colors"
          >
            <Wallet size={16} strokeWidth={3} />
          </button>
          <button
            onClick={onCartClick}
            className="w-9 h-9 flex items-center justify-center text-[#9C8C84] hover:bg-[#F5EFE8] rounded-full transition-colors"
          >
            <ShoppingCartIcon size={16} strokeWidth={3} />
          </button>
          <button
            onClick={onHistoryClick}
            className="w-9 h-9 flex items-center justify-center text-[#9C8C84] hover:bg-[#F5EFE8] rounded-full transition-colors"
          >
            <User size={16} strokeWidth={3} />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ClayRestaurantHome;
