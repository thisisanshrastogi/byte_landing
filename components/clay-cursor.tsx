"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const BAO_SAYINGS = [
  "Test the app flow on the phone! 👉",
  "Tired of the same old canteen food?",
  "Byte supports local campus vendors!",
  "Skip the Canteen queue",
  "Check out the interactive dummy phone.",
  "Affordable delivery right to your dorm 🍕"
];

export const ClayCursor = ({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
}) => {
  const [isInside, setIsInside] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isTrackingInstantly, setIsTrackingInstantly] = useState(false);

  // Easter Egg: Rapid click counter
  const [clickCombo, setClickCombo] = useState(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Easter Egg: Speech Bubble
  const [sayingIndex, setSayingIndex] = useState(0);
  const [isSayingVisible, setIsSayingVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // We use a fixed spring for the flights.
  const smoothX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(cursorY, { stiffness: 300, damping: 30 });

  const mouseRef = useRef({ x: -100, y: -100 });
  const restPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const updateRestPos = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      restPos.current = {
        x: rect.left + rect.width * 0.6,
        y: rect.top + rect.height * 0.25,
      };
    }
  };

  useEffect(() => {
    updateRestPos();
    window.addEventListener("resize", updateRestPos);
    window.addEventListener("scroll", updateRestPos);
    return () => {
      window.removeEventListener("resize", updateRestPos);
      window.removeEventListener("scroll", updateRestPos);
    };
  }, [containerRef]);

  // Manage the dynamic tracking mode
  useEffect(() => {
    if (isInside) {
      // Give it 350ms to finish its smooth flight to the mouse, 
      // then snap into instant 1:1 tracking mode.
      const t = setTimeout(() => setIsTrackingInstantly(true), 350);
      return () => clearTimeout(t);
    } else {
      setIsTrackingInstantly(false);
    }
  }, [isInside]);

  // Manage the stationary sayings
  useEffect(() => {
    if (isInside) {
      setIsSayingVisible(false);
      return;
    }

    let timeout1: NodeJS.Timeout;
    let timeout2: NodeJS.Timeout;
    let timeout3: NodeJS.Timeout;

    const runCycle = () => {
      // Wait 2 seconds before speaking
      timeout1 = setTimeout(() => {
        setIsSayingVisible(true);
        // Stay visible for 4 seconds
        timeout2 = setTimeout(() => {
          setIsSayingVisible(false);
          // Wait 1 second for fade out, then switch text and restart
          timeout3 = setTimeout(() => {
            setSayingIndex((prev) => (prev + 1) % BAO_SAYINGS.length);
            runCycle();
          }, 1500);
        }, 4000);
      }, 1000);
    };

    runCycle();

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [isInside]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isDesktop) return;

    updateRestPos();
    cursorX.set(restPos.current.x);
    cursorY.set(restPos.current.y);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      const rect = container.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      setIsInside(inside);

      if (inside) {
        const target = e.target as HTMLElement;
        const isClickable = !!(
          target?.closest?.("button") ||
          target?.closest?.("a") ||
          target?.closest?.("[role='button']")
        );
        setIsHoveringClickable(isClickable);

        cursorX.set(e.clientX - 16);
        cursorY.set(e.clientY - 16);
      } else {
        setIsHoveringClickable(false);
        updateRestPos();
        cursorX.set(restPos.current.x);
        cursorY.set(restPos.current.y);
      }
    };

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const { x, y } = mouseRef.current;
      const inside =
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom;

      setIsInside(inside);

      if (!inside) {
        updateRestPos();
        cursorX.set(restPos.current.x);
        cursorY.set(restPos.current.y);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        setIsPressed(true);

        // Build click combo for the easter egg
        setClickCombo((prev) => Math.min(prev + 1, 10));
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = setTimeout(() => {
          setClickCombo(0);
        }, 800); // Reset combo if you stop clicking for 800ms
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) setIsPressed(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { capture: true });
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    window.addEventListener("mousedown", handleMouseDown, { capture: true });
    window.addEventListener("mouseup", handleMouseUp, { capture: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove, { capture: true });
      window.removeEventListener("scroll", handleScroll, { capture: true } as any);
      window.removeEventListener("mousedown", handleMouseDown, { capture: true });
      window.removeEventListener("mouseup", handleMouseUp, { capture: true });
    };
  }, [containerRef, isDesktop, cursorX, cursorY]);

  useEffect(() => {
    if (isInside && isDesktop) {
      document.documentElement.style.setProperty("cursor", "none", "important");
      const style = document.createElement("style");
      style.id = "hide-cursor-style";
      style.innerHTML = `* { cursor: none !important; }`;
      document.head.appendChild(style);
      return () => {
        document.documentElement.style.removeProperty("cursor");
        const el = document.getElementById("hide-cursor-style");
        if (el) el.remove();
      };
    } else {
      document.documentElement.style.removeProperty("cursor");
      const el = document.getElementById("hide-cursor-style");
      if (el) el.remove();
    }
  }, [isInside, isDesktop]);

  if (!isDesktop) return null;

  const getBaoColor = (combo: number) => {
    if (combo <= 3) return "#FDFBF9";
    if (combo === 4) return "#FCEFE6";
    if (combo === 5) return "#FAE5D4";
    if (combo === 6) return "#F7DAC2";
    if (combo === 7) return "#F5CEB0";
    if (combo === 8) return "#F2C39E";
    if (combo === 9) return "#F0B78C";
    return "#FF9E75"; // Max level 10
  };

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        style={{
          x: isTrackingInstantly ? cursorX : smoothX,
          y: isTrackingInstantly ? cursorY : smoothY
        }}
        className="fixed top-0 left-0"
      >
        <motion.div
          animate={{
            scale: isInside ? (isPressed ? 0.8 : (isHoveringClickable ? 1.4 : 1)) : 1.3,
            rotate: !isPressed ? [-3, 3, -3] : 0,
            backgroundColor: getBaoColor(clickCombo),
          }}
          transition={{
            scale: { type: "spring", stiffness: 500, damping: 20 },
            rotate: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            backgroundColor: { duration: 0.4 } // Smooth gradient transition
          }}
          className="relative w-8 h-8 flex flex-col items-center justify-center shadow-[inset_-2px_-4px_6px_rgba(92,77,69,0.15),inset_2px_4px_6px_rgba(255,255,255,1),0_12px_24px_rgba(92,77,69,0.3),0_0_8px_rgba(92,77,69,0.15),0_0_0_1px_rgba(92,77,69,0.05)]"
          style={{ borderRadius: "50% 50% 40% 40%" }}
        >
          <div className="absolute top-[35%] flex flex-col items-center gap-[2px]">
            <div className="flex gap-2">
              <motion.div animate={{ height: isPressed ? 2 : (isInside ? 4 : 5) }} className="w-1 bg-[#5C4D45] rounded-full" />
              <motion.div animate={{ height: isPressed ? 2 : (isInside ? 4 : 5) }} className="w-1 bg-[#5C4D45] rounded-full" />
            </div>
            <motion.div animate={{ width: isHoveringClickable ? 8 : (isInside ? 4 : 5), height: isHoveringClickable ? 8 : 2, backgroundColor: isHoveringClickable ? "#FF9E75" : "#5C4D45", borderRadius: isHoveringClickable ? "50%" : "8px" }} className="w-1 h-0.5 rounded-full" />
          </div>

          <AnimatePresence>
            {!isInside && isSayingVisible && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-max max-w-[140px] bg-[#FFFBF7] text-[#5C4D45] text-[9px] font-bold leading-tight px-3 py-2 rounded-xl shadow-[inset_-1px_-2px_4px_rgba(92,77,69,0.05),0_8px_16px_rgba(92,77,69,0.15)] border border-[#FF9E75]/20 pointer-events-none text-center"
              >
                {BAO_SAYINGS[sayingIndex]}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FFFBF7] border-b border-r border-[#FF9E75]/20 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};