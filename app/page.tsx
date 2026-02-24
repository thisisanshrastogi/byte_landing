"use client";

import { useState, useEffect } from "react";
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
  Hourglass,
  Flame,
  Megaphone,
  Clock7,
  FlameKindling,
  Heater,
  LogIn,
} from "lucide-react";
import PhoneSimulator from "@/components/dummy/phone";
import { BackgroundElements } from "@/components/background-element";
import useIsMobile from "@/components/mobile-detector";
import { useAuth } from "@/contexts/auth-context";

// --- EXISTING DATA & CONSTANTS (Unchanged) ---
const problems = [
  {
    icon: Megaphone,
    title: "Cafeteria Chaos",
    desc: "No token system means shouting names, missed orders, and a chaotic environment for everyone.",
    color: "text-[#5D4037] dark:text-[#E7DCD6]",
    accent: "bg-[#EFEBE9]",
  },
  {
    icon: Heater,
    title: "Kitchen Meltdowns",
    desc: "Vendors get hit by 500 orders in 10 minutes. Without prep time, quality drops and panic sets in.",
    color: "text-[#EA580C] ",
    accent: "bg-[#FFF7ED]",
  },
  {
    icon: Clock7,
    title: "The 15-Minute Wait",
    desc: "Breaks are only 20 minutes long. Students spend 75% of that time just standing in a queue.",
    color: "text-[#57534E] dark:text-[#E7E5E4]",
    accent: "bg-[#FAFAF9]",
  },
];

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

const THEME = {
  bg: "bg-[#FFFBF7] dark:bg-[#050505] transition-colors duration-500",
  card: "bg-[#FFFBF7] dark:bg-[#121212] shadow-[8px_8px_16px_rgba(214,198,186,0.5),_-4px_-4px_12px_rgba(255,255,255,0.8)] dark:shadow-none border border-white dark:border-white/10",
  cardHover:
    "hover:-translate-y-1 hover:shadow-[12px_12px_24px_rgba(214,198,186,0.6),_-6px_-6px_16px_rgba(255,255,255,0.9)] transition-all duration-300 ease-out",
  cardInset:
    "bg-[#F5EFE8] dark:bg-[#0a0a0a] shadow-[inset_4px_4px_8px_rgba(204,190,178,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.8)] dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8)]",
  btnPrimary:
    "bg-[#FF9E75] dark:bg-[#ff7c50] text-white shadow-[6px_6px_12px_rgba(255,158,117,0.4),_-2px_-2px_6px_rgba(255,255,255,0.4)] dark:shadow-none hover:bg-[#FF9E75]/90 active:scale-95 transition-all",
  btnSecondary:
    "bg-[#FFFEFD] dark:bg-[#1a1a1a] text-[#5C4D45] dark:text-[#E0E0E0] shadow-[6px_6px_12px_rgba(214,198,186,0.5),_-2px_-2px_6px_rgba(255,255,255,0.8)] dark:shadow-none border border-[#fffefd] hover:border-[#E5DCD5] dark:border-white/10 hover:bg-[#E5DCD5] active:scale-95 transition-all",
  textDark: "text-[#5C4D45] dark:text-[#EDEDED]",
  textSoft: "text-[#9C8C84] dark:text-[#A1A1AA]",
  brand: "text-[#FF9E75] dark:text-[#ff7c50]",
};

// --- NEW COMPONENT: MOBILE STICKY NAV ---
const MobileStickyNav = () => {
  const router = useRouter();

  const { user, loading } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  // Delay appearance slightly so it doesn't clash with hero animation
  // useEffect(() => {
  //   const timer = setTimeout(() => setIsVisible(true), 800);
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    if (!loading && user) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [user, router, loading]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed bottom-6 inset-x-4 z-50 md:hidden flex justify-center"
        >
          {/* Claymorphism Floating Dock 
             - Frosted Glass Background
             - Soft Shadow
          */}
          <div className="w-full max-w-sm bg-white/80 dark:bg-[#1E1E1E]/90 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12),_0_2px_8px_rgba(0,0,0,0.05)] rounded-[2rem] p-2 flex gap-2 items-center">
            {/* Login Button (Ghost/Secondary) */}
            <button
              onClick={() => router.push("/register")}
              className="flex-1 h-10 rounded-[1.5rem] font-bold text-[#5C4D45] dark:text-[#E0E0E0] hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm flex items-center justify-center gap-2"
            >
              Sign Up
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-[#E5DCD5] dark:bg-white/10" />

            {/* Sign Up Button (Primary Clay) */}
            <button
              onClick={() => router.push("/login")}
              className="flex-1 h-10 rounded-[1.5rem] bg-[#FF9E75] dark:bg-[#ff7c50] text-white font-black uppercase text-xs tracking-wider shadow-[4px_4px_10px_rgba(255,158,117,0.4)] hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Login
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- HELPER COMPONENTS (Unchanged) ---
const SectionHeading = ({
  title,
  subtitle,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) => {
  const viewportMotion = useViewportMotion();

  return (
    <div
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <motion.h2
        initial={viewportMotion.initial ?? { opacity: 0, y: 20 }}
        whileInView={viewportMotion.whileInView ?? { opacity: 1, y: 0 }}
        viewport={viewportMotion.viewport ?? { once: true }}
        className={`text-3xl md:text-5xl font-black ${THEME.textDark} tracking-tight mb-4`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={viewportMotion.initial ?? { opacity: 0, y: 20 }}
          whileInView={viewportMotion.whileInView ?? { opacity: 1, y: 0 }}
          viewport={viewportMotion.viewport ?? { once: true }}
          transition={{ delay: 0.1 }}
          className={`text-base md:text-lg font-medium ${THEME.textSoft} max-w-2xl ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

function useViewportMotion() {
  const isMobile = useIsMobile();
  if (isMobile) {
    return {
      initial: false,
      animate: { opacity: 1, y: 0 },
      whileInView: undefined,
      viewport: undefined,
    };
  }
  return {};
}

// --- ANALYTICS GRAPH COMPONENTS (Unchanged) ---
const AnalyticsGraph = () => {
  return (
    <div className="w-full mt-auto pt-4">
      <div className="space-y-3">
        <div className="flex justify-between items-end border-b border-white/10 pb-2">
          <p className="text-[10px] uppercase font-black tracking-widest text-[#D6C6BA]">
            Real-time Sales
          </p>
          <TrendingUp
            size={14}
            className="text-[#FF9E75] dark:text-[#ff7c50]"
          />
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
  const viewportMotion = useViewportMotion();
  const width = 100;
  const height = 40;
  const pathData = "M0 30 C 20 20, 30 5, 50 15 S 80 30, 100 10";
  const areaData = `${pathData} V 50 H 0 Z`;

  return (
    <div className="w-full mt-10 flex flex-col gap-4">
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
      <div className="relative h-32 w-full bg-black/20 rounded-2xl border border-white/5 overflow-hidden shadow-[inset_2px_2px_6px_rgba(0,0,0,0.4)]">
        <div className="absolute inset-0 flex flex-col justify-between py-4 px-4 opacity-10 pointer-events-none">
          <div className="w-full h-px bg-white border-dashed border-t border-white" />
          <div className="w-full h-px bg-white border-dashed border-t border-white" />
          <div className="w-full h-px bg-white border-dashed border-t border-white" />
        </div>
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
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <motion.path
            d={areaData}
            fill="url(#gradientFill)"
            initial={viewportMotion.initial ?? { opacity: 0, y: 10 }}
            whileInView={viewportMotion.whileInView ?? { opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          />
          <motion.path
            d={pathData}
            fill="none"
            stroke="#FF9E75"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={viewportMotion.initial ?? { pathLength: 0 }}
            whileInView={viewportMotion.whileInView ?? { pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{
              filter: "drop-shadow(0px 0px 4px rgba(255, 158, 117, 0.6))",
            }}
          />
        </svg>
        <motion.div
          initial={viewportMotion.initial ?? { opacity: 0, scale: 0 }}
          whileInView={viewportMotion.whileInView ?? { opacity: 1, scale: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute right-[20%] top-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
        >
          <div className="w-4 h-4 rounded-full bg-[#FF9E75] border-[3px] border-[#5C4D45] shadow-[0_0_10px_#FF9E75]" />
          <div className="px-2 py-1 bg-[#FF9E75] text-[#5C4D45] text-[9px] font-black rounded-full shadow-lg whitespace-nowrap">
            Peak: 12 PM
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- FAQ ITEM COMPONENT (Unchanged) ---
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
  const viewportMotion = useViewportMotion();
  return (
    <motion.div
      layout
      initial={viewportMotion.initial ?? { opacity: 0, y: 10 }}
      whileInView={viewportMotion.whileInView ?? { opacity: 1, y: 0 }}
      viewport={viewportMotion.viewport ?? { once: true }}
      transition={{ duration: 0.3 }}
      className={`group rounded-[1.5rem] overflow-hidden transition-all duration-300 border border-white dark:border-[#2A2A2A]
        ${isOpen ? "bg-[#FFFBF7] dark:bg-[#1E1E1E] z-10" : "bg-[#FFFBF7] dark:bg-[#1E1E1E] hover:bg-[#FAF9F6] dark:hover:bg-[#252525]"}
        shadow-[6px_6px_12px_rgba(214,198,186,0.4),_-4px_-4px_10px_rgba(255,255,255,0.8)]
        dark:shadow-[6px_6px_15px_rgba(0,0,0,0.5),_-2px_-2px_10px_rgba(255,255,255,0.05)]`}
    >
      <motion.button
        layout="position"
        onClick={onClick}
        className="w-full px-6 py-5 flex items-center justify-between text-left outline-none cursor-pointer"
      >
        <span
          className={`text-lg font-black tracking-tight transition-colors duration-300 pr-4
          ${isOpen ? "text-[#FF9E75] dark:text-[#ff7c50]" : "text-[#5C4D45] dark:text-[#E0E0E0] group-hover:text-[#5C4D45]/80 dark:group-hover:text-white"}`}
        >
          {question}
        </span>
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
          ${
            isOpen
              ? "bg-[#FF9E75] text-white rotate-180 shadow-inner"
              : "bg-[#F5EFE8] dark:bg-[#2A2A2A] text-[#5C4D45] dark:text-[#A0A0A0] shadow-[4px_4px_8px_rgba(214,198,186,0.4),_-2px_-2px_6px_rgba(255,255,255,0.8)] dark:shadow-[4px_4px_8px_rgba(0,0,0,0.5),inset_1px_1px_2px_rgba(255,255,255,0.05)]"
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
            initial={viewportMotion.initial ?? { height: 0, opacity: 0 }}
            animate={viewportMotion.animate ?? { height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="px-6 pb-6 pt-0">
              <div
                className="bg-[#F5EFE8] dark:bg-[#151515] rounded-xl p-5 
                shadow-[inset_4px_4px_8px_rgba(204,190,178,0.3),_inset_-4px_-4px_8px_rgba(255,255,255,0.7)]
                dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.8),inset_-1px_-1px_2px_rgba(255,255,255,0.05)]"
              >
                <p className="text-[#9C8C84] dark:text-[#888888] text-sm leading-relaxed font-medium">
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

// --- MAIN PAGE COMPONENT ---
export default function LandingPage() {
  const viewportMotion = useViewportMotion();
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

      {/* ADDED: Mobile Sticky Nav for easy access to Login/Signup */}
      <MobileStickyNav />
      <BackgroundElements />

      <main className="relative z-10 pt-20 pb-20 px-4 md:px-10">
        <div className="max-w-7xl mx-auto px-2 lg:px-8">
          {/* --- HERO SECTION --- */}
          <section className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center mb-20 lg:mb-32">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="text-left flex flex-col items-start relative z-10 lg:pr-12 mt-10"
            >
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

              <motion.h1
                variants={fadeInUp}
                className={`text-4xl sm:text-5xl md:text-7xl font-black ${THEME.textDark} leading-[1.15] tracking-tight mb-6`}
              >
                Skip the line. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9E75] to-[#FF7043]">
                  Order instantly with Byte.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className={`text-base md:text-lg ${THEME.textSoft} font-medium mb-10 max-w-md leading-relaxed`}
              >
                Byte lets students pre-order food and skip queues, while helping
                vendors prepare smarter using real-time demand analytics.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                <button
                  onClick={() =>
                    window.open(
                      "https://play.google.com/store/apps/details?id=com.arjunmnath.byteit",
                      "_blank",
                    )
                  }
                  className={`${THEME.btnPrimary} h-14 md:h-16 px-8 rounded-full text-sm font-black uppercase tracking-wider flex items-center justify-center gap-3 w-full sm:w-auto`}
                >
                  <Smartphone size={18} /> Get the App
                </button>
                <button
                  onClick={() => router.push("/invite")}
                  className={`${THEME.btnSecondary} h-14 md:h-16 px-8 rounded-full text-sm font-black uppercase tracking-wider flex items-center justify-center gap-3 w-full sm:w-auto`}
                >
                  <Store size={18} /> Partner as Vendor
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex justify-center lg:justify-end relative w-full mt-10 lg:mt-0"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(255,158,117,0.15)_0%,rgba(0,0,0,0)_70%)] -z-10 blur-3xl"></div>
              <PhoneSimulator />
            </motion.div>
          </section>

          {/* --- PROBLEM SECTION --- */}
          <section className="mb-20 lg:mb-32">
            <div className="text-center mb-12 lg:mb-16">
              <h2
                className={`text-3xl md:text-5xl font-black ${THEME.textDark} mb-4 tracking-tight`}
              >
                Short breaks.{" "}
                <span className="text-[#FF9E75] dark:text-[#ff7c50]">
                  Long queues.
                </span>
              </h2>
              <p
                className={`text-base md:text-lg font-medium ${THEME.textSoft} max-w-2xl mx-auto`}
              >
                Campus food rush isn’t about payments — it’s about timing. We
                solve the chaos between the bell ringing and your first bite.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {problems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={viewportMotion.initial ?? { opacity: 0, y: 20 }}
                  whileInView={viewportMotion.animate ?? { opacity: 1, y: 0 }}
                  viewport={viewportMotion.viewport ?? { once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`p-8 rounded-[2.5rem] ${THEME.card} flex flex-col items-start relative overflow-hidden group`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl ${THEME.cardInset} flex items-center justify-center mb-6 relative z-10`}
                  >
                    <item.icon
                      size={32}
                      strokeWidth={2.5}
                      className={item.color}
                    />
                  </div>
                  <h3
                    className={`text-2xl font-black ${THEME.textDark} mb-3 relative z-10 leading-tight`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm font-medium ${THEME.textSoft} leading-relaxed relative z-10`}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* --- BENTO GRID FEATURES --- */}
          <section className="mb-20 lg:mb-32">
            <SectionHeading title="Why Byte is Different." align="center" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[280px]">
              <div
                className={`md:col-span-2 ${THEME.card} rounded-[3rem] p-10 flex flex-col justify-center relative overflow-hidden group`}
              >
                <div className="relative z-10 max-w-md">
                  <div className="w-12 h-12 bg-[#FFF0E6] dark:bg-white/10 rounded-xl flex items-center justify-center text-[#FF9E75] dark:text-[#ff7c50] mb-6">
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
                <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#ffd8b2] dark:bg-[#ff9e75cf] rounded-full blur-[80px] opacity-30 group-hover:scale-110 transition-transform duration-700"></div>
              </div>

              <div
                className={`md:col-span-1 md:row-span-2 min-h-[500px] md:min-h-0 ${footerBg} dark:border dark:border-white/10 rounded-[3rem] p-8 flex flex-col relative overflow-hidden shadow-xl text-white`}
              >
                <div className="relative z-10 w-full h-full flex flex-col">
                  <div className="w-12 h-12 absolute right-0 bg-white/10 rounded-xl hidden md:flex items-center justify-center text-[#FF9E75] dark:text-[#ff7c50] mb-4">
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

              <div
                className={`${THEME.card} rounded-[3rem] p-8 flex flex-col justify-center ${THEME.cardHover}`}
              >
                <ShieldCheck
                  size={32}
                  className="text-[#FF9E75] dark:text-[#ff7c50] mb-4"
                />
                <h3 className={`text-xl font-black ${THEME.textDark} mb-2`}>
                  Bank-Grade Wallet
                </h3>
                <p className={`text-sm font-medium ${THEME.textSoft}`}>
                  256-bit encryption. Money is held in escrow until pickup.
                </p>
              </div>

              <div
                className={`${THEME.card} rounded-[3rem] p-8 flex flex-col justify-center ${THEME.cardHover}`}
              >
                <Leaf
                  size={32}
                  className="text-[#FF9E75] dark:text-[#ff7c50] mb-4"
                />
                <h3 className={`text-xl font-black ${THEME.textDark} mb-2`}>
                  Zero Food Waste
                </h3>
                <p className={`text-sm font-medium ${THEME.textSoft}`}>
                  Cook based on confirmed orders. Boost profit margins.
                </p>
              </div>
            </div>
          </section>

          {/* --- FAQ --- */}
          <section className=" w-full bg-transparent dark:bg-transparent py-12 md:py-20 px-2 md:px-12 flex justify-center font-sans">
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-4 lg:sticky lg:top-24 h-full flex flex-col gap-4">
                <h2 className="text-[#5C4D45] dark:text-white text-4xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                  Common <br />{" "}
                  <span className="text-[#FF9E75] dark:text-[#ff7c50]">
                    Questions.
                  </span>
                </h2>
                <p className="text-[#9C8C84] text-md font-medium leading-relaxed mt-4 md:mt-8 max-w-xs">
                  Quick answers to questions you might have about Byte's
                  security, features, and reliability.
                </p>
              </div>
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
              className={`p-10 md:p-16 rounded-[3.5rem] ${THEME.card} relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9E75]/10 blur-[80px] rounded-full"></div>
              <div className="relative z-10 max-w-3xl mx-auto">
                <span className="inline-block px-3 py-1 rounded-full bg-[#FF9E75]/10 text-[#FF9E75] dark:text-[#ff7c50] font-black text-[10px] uppercase tracking-widest mb-6">
                  Join the movement
                </span>
                <h2
                  className={`text-3xl md:text-6xl font-black ${THEME.textDark} mb-6 tracking-tight leading-[1.25]`}
                >
                  Built for students. <br /> Designed for vendors.
                </h2>
                <p
                  className={`text-base md:text-lg font-medium ${THEME.textSoft} mb-10 max-w-lg mx-auto`}
                >
                  Whether you run a campus kitchen or rush between classes, Byte
                  is the upgrade you've been waiting for.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={() => router.push("/register")}
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
