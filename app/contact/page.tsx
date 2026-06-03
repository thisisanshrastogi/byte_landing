"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Mail, Briefcase, Send } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { BackgroundElements } from "@/components/background-element";
import { THEME, CLAY } from "@/lib/design-tokens";

export default function ContactPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 16 },
    },
  };

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden relative ${THEME.bg}`}>
      <Navbar />
      <BackgroundElements />

      <main className="py-20 mt-10 lg:py-24 z-10 relative">
        <motion.div
          className="max-w-4xl mx-auto px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className={`text-center ${CLAY.spacing.headingGap}`}>
            <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-full border border-white/50 dark:border-white/10 ${CLAY.shadow.sm} dark:shadow-none mb-6`}>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${THEME.textSoft}`}>
                Get in Touch
              </span>
            </div>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black ${THEME.textDark} tracking-tight mb-6`}>
              Contact Us
            </h1>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto ${THEME.textSoft} leading-relaxed`}>
              Have questions or need support? We&apos;re here to help make your Byte
              experience amazing.
            </p>
          </motion.div>

          <div className={`grid md:grid-cols-2 ${CLAY.spacing.gridGap} mb-12`}>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className={`${THEME.card} ${CLAY.spacing.cardSmall} transition-all duration-300`}
            >
              <div className={`w-12 h-12 ${CLAY.radius.sm} ${THEME.cardInset} flex items-center justify-center mb-4`}>
                <Mail size={22} strokeWidth={2.5} className={THEME.textDark} />
              </div>
              <h3 className={`text-xl font-bold ${THEME.textDark} mb-3`}>General Support</h3>
              <p className={`text-sm ${THEME.textSoft} leading-relaxed mb-4`}>
                For general questions, account issues, or technical support.
              </p>
              <a
                href="mailto:support@byteapp.tech"
                className={`${THEME.brand} font-bold hover:underline break-all transition-colors`}
              >
                support@byteapp.tech
              </a>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className={`${THEME.card} ${CLAY.spacing.cardSmall} transition-all duration-300`}
            >
              <div className={`w-12 h-12 ${CLAY.radius.sm} ${THEME.cardInset} flex items-center justify-center mb-4`}>
                <Briefcase size={22} strokeWidth={2.5} className={THEME.textDark} />
              </div>
              <h3 className={`text-xl font-bold ${THEME.textDark} mb-3`}>
                Business Inquiries
              </h3>
              <p className={`text-sm ${THEME.textSoft} leading-relaxed mb-4`}>
                Interested in partnering with Byte or bringing us to your
                campus?
              </p>
              <a
                href="mailto:support@byteapp.tech"
                className={`${THEME.brand} font-bold hover:underline break-all transition-colors`}
              >
                support@byteapp.tech
              </a>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            variants={fadeInUp}
            className={`${THEME.cardElevated} ${CLAY.spacing.cardLarge}`}
          >
            <h3 className={`text-2xl font-extrabold text-center ${THEME.textDark} tracking-tight mb-8`}>
              Send us a Message
            </h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-xs font-bold uppercase tracking-wide mb-2 ml-1 ${THEME.textSoft}`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`w-full px-4 py-4 ${CLAY.color.inset} ${CLAY.shadow.inset} ${CLAY.shadowDark.inset} ${CLAY.radius.sm} border-none text-[#5C4D45] dark:text-white placeholder-[#B0A69E] focus:outline-none transition-all`}
                    placeholder="Gordon Ramsay"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-xs font-bold uppercase tracking-wide mb-2 ml-1 ${THEME.textSoft}`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full px-4 py-4 ${CLAY.color.inset} ${CLAY.shadow.inset} ${CLAY.shadowDark.inset} ${CLAY.radius.sm} border-none text-[#5C4D45] dark:text-white placeholder-[#B0A69E] focus:outline-none transition-all`}
                    placeholder="chef@kitchen.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className={`block text-xs font-bold uppercase tracking-wide mb-2 ml-1 ${THEME.textSoft}`}
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className={`w-full px-4 py-4 ${CLAY.color.inset} ${CLAY.shadow.inset} ${CLAY.shadowDark.inset} ${CLAY.radius.sm} border-none text-[#5C4D45] dark:text-white placeholder-[#B0A69E] focus:outline-none transition-all`}
                  placeholder="Feedback about..."
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className={`block text-xs font-bold uppercase tracking-wide mb-2 ml-1 ${THEME.textSoft}`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className={`w-full px-4 py-4 resize-none ${CLAY.color.inset} ${CLAY.shadow.inset} ${CLAY.shadowDark.inset} ${CLAY.radius.sm} border-none text-[#5C4D45] dark:text-white placeholder-[#B0A69E] focus:outline-none transition-all`}
                  placeholder="Tell us how we can help..."
                />
              </div>
              <div className="text-center pt-2">
                <Button
                  size="lg"
                  className={`w-full sm:w-auto px-8 py-6 ${CLAY.radius.md} text-base font-bold uppercase tracking-wide flex items-center justify-center gap-2 ${THEME.btnPrimary}`}
                >
                  Send Message <Send size={18} strokeWidth={2.5} />
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
