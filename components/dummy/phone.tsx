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
    x: direction > 0 ? "100%" : "-100%", // If going forward, enter from right. If back, enter from left.
    opacity: 0,
    scale: 0.95, // Subtle scale for depth effect
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
    x: direction > 0 ? "-20%" : "100%", // Parallax exit: If going forward, slight shift left. If back, slide out right.
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

  const phoneChassis = `
    relative mx-auto 
    w-[360px] h-[620px] 
    bg-[#FFFBF7] 
    rounded-[3.5rem] 
    border-[12px] border-[#F5EFE8] 
    shadow-[25px_25px_50px_rgba(214,198,186,0.6),_-10px_-10px_40px_rgba(255,255,255,1)]
    flex flex-col overflow-hidden z-10 select-none
  `;

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return (
          <ClayRestaurantHome
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
            onWalletClick={() => navigate("wallet")}
            onRestaurantClick={() => navigate("menu")}
            onHistoryClick={() => navigate("history")}
          />
        );
    }
  };

  return (
    <div className="h-full bg-transparent flex items-center justify-center p-8 font-sans">
      <div className={`${phoneChassis} dark:shadow-none`}>
        {/* Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#5C4D45] rounded-full z-50 flex justify-center items-center shadow-inner pointer-events-none">
          <div className="w-16 h-full flex items-center justify-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#3a302c] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]"></div>
          </div>
        </div>

        {/* Physical Buttons */}
        <div className="absolute top-32 -right-[14px] w-[14px] h-16 bg-[#F5EFE8] rounded-r-md shadow-[inset_2px_2px_4px_rgba(204,190,178,0.4)]"></div>
        <div className="absolute top-52 -right-[14px] w-[14px] h-24 bg-[#FF9E75] rounded-r-md shadow-[inset_2px_2px_4px_rgba(180,100,60,0.2)]"></div>

        {/* Screen Content Area with AnimatePresence */}
        <div className="flex-1 w-full h-full relative bg-[#FFFBF7] overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={screen}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full bg-[#FFFBF7]"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Glass Reflection Overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-white/30 to-transparent opacity-40 z-40"></div>
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
