"use client";
import React from "react";
import {
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";

const ClayOrderHistory = ({ onBack }: { onBack: () => void }) => {
  const clayFloat =
    "bg-white shadow-[8px_8px_16px_rgba(214,198,186,0.5),_-4px_-4px_12px_rgba(255,255,255,0.8)] rounded-[2rem]";
  const clayInset =
    "shadow-[inset_2px_2px_5px_rgba(204,190,178,0.4),_inset_-2px_-2px_5px_rgba(255,255,255,0.8)] rounded-full px-3 py-1.5 flex items-center gap-2";
  const clayButtonSmall =
    "bg-[#FF9E75] text-white shadow-[4px_4px_8px_rgba(255,158,117,0.4),_-2px_-2px_6px_rgba(255,255,255,0.4)] active:scale-95 rounded-[1rem] px-4 py-2 font-black text-xs uppercase tracking-wide transition-all duration-200";

  const orders = [
    {
      id: 1,
      restaurant: "The Burger Joint",
      items: "2x Truffle Burger, 1x Fries",
      price: "₹650",
      date: "Today, 1:20 PM",
      status: "delivered",
    },
    {
      id: 2,
      restaurant: "Sushi Master",
      items: "1x Salmon Platter",
      price: "₹1,200",
      date: "Yesterday, 8:45 PM",
      status: "rejected",
    },
    {
      id: 3,
      restaurant: "Pizza Paradise",
      items: "1x Pepperoni Lrg",
      price: "₹550",
      date: "Dec 12, 2024",
      status: "timeout",
    },
  ];

  const getStatusConfig = (status: any) => {
    switch (status) {
      case "delivered":
        return {
          color: "text-[#4CAF50]",
          bg: "bg-[#EAF8E6]",
          icon: <CheckCircle2 size={14} strokeWidth={3} />,
          label: "Delivered",
        };
      case "rejected":
        return {
          color: "text-[#FF6B6B]",
          bg: "bg-[#FFF0F0]",
          icon: <XCircle size={14} strokeWidth={3} />,
          label: "Rejected",
        };
      case "timeout":
        return {
          color: "text-[#F59E0B]",
          bg: "bg-[#FFF8E6]",
          icon: <Clock size={14} strokeWidth={3} />,
          label: "Timed Out",
        };
      default:
        return {};
    }
  };

  return (
    <div className="w-full h-full relative flex flex-col pb-20 overflow-auto scrollbar-hide bg-[#FFFBF7]">
      <header className="flex items-center justify-between mb-8 pt-12 px-6">
        <button
          onClick={onBack}
          className={`${clayFloat} w-12 h-12 flex items-center justify-center text-[#5C4D45] active:scale-95 transition-transform`}
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <h1 className="text-xl font-black text-[#5C4D45] tracking-wide">
          Past Orders
        </h1>
        <div className="w-12"></div>
      </header>

      <div className="flex flex-col gap-6 px-6">
        {orders.map((order) => {
          const config = getStatusConfig(order.status);
          return (
            <div
              key={order.id}
              className={`${clayFloat} p-5 flex flex-col gap-4 group active:scale-[0.99] transition-transform duration-200`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F5EFE8] rounded-[1rem] flex items-center justify-center text-xl shadow-inner">
                    <ShoppingBag size={18} className="text-[#9C8C84]" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-base font-black text-[#5C4D45]">
                      {order.restaurant}
                    </h3>
                    <span className="text-xs font-bold text-[#9C8C84]">
                      {order.date}
                    </span>
                  </div>
                </div>
                <span className="text-base font-black text-[#5C4D45]">
                  {order.price}
                </span>
              </div>
              <div className="text-sm font-bold text-[#9C8C84] px-1 truncate">
                {order.items}
              </div>
              <div className="flex items-center justify-between mt-1">
                <div className={`${clayInset} ${config.bg}`}>
                  <span className={config.color}>{config.icon}</span>
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider ${config.color}`}
                  >
                    {config.label}
                  </span>
                </div>
                {order.status === "delivered" ? (
                  <button
                    className={`${clayButtonSmall} flex items-center gap-1`}
                  >
                    <RotateCcw size={12} strokeWidth={3} /> Repeat
                  </button>
                ) : (
                  <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5EFE8] text-[#9C8C84] transition-colors">
                    <ChevronRight size={20} strokeWidth={2.5} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClayOrderHistory;
