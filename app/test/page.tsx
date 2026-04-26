import React from 'react';
import { Sparkles, Wind, Heart, Zap, ArrowDownCircle, Fingerprint } from 'lucide-react';
import { clsx } from 'clsx';

const BytePosterFinal = () => {
  // THE CLAY DESIGN LANGUAGE TOKENS
  const tokens = {
    colors: {
      bg: 'bg-[#FFFBF7]',      // Warm Off-White
      textHead: 'text-[#5C4D45]', // Dark Coffee
      textBody: 'text-[#9C8C84]', // Clay Grey
      coral: 'bg-[#FF9E75] text-[#FF9E75]',
      sky: 'bg-[#64B5F6] text-[#64B5F6]',
      sage: 'bg-[#81C784] text-[#81C784]',
      lavender: 'bg-[#9575CD] text-[#9575CD]',
    },
    shadows: {
      // Heavy floating shadow for main elements
      floating: 'shadow-[12px_12px_24px_rgba(214,198,186,0.6),_-8px_-8px_20px_rgba(255,255,255,0.9)]',
      // Deep pressed well shadow
      inset: 'shadow-[inset_6px_6px_12px_rgba(204,190,178,0.5),_inset_-6px_-6px_12px_rgba(255,255,255,0.9)]',
      // Softer shadow for background elements
      soft: 'shadow-[8px_8px_16px_rgba(214,198,186,0.3),_-4px_-4px_12px_rgba(255,255,255,0.5)]',
    },
    shapes: {
      card: 'rounded-[3rem]',
      circle: 'rounded-full',
    }
  };

  return (
    // Outer Preview Container (Simulates the wall/paper it's printed on)
    <div className="h-full w-full flex justify-center items-center bg-gray-100 p-8 font-sans overflow-hidden">
      
      {/* --- POSTER CANVAS (Fixed 700x1000 aspect ratio) --- */}
      <div 
        className={clsx(
          "w-[700px] h-[1200px] relative overflow-hidden flex flex-col",
          tokens.colors.bg,
          // Add a subtle texture border for print realism
          "border-[12px] border-[#FFFBF7] shadow-2xl" 
        )}
      >

        {/* --- LAYER 0: BACKGROUND CLAYSCAPE --- */}
        {/* Large, soft blobs creating a physical environment */}
        <div className="absolute inset-0 z-0">
          {/* Top Right Coral Blob */}
          <div className={clsx(
            "absolute top-[-150px] right-[-150px] w-[600px] h-[600px]",
            tokens.shapes.circle,
            tokens.colors.coral,
            "opacity-20",
            tokens.shadows.soft
          )}></div>
           {/* Middle Left Sky Blob */}
          <div className={clsx(
            "absolute top-[300px] left-[-200px] w-[500px] h-[500px]",
            tokens.shapes.circle,
            tokens.colors.sky,
            "opacity-15",
            tokens.shadows.soft
          )}></div>
          {/* Bottom Lavender Blob */}
          <div className={clsx(
            "absolute bottom-[-100px] right-[50px] w-[700px] h-[400px]",
            tokens.shapes.card,
            tokens.colors.lavender,
            "opacity-10",
            tokens.shadows.soft
          )}></div>
        </div>


        {/* --- LAYER 1: CONTENT --- */}
        <div className="relative z-10 h-full flex flex-col justify-between p-12">
          
          {/* === HEADER SECTION === */}
          <header className="text-center mt-8">
             {/* Logo Sculpting */}
            <div className="flex justify-center mb-8">
              <div className={clsx(
                "w-32 h-32 flex items-center justify-center bg-[#FFFBF7] border-4 border-white",
                tokens.shapes.circle,
                tokens.shadows.floating
              )}>
                {/* Inset well for the icon */}
                <div className={clsx(
                  "w-20 h-20 flex items-center justify-center bg-[#F2EEE9]",
                  tokens.shapes.circle,
                  tokens.shadows.inset
                )}>
                  <Sparkles size={48} className={tokens.colors.coral.split(' ')[1]} strokeWidth={2.5} />
                </div>
              </div>
            </div>

            <h1 className={clsx("text-[7rem] leading-none font-black tracking-tighter mb-4", tokens.colors.textHead)}>
              Byte.
            </h1>
            <p className={clsx("text-3xl font-bold", tokens.colors.textHead)}>
              The softer side of digital.
            </p>
            {/* <div className={clsx("mt-6 inline-block px-6 py-3 bg-[#FFFBF7] border-2 border-white", tokens.shapes.card, tokens.shadows.soft)}>
               <p className={clsx("text-lg font-medium uppercase tracking-widest", tokens.colors.textBody)}>
                 Coming Soon to iOS & Android
               </p>
            </div> */}
          </header>


          {/* === MIDDLE SECTION: ABSTRACT CLAY SCULPTURES === */}
          {/* These represent features/feelings instead of screenshots */}
          <div className="flex justify-between items-center gap-8 my-12">
            
            {/* Sculpture 1: Effortless Flow */}
            <SculptureTile 
              tokens={tokens}
              ThemeColorClass={tokens.colors.sky}
              Icon={Wind}
              Title="Effortless Flow"
            />

            {/* Sculpture 2: Tactile Comfort (Main Focus) */}
            <div className="transform scale-110">
              <SculptureTile 
                tokens={tokens}
                ThemeColorClass={tokens.colors.coral}
                Icon={Heart}
                Title="Human Comfort"
                Main={true}
              />
            </div>

            {/* Sculpture 3: Instant Delight */}
            <SculptureTile 
              tokens={tokens}
              ThemeColorClass={tokens.colors.sage}
              Icon={Zap}
              Title="Instant Delight"
            />
          </div>


          {/* === FOOTER SECTION: THE ANCHOR === */}
          <footer className="mb-4">
            <div className={clsx(
              "w-full p-10 bg-[#FFFBF7] border-4 border-white flex items-center justify-between",
              tokens.shapes.card,
              tokens.shadows.floating
            )}>
              
              <div>
                <p className={clsx("font-black uppercase tracking-widest mb-2", tokens.colors.textBody)}>
                  Join the waitlist
                </p>
                <h2 className={clsx("text-5xl font-black tracking-tight", tokens.colors.textHead)}>
                  byte.app
                </h2>
              </div>

               {/* Decorative Fingerprint Button (Non-functional, just visual) */}
               <div className={clsx(
                  "w-24 h-24 flex items-center justify-center bg-[#FFFBF7] border-2 border-white",
                  tokens.shapes.circle,
                  tokens.shadows.floating
                )}>
                 <Fingerprint size={40} className={tokens.colors.textHead} opacity={0.3} />
               </div>

            </div>
          </footer>
          
        </div>
      </div>
    </div>
  );
};

// --- Helper Component for the "Clay Sculptures" ---
const SculptureTile = ({ tokens, ThemeColorClass, Icon, Title, Main = false }) => {
    // Extract just the background color part of the theme string for the outer blob
    const bgColor = ThemeColorClass.split(' ')[0];
    // Extract just the text color part for the icon
    const textColor = ThemeColorClass.split(' ')[1];

    return (
    <div className="flex flex-col items-center text-center gap-6">
        {/* The Outer Colored Clay Blob */}
      <div className={clsx(
        Main ? "w-48 h-48" : "w-40 h-40",
        "flex items-center justify-center border-4 border-white",
        bgColor, // Apply brand color to the blob
        tokens.shapes.circle,
        tokens.shadows.floating
      )}>
        {/* The Inner White Well */}
        <div className={clsx(
          Main ? "w-28 h-28" : "w-24 h-24",
          "flex items-center justify-center bg-[#F2EEE9]",
          tokens.shapes.circle,
          tokens.shadows.inset
        )}>
          {/* The Icon floating inside the well */}
          <Icon 
            size={Main ? 56 : 40} 
            className={textColor} 
            strokeWidth={2.5} 
            // Adding a subtle drop shadow to the icon itself to make it float inside the well
            style={{ filter: `drop-shadow(0px 4px 6px ${textColor}40)` }}
          />
        </div>
      </div>
      {/* Title */}
      <h3 className={clsx("text-2xl font-black", tokens.colors.textHead)}>
        {Title}
      </h3>
    </div>
  )};

export default BytePosterFinal;