"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  Lightbulb,
  Rocket,
  Heart,
  Wallet,
  Clock,
  RefreshCcw,
  BarChart3,
  ArrowRight,
  Zap,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import { BackgroundElements } from "@/components/background-element";

export default function AboutPage() {
  // --- STYLING TOKENS ---
  // A slightly softer clay effect for individual interaction cards
  const clayItem =
    "bg-white h-full p-8 rounded-[2rem] shadow-[8px_8px_16px_rgba(214,198,186,0.3),_-4px_-4px_12px_rgba(255,255,255,0.8)] border border-transparent transition-transform hover:-translate-y-1 dark:bg-card dark:border-border dark:shadow-none";

  const textHeading =
    "text-[#5C4D45] dark:text-foreground font-black tracking-tight";
  const textBody =
    "text-[#9C8C84] dark:text-muted-foreground font-medium leading-relaxed";

  const iconBox =
    "w-12 h-12 rounded-2xl flex items-center justify-center bg-[#FFF0E6] text-[#FF9E75] dark:bg-primary/10 dark:text-primary mb-4";

  // --- ANIMATION ---
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 10 },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#FFFBF7] dark:bg-background selection:bg-orange-100 dark:selection:bg-primary/30 font-sans overflow-x-hidden">
      <Navbar />
      <BackgroundElements />

      <main className="relative z-10 pt-24 pb-20 lg:pt-32 lg:pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* --- HERO SECTION --- */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center  min-h-screen"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-secondary rounded-full text-[#FF9E75] dark:text-foreground font-bold text-xs uppercase tracking-wider mb-8 shadow-sm border border-[#F5EFE8] dark:border-border"
            >
              <Zap size={14} fill="currentColor" />
              <span>Revolutionizing Campus Dining</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className={`text-5xl md:text-7xl mb-8 ${textHeading} max-w-4xl mx-auto leading-[1.1]`}
            >
              Your break belongs to you, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9E75] to-[#FF7E47]">
                not the queue.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className={`text-xl md:text-xl max-w-2xl mx-auto ${textBody}`}
            >
              Byte optimizes campus dining by eliminating queues for students
              and maximizing throughput for vendors.
            </motion.p>
          </motion.div>

          {/* --- PROBLEM & SOLUTION (Split Layout, No Box) --- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32"
          >
            {/* Left: The Statement */}
            <div className="space-y-8">
              <motion.div variants={fadeInUp}>
                <h2 className={`text-3xl md:text-4xl mb-6 ${textHeading}`}>
                  The Campus Lunchbreak Paradox
                </h2>
                <p className={`text-lg ${textBody}`}>
                  Every day, hundreds of students rush to the cafeteria at the
                  exact same time. The result?
                  <span className="text-[#5C4D45] dark:text-foreground font-bold">
                    {" "}
                    Chaos.{" "}
                  </span>
                  Students spend their entire break waiting in line, while
                  vendors struggle to manage the unpredictable surge.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-red-100 dark:bg-red-900/20 p-2 rounded-lg text-red-500">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg ${textHeading}`}>
                      Wasted Time
                    </h4>
                    <p className={textBody}>
                      Average wait times exceed 20 minutes during peak hours.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-orange-100 dark:bg-orange-900/20 p-2 rounded-lg text-orange-500">
                    <BarChart3 size={20} />
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg ${textHeading}`}>
                      Unpredictable Demand
                    </h4>
                    <p className={textBody}>
                      Vendors often over-prep (waste) or under-prep (lost
                      revenue).
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: The Abstract Visual/Solution */}
            <motion.div variants={fadeInUp} className="relative">
              <div
                className={`relative z-10 p-10 md:p-12 ${clayItem} flex flex-col justify-center items-start`}
              >
                <div className={iconBox}>
                  <Rocket size={24} strokeWidth={2.5} />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${textHeading}`}>
                  The Byte Solution
                </h3>
                <p className={textBody}>
                  We bridge the gap. Students order ahead, vendors manage a
                  steady stream. Efficiency meets satisfaction in a seamless
                  digital handshake.
                </p>
              </div>
              {/* Decorative Element behind */}
              <div className="absolute top-8 left-8 w-full h-full rounded-[2.5rem] bg-[#FF9E75]/20 -z-10" />
            </motion.div>
          </motion.div>

          {/* --- HOW IT WORKS (Bento Grid of Cards) --- */}
          <div className="mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={`text-3xl md:text-4xl mb-4 ${textHeading}`}>
                How the Magic Happens
              </h2>
              <p className={textBody}>A transparent, four-step ecosystem.</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-6 lg:gap-8"
            >
              {/* Card 1 */}
              <motion.div variants={fadeInUp} className={clayItem}>
                <div className="flex justify-between items-start mb-6">
                  <div className={iconBox}>
                    <Wallet size={24} />
                  </div>
                  <span className="text-4xl font-black text-gray-100 dark:text-neutral-600">
                    01
                  </span>
                </div>
                <h3 className={`text-xl font-bold mb-3 ${textHeading}`}>
                  Smart Wallet
                </h3>
                <p className={textBody}>
                  Money moves to a{" "}
                  <span className="text-[#FF9E75] font-bold">
                    Reserved State
                  </span>{" "}
                  securely held until the vendor confirms. No accidental
                  charges, ever.
                </p>
              </motion.div>

              {/* Card 2 */}
              <motion.div variants={fadeInUp} className={clayItem}>
                <div className="flex justify-between items-start mb-6">
                  <div className={iconBox}>
                    <Clock size={24} />
                  </div>
                  <span className="text-4xl font-black text-gray-100 dark:text-neutral-600">
                    02
                  </span>
                </div>
                <h3 className={`text-xl font-bold mb-3 ${textHeading}`}>
                  7-Minute Promise
                </h3>
                <p className={textBody}>
                  Vendors have 7 minutes to accept. If they timeout or reject,
                  your money moves instantly back to your Available Balance.
                </p>
              </motion.div>

              {/* Card 3 */}
              <motion.div variants={fadeInUp} className={clayItem}>
                <div className="flex justify-between items-start mb-6">
                  <div className={iconBox}>
                    <RefreshCcw size={24} />
                  </div>
                  <span className="text-4xl font-black text-gray-100 dark:text-neutral-600">
                    03
                  </span>
                </div>
                <h3 className={`text-xl font-bold mb-3 ${textHeading}`}>
                  Instant Refunds
                </h3>
                <p className={textBody}>
                  Vendor ran out of ingredients? Cancellations trigger immediate
                  refunds. No waiting 3-5 business days for bank processing.
                </p>
              </motion.div>

              {/* Card 4 */}
              <motion.div variants={fadeInUp} className={clayItem}>
                <div className="flex justify-between items-start mb-6">
                  <div className={iconBox}>
                    <BarChart3 size={24} />
                  </div>
                  <span className="text-4xl font-black text-gray-100 dark:text-neutral-600">
                    04
                  </span>
                </div>
                <h3 className={`text-xl font-bold mb-3 ${textHeading}`}>
                  Vendor Analytics
                </h3>
                <p className={textBody}>
                  We predict demand before it happens, allowing kitchens to prep
                  efficiently and reduce food wastage significantly.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* --- VALUES (Clean Grid, No Backgrounds) --- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="border-t border-[#E6DCCF] dark:border-border pt-24"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="md:col-span-2 lg:col-span-1">
                <h2 className={`text-3xl ${textHeading} mb-4`}>
                  Our Core Values
                </h2>
                <p className={textBody}>
                  Built on trust, speed, and transparency.
                </p>
                {/* <div className="mt-8 hidden lg:block text-[#FF9E75]">
                  <Heart size={40} fill="currentColor" className="opacity-20" />
                </div> */}
              </div>

              {[
                {
                  title: "Efficiency",
                  desc: "We respect your time. Every feature is designed to reduce friction.",
                },
                {
                  title: "Transparency",
                  desc: "Clear wallet states. You always know where your money is.",
                },
                {
                  title: "Sustainability",
                  desc: "Predicting demand means less food in the trash and more on the plate.",
                },
              ].map((val, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex flex-col gap-3"
                >
                  <div className="w-8 h-1 bg-[#FF9E75] rounded-full mb-2"></div>
                  <h3 className={`text-xl font-black ${textHeading}`}>
                    {val.title}
                  </h3>
                  <p className={`text-sm ${textBody}`}>{val.desc}</p>
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
