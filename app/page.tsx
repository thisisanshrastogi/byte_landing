"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  Clock,
  Leaf,
  BarChart3,
  CalendarClock,
  Store,
  Smartphone,
  ArrowUpRight,
  Zap,
  TrendingUp,
  Minus,
  Plus,
  User,
} from "lucide-react";
import PhoneSimulator from "@/components/dummy/phone";
import { BackgroundElements } from "@/components/background-element";
import { ClayCursor } from "@/components/clay-cursor";
import useIsMobile from "@/components/mobile-detector";
import { useAuth } from "@/contexts/auth-context";
import { THEME, CLAY } from "@/lib/design-tokens";

// --- EXISTING DATA & CONSTANTS ---
const problems = [
  {
    icon: Clock,
    title: "Lost Time & Missed Meals",
    desc: "Long queues eat up most of your break. Popular items sell out unexpectedly.",
  },
  {
    icon: Zap,
    title: "Vendor Chaos",
    desc: "Demand arrives in unpredictable bursts. Food gets overprepared and wasted.",
  },
  {
    icon: Store,
    title: "Costly Alternatives",
    desc: "Traditional delivery apps are too expensive for daily use, with no way to schedule food around classes.",
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


// --- MOBILE STICKY NAV ---
const MobileStickyNav = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

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
          <div className="w-full max-w-sm bg-white/80 dark:bg-[#1E1E1E]/90 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12),_0_2px_8px_rgba(0,0,0,0.05)] rounded-[2rem] p-2 flex gap-2 items-center">
            <button
              onClick={() => router.push("/register")}
              className="flex-1 h-10 rounded-[1.5rem] font-bold text-[#5C4D45] dark:text-[#E0E0E0] hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm flex items-center justify-center gap-2"
            >
              Sign Up
            </button>
            <div className="w-px h-6 bg-[#E5DCD5] dark:bg-white/10" />
            <button
              onClick={() => router.push("/login")}
              className={`flex-1 h-10 ${CLAY.radius.md} ${CLAY.color.accent} text-white font-bold uppercase text-xs tracking-wider ${CLAY.shadow.brand} hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2`}
            >
              Login
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- HELPER COMPONENTS ---
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
      className={`${CLAY.spacing.headingGap} ${align === "center" ? "text-center" : "text-left"}`}
    >
      <motion.h2
        initial={viewportMotion.initial ?? { opacity: 0, y: 20 }}
        whileInView={viewportMotion.whileInView ?? { opacity: 1, y: 0 }}
        viewport={viewportMotion.viewport ?? { once: true }}
        className={`text-3xl md:text-5xl font-extrabold ${THEME.textDark} tracking-tight mb-4`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={viewportMotion.initial ?? { opacity: 0, y: 20 }}
          whileInView={viewportMotion.whileInView ?? { opacity: 1, y: 0 }}
          viewport={viewportMotion.viewport ?? { once: true }}
          transition={{ delay: 0.1 }}
          className={`text-base md:text-lg ${THEME.textSoft} max-w-2xl ${align === "center" ? "mx-auto" : ""}`}
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

// --- ANALYTICS GRAPH COMPONENTS ---
const AnalyticsGraph = () => {
  return (
    <div className="w-full mt-auto pt-4">
      <div className="space-y-3">
        <div className="flex justify-between items-end border-b border-white/10 pb-2">
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#D6C6BA]">
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
          <p className="text-[#D6C6BA] text-[10px] font-bold uppercase tracking-widest mb-1">
            Weekly Revenue
          </p>
          <div className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
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
          <div className="px-2 py-1 bg-[#FF9E75] text-[#5C4D45] text-[9px] font-bold rounded-full shadow-lg whitespace-nowrap">
            Peak: 12 PM
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- FAQ ITEM COMPONENT ---
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
      className={`group ${CLAY.radius.md} overflow-hidden transition-all duration-300 border border-white dark:border-[#2A2A2A]
        ${isOpen ? "bg-[#FFFBF7] dark:bg-[#1E1E1E] z-10" : "bg-[#FFFBF7] dark:bg-[#1E1E1E] hover:bg-[#FAF9F6] dark:hover:bg-[#252525]"}
        ${CLAY.shadow.md} ${CLAY.shadowDark.md}`}
    >
      <motion.button
        layout="position"
        onClick={onClick}
        className="w-full px-6 py-5 flex items-center justify-between text-left outline-none cursor-pointer"
      >
        <span
          className={`text-lg font-bold tracking-tight transition-colors duration-300 pr-4
          ${isOpen ? "text-[#FF9E75] dark:text-[#ff7c50]" : "text-[#5C4D45] dark:text-[#E0E0E0] group-hover:text-[#5C4D45]/80 dark:group-hover:text-white"}`}
        >
          {question}
        </span>
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
          ${isOpen
              ? "bg-[#FF9E75] text-white rotate-180 shadow-inner"
              : `bg-[#F5EFE8] dark:bg-[#2A2A2A] text-[#5C4D45] dark:text-[#A0A0A0] ${CLAY.shadow.sm} ${CLAY.shadowDark.sm}`
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
                className={`${CLAY.color.inset} ${CLAY.radius.sm} p-5 ${CLAY.shadow.inset} ${CLAY.shadowDark.inset}`}
              >
                <p className="text-[#9C8C84] dark:text-[#888888] text-sm leading-relaxed">
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
  const { user, loading } = useAuth();
  const heroRef = useRef<HTMLElement>(null);

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
      <MobileStickyNav />
      <BackgroundElements />

      <main className="relative z-10 pt-20 pb-20 px-4 md:px-10">
        <ClayCursor containerRef={heroRef} />
        <div className="max-w-7xl mx-auto px-2 lg:px-8">
          {/* --- HERO SECTION --- */}
          <section ref={heroRef} className={`grid lg:grid-cols-2 gap-12 lg:gap-0 items-center ${CLAY.spacing.sectionGap} lg:cursor-none`}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="text-left flex flex-col items-start relative z-10 lg:pr-12 mt-10"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-full border border-white/50 dark:border-white/10 shadow-sm mb-8"
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9E75] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF9E75]"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9C8C84]">
                  Campus Food, Reimagined
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className={`text-4xl sm:text-5xl md:text-7xl font-black ${THEME.textDark} leading-[1.15] tracking-tight mb-6`}
              >
                Order local. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9E75] to-[#FF7043]">
                  Skip the queues.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className={`text-base md:text-lg ${THEME.textSoft} mb-10 max-w-md leading-relaxed`}
              >
                Byte helps students save time with pre-orders and affordable delivery, while helping vendors reduce food wastage and manage operations efficiently.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                {user ? (
                  <button
                    onClick={() =>
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.arjunmnath.byteit",
                        "_blank",
                      )
                    }
                    className={`${THEME.btnPrimary} h-14 md:h-16 px-8 rounded-full text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-3 w-full sm:w-auto`}
                  >
                    <Smartphone size={18} /> Get the App
                  </button>
                ) : (
                  <button
                    onClick={() => router.push("/register?state=open_app")}
                    className={`${THEME.btnPrimary} h-14 md:h-16 px-8 rounded-full text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-3 w-full sm:w-auto`}
                  >
                    <User size={18} /> Get the App
                  </button>
                )}

                <button
                  onClick={() => router.push("/partner")}
                  className={`${THEME.btnSecondary} h-14 md:h-16 px-8 rounded-full text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-3 w-full sm:w-auto`}
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
          <section className={`${CLAY.spacing.sectionGap} relative`}>
            {/* Floating background text */}
            <div className="absolute -inset-x-10 -top-10 -bottom-10 pointer-events-none select-none hidden md:block overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_5%,black_30%,transparent_52%,transparent_52%,black_70%,transparent_95%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_5%,black_30%,transparent_52%,transparent_52%,black_70%,transparent_95%)]" aria-hidden="true">
              {[
                { text: "25 MIN WAIT", left: "3%", top: "20%", delay: "0s", size: "text-4xl" },
                { text: "SOLD OUT", left: "65%", top: "12%", delay: "1.5s", size: "text-5xl" },
                { text: "NO TIME", left: "30%", top: "65%", delay: "3.5s", size: "text-4xl" },
                { text: "BREAK OVER", left: "72%", top: "72%", delay: "0.8s", size: "text-3xl" },
                { text: "TOO LATE", left: "12%", top: "82%", delay: "2.8s", size: "text-5xl" },
                { text: "HUNGRY", left: "50%", top: "35%", delay: "4.5s", size: "text-3xl" },
                { text: "QUEUE FULL", left: "80%", top: "45%", delay: "1.2s", size: "text-4xl" },
              ].map((item, i) => (
                <span
                  key={i}
                  className={`absolute ${item.size} font-black uppercase tracking-widest text-[#5C4D45]/[0.06] dark:text-white/[0.06] whitespace-nowrap`}
                  style={{
                    left: item.left,
                    top: item.top,
                    animation: `float-fade 6.5s ${item.delay} infinite ease-in-out`,
                  }}
                >
                  {item.text}
                </span>
              ))}
            </div>

            <div className="relative z-10 text-center mb-14 lg:mb-16">
              <h2 className={`text-3xl md:text-5xl font-extrabold ${THEME.textDark} mb-4 tracking-tight`}>
                Campus breaks are{" "}
                <span className="text-[#FF9E75] dark:text-[#ff7c50]">
                  too short for queues.
                </span>
              </h2>
              <p className={`text-base md:text-lg ${THEME.textSoft} max-w-2xl mx-auto`}>
                Every day, hundreds of students rush to nearby vendors during the same window. Students lose valuable time waiting, while vendors struggle to handle unpredictable demand.
              </p>
            </div>

            <div className={`relative z-10 grid grid-cols-1 md:grid-cols-3 ${CLAY.spacing.gridGap}`}>
              {problems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={viewportMotion.initial ?? { opacity: 0, y: 20 }}
                  whileInView={viewportMotion.whileInView ?? { opacity: 1, y: 0 }}
                  viewport={viewportMotion.viewport ?? { once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`${CLAY.spacing.cardSmall} ${CLAY.radius.md} ${THEME.card} flex flex-col items-start relative overflow-hidden group transition-all duration-300`}
                >
                  <div className={`w-14 h-14 ${CLAY.radius.sm} ${THEME.cardInset} flex items-center justify-center mb-6 relative z-10`}>
                    <item.icon size={28} strokeWidth={2.5} className={THEME.textDark} />
                  </div>
                  <h3 className={`text-xl md:text-2xl font-bold ${THEME.textDark} mb-3 relative z-10 leading-tight`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm ${THEME.textSoft} leading-relaxed relative z-10`}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* --- BENTO GRID FEATURES --- */}
          <section className={CLAY.spacing.sectionGap}>
            <SectionHeading title="Why Byte Works." align="center" />
            <div className={`grid grid-cols-1 md:grid-cols-3 ${CLAY.spacing.gridGap} auto-rows-auto`}>
              <div className={`md:col-span-2 ${THEME.cardElevated} ${CLAY.spacing.cardLarge} flex flex-col justify-center relative overflow-hidden group`}>
                <div className="relative z-10 max-w-md">
                  <div className={`w-12 h-12 ${CLAY.color.accentLight} ${CLAY.radius.sm} flex items-center justify-center ${THEME.brand} mb-6`}>
                    <CalendarClock size={24} />
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-bold ${THEME.textDark} mb-3`}>
                    Order Ahead. Pick Up Faster.
                  </h3>
                  <p className={`text-base ${THEME.textSoft}`}>
                    Students pre-order meals before breaks begin. Know exactly when your food will be ready. No waiting. No uncertainty.
                  </p>
                </div>
                <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#ffd8b2] dark:bg-[#ff9e75cf] rounded-full blur-[80px] opacity-20 group-hover:scale-110 transition-transform duration-700"></div>
              </div>

              <div className={`md:col-span-1 md:row-span-2 min-h-[500px] md:min-h-0 ${footerBg} dark:border dark:border-white/10 ${CLAY.radius.lg} p-8 flex flex-col relative overflow-hidden ${CLAY.shadow.lg} dark:shadow-none text-white`}>
                <div className="relative z-10 w-full h-full flex flex-col">
                  <div className={`w-12 h-12 absolute right-0 bg-white/10 ${CLAY.radius.sm} hidden md:flex items-center justify-center ${THEME.brand} mb-4`}>
                    <BarChart3 size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">Better Operations</h3>
                  <p className="text-[#D6C6BA] text-xs font-semibold">
                    Real-time demand analytics.
                  </p>
                  <BetterAnalyticsGraph />
                  <AnalyticsGraph />
                </div>
              </div>

              <div className={`${THEME.card} ${CLAY.spacing.cardSmall} flex flex-col justify-center ${THEME.cardHover}`}>
                <Smartphone size={28} className={`${THEME.textDark} mb-4`} />
                <h3 className={`text-xl font-bold ${THEME.textDark} mb-2`}>
                  Affordable Campus Delivery
                </h3>
                <p className={`text-sm ${THEME.textSoft}`}>
                  Designed specifically for campuses, making deliveries practical and affordable for everyday student use.
                </p>
              </div>

              <div className={`${THEME.card} ${CLAY.spacing.cardSmall} flex flex-col justify-center ${THEME.cardHover}`}>
                <Leaf size={28} className={`${THEME.textDark} mb-4`} />
                <h3 className={`text-xl font-bold ${THEME.textDark} mb-2`}>
                  Reduce Food Wastage
                </h3>
                <p className={`text-sm ${THEME.textSoft}`}>
                  Use real order data instead of guesswork. Cook closer to actual demand and minimize unsold inventory.
                </p>
              </div>
            </div>
          </section>

          {/* --- FAQ --- */}
          <section className="w-full py-12 md:py-20 px-2 md:px-12 flex justify-center">
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-4 lg:sticky lg:top-24 h-full flex flex-col gap-4">
                <h2 className="text-[#5C4D45] dark:text-white text-4xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                  Common <br />{" "}
                  <span className="text-[#FF9E75] dark:text-[#ff7c50]">
                    Questions.
                  </span>
                </h2>
                <p className="text-[#9C8C84] text-md leading-relaxed mt-4 md:mt-8 max-w-xs">
                  Quick answers to questions you might have about Byte&apos;s
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
          <section className={`text-center pb-12 ${CLAY.spacing.sectionGap}`}>
            <div className={`${CLAY.spacing.cardCta} ${CLAY.radius.xl} ${THEME.cardElevated} relative overflow-hidden group border border-[#FF9E75]/10 hover:border-[#FF9E75]/30 transition-all duration-700 hover:shadow-[0_0_40px_rgba(255,158,117,0.15),12px_12px_24px_rgba(214,198,186,0.45),-6px_-6px_16px_rgba(255,255,255,0.85)] dark:hover:shadow-[0_0_40px_rgba(255,124,80,0.1)]`}>
              <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ boxShadow: "inset 0 0 30px rgba(255,158,117,0.08)" }}></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9E75]/10 blur-[80px] rounded-full"></div>
              <div className="relative z-10 max-w-3xl mx-auto">
                <span className="inline-block px-3 py-1 rounded-full bg-[#FF9E75]/10 text-[#FF9E75] dark:text-[#ff7c50] font-semibold text-[10px] uppercase tracking-widest mb-6">
                  Join the movement
                </span>
                <h2 className={`text-3xl md:text-6xl font-extrabold ${THEME.textDark} mb-6 tracking-tight leading-[1.25]`}>
                  The future of campus <br /> dining starts here.
                </h2>
                <p className={`text-base md:text-lg ${THEME.textSoft} mb-10 max-w-lg mx-auto`}>
                  Byte connects students with local vendors through intelligent pre-ordering, affordable delivery, and data-driven operations.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={() => router.push("/register")}
                    className={`${THEME.btnPrimary} h-14 px-8 rounded-full text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2`}
                  >
                    I&apos;m a Student <ArrowUpRight size={18} />
                  </button>
                  <button
                    onClick={() => router.push("/partner")}
                    className={`${THEME.btnSecondary} h-14 px-8 rounded-full text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2`}
                  >
                    I&apos;m a Vendor <Store size={18} />
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
