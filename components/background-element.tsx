"use client";
import { motion } from "framer-motion";

export const BackgroundElements = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
      {/* 1. BASE COLOR */}
      <div className="absolute inset-0 bg-[#FFFBF7] dark:bg-[#050505] transition-colors duration-500"></div>

      {/* 2. ANIMATED DOT GRID (Tech Vibe) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        <svg className="w-full h-full opacity-[0.15] dark:opacity-[0.1]">
          <defs>
            <pattern
              id="dot-pattern"
              x="0"
              y="0"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="2"
                cy="2"
                r="1.5"
                className="fill-[#5C4D45] dark:fill-white"
              />
            </pattern>
          </defs>
          {/* We animate the rect position to create the panning effect */}
          <motion.rect
            width="100%"
            height="100%"
            fill="url(#dot-pattern)"
            animate={{
              x: [0, -32],
              y: [0, -32],
            }}
            transition={{
              repeat: Infinity,
              duration: 20, // Slow, subtle movement
              ease: "linear",
            }}
          />
        </svg>
      </motion.div>

      {/* 3. BREATHING CLAY BLOBS (Soft Vibe) */}
      {/* Top Right - Warm Coral */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.2, 0.3],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] bg-[#FF9E75] dark:bg-[#FF9E75] blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen"
      ></motion.div>

      {/* Bottom Left - Soft Green/Teal (for contrast) or secondary brand color */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.15, 0.2],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-[#FFCCBC] dark:bg-[#FF7043] blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen"
      ></motion.div>

      {/* Bottom Right - Small Accent */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.1, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#FFF0E6] dark:bg-[#A1887F] blur-[80px] rounded-full mix-blend-multiply dark:mix-blend-screen"
      ></motion.div>

      {/* 4. NOISE TEXTURE (Tactile Feel) */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
    </div>
  );
};
