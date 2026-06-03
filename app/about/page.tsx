"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  Rocket,
  Wallet,
  Clock,
  RefreshCcw,
  BarChart3,
  Zap,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import { BackgroundElements } from "@/components/background-element";
import { THEME, CLAY } from "@/lib/design-tokens";

export default function AboutPage() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 12 },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden relative ${THEME.bg}`}>
      <Navbar />
      <BackgroundElements />

      <main className="relative z-10 pt-24 pb-20 lg:pt-16 lg:pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* --- HERO --- */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center py-16 md:py-24"
          >
            <motion.div
              variants={fadeInUp}
              className={`inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-full border border-white/50 dark:border-white/10 ${CLAY.shadow.sm} dark:shadow-none mb-8`}
            >
              <Zap size={14} className={THEME.brand} fill="currentColor" />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${THEME.textSoft}`}>
                Operating System for Campus Food
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className={`text-5xl md:text-7xl font-black ${THEME.textDark} max-w-4xl mx-auto leading-[1.15] tracking-tight mb-8`}
            >
              Building the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9E75] to-[#FF7E47]">
                OS for Campus Food.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl max-w-2xl mx-auto ${THEME.textSoft} leading-relaxed`}
            >
              Byte was created to solve a simple problem: students shouldn&apos;t spend their breaks standing in line, and vendors shouldn&apos;t have to guess how much food to prepare.
            </motion.p>
          </motion.div>

          {/* --- PROBLEM & SOLUTION --- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center ${CLAY.spacing.sectionGap}`}
          >
            <div className="space-y-8">
              <motion.div variants={fadeInUp}>
                <h2 className={`text-3xl md:text-4xl font-extrabold ${THEME.textDark} tracking-tight mb-6`}>
                  A Daily Problem Hidden in Plain Sight.
                </h2>
                <p className={`text-base md:text-lg ${THEME.textSoft} leading-relaxed`}>
                  Campus dining follows a unique pattern. Hundreds of students become hungry at nearly the same time. Vendors face sudden demand spikes, while students have limited break periods.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 w-10 h-10 ${CLAY.radius.sm} ${THEME.cardInset} flex items-center justify-center shrink-0`}>
                    <Clock size={18} className={THEME.textDark} />
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg ${THEME.textDark}`}>
                      For Students
                    </h4>
                    <p className={`text-sm ${THEME.textSoft} leading-relaxed`}>
                      Long waiting times and poor customer experiences.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className={`mt-1 w-10 h-10 ${CLAY.radius.sm} ${THEME.cardInset} flex items-center justify-center shrink-0`}>
                    <BarChart3 size={18} className={THEME.textDark} />
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg ${THEME.textDark}`}>
                      For Vendors
                    </h4>
                    <p className={`text-sm ${THEME.textSoft} leading-relaxed`}>
                      Lost sales opportunities, operational stress, and food wastage.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div variants={fadeInUp}>
              <div className={`${THEME.cardElevated} ${CLAY.spacing.cardLarge} flex flex-col justify-center items-start`}>
                <div className={`w-12 h-12 ${CLAY.radius.sm} ${CLAY.color.accentLight} flex items-center justify-center ${THEME.brand} mb-5`}>
                  <Rocket size={24} strokeWidth={2.5} />
                </div>
                <h3 className={`text-2xl font-bold ${THEME.textDark} mb-4`}>
                  Smarter Operations for Everyone
                </h3>
                <p className={`${THEME.textSoft} leading-relaxed`}>
                  Byte creates a digital bridge between students and local vendors. Students order ahead and schedule deliveries. Vendors receive advance demand visibility and business reporting tools.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* --- HOW IT WORKS --- */}
          <div className={CLAY.spacing.sectionGap}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-center ${CLAY.spacing.headingGap}`}
            >
              <h2 className={`text-3xl md:text-4xl font-extrabold ${THEME.textDark} tracking-tight mb-4`}>
                How the Magic Happens
              </h2>
              <p className={THEME.textSoft}>A transparent, four-step ecosystem.</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className={`grid md:grid-cols-2 ${CLAY.spacing.gridGap}`}
            >
              {[
                { icon: Wallet, num: "01", title: "Smart Wallet", desc: <>Money moves to a <span className={`${THEME.brand} font-semibold`}>Reserved State</span> securely held until the vendor confirms. No accidental charges, ever.</> },
                { icon: Clock, num: "02", title: "7-Minute Promise", desc: "Vendors have 7 minutes to accept. If they timeout or reject, your money moves instantly back to your Available Balance." },
                { icon: RefreshCcw, num: "03", title: "Instant Refunds", desc: "Vendor ran out of ingredients? Cancellations trigger immediate refunds. No waiting 3-5 business days for bank processing." },
                { icon: BarChart3, num: "04", title: "Vendor Analytics", desc: "We predict demand before it happens, allowing kitchens to prep efficiently and reduce food wastage significantly." },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className={`${THEME.card} ${CLAY.spacing.cardSmall} h-full transition-transform hover:-translate-y-1 duration-300`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 ${CLAY.radius.sm} ${THEME.cardInset} flex items-center justify-center`}>
                      <card.icon size={22} className={THEME.textDark} />
                    </div>
                    <span className={`text-3xl font-extrabold text-[#F5EFE8] dark:text-white/5 select-none`}>
                      {card.num}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold ${THEME.textDark} mb-3`}>
                    {card.title}
                  </h3>
                  <p className={`text-sm ${THEME.textSoft} leading-relaxed`}>
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* --- VALUES --- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="border-t border-[#E6DCCF] dark:border-white/10 pt-24"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="md:col-span-2 lg:col-span-1">
                <h2 className={`text-3xl font-extrabold ${THEME.textDark} tracking-tight mb-4`}>
                  Our Core Values
                </h2>
                <p className={THEME.textSoft}>
                  Built on trust, speed, and transparency.
                </p>
              </div>

              {[
                { title: "Efficiency", desc: "We respect your time. Every feature is designed to reduce friction." },
                { title: "Transparency", desc: "Clear wallet states. You always know where your money is." },
                { title: "Sustainability", desc: "Predicting demand means less food in the trash and more on the plate." },
              ].map((val, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex flex-col gap-3"
                >
                  <div className="w-8 h-1 bg-[#FF9E75] rounded-full mb-2"></div>
                  <h3 className={`text-xl font-bold ${THEME.textDark}`}>
                    {val.title}
                  </h3>
                  <p className={`text-sm ${THEME.textSoft} leading-relaxed`}>{val.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
