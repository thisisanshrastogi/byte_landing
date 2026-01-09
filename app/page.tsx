"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  Clock,
  ChevronRight,
  Utensils,
  Users,
  ChefHat,
  Leaf,
  BarChart3,
  CalendarClock,
  Quote,
  ChevronDown,
  Star,
  Store,
  Smartphone,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Minus,
  Plus,
  HelpCircle,
  MessageCircle,
  User,
} from "lucide-react";
import PhoneSimulator from "@/components/dummy/phone";

const faqs = [
  {
    q: "Is my money safe?",
    a: "Yes. We use 256-bit encryption and hold funds in escrow until you pick up your food. Your security is our top priority.",
  },
  {
    q: "Do vendors need special hardware?",
    a: "No. Byte works on any existing smartphone or tablet. We designed it to be plug-and-play for busy kitchen environments.",
  },
  {
    q: "Is it just for students?",
    a: "It is designed for any high-traffic campus environment with short breaks, including corporate offices and tech parks.",
  },
];

const footerBg =
  "bg-[#5C4D45] border-[#6B5A50] dark:bg-card dark:border-border";
// --- THEME TOKENS (Strict Clay Design Language) ---
const THEME = {
  bg: "bg-[#FFFBF7] dark:bg-[#050505] transition-colors duration-500",
  // The Classic Floating Clay Card
  card: "bg-[#FFFBF7] dark:bg-[#121212] shadow-[8px_8px_16px_rgba(214,198,186,0.5),_-4px_-4px_12px_rgba(255,255,255,0.8)] dark:shadow-none border border-white dark:border-white/10",
  // Interactive Hover State
  cardHover:
    "hover:-translate-y-1 hover:shadow-[12px_12px_24px_rgba(214,198,186,0.6),_-6px_-6px_16px_rgba(255,255,255,0.9)] transition-all duration-300 ease-out",
  // Pressed/Inset State
  cardInset:
    "bg-[#F5EFE8] dark:bg-[#0a0a0a] shadow-[inset_4px_4px_8px_rgba(204,190,178,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.8)] dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8)]",
  // Buttons
  btnPrimary:
    "bg-[#FF9E75] text-white shadow-[6px_6px_12px_rgba(255,158,117,0.4),_-2px_-2px_6px_rgba(255,255,255,0.4)] hover:bg-[#FF9E75]/90 active:scale-95 transition-all",
  btnSecondary:
    "bg-[#FFFEFD] dark:bg-[#1a1a1a] text-[#5C4D45] dark:text-[#E0E0E0] shadow-[6px_6px_12px_rgba(214,198,186,0.5),_-2px_-2px_6px_rgba(255,255,255,0.8)] dark:shadow-none border border-[#fffefd] hover:border-[#E5DCD5] dark:border-white/10 hover:bg-[#E5DCD5] active:scale-95 transition-all",
  // Typography Colors
  textDark: "text-[#5C4D45] dark:text-[#EDEDED]",
  textSoft: "text-[#9C8C84] dark:text-[#A1A1AA]",
  brand: "text-[#FF9E75]",
};

// --- COMPONENT: SECTION HEADING ---
const SectionHeading = ({
  title,
  subtitle,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) => (
  <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-5xl font-black ${THEME.textDark} tracking-tight mb-4`}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-base md:text-lg font-medium ${
          THEME.textSoft
        } max-w-2xl ${align === "center" ? "mx-auto" : ""}`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// --- COMPONENT: ANALYTICS GRAPH (Soft Pills) ---
const AnalyticsGraph = () => {
  return (
    <div className="w-full mt-auto pt-4">
      {/* Graph Bars */}

      {/* Stats List */}
      <div className="space-y-3">
        <div className="flex justify-between items-end border-b border-white/10 pb-2">
          <p className="text-[10px] uppercase font-black tracking-widest text-[#D6C6BA]">
            Real-time Sales
          </p>
          <TrendingUp size={14} className="text-[#FF9E75]" />
        </div>
        {[
          { name: "Spicy Wrap", count: "142", pct: "90%" },
          { name: "Cold Coffee", count: "98", pct: "70%" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-bold text-white/90">
              <span>{item.name}</span>
              <span className="opacity-60">{item.count} sold</span>
            </div>
            {/* Custom Progress Bar */}
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: item.pct }}
                transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                className="h-full bg-[#FF9E75] rounded-full"
              ></motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const BetterAnalyticsGraph = () => {
  // SVG Path Data for the smooth wave
  // We use two paths: one for the line (stroke) and one for the filled area (fill)
  const width = 100;
  const height = 40;
  const pathData = "M0 30 C 20 20, 30 5, 50 15 S 80 30, 100 10";
  const areaData = `${pathData} V 50 H 0 Z`; // Closes the path at the bottom

  return (
    <div className="w-full mt-10 flex flex-col gap-4">
      {/* 1. Header with 'Big Number' and Sparkline Badge */}
      <div className="flex justify-between items-end px-1">
        <div>
          <p className="text-[#D6C6BA] text-[10px] font-black uppercase tracking-widest mb-1">
            Weekly Revenue
          </p>
          <div className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
            ₹4,240
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#81C784] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#81C784]"></span>
            </span>
          </div>
        </div>
        <div className="px-2 py-1 bg-white/10 rounded-lg flex items-center gap-1 text-[#81C784] text-xs font-bold border border-white/5 shadow-inner">
          <ArrowUpRight size={12} />
          +18%
        </div>
      </div>

      {/* 2. THE LIQUID CHART */}
      <div className="relative h-32 w-full bg-black/20 rounded-2xl border border-white/5 overflow-hidden shadow-[inset_2px_2px_6px_rgba(0,0,0,0.4)]">
        {/* Grid Lines (Faint Background) */}
        <div className="absolute inset-0 flex flex-col justify-between py-4 px-4 opacity-10 pointer-events-none">
          <div className="w-full h-px bg-white border-dashed border-t border-white" />
          <div className="w-full h-px bg-white border-dashed border-t border-white" />
          <div className="w-full h-px bg-white border-dashed border-t border-white" />
        </div>

        {/* SVG Graph */}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full absolute bottom-0 left-0"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF9E75" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FF9E75" stopOpacity="0" />
            </linearGradient>
            {/* Glow Filter for the Line */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Animated Area Fill */}
          <motion.path
            d={areaData}
            fill="url(#gradientFill)"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          />

          {/* Animated Line Stroke */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="#FF9E75"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{
              filter: "drop-shadow(0px 0px 4px rgba(255, 158, 117, 0.6))",
            }}
          />
        </svg>

        {/* Live "Cursor" Dot (Positioned Absolutely based on path peak) */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute right-[20%] top-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
        >
          {/* The Dot */}
          <div className="w-4 h-4 rounded-full bg-[#FF9E75] border-[3px] border-[#5C4D45] shadow-[0_0_10px_#FF9E75]" />

          {/* The Tooltip Pill */}
          <div className="px-2 py-1 bg-[#FF9E75] text-[#5C4D45] text-[9px] font-black rounded-full shadow-lg whitespace-nowrap">
            Peak: 12 PM
          </div>
        </motion.div>
      </div>

      {/* 3. X-Axis Labels */}
      <div className="flex justify-between px-2 text-[10px] font-bold text-white/40 uppercase tracking-wider">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  );
};

// --- COMPONENT: PHONE DEMO (Right Aligned) ---
const LiveAppDemo = () => {
  return <PhoneSimulator />;
};

// --- COMPONENT: FAQ ITEM ---
const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`p-6 rounded-[2rem] ${THEME.card} cursor-pointer group relative overflow-hidden`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        <h4
          className={`text-base font-black ${THEME.textDark} group-hover:text-[#FF9E75] transition-colors pr-6`}
        >
          {q}
        </h4>
        <div
          className={`w-8 h-8 rounded-full bg-[#F5EFE8] dark:bg-white/5 flex items-center justify-center transition-transform duration-300 ${
            isOpen ? "rotate-180 bg-[#FF9E75] text-white" : "text-[#9C8C84]"
          }`}
        >
          <ChevronDown size={18} />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p
              className={`text-sm ${THEME.textSoft} font-medium mt-4 leading-relaxed max-w-xl`}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// const ClayAccordionItem = ({ question, answer, isOpen, onClick }) => {
//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       className={`group rounded-[2.5rem] overflow-hidden transition-all duration-300 border border-white
//         ${isOpen ? "bg-[#FFFBF7] z-10" : "bg-[#FFFBF7] hover:bg-[#FDFDFD]"}
//         shadow-[8px_8px_16px_rgba(214,198,186,0.5),_-4px_-4px_12px_rgba(255,255,255,0.8)]`}
//     >
//       <motion.button
//         layout="position"
//         onClick={onClick}
//         className="w-full p-8 flex items-center justify-between text-left outline-none cursor-pointer"
//       >
//         <span
//           className={`text-xl md:text-2xl font-black tracking-tight transition-colors duration-300
//           ${
//             isOpen
//               ? "text-[#FF9E75]"
//               : "text-[#5C4D45] group-hover:text-[#FF9E75]/80"
//           }`}
//         >
//           {question}
//         </span>

//         {/* Toggle Icon: Larger for desktop */}
//         <div
//           className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ml-4
//           ${
//             isOpen
//               ? "bg-[#FF9E75] text-white shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1)] rotate-180"
//               : "bg-[#F5EFE8] text-[#5C4D45] shadow-[8px_8px_16px_rgba(214,198,186,0.5),_-4px_-4px_12px_rgba(255,255,255,0.8)]"
//           }`}
//         >
//           {isOpen ? (
//             <Minus size={24} strokeWidth={3} />
//           ) : (
//             <Plus size={24} strokeWidth={3} />
//           )}
//         </div>
//       </motion.button>

//       <AnimatePresence initial={false}>
//         {isOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ type: "spring", stiffness: 200, damping: 20 }}
//           >
//             <div className="px-8 pb-8">
//               {/* DEEP INSET WELL: Large padding for desktop readability */}
//               <div
//                 className="bg-[#F5EFE8] rounded-[1.5rem] p-8
//                 shadow-[inset_6px_6px_12px_rgba(204,190,178,0.4),_inset_-6px_-6px_12px_rgba(255,255,255,0.8)]"
//               >
//                 <p className="text-[#9C8C84] text-lg leading-relaxed font-medium">
//                   {answer}
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };
const CompactAccordionItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className={`group rounded-[1.5rem] overflow-hidden transition-all duration-300 border border-white
        ${isOpen ? "bg-[#FFFBF7] z-10" : "bg-[#FFFBF7] hover:bg-[#FAF9F6]"}
        shadow-[6px_6px_12px_rgba(214,198,186,0.4),_-4px_-4px_10px_rgba(255,255,255,0.8)]`}
    >
      <motion.button
        layout="position"
        onClick={onClick}
        className="w-full px-6 py-5 flex items-center justify-between text-left outline-none cursor-pointer"
      >
        {/* Tighter Text Size */}
        <span
          className={`text-lg font-black tracking-tight transition-colors duration-300 pr-4
          ${
            isOpen
              ? "text-[#FF9E75]"
              : "text-[#5C4D45] group-hover:text-[#5C4D45]/80"
          }`}
        >
          {question}
        </span>

        {/* Smaller Toggle Icon (40px vs 56px) */}
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
          ${
            isOpen
              ? "bg-[#FF9E75] text-white shadow-inner rotate-180"
              : "bg-[#F5EFE8] text-[#5C4D45] shadow-[4px_4px_8px_rgba(214,198,186,0.4),_-2px_-2px_6px_rgba(255,255,255,0.8)]"
          }`}
        >
          {isOpen ? (
            <Minus size={18} strokeWidth={3} />
          ) : (
            <Plus size={18} strokeWidth={3} />
          )}
        </div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="px-6 pb-6 pt-0">
              {/* Sleeker Inset Well */}
              <div
                className="bg-[#F5EFE8] rounded-xl p-5 
                shadow-[inset_4px_4px_8px_rgba(204,190,178,0.3),_inset_-4px_-4px_8px_rgba(255,255,255,0.7)]"
              >
                <p className="text-[#9C8C84] text-sm leading-relaxed font-medium">
                  {answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default function LandingPage() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", duration: 0.8 },
    },
  };

  return (
    <div
      className={`min-h-screen font-sans overflow-x-hidden relative ${THEME.bg}`}
    >
      <Navbar />

      {/* --- BACKGROUND BLOBS (Subtle & Warm) --- */}

      <main className="relative z-10 pt-32 pb-20 px-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* --- HERO SECTION --- */}
          <section className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center mb-32">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="text-left flex flex-col items-start relative z-10 lg:pr-12"
            >
              {/* Badge */}
              <motion.div
                variants={fadeInUp}
                className={`inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-full border border-white/50 dark:border-white/10 shadow-sm mb-8`}
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9E75] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF9E75]"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#9C8C84]">
                  Now In Beta
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeInUp}
                className={`text-5xl sm:text-6xl md:text-7xl font-black ${THEME.textDark} leading-[1.15] tracking-tight mb-6`}
              >
                Skip the line. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9E75] to-[#FF7043]">
                  Order instantly with Byte.
                </span>
              </motion.h1>

              {/* Body Text (Reduced Size) */}
              <motion.p
                variants={fadeInUp}
                className={`text-lg ${THEME.textSoft} font-medium mb-10 max-w-md leading-relaxed`}
              >
                Byte lets students pre-order food and skip queues, while helping
                vendors prepare smarter using real-time demand analytics.
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                <button
                  onClick={() => router.push("/invite")}
                  className={`${THEME.btnPrimary} h-16 px-8 rounded-full text-sm font-black uppercase tracking-wider flex items-center justify-center gap-3 w-full sm:w-auto`}
                >
                  <Smartphone size={18} /> Become a Tester
                </button>
                <button
                  onClick={() => router.push("/invite")}
                  className={`${THEME.btnSecondary} h-16 px-8 rounded-full text-sm font-black uppercase tracking-wider flex items-center justify-center gap-3 w-full sm:w-auto`}
                >
                  <Store size={18} /> Partner as Vendor
                </button>
              </motion.div>
            </motion.div>

            {/* Right Phone Demo (Aligned Right on Desktop) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex justify-center lg:justify-end relative w-full"
            >
              {/* Phone Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(255,158,117,0.15)_0%,rgba(0,0,0,0)_70%)] -z-10 blur-3xl"></div>
              <LiveAppDemo />
            </motion.div>
          </section>

          {/* --- PROBLEM SECTION --- */}
          <section className="mb-32">
            <SectionHeading
              title="Short breaks. Long queues."
              subtitle="Campus food rush isn’t about payments — it’s about timing."
              align="center"
            />

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Clock,
                  title: "Wasted Time",
                  desc: "15 mins of a 20 min break is spent standing in line.",
                  color: "text-red-400",
                  bg: "bg-red-50",
                },
                {
                  icon: Zap,
                  title: "Vendor Stress",
                  desc: "Kitchens get overwhelmed by sudden spikes.",
                  color: "text-orange-400",
                  bg: "bg-orange-50",
                },
                {
                  icon: Users,
                  title: "Crowd Chaos",
                  desc: "No queue management leads to shouting and confusion.",
                  color: "text-yellow-500",
                  bg: "bg-yellow-50",
                },
              ].map((item, i) => (
                <motion.div
                  whileHover={{ y: -5 }}
                  key={i}
                  className={`p-8 rounded-[2.5rem] ${THEME.card} flex flex-col items-start`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${THEME.cardInset} flex items-center justify-center mb-6 ${item.color}`}
                  >
                    <item.icon size={26} strokeWidth={2.5} />
                  </div>
                  <h3 className={`text-xl font-black ${THEME.textDark} mb-3`}>
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm font-medium ${THEME.textSoft} leading-relaxed`}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* --- BENTO GRID FEATURES --- */}
          <section className="mb-32">
            <SectionHeading title="Why Byte is Different." align="center" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
              {/* Feature 1: Pre-Orders (Wide) */}
              <div
                className={`md:col-span-2 ${THEME.card} rounded-[3rem] p-10 flex flex-col justify-center relative overflow-hidden group`}
              >
                <div className="relative z-10 max-w-md">
                  <div className="w-12 h-12 bg-[#FFF0E6] dark:bg-white/10 rounded-xl flex items-center justify-center text-[#FF9E75] mb-6">
                    <CalendarClock size={24} />
                  </div>
                  <h3
                    className={`text-2xl md:text-3xl font-black ${THEME.textDark} mb-3`}
                  >
                    Pre-Orders, Not Guesswork
                  </h3>
                  <p className={`text-base font-medium ${THEME.textSoft}`}>
                    Students order early. Vendors know exactly what to prepare.
                  </p>
                </div>
                <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#FFE0B2] dark:bg-[#FF9E75] rounded-full blur-[80px] opacity-30 group-hover:scale-110 transition-transform duration-700"></div>
              </div>

              {/* Feature 2: Analytics (Tall) */}
              <div
                className={`md:col-span-1 md:row-span-2 ${footerBg} dark:border dark:border-white/10 rounded-[3rem] p-8 flex flex-col relative overflow-hidden shadow-xl text-white`}
              >
                <div className="relative z-10 w-full h-full flex flex-col">
                  <div className="w-12 h-12 absolute right-0 bg-white/10 rounded-xl flex items-center justify-center text-[#FF9E75] mb-4">
                    <BarChart3 size={24} />
                  </div>
                  <h3 className="text-2xl font-black mb-1">Cook with Data</h3>
                  <p className="text-[#D6C6BA] text-xs font-bold ">
                    Real-time demand forecasting.
                  </p>
                  <BetterAnalyticsGraph />
                  <AnalyticsGraph />
                </div>
              </div>

              {/* Feature 3: Security */}
              <div
                className={`${THEME.card} rounded-[3rem] p-8 flex flex-col justify-center ${THEME.cardHover}`}
              >
                <ShieldCheck size={32} className="text-[#FF9E75] mb-4" />
                <h3 className={`text-xl font-black ${THEME.textDark} mb-2`}>
                  Bank-Grade Wallet
                </h3>
                <p className={`text-sm font-medium ${THEME.textSoft}`}>
                  256-bit encryption. Money is held in escrow until pickup.
                </p>
              </div>

              {/* Feature 4: Waste */}
              <div
                className={`${THEME.card} rounded-[3rem] p-8 flex flex-col justify-center ${THEME.cardHover}`}
              >
                <Leaf size={32} className="text-[#FF9E75] mb-4" />
                <h3 className={`text-xl font-black ${THEME.textDark} mb-2`}>
                  Zero Food Waste
                </h3>
                <p className={`text-sm font-medium ${THEME.textSoft}`}>
                  Cook based on confirmed orders. Boost profit margins.
                </p>
              </div>
            </div>
          </section>

          {/* --- SOCIAL PROOF --- */}
          {/* <section className="mb-32">
            <SectionHeading title="Real Impact." align="left" />
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  text: "I actually get time to eat now instead of standing in line for 20 minutes.",
                  user: "Student, Engineering Dept",
                },
                {
                  text: "Peak hours are smoother and my food wastage has gone down significantly.",
                  user: "Vendor, Main Canteen",
                },
              ].map((t, i) => (
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  key={i}
                  className={`p-8 rounded-[2.5rem] ${THEME.card} relative`}
                >
                  <Quote size={32} className="text-[#FF9E75]/30 mb-6" />
                  <p
                    className={`text-lg font-bold ${THEME.textDark} mb-6 leading-relaxed`}
                  >
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E5DCD5] dark:bg-white/10"></div>
                    <div>
                      <p
                        className={`text-xs font-black uppercase tracking-wider ${THEME.textDark}`}
                      >
                        {t.user}
                      </p>
                      <div className="flex text-[#FF9E75] mt-1 gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={10} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section> */}

          {/* --- FAQ --- */}
          <section className=" w-full bg-[#FFFBF7] dark:bg-transparent py-20 px-6 md:px-12 flex justify-center font-sans">
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* --- LEFT SIDE: ENHANCED VISUAL --- */}
              <div className="lg:col-span-4 lg:sticky lg:top-24 h-full flex flex-col   gap-4">
                {/* Subtle Icon Badge to anchor the design */}
                {/* <div
                  className="w-12 h-12 rounded-2xl bg-[#FFFBF7] flex items-center justify-center text-[#FF9E75] mb-2
            shadow-[6px_6px_12px_rgba(214,198,186,0.4),_-4px_-4px_10px_rgba(255,255,255,0.8)]"
                >
                  <HelpCircle size={24} strokeWidth={2.5} />
                </div> */}

                <h2 className="text-[#5C4D45] dark:text-white text-4xl lg:text-6xl font-black tracking-tight leading-none">
                  Common <br />{" "}
                  <span className="text-[#FF9E75]">Questions.</span>
                </h2>
                <p className="text-[#9C8C84] text-md font-medium leading-relaxed mt-8 max-w-xs">
                  Quick answers to questions you might have about Byte's
                  security, features, and reliability.
                </p>
              </div>

              {/* --- RIGHT SIDE: COMPACT ACCORDION --- */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                {faqs.map((item, index) => (
                  <CompactAccordionItem
                    key={index}
                    question={item.q}
                    answer={item.a}
                    isOpen={activeIndex === index}
                    onClick={() => toggleIndex(index)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* --- FINAL CTA --- */}
          <section className="text-center pb-12">
            <div
              className={`p-12 md:p-16 rounded-[3.5rem] ${THEME.card} relative overflow-hidden`}
            >
              {/* Decorative Blur */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9E75]/10 blur-[80px] rounded-full"></div>

              <div className="relative z-10 max-w-3xl mx-auto">
                <span className="inline-block px-3 py-1 rounded-full bg-[#FF9E75]/10 text-[#FF9E75] font-black text-[10px] uppercase tracking-widest mb-6">
                  Join the movement
                </span>
                <h2
                  className={`text-4xl md:text-5xl font-black ${THEME.textDark} mb-6 tracking-tight leading-[1.15]`}
                >
                  Built for students. <br /> Designed for vendors.
                </h2>
                <p
                  className={`text-lg font-medium ${THEME.textSoft} mb-10 max-w-lg mx-auto`}
                >
                  Whether you run a campus kitchen or rush between classes, Byte
                  is the upgrade you've been waiting for.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={() => router.push("/invite")}
                    className={`${THEME.btnPrimary} h-14 px-8 rounded-full text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2`}
                  >
                    I'm a Student <ArrowUpRight size={18} />
                  </button>
                  <button
                    onClick={() => router.push("/invite")}
                    className={`${THEME.btnSecondary} h-14 px-8 rounded-full text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2`}
                  >
                    I'm a Vendor <Store size={18} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
