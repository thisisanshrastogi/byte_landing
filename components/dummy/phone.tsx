"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClayRestaurantHome from "./homepage";
import ClayMenuPage from "./menupage";
import ClayCart from "./cartpage";
import ClayOrderHistory from "./orderhistorypage";
import ClayWallet from "./walletpage";

// Screen Depth Map: Determines if we slide forward or backward
const SCREEN_DEPTH = {
  home: 0,
  menu: 1,
  history: 1,
  wallet: 1,
  cart: 2,
};

import type { Variants } from "framer-motion";

// Animation Variants
const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
    zIndex: 1,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    zIndex: 2,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-20%" : "100%",
    opacity: 0,
    zIndex: 0,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

const PhoneSimulator = () => {
  const [screen, setScreen] = useState<keyof typeof SCREEN_DEPTH>("home");
  const [direction, setDirection] = useState(0);

  // Smart Navigation Handler
  const navigate = (newScreen: keyof typeof SCREEN_DEPTH) => {
    const currentDepth = SCREEN_DEPTH[screen];
    const newDepth = SCREEN_DEPTH[newScreen];

    if (newDepth > currentDepth) {
      setDirection(1); // Forward
    } else if (newDepth < currentDepth) {
      setDirection(-1); // Backward
    } else {
      setDirection(0); // Lateral/Crossfade
    }

    setScreen(newScreen);
  };

  // UPDATED: Mobile Compatible Chassis Styles
  const phoneChassis = `
    relative mx-auto 
    /* Mobile: Fluid width with max limits */
    w-full max-w-[320px] h-[600px] max-h-[85vh]
    /* Desktop: Fixed wider width */
    md:w-[360px] md:h-[620px] md:max-h-none
    bg-[#FFFBF7] 
    /* Responsive border radius and thickness */
    rounded-[2.5rem] md:rounded-[3.5rem] 
    border-[8px] md:border-[12px] border-[#F5EFE8] 
    /* Toned down shadow for mobile, full shadow for desktop */
    shadow-[15px_15px_30px_rgba(214,198,186,0.4),_-5px_-5px_20px_rgba(255,255,255,0.8)]
    md:shadow-[25px_25px_50px_rgba(214,198,186,0.6),_-10px_-10px_40px_rgba(255,255,255,1)]
    flex flex-col overflow-hidden z-10 select-none
  `;

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return (
          <ClayRestaurantHome
            onCartClick={() => navigate("cart")}
            onWalletClick={() => navigate("wallet")}
            onRestaurantClick={() => navigate("menu")}
            onHistoryClick={() => navigate("history")}
          />
        );
      case "menu":
        return (
          <ClayMenuPage
            onBack={() => navigate("home")}
            onCartClick={() => navigate("cart")}
          />
        );
      case "cart":
        return <ClayCart onBack={() => navigate("menu")} />;
      case "history":
        return <ClayOrderHistory onBack={() => navigate("home")} />;
      case "wallet":
        return <ClayWallet onBack={() => navigate("home")} />;
      default:
        return (
          <ClayRestaurantHome
            onCartClick={() => navigate("cart")}
            onWalletClick={() => navigate("wallet")}
            onRestaurantClick={() => navigate("menu")}
            onHistoryClick={() => navigate("history")}
          />
        );
    }
  };

  return (
    <div className="w-full md:w-fit h-full bg-transparent flex items-center justify-center p-4 md:p-8 font-sans">
      {/* --- INTERACTION HINT (Hidden on Mobile) --- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute -right-20 top-20 z-0 hidden lg:flex flex-col items-center gap-2"
      >
        <div className="relative">
          {/* Curved Arrow (SVG) */}
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            className="absolute top-4 -left-12 text-[#9C8C84] -rotate-12"
          >
            <path
              d="M40 10 C 10 10, 0 30, 10 40"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              markerEnd="url(#arrowhead)"
            />
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="0"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
              </marker>
            </defs>
          </svg>

          {/* The Badge */}
          <div className="bg-white px-4 py-2 rounded-xl shadow-[4px_4px_8px_rgba(214,198,186,0.5),_-2px_-2px_6px_rgba(255,255,255,0.8)] border border-white rotate-6">
            <p className="text-xs font-black max-w-14 text-[#FF9E75] tracking-widest">
              Tap Icons to Navigate
            </p>
          </div>
        </div>
      </motion.div>

      <div className={`${phoneChassis} dark:shadow-none`}>
        {/* Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 md:w-32 h-7 md:h-8 bg-[#5C4D45] rounded-full z-50 flex justify-center items-center shadow-inner pointer-events-none transition-all">
          <div className="w-16 h-full flex items-center justify-center gap-2 md:gap-3">
            <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[#3a302c] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"></div>
            <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-[#1a1a1a]"></div>
          </div>
        </div>

        {/* Physical Buttons (Adjusted for responsiveness) */}
        <div className="absolute top-28 md:top-32 -right-[10px] md:-right-[14px] w-[10px] md:w-[14px] h-12 md:h-16 bg-[#F5EFE8] rounded-r-md shadow-[inset_2px_2px_4px_rgba(204,190,178,0.4)]"></div>
        <div className="absolute top-44 md:top-52 -right-[10px] md:-right-[14px] w-[10px] md:w-[14px] h-20 md:h-24 bg-[#FF9E75] rounded-r-md shadow-[inset_2px_2px_4px_rgba(180,100,60,0.2)]"></div>

        {/* Screen Content Area with AnimatePresence */}
        <div className="flex-1 w-full h-full relative bg-[#FFFBF7] overflow-hidden rounded-[2rem] md:rounded-[2.8rem]">
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

        {/* Glass Reflection Overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] md:rounded-[3.5rem] bg-gradient-to-tr from-white/30 to-transparent opacity-40 z-40"></div>
      </div>

      {/* Utilities */}
      <style jsx global>{`
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
