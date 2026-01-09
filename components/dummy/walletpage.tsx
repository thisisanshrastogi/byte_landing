"use client";
import React from "react";
import {
  ChevronLeft,
  Plus,
  Wallet,
  Lock,
  ArrowUpRight,
  ArrowDownLeft,
  History,
} from "lucide-react";

const ClayWallet = ({ onBack }: { onBack: () => void }) => {
  const clayFloat =
    "bg-white shadow-[8px_8px_16px_rgba(214,198,186,0.5),_-4px_-4px_12px_rgba(255,255,255,0.8)] rounded-[2rem]";
  const clayInset =
    "bg-[#F5EFE8] shadow-[inset_4px_4px_8px_rgba(204,190,178,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-[1.5rem]";
  const clayButtonPrimary =
    "bg-[#FF9E75] text-white shadow-[6px_6px_12px_rgba(255,158,117,0.4),_-2px_-2px_6px_rgba(255,255,255,0.4)] active:scale-95 transition-all";

  const transactions = [
    {
      id: 1,
      title: "Top Up",
      date: "Today, 10:23 AM",
      amount: "+$50.00",
      type: "credit",
    },
    {
      id: 2,
      title: "Burger Joint",
      date: "Yesterday, 8:15 PM",
      amount: "-$24.50",
      type: "debit",
    },
    {
      id: 3,
      title: "Refund",
      date: "Dec 12, 2024",
      amount: "+$5.00",
      type: "credit",
    },
  ];

  return (
    <div className="w-full h-full relative flex flex-col p-6 pb-10 overflow-scroll scrollbar-hide bg-[#FFFBF7]">
      <header className="flex items-center justify-between mb-6 pt-12">
        <button
          onClick={onBack}
          className={`${clayFloat} w-10 h-10 flex items-center justify-center text-[#5C4D45] active:scale-95 transition-transform`}
        >
          <ChevronLeft size={20} strokeWidth={3} />
        </button>
        <h1 className="text-lg font-black text-[#5C4D45] tracking-wide">
          My Wallet
        </h1>
        <button
          className={`${clayFloat} w-10 h-10 flex items-center justify-center text-[#5C4D45] active:scale-95 transition-transform`}
        >
          <History size={18} strokeWidth={2.5} />
        </button>
      </header>

      <div
        className={`${clayFloat} p-5 mb-6 relative overflow-hidden shrink-0`}
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF9E75] opacity-10 rounded-full blur-2xl"></div>
        <div className="relative z-10">
          <p className="text-xs font-bold text-[#9C8C84] mb-3 flex items-center gap-2 uppercase tracking-wider">
            <Wallet size={14} /> Total Balance
          </p>
          <div
            className={`${clayInset} p-5 flex items-center justify-between mb-5`}
          >
            <span className="text-3xl font-black text-[#5C4D45] tracking-tight">
              $142.50
            </span>
            <div className="w-2 h-2 bg-[#FF9E75] rounded-full animate-pulse"></div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <span className="text-[9px] font-extrabold uppercase text-[#9C8C84] pl-1">
                Available
              </span>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#EAF8E6] flex items-center justify-center text-[#4CAF50]">
                  <ArrowDownLeft size={12} strokeWidth={3} />
                </div>
                <span className="text-sm font-black text-[#5C4D45]">
                  $120.00
                </span>
              </div>
            </div>
            <div className="w-[2px] bg-[#F5EFE8] rounded-full"></div>
            <div className="flex-1 flex flex-col gap-1">
              <span className="text-[9px] font-extrabold uppercase text-[#9C8C84] pl-1">
                Reserved
              </span>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#FFF0E6] flex items-center justify-center text-[#FF9E75]">
                  <Lock size={12} strokeWidth={3} />
                </div>
                <span className="text-sm font-black text-[#5C4D45]">
                  $22.50
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        className={`${clayButtonPrimary} w-full h-14 shrink-0 rounded-[1.5rem] flex items-center justify-center gap-2 font-black text-base tracking-wide group mb-8`}
      >
        <Plus
          size={20}
          strokeWidth={4}
          className="group-hover:rotate-90 transition-transform duration-300"
        />{" "}
        Top Up Wallet
      </button>

      <div className="flex flex-col gap-3 pb-4">
        <h3 className="text-base font-black text-[#5C4D45] px-2">
          Recent Activity
        </h3>
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className={`${clayFloat} p-3 flex items-center justify-between active:scale-[0.98] transition-transform`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-[1rem] flex items-center justify-center ${
                  tx.type === "credit"
                    ? "bg-[#EAF8E6] text-[#4CAF50]"
                    : "bg-[#FFF0E6] text-[#FF9E75]"
                }`}
              >
                {tx.type === "credit" ? (
                  <ArrowDownLeft size={18} strokeWidth={3} />
                ) : (
                  <ArrowUpRight size={18} strokeWidth={3} />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-[#5C4D45]">
                  {tx.title}
                </span>
                <span className="text-[10px] font-bold text-[#9C8C84]">
                  {tx.date}
                </span>
              </div>
            </div>
            <span
              className={`text-sm font-black ${
                tx.type === "credit" ? "text-[#4CAF50]" : "text-[#5C4D45]"
              }`}
            >
              {tx.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClayWallet;
