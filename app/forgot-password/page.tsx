"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  ChevronLeft,
  Mail,
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Lock,
  Loader2,
  HelpCircle,
  User,
} from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // --- CLAY TOKENS (Reused) ---
  const clayInset =
    "bg-[#F5EFE8] shadow-[inset_4px_4px_8px_rgba(204,190,178,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-[1rem] border-none outline-none text-[#5C4D45] font-bold placeholder-[#B0A69E] focus:shadow-[inset_6px_6px_12px_rgba(204,190,178,0.6),_inset_-6px_-6px_12px_rgba(255,255,255,1)] transition-all dark:bg-muted dark:shadow-none dark:text-foreground dark:focus:ring-2 dark:focus:ring-primary";

  const clayBtnPrimary =
    "bg-[#FF9E75] text-white shadow-[6px_6px_12px_rgba(255,158,117,0.4),_-2px_-2px_6px_rgba(255,255,255,0.4)] active:shadow-[inset_3px_3px_6px_rgba(180,100,60,0.2)] active:translate-y-[2px] transition-all duration-200 hover:bg-[#FF9E75]/90 dark:bg-primary dark:text-primary-foreground dark:shadow-none";

  const textHeading =
    "text-[#5C4D45] dark:text-foreground font-black tracking-tight";
  const textBody = "text-[#9C8C84] dark:text-muted-foreground font-bold";

  // --- ANIMATIONS ---
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
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
    <div className="min-h-screen flex bg-[#FFFBF7] dark:bg-background selection:bg-orange-100 dark:selection:bg-primary/30 font-sans overflow-hidden">
      {/* ---------------- LEFT SIDE: VISUAL CONTEXT ---------------- */}
      <div className="hidden lg:flex w-1/2 relative bg-[#FFF0E6] dark:bg-primary/5 flex-col justify-between  p-12 lg:p-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: [0, 50, 0], y: [0, 30, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FF9E75]/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#FFD166]/20 rounded-full blur-3xl"
          />
        </div>

        {/* Brand Header */}
        <div className="relative z-10 my-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-black text-[#5C4D45] dark:text-foreground"
          >
            <span className="w-3 h-3 rounded-full bg-[#FF9E75]"></span> Byte
          </Link>
        </div>

        {/* Main Context Content */}
        <motion.div
          className="relative z-10 max-w-lg"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-block px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full mb-8 text-[#FF9E75] font-black text-xs uppercase tracking-wide shadow-sm dark:bg-white/10 dark:text-primary"
          >
            Account Recovery
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-6xl font-black text-[#5C4D45] dark:text-foreground mb-6 leading-[1.1] tracking-tight"
          >
            Don't worry, <br />
            it{" "}
            <span className="text-[#FF9E75] dark:text-primary">Happens.</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-[#9C8C84] dark:text-muted-foreground font-bold leading-relaxed mb-12"
          >
            We'll help you get back into your account. Enter your email and
            we'll send you a secure link.
          </motion.p>

          {/* Security Assurance Cards */}
          <div className="space-y-6">
            {[
              {
                icon: ShieldCheck,
                title: "Secure Process",
                desc: "Your data is encrypted and safe with us.",
              },
              {
                icon: User,
                title: "Admin Approval",
                desc: "Your reset request will be submitted to the admin.",
              },
              {
                icon: Clock,
                title: "Expires in 15 minutes",
                desc: "Reset links expire quickly for your security.",
              },
              {
                icon: HelpCircle,
                title: "Need Help?",
                desc: "Contact support if you no longer have email access.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12  rounded-[1rem] bg-white/80 dark:bg-secondary flex items-center justify-center text-[#FF9E75] dark:text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <item.icon size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#5C4D45] dark:text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm font-bold text-[#9C8C84] dark:text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Link */}
        <div className="relative z-10 my-4">
          <p className="text-sm font-bold text-[#9C8C84] dark:text-muted-foreground opacity-60">
            &copy; {new Date().getFullYear()} Byte Inc.
          </p>
        </div>
      </div>

      {/* ---------------- RIGHT SIDE: FORM ---------------- */}
      <div className="w-full lg:w-1/2 flex flex-col items-center p-6 lg:p-24 overflow-y-auto ">
        {/* Top Navigation */}
        <div className="w-full max-w-md flex justify-between items-center mb-12">
          <Link
            href="/"
            className="lg:hidden flex items-center gap-2 text-xl font-black text-[#5C4D45] dark:text-foreground"
          >
            <span className="w-3 h-3 rounded-full bg-[#FF9E75]"></span> Byte
          </Link>
          {/* Replaced 'Back to Home' with 'Back to Login' */}
          <Link
            href="/login"
            className="ml-auto flex items-center gap-2 text-sm font-black text-[#9C8C84] hover:text-[#FF9E75] transition-colors dark:text-muted-foreground dark:hover:text-primary"
          >
            Back to Login <ChevronLeft size={16} className="rotate-180" />
          </Link>
        </div>

        <motion.div
          className="w-full max-w-md my-auto pb-10"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {isSent ? (
            // --- SUCCESS STATE ---
            <div className="flex flex-col items-center justify-center text-center py-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-24 h-24 bg-[#EAF8E6] dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6 shadow-inner"
              >
                <CheckCircle2
                  size={48}
                  className="text-[#4CAF50] dark:text-green-500"
                  strokeWidth={3}
                />
              </motion.div>
              <h2 className={`text-3xl font-black mb-4 ${textHeading}`}>
                Check your inbox
              </h2>
              <p className={`text-lg ${textBody} mb-12 leading-relaxed`}>
                We've sent a password reset link to <br />
                <span className="text-[#FF9E75] dark:text-primary">
                  {email}
                </span>
                .
              </p>

              <div className="flex flex-col gap-4 w-full">
                <Link
                  href="/login"
                  className={`${clayBtnPrimary} w-full py-5 rounded-[1.2rem] font-black text-lg uppercase tracking-wide flex items-center justify-center gap-2`}
                >
                  Return to Login
                </Link>
                <button
                  onClick={() => setIsSent(false)}
                  className="text-[#9C8C84] font-black text-sm uppercase hover:text-[#FF9E75] transition-colors dark:text-muted-foreground"
                >
                  Try a different email
                </button>
              </div>
            </div>
          ) : (
            // --- FORM STATE ---
            <>
              {/* Form Header */}
              <div className="mb-10">
                <div className="w-14 h-14 bg-[#FFF0E6] rounded-[1rem] flex items-center justify-center text-[#FF9E75] dark:bg-primary/10 dark:text-primary mb-6 shadow-sm">
                  <Lock size={28} strokeWidth={2.5} />
                </div>
                <h2 className={`text-4xl ${textHeading} mb-3`}>
                  Forgot Password?
                </h2>
                <p className={`text-lg ${textBody}`}>
                  Enter your email to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <label
                    className={`text-xs font-black uppercase tracking-wide ml-1 ${textBody}`}
                  >
                    Registered Email
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D6C6BA] dark:text-muted-foreground"
                      size={20}
                    />
                    <input
                      required
                      type="email"
                      className={`${clayInset} w-full pl-12 pr-4 py-4`}
                      placeholder="you@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className={`${clayBtnPrimary} w-full py-5 rounded-[1.2rem] font-black text-lg uppercase tracking-wide flex items-center justify-center gap-2 mt-4 group disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={24} className="animate-spin" /> Sending
                      Link
                    </>
                  ) : (
                    <>
                      Reset Password{" "}
                      <ArrowRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
