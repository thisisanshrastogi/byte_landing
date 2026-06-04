"use client";

import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { THEME, CLAY } from "@/lib/design-tokens";
import { Navbar } from "@/components/layout/navbar";

export default function NotFound() {
  const [clickCount, setClickCount] = useState(0);
  const baoControls = useAnimation();

  const handleBaoClick = async () => {
    setClickCount((prev) => prev + 1);
    await baoControls.start({
      y: [-20, 0],
      rotate: [-10, 10, -10, 0],
      transition: { duration: 0.4 }
    });
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative ${THEME.bg} selection:bg-[#FF9E75] selection:text-white`}>
      <Navbar />

      {/* Background blobs for claymorphism */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[#FF9E75]/10 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] bg-[#5C4D45]/5 dark:bg-white/5 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Main Content */}
      <div className="relative z-[100] flex flex-col items-center text-center w-full max-w-3xl mt-24 lg:mt-32">

        {/* Animated 404 with Bao inside the '0' */}
        <div className="flex items-center justify-center gap-2 md:gap-8 mb-8">
          <motion.div
            className={`text-[8rem] md:text-[14rem] font-black ${THEME.textDark} drop-shadow-sm leading-none tracking-tighter`}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 1 }}
          >
            4
          </motion.div>

          {/* Big Bao representing the 0 */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.6, duration: 1.2, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={baoControls}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBaoClick}
              className={`relative w-28 h-28 md:w-48 md:h-48 flex flex-col items-center justify-center ${CLAY.shadow.brand} ${CLAY.shadowDark.brand} cursor-pointer select-none transition-colors duration-300`}
              style={{
                borderRadius: "50% 50% 40% 40%",
                backgroundColor: clickCount > 5 ? "#ff7c50" : "#FF9E75"
              }}
            >
              {/* Bao Face (Confused/Sad) */}
              <div className="absolute top-[35%] flex flex-col items-center gap-[6px] md:gap-[8px]">
                {/* Eyes */}
                <div className="flex gap-5 md:gap-8">
                  {/* Left Eye (Cross) */}
                  <div className="relative w-4 h-4 md:w-6 md:h-6 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: clickCount > 5 ? [45, 135] : 45 }}
                      className="absolute w-full h-1.5 md:h-2 bg-[#5C4D45] rounded-full"
                    />
                    <motion.div
                      animate={{ rotate: clickCount > 5 ? [-45, 45] : -45 }}
                      className="absolute w-full h-1.5 md:h-2 bg-[#5C4D45] rounded-full"
                    />
                  </div>
                  {/* Right Eye (Cross) */}
                  <div className="relative w-4 h-4 md:w-6 md:h-6 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: clickCount > 5 ? [45, 135] : 45 }}
                      className="absolute w-full h-1.5 md:h-2 bg-[#5C4D45] rounded-full"
                    />
                    <motion.div
                      animate={{ rotate: clickCount > 5 ? [-45, 45] : -45 }}
                      className="absolute w-full h-1.5 md:h-2 bg-[#5C4D45] rounded-full"
                    />
                  </div>
                </div>
                {/* Mouth */}
                <motion.div
                  animate={{
                    width: clickCount > 5 ? [16, 24] : 16,
                    height: clickCount > 5 ? [8, 16] : 8,
                    borderRadius: clickCount > 5 ? "50%" : "12px 12px 4px 4px"
                  }}
                  className="w-4 h-2 md:w-6 md:h-3 bg-[#5C4D45] mt-1 md:mt-2"
                />
              </div>

              {/* Sweat drop for confusion */}
              {clickCount <= 5 && (
                <motion.div
                  animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute top-4 right-4 md:top-6 md:right-8 w-3 h-4 md:w-4 md:h-6 bg-blue-200/80"
                  style={{ borderRadius: "0 100% 100% 100%", transform: "rotate(45deg)" }}
                />
              )}
              {/* Angry Mark */}
              {clickCount > 5 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-2 right-2 md:top-4 md:right-4 text-red-500 font-black text-xl md:text-3xl"
                >
                  💢
                </motion.div>
              )}
            </motion.div>

            {/* Pop-up message on clicks */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: clickCount > 0 ? 1 : 0, y: clickCount > 0 ? -10 : 10 }}
              className={`absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#5C4D45] text-white text-xs md:text-sm font-bold px-4 py-2 rounded-xl shadow-lg pointer-events-none z-[100]`}
            >
              {clickCount > 5 ? "Stop poking me! I'm already lost! 😭" : "Ouch! It's a 404!"}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#5C4D45] rotate-45" />
            </motion.div>
          </motion.div>

          <motion.div
            className={`text-[8rem] md:text-[14rem] font-black ${THEME.textDark} drop-shadow-sm leading-none tracking-tighter`}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 1, delay: 0.4 }}
          >
            4
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="space-y-8 px-4"
        >
          <div className="space-y-4">
            <h2 className={`text-3xl md:text-5xl font-extrabold ${THEME.textDark} tracking-tight leading-[1.15]`}>
              Oops! Bao got lost <br className="md:hidden" />
              on campus.
            </h2>
            <p className={`text-base md:text-lg ${THEME.textSoft} max-w-lg mx-auto font-medium`}>
              The page you're looking for isn't in our system, or maybe Bao ate it while managing the queues.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button
              className={`${THEME.btnPrimary} h-14 md:h-16 px-8 rounded-full text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-3 w-full sm:w-auto`}
            >
              <Link href="/" className="flex items-center gap-3 w-full justify-center">
                <ArrowLeft size={18} />
                Back to Byte
              </Link>
            </button>

            <button
              className={`${THEME.btnSecondary} h-14 md:h-16 px-8 rounded-full text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-3 w-full sm:w-auto`}
            >
              <Link href="/contact" className="w-full text-center">
                Contact Support
              </Link>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
