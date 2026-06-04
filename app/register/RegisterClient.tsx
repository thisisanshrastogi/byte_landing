"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  Rocket,
  Star,
  Home,
  ShieldCheck,
  Zap,
  Clock,
} from "lucide-react";
import GoogleLoginButton from "@/components/googleLoginButton";
import { useAuth } from "@/contexts/auth-context";
import { THEME, CLAY } from "@/lib/design-tokens";

export default function RegisterPage() {
  const { loading, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const intent =
    searchParams.get("state") === "open_app" ? "open_app" : "register";
  const router = useRouter();

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
      transition: { duration: 0.3 },
    },
  };

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, router, loading]);

  return (
    <div className={`min-h-screen flex font-sans overflow-hidden ${THEME.bg}`}>
      {/* --- LEFT PANEL: Visual --- */}
      <div className="hidden lg:flex w-1/2 relative bg-[#FFF0E6] dark:bg-gradient-to-br dark:from-[#120804] dark:to-[#050505] flex-col justify-between p-12 lg:p-20 overflow-hidden border-r border-[#EBE0D6] dark:border-white/5">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-15%] left-[-15%] w-[600px] h-[600px] bg-[#FF9E75]/15 dark:bg-[#FF7E47]/20 rounded-full blur-3xl dark:blur-[100px]"
          />
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FFD166]/15 dark:bg-[#FF9E75]/15 rounded-full blur-3xl dark:blur-[120px]"
          />
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
            <Rocket size={14} className="text-[#FF9E75]" fill="currentColor" />
            <span className={`text-[10px] font-bold uppercase tracking-wider ${THEME.textSoft}`}>
              Join the Revolution
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className={`text-5xl xl:text-6xl font-black ${THEME.textDark} mb-6 leading-[1.1] tracking-tight`}
          >
            Your hunger,<br />
            <span className="text-[#FF9E75] dark:text-[#ff7c50]">
              on your schedule.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className={`text-lg ${THEME.textSoft} leading-relaxed mb-10`}
          >
            Pre-order from your favorite campus vendors, skip the queue, and never miss a meal during short breaks.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            {[
              { icon: Clock, text: "Order ahead, pick up instantly" },
              { icon: ShieldCheck, text: "Secure wallet with instant refunds" },
              { icon: Zap, text: "Real-time order tracking" },
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
            © 2026 Byte Technologies
          </p>
          <div className="w-20 h-10 overflow-hidden rounded-[1.2rem] bg-white dark:bg-[#0a0a0a] flex items-center justify-center p-2">
            <img src="/byte-logo.png" alt="Byte" className="w-[160%] object-cover block dark:hidden" />
            <img src="/byte-logo-dark.png" alt="Byte" className="w-[160%] object-cover hidden dark:block" />
          </div>
        </div>
      </div>

      {/* --- RIGHT PANEL: Register Form --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-16 relative">
        {/* Home button */}
        <div className="absolute top-6 right-6 lg:top-10 lg:right-10 z-20">
          <Link
            href="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold ${THEME.textSoft} hover:text-[#FF9E75] hover:bg-[#F5EFE8] dark:hover:bg-white/5 transition-all`}
          >
            <Home size={18} />
            <span className="hidden sm:inline text-sm">Home</span>
          </Link>
        </div>

        <motion.div
          className="w-full max-w-sm my-auto"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="mb-8 text-center lg:text-left">
            <h2 className={`text-3xl font-extrabold ${THEME.textDark} tracking-tight mb-2`}>
              Create your account
            </h2>
            <p className={`text-base ${THEME.textSoft} leading-relaxed`}>
              Sign up instantly with Google. No forms, no passwords to remember.
            </p>
          </motion.div>

          {/* Google Sign Up */}
          <motion.div variants={fadeInUp}>
            <GoogleLoginButton
              intent={intent}
              text="Sign Up With Google"
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </motion.div>

          {/* Trust indicators */}
          <motion.div variants={fadeInUp} className={`mt-8 flex items-center justify-center lg:justify-start gap-4 px-4 py-3 ${CLAY.color.inset} ${CLAY.radius.md}`}>
            <ShieldCheck size={18} className={THEME.textDark} />
            <p className={`text-xs ${THEME.textSoft}`}>
              We only access your name and email. No passwords stored.
            </p>
          </motion.div>

          {/* Sign in link */}
          <motion.div variants={fadeInUp} className="text-center lg:text-left mt-8">
            <span className={`text-sm ${THEME.textSoft}`}>
              Already have an account?{" "}
              <Link href="/login" className="text-[#FF9E75] font-bold hover:underline">
                Sign in
              </Link>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
