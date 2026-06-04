"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import StickersPage from "./stickers";

export default function IntroShutter() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("byte-intro-shown")) return;

    setShow(true);
    sessionStorage.setItem("byte-intro-shown", "1");

    const t = setTimeout(() => setShow(false), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="shutter"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary shadow-2xl overflow-hidden"
        >
          <StickersPage />

          <div className="z-10 relative overflow-hidden px-4 pt-8 pb-2">
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{
                delay: 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              className="flex justify-center"
            >
              <div>
                <img
                  src="/byte-logo.png"
                  alt="Byte logo"
                  className="w-56 h-28 object-cover mb-4 rounded-xl relative z-20 block dark:hidden"
                />
                <img
                  src="/byte-logo-dark.png"
                  alt="Byte logo"
                  className="w-56 h-28 object-cover mb-4 rounded-xl hidden dark:block relative z-20"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                delay: 0.1,
                duration: 0.6,
                ease: "circOut",
              }}
              className="absolute bottom-0 left-0 w-full h-[3px] bg-white rounded-full origin-center z-30"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
