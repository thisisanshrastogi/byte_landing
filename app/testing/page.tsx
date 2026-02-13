"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Utensils,
  Clock,
  Wallet,
  ChevronRight,
  RefreshCcw,
  Zap,
  Star,
  ShieldCheck,
  Smartphone,
  Navigation,
  Printer,
  QrCode,
  Rocket,
  Menu,
  Search,
  ShoppingBag,
  Plus,
  Bike,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type FeaturePillProps = {
  icon: LucideIcon;
  text: string;
};


// --- DESIGN TOKENS ---
// Deep, soft shadows for the main objects
const CLAY_FLOAT =
  "shadow-[16px_16px_32px_rgba(214,198,186,0.6),_-8px_-8px_24px_rgba(255,255,255,0.9)]";
const CLAY_INSET =
  "shadow-[inset_4px_4px_8px_rgba(204,190,178,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.8)]";
const CLAY_BUTTON =
  "shadow-[6px_6px_12px_rgba(255,158,117,0.4),_-3px_-3px_8px_rgba(255,255,255,0.9)]";

// --- PHONE MOCKUP COMPONENTS ---

const PhoneScreen = () => (
  <div className="w-full h-full bg-[#FFFBF7] flex flex-col p-5 overflow-hidden relative">
    {/* Status Bar */}
    <div className="flex justify-between items-center mb-6 px-1">
      <span className="text-[10px] font-black text-[#D6C6BA]">9:41</span>
      <div className="flex gap-1">
        <div className="w-3 h-3 rounded-full bg-[#D6C6BA]" />
        <div className="w-3 h-3 rounded-full bg-[#D6C6BA]" />
      </div>
    </div>

    {/* App Header */}
    <div className="flex justify-between items-center mb-6">
      <div>
        <p className="text-[#9C8C84] text-xs font-bold">Good Morning,</p>
        <h3 className="text-[#5C4D45] text-xl font-black leading-tight">
          Hungry Student?
        </h3>
      </div>
      <div
        className={`w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#FF9E75] ${CLAY_FLOAT} shadow-lg`}
      >
        <ShoppingBag size={18} />
      </div>
    </div>

    {/* Search Bar Mockup */}
    <div
      className={`w-full h-14 rounded-xl bg-[#F5EFE8] mb-6 flex items-center px-4 gap-2 ${CLAY_INSET}`}
    >
      <Search size={14} className="text-[#D6C6BA]" />
      <div className="h-2 w-20 bg-[#D6C6BA]/30 rounded-full" />
    </div>

    {/* Categories */}
    <div className="flex gap-3 mb-6 overflow-hidden">
      {["All", "Pizza", "Coffee", "Bowls"].map((cat, i) => (
        <div
          key={i}
          className={`px-4 py-2 rounded-xl text-[10px] font-black ${i === 0 ? "bg-[#FF9E75] text-white" : "bg-white text-[#9C8C84]"} ${i === 0 ? CLAY_BUTTON : "shadow-sm"}`}
        >
          {cat}
        </div>
      ))}
    </div>

    {/* Food Card 1 */}
    <div className="bg-white p-3 rounded-2xl mb-4 flex gap-3 items-center shadow-md relative z-10">
      <div className="w-16 h-16 rounded-xl bg-[#FF9E75]/10 flex items-center justify-center text-2xl">
        🍕
      </div>
      <div className="flex-1">
        <h4 className="font-black text-[#5C4D45] text-sm">Pineapple Pizza</h4>
        <p className="text-[#9C8C84] text-[10px] font-medium">
          Ready in 8 mins
        </p>
      </div>
      <div className="w-8 h-8 rounded-full bg-[#FF9E75] flex items-center justify-center text-white font-bold text-lg">
        +
      </div>
    </div>

    {/* Food Card 2 */}
    <div className="bg-white p-3 rounded-2xl mb-4 flex gap-3 items-center shadow-md relative z-10 opacity-60">
      <div className="w-16 h-16 rounded-xl bg-[#81C784]/10 flex items-center justify-center text-2xl">
        🥗
      </div>
      <div className="flex-1">
        <h4 className="font-black text-[#5C4D45] text-sm">Power Bowl</h4>
        <p className="text-[#9C8C84] text-[10px] font-medium">
          Ready in 5 mins
        </p>
      </div>
      <div className="w-8 h-8 rounded-full bg-[#D6C6BA] flex items-center justify-center text-white font-bold text-lg">
        +
      </div>
    </div>

    {/* Floating Button overlay */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-14 bg-[#5C4D45] rounded-2xl flex items-center justify-between px-6 text-white shadow-2xl z-20">
      <span className="text-xs font-bold">2 items • ₹270</span>
      <span className="text-xs font-black bg-[#FF9E75] px-3 py-1 rounded-lg">
        Checkout
      </span>
    </div>
  </div>
);

const PhoneMockup = () => (
  <div className="relative w-[240px] h-[480px]">
    {/* The Physical Phone Body */}
    <div
      className={`absolute inset-0 bg-white rounded-[3rem] border-8 border-white ${CLAY_FLOAT} flex items-center justify-center overflow-hidden`}
    >
      {/* Inner Bezel / Screen Container */}
      <div className="w-full h-full bg-[#F5EFE8] rounded-[2.4rem] overflow-hidden relative border-[6px] border-[#F5EFE8] shadow-inner">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-white rounded-b-xl z-50 shadow-sm flex items-center justify-center">
          <div className="w-12 h-1 bg-[#E5DCD5] rounded-full" />
        </div>
        <PhoneScreen />
      </div>
    </div>

    {/* Decorative Elements around phone */}
    <div className="absolute -z-10 top-10 -right-10 w-32 h-32 bg-[#FF9E75] rounded-full blur-[60px] opacity-40" />
    <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-[#81C784] rounded-full blur-[60px] opacity-30" />
  </div>
);

const FeaturePill = ({ icon: Icon, text }:  FeaturePillProps) => (
  <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-sm border border-white whitespace-nowrap">
    <Icon className="w-5 h-5 text-[#FF9E75]" />
    <span className="text-[#5C4D45] font-black text-xs uppercase tracking-wide">
      {text}
    </span>
  </div>
);

const App = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#2b2b2b] font-montserrat p-8 overflow-auto">
      {/* Font & Print Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap');
        
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }

        @media print {
          @page { size: A4; margin: 0; }
          body { background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .print-container { 
            width: 210mm !important; 
            height: 288mm !important; /* Slightly adjusted for 3:4 ratio */
            box-shadow: none !important; 
            margin: 0 !important;
            border-radius: 0 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Controls */}
      <div className="no-print w-full max-w-[210mm] flex justify-between items-center mb-6 text-white">
        <div>
          <h1 className="font-bold text-xl font-montserrat">
            A4 Poster Studio
          </h1>
          <p className="text-sm opacity-60">Mockup Design • Print Ready</p>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-[#FF9E75] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-[#ff8a58] transition-colors"
        >
          <Printer className="w-5 h-5" /> Print Poster
        </button>
      </div>

      {/* --- POSTER CANVAS (Aspect Ratio 3:4) --- */}
      {/* 3:4 is 0.75, making it shorter than A4's 0.707. width approx 794px, height approx 1058px */}
      <div className="print-container bg-[#FFFBF7] w-full max-w-[794px] aspect-[3/4] relative overflow-hidden shadow-2xl flex flex-col font-montserrat">
        {/* Background Blobs for the Poster itself */}
        <div className="absolute top-[-10%] right-[-20%] w-[600px] h-[600px] bg-[#EDAA55]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-20%] w-[500px] h-[500px] bg-[#FF9E75]/10 rounded-full blur-[100px]" />

        {/* --- HEADER --- */}
        <div className="px-12  pb-4 relative z-10">
          <div className="flex items-center gap-3 mt-6 -ml-10 mb-16">
            {/* <div className="w-10 h-10 rounded-xl bg-[#5C4D45] flex items-center justify-center text-white shadow-lg">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <span className="font-black text-[#5C4D45] text-xl tracking-tight">
              Byte.
            </span> */}
            <img
              src="/byte-logo.png"
              alt="Byte"
              className="w-30 h-14 object-cover block dark:hidden"
            />
          </div>

          <h1 className="text-[5rem] font-black text-[#5C4D45] leading-[0.9] tracking-tighter mb-4 relative z-20">
            SKIP THE
            <span className="text-[#FF9E75]"> QUEUE.</span>
          </h1>

          <p className="text-[#9C8C84] text-xl font-bold max-w-sm leading-relaxed relative z-20">
            Your break belongs to you. <br />
            Pickup or <span className="text-[#FF9E75]">Campus Delivery.</span>
          </p>
        </div>

        {/* --- CENTERPIECE (Phone) --- */}
        <div className="flex-1 relative flex items-center justify-center z-10 perspective-1000 min-h-0">
          {/* Tilted Phone Container - Scaled down and moved to avoid overlap */}
          <div className="transform rotate-6 hover:rotate-0 transition-transform duration-700 ease-out scale-95 origin-center translate-x-12 translate-y-4">
            <PhoneMockup />
          </div>

          {/* Floating UI Elements around phone */}
          <div className="absolute left-8 top-12 transform -rotate-3 z-20">
            <FeaturePill icon={Clock} text="Pre Order " />
          </div>
          <div className="absolute right-4 top-24 transform rotate-6 z-20">
            <FeaturePill icon={Bike} text="Campus Delivery" />
          </div>
          <div className="absolute left-16 bottom-16 transform -rotate-2 z-20">
            <FeaturePill icon={Wallet} text="Smart Wallet" />
          </div>
        </div>

        {/* --- FOOTER (Dark Section) --- */}
        <div className="bg-[#5C4D45] text-white p-10 relative z-20 rounded-t-[3rem] mt-auto">
          <div className="flex justify-between items-center">
            {/* Left: Text */}
            <div className="max-w-xs">
              <div className="inline-block px-3 py-1 bg-[#FF9E75] text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                Exclusive Beta
              </div>
              <h2 className="text-4xl font-black mb-2">Get early access.</h2>
              <p className="text-[#D6C6BA] text-sm leading-relaxed font-medium">
                Available now at IIIT Kottayam.
              </p>
              <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center text-[#D6C6BA] text-[10px] font-bold uppercase tracking-widest">
                <span>www.byteapp.tech</span>
                {/* <span>@byteapp_campus</span> */}
              </div>
            </div>

            {/* Right: QR */}
            <div className="bg-white p-3 w-60 h-60 rounded-2xl shadow-xl flex justify-center items-center flex-col">
              {/* <QrCode className="w-20 h-20 text-[#5C4D45]" /> */}
              <img
                src="/qr-code.svg"
                alt="QR Code"
                className="w-60 h-60 object-contain"
              />
              {/* <div className="text-center mt-2">
                <p className="text-[#5C4D45] text-[10px] font-black uppercase tracking-widest">
                  Scan Me
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
