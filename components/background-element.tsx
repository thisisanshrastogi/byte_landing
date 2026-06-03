"use client";

export const BackgroundElements = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#FFFBF7] dark:bg-[#050505] transition-colors duration-500"></div>

      <div className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] bg-[#FF9E75] dark:bg-[#FF9E75] opacity-[0.12] dark:opacity-[0.08] blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>

      <div className="absolute top-[50%] -left-[10%] w-[500px] h-[500px] bg-[#FFCCBC] dark:bg-[#FF7043] opacity-[0.10] dark:opacity-[0.06] blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
    </div>
  );
};
