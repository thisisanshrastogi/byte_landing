"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ChevronRight,
  Clock,
  MapPin,
  Utensils,
} from "lucide-react";
import ClayRestaurantHome from "./homepage";
import ClayMenuPage from "./menupage";
import ClayCart from "./cartpage";
import ClayOrderHistory from "./orderhistorypage";
import ClayWallet from "./walletpage";

// Screen Navigation
const SCREEN_DEPTH = {
  locked: -1, // New "Student Lock Screen"
  home: 0,
  menu: 1,
  history: 1,
  wallet: 1,
  cart: 2,
};

import type { Variants } from "framer-motion";
import useIsMobile from "../mobile-detector";
import { set } from "date-fns";

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.9,
    zIndex: 1,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    zIndex: 2,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-20%" : "100%",
    opacity: 0,
    zIndex: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

const PhoneSimulator = () => {
  // Start in "locked" state to grab attention

  const [screen, setScreen] = useState<keyof typeof SCREEN_DEPTH>("locked");

  const [direction, setDirection] = useState(0);

  const navigate = (newScreen: keyof typeof SCREEN_DEPTH) => {
    const currentDepth = SCREEN_DEPTH[screen];
    const newDepth = SCREEN_DEPTH[newScreen];
    setDirection(
      newDepth > currentDepth ? 1 : newDepth < currentDepth ? -1 : 0
    );
    setScreen(newScreen);
  };

  // --- COMPONENT: THE "STUDENT LOCK SCREEN" ---
  const StudentLockScreen = () => {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const currentDate = new Date().toLocaleDateString([], {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    return (
      <div className="w-full h-full flex flex-col p-6 bg-[#FFFBF7] relative overflow-hidden">
        {/* Animated Background Pulse (Subtle) */}
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#FF9E75]/20 to-transparent pointer-events-none"
        />

        {/* 1. Lock Screen Header (Time/Date) */}
        <div className="mt-12 text-center z-10">
          <h2 className="text-6xl font-black text-[#5C4D45]/20 tracking-tighter select-none">
            {currentTime}
          </h2>
          <p className="text-[#9C8C84] font-bold text-xs uppercase tracking-widest mt-1">
            {currentDate}
          </p>
        </div>

        {/* 2. The Notification (The "Why" - Visual Hook) */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 mx-auto w-full max-w-[260px] relative z-10"
        >
          {/* Notification Card */}
          <div
            className="bg-[#FFFBF7] p-5 rounded-[1.5rem] shadow-[8px_8px_16px_rgba(214,198,186,0.6),_-4px_-4px_12px_rgba(255,255,255,1)] border border-white relative overflow-hidden group cursor-pointer"
            onClick={() => navigate("home")}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#FF9E75] rounded-lg flex items-center justify-center text-white shadow-sm">
                  <ShoppingBag size={12} fill="currentColor" />
                </div>
                <span className="text-[10px] font-black uppercase text-[#9C8C84] tracking-wider">
                  Byte App
                </span>
              </div>
              <span className="text-[9px] font-bold text-[#D6C6BA]">Now</span>
            </div>

            {/* Content */}
            <h3 className="text-lg font-black text-[#5C4D45] leading-tight mb-1">
              Order Ready! 🍔
            </h3>
            <p className="text-sm font-bold text-[#9C8C84] leading-snug">
              Skip the line. Your Spicy Wrap is waiting at the counter.
            </p>

            {/* Decor line */}
            <div className="absolute left-0 bottom-0 h-1 bg-[#FF9E75] w-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </div>
        </motion.div>

        {/* 3. Bottom Action (Unlock) */}
        <div className="mt-auto mb-4 z-10">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("home")}
            className="w-full h-16 bg-[#ece7e1] hover:bg-[#e0d9d1] rounded-full  flex items-center justify-between p-2 relative overflow-hidden"
          >
            {/* Shimmer Effect */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]"></div> */}

            {/* <div className="w-12 h-12 bg-white rounded-xl shadow-[2px_2px_5px_rgba(214,198,186,0.5)] flex items-center justify-center text-[#FF9E75] relative z-10">
              <ChevronRight size={24} strokeWidth={3} />
            </div> */}

            <span className="absolute left-0 right-0 text-center text-xs font-black uppercase tracking-widest text-[#9C8C84]/90 pointer-events-none">
              Tap to Pickup
            </span>
          </motion.button>
        </div>
        {/* 3. Bottom Action (IMPROVED SLIDER) */}
      </div>
    );
  };

  // --- STYLES ---
  const phoneChassis = `
    relative mx-auto 
    /* Mobile: Fluid width with max limits */
    w-full max-w-[320px] h-[600px] max-h-[85vh]
    /* Desktop: Fixed wider width */
    md:w-[360px] md:h-[620px] md:max-h-none
    bg-[#FFFBF7] 
    /* Responsive border radius and thickness */
    rounded-[3.5rem] md:rounded-[3.5rem] 
    border-[8px] md:border-[12px] border-[#F5EFE8] 
    /* Toned down shadow for mobile, full shadow for desktop */
    shadow-[15px_15px_30px_rgba(214,198,186,0.4),_-5px_-5px_20px_rgba(255,255,255,0.8)]
    md:shadow-none
    flex flex-col overflow-hidden z-10 select-none
  `;

  const renderScreen = () => {
    const props = {
      onCartClick: () => navigate("cart"),
      onWalletClick: () => navigate("wallet"),
      onRestaurantClick: () => navigate("menu"),
      onHistoryClick: () => navigate("history"),
      onBack: () => navigate("home"),
    };

    switch (screen) {
      case "locked":
        return <StudentLockScreen />;
      case "home":
        return <ClayRestaurantHome {...props} />;
      case "menu":
        return <ClayMenuPage {...props} />;
      case "cart":
        return <ClayCart {...props} />;
      case "history":
        return <ClayOrderHistory {...props} />;
      case "wallet":
        return <ClayWallet {...props} />;
      default:
        return <ClayRestaurantHome {...props} />;
    }
  };

  // --- PHONE SHAKE ANIMATION ---
  const shakeVariants = {
    idle: { rotate: 0 },
    shaking: {
      rotate: [-0.5, 0.5, -0.5, 0.5, 0],
      transition: {
        repeat: Infinity,
        repeatDelay: 3,
        duration: 0.2,
        // ease: [0.42, 0, 0.58, 1], // cubic-bezier for easeInOut
      },
    },
  };

  const isPhone = useIsMobile();

  useEffect(() => {
    if (isPhone) {
      setScreen("home");
    }
  }, [isPhone]);

  return (
    <div className="w-full md:w-fit h-full mt-6 flex items-center justify-center px-4 font-sans relative">
      {/* THE PHONE CONTAINER */}
      <motion.div
        variants={shakeVariants}
        animate={screen === "locked" ? "shaking" : "idle"}
        className={phoneChassis}
      >
        {/* DYNAMIC ISLAND (Notification Context) */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-500">
          <motion.div
            animate={{
              width: screen === "locked" ? 140 : 100,
              height: 32,
            }}
            className="bg-[#5C4D45] rounded-full flex justify-center items-center shadow-inner relative overflow-hidden"
          >
            <div className="absolute left-3 flex items-center gap-2">
              <div className="w-2 h-2  rounded-full bg-[#3a302c] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]"></div>
            </div>

            <AnimatePresence>
              {screen === "locked" && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 20 }}
                  exit={{ opacity: 0 }}
                  className="text-[9px] font-black text-[#FF9E75] uppercase tracking-wider ml-3 "
                >
                  Pickup Now
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* PHYSICAL BUTTONS */}
        <div className="absolute top-36 -right-[12px] w-[12px] h-16 bg-[#F5EFE8] rounded-r-md shadow-[inset_2px_2px_4px_rgba(204,190,178,0.4)] border-l border-[#dcdcdc]"></div>
        <div className="absolute top-56 -right-[12px] w-[12px] h-24 bg-[#FF9E75] rounded-r-md shadow-[inset_2px_2px_4px_rgba(180,100,60,0.2)] border-l border-[#ff8a65]"></div>

        {/* SCREEN CONTENT */}
        <div className="flex-1 w-full h-full relative bg-[#FFFBF7] overflow-hidden rounded-[2.8rem]">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={screen}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full bg-[#FFFBF7] py-3"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* GLASS GLARE */}
        <div className="pointer-events-none absolute inset-0 rounded-[3.5rem] bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-40 z-40"></div>
      </motion.div>

      {/* --- FLOATING DECORATIONS (Student Context) --- */}
      {/* <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 lg:right-32 w-16 h-16 bg-[#FFFBF7] rounded-2xl shadow-[8px_8px_16px_rgba(214,198,186,0.3)] flex items-center justify-center -z-10 rotate-12"
      >
        <Clock className="text-[#D6C6BA]" />
      </motion.div> */}

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-32 left-10 lg:left-32 w-14 h-14 bg-[#FFFBF7] rounded-full shadow-[8px_8px_16px_rgba(214,198,186,0.3)] flex items-center justify-center -z-10 -rotate-12"
      >
        <MapPin className="text-[#FF9E75]" />
      </motion.div>

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default PhoneSimulator;
