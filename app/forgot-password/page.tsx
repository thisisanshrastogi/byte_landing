"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Mail,
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Lock,
  Loader2,
  HelpCircle,
  Home,
} from "lucide-react";
import Link from "next/link";
import { THEME, CLAY } from "@/lib/design-tokens";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const inputClass = `w-full ${CLAY.color.inset} ${CLAY.shadow.inset} ${CLAY.shadowDark.inset} ${CLAY.radius.md} px-5 md:px-6 py-3 md:py-4 border-none text-[#5C4D45] dark:text-white placeholder:text-[#9C8C84] dark:placeholder:text-[#555] focus:ring-2 focus:ring-[#FF9E75]/50 focus:outline-none transition-all text-sm md:text-base`;

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 16 },
    },
  };

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLSd1HXeNiTFgawkIqUPmChyrk_2VysqB036E4OYWGVftNhDhMw/formResponse",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          "entry.948489622": email,
        }),
      }
    )
      .then(() => {
        setIsSent(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className={`min-h-screen flex font-sans overflow-hidden ${THEME.bg}`}>
      {/* --- LEFT PANEL: Visual --- */}
      <div className="hidden lg:flex w-1/2 relative bg-[#FFF0E6] dark:bg-gradient-to-br dark:from-[#120804] dark:to-[#050505] flex-col justify-between p-12 lg:p-20 overflow-hidden border-r border-[#EBE0D6] dark:border-white/5">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FF9E75]/20 dark:bg-[#FF7E47]/20 rounded-full blur-3xl dark:blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#FFD166]/20 dark:bg-[#FF9E75]/15 rounded-full blur-3xl dark:blur-[120px]" />
        </div>

        {/* Content */}
        <div className="relative z-10" />

        <motion.div
          className="relative z-10 max-w-lg"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 rounded-full mb-8"
          >
            <Lock size={14} className="text-[#FF9E75]" />
            <span className={`text-[10px] font-bold uppercase tracking-wider ${THEME.textSoft}`}>
              Account Recovery
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className={`text-5xl xl:text-6xl font-black ${THEME.textDark} mb-6 leading-[1.1] tracking-tight`}
          >
            Don&apos;t worry,<br />
            <span className="text-[#FF9E75] dark:text-[#ff7c50]">
              it happens.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className={`text-lg ${THEME.textSoft} leading-relaxed mb-10`}
          >
            We&apos;ll help you get back into your account. Enter your email and we&apos;ll send you a secure reset link.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            {[
              { icon: ShieldCheck, text: "Secure, encrypted process" },
              { icon: Clock, text: "Reset link expires in 15 minutes" },
              { icon: HelpCircle, text: "Contact support if stuck" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-8 h-8 ${CLAY.radius.sm} bg-white/60 dark:bg-white/5 flex items-center justify-center`}>
                  <item.icon size={16} className={THEME.textDark} />
                </div>
                <span className={`text-sm font-semibold ${THEME.textDark}`}>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative z-10 mt-auto pt-12 flex items-center justify-between">
          <p className={`text-sm ${THEME.textSoft} opacity-60`}>
            &copy; 2026 Byte Technologies
          </p>
          <div className="w-20 h-10 overflow-hidden rounded-[1.2rem] bg-white dark:bg-[#0a0a0a] flex items-center justify-center p-2">
            <img src="/byte-logo.png" alt="Byte" className="w-[160%] object-cover block dark:hidden" />
            <img src="/byte-logo-dark.png" alt="Byte" className="w-[160%] object-cover hidden dark:block" />
          </div>
        </div>
      </div>

      {/* --- RIGHT PANEL: Form --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-16 relative">
        {/* Home button */}
        <div className="absolute top-6 right-6 lg:top-10 lg:right-10 z-20">
          <Link
            href="/login"
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold ${THEME.textSoft} hover:text-[#FF9E75] hover:bg-[#F5EFE8] dark:hover:bg-white/5 transition-all`}
          >
            <Home size={18} />
            <span className="hidden sm:inline text-sm">Login</span>
          </Link>
        </div>

        <motion.div
          key={isSent ? "success" : "form"}
          className="w-full max-w-sm my-auto"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {isSent ? (
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center py-12">
              <div className={`w-20 h-20 ${THEME.cardInset} rounded-full flex items-center justify-center mb-6`}>
                <CheckCircle2 size={36} strokeWidth={2.5} className="text-[#4CAF50]" />
              </div>
              <h2 className={`text-3xl font-extrabold ${THEME.textDark} mb-3`}>
                Check your inbox
              </h2>
              <p className={`text-base ${THEME.textSoft} mb-8 leading-relaxed`}>
                We&apos;ve sent a password reset link to{" "}
                <strong className="text-[#FF9E75] dark:text-[#ff7c50]">{email}</strong>
              </p>
              <Link
                href="/login"
                className={`${THEME.btnPrimary} w-full py-4 rounded-full font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 group`}
              >
                Return to Login
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => setIsSent(false)}
                className={`mt-4 text-sm font-bold ${THEME.textSoft} hover:text-[#FF9E75] transition-colors`}
              >
                Try a different email
              </button>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <motion.div variants={fadeInUp} className="mb-8 text-center lg:text-left">
                <h2 className={`text-3xl font-extrabold ${THEME.textDark} tracking-tight mb-2`}>
                  Forgot password?
                </h2>
                <p className={`text-base ${THEME.textSoft} leading-relaxed`}>
                  Enter your email and we&apos;ll send you a reset link.
                </p>
              </motion.div>

              {/* Form */}
              <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    className={`block text-xs font-bold uppercase tracking-widest ${THEME.textSoft} mb-2 pl-1`}
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#D6C6BA] dark:text-[#555]" size={18} />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`${inputClass} pl-12`}
                      placeholder="name@college.edu"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className={`${THEME.btnPrimary} w-full py-4 h-auto rounded-full font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 mt-6 group disabled:opacity-50`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </motion.form>

              {/* Back to login */}
              <motion.div variants={fadeInUp} className="text-center lg:text-left mt-8">
                <span className={`text-sm ${THEME.textSoft}`}>
                  Remember your password?{" "}
                  <Link href="/login" className="text-[#FF9E75] font-bold hover:underline">
                    Sign in
                  </Link>
                </span>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
