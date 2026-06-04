"use client";

interface BackgroundElementsProps {
  variant?: "default" | "offset" | "subtle";
}

export const BackgroundElements = ({ variant = "default" }: BackgroundElementsProps) => {
  const positions = {
    default: {
      blob1: "-top-[10%] -right-[10%]",
      blob2: "top-[50%] -left-[10%]",
    },
    offset: {
      blob1: "-top-[5%] -left-[15%]",
      blob2: "bottom-[20%] -right-[10%]",
    },
    subtle: {
      blob1: "top-[10%] -right-[15%]",
      blob2: "bottom-[30%] -left-[15%]",
    },
  };

  const pos = positions[variant];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#FFFBF7] dark:bg-[#050505] transition-colors duration-500"></div>

      <div className={`absolute ${pos.blob1} w-[600px] h-[600px] bg-[#FF9E75] dark:bg-[#FF9E75] opacity-[0.12] dark:opacity-[0.08] blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen`}></div>

      <div className={`absolute ${pos.blob2} w-[500px] h-[500px] bg-[#FFCCBC] dark:bg-[#FF7043] opacity-[0.10] dark:opacity-[0.06] blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen`}></div>
    </div>
  );
};
