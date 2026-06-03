"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/auth-context";
import { motion, Variants } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Star,
  Home,
  EyeOff,
  Eye,
  ShieldCheck,
  Zap,
  Clock,
} from "lucide-react";
import GoogleLoginButton from "@/components/googleLoginButton";
import { THEME, CLAY } from "@/lib/design-tokens";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, loading, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError("Invalid email or password");
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FF9E75]/20 dark:bg-[#FF7E47]/20 rounded-full blur-3xl dark:blur-[100px]"
          />
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#FFD166]/20 dark:bg-[#FF9E75]/15 rounded-full blur-3xl dark:blur-[120px]"
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
            <Star size={14} className="text-[#FF9E75]" fill="currentColor" />
            <span className={`text-[10px] font-bold uppercase tracking-wider ${THEME.textSoft}`}>
              The #1 Campus Food App
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className={`text-5xl xl:text-6xl font-black ${THEME.textDark} mb-6 leading-[1.1] tracking-tight`}
          >
            Skip the line,<br />
            <span className="text-[#FF9E75] dark:text-[#ff7c50]">
              Enjoy the time.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className={`text-lg ${THEME.textSoft} leading-relaxed mb-10`}
          >
            Thousands of students order from their favorite campus canteens instantly. No cash, no waiting.
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

      {/* --- RIGHT PANEL: Login Form --- */}
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
              Welcome back
            </h2>
            <p className={`text-base ${THEME.textSoft} leading-relaxed`}>
              Sign in to manage your wallet and view orders.
            </p>
          </motion.div>

          {/* Google Login */}
          <motion.div variants={fadeInUp} className="mb-8">
            <GoogleLoginButton
              intent="login"
              text="Sign In With Google"
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </motion.div>

          {/* Divider */}
          <motion.div variants={fadeInUp} className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5DCD5] dark:border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#FFFBF7] dark:bg-[#050505] px-4 font-bold uppercase tracking-widest text-[#D6C6BA] dark:text-[#5C4D45]">
                Or via email
              </span>
            </div>
          </motion.div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6"
            >
              <Alert
                variant="destructive"
                className={`bg-[#FFF0F0] dark:bg-[#2C1515] border-none text-[#FF6B6B] dark:text-[#FF8080] ${CLAY.radius.sm} flex items-center p-4`}
              >
                <AlertCircle size={18} className="mr-3 shrink-0" />
                <AlertDescription className="font-bold text-sm">
                  {error}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {/* Email Form */}
          <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className={`block text-xs font-bold uppercase tracking-widest ${THEME.textSoft} mb-2 pl-1`}
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="name@college.edu"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 pl-1">
                <label
                  className={`block text-xs font-bold uppercase tracking-widest ${THEME.textSoft}`}
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-[#FF9E75] hover:underline dark:text-[#ff7c50] pr-1"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute cursor-pointer right-5 top-1/2 -translate-y-1/2 text-[#D6C6BA] dark:text-[#B0A69E] focus:outline-none hover:text-[#FF9E75] transition-colors"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className={`${THEME.btnPrimary} w-full py-4 h-auto rounded-full font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 mt-6 group`}
              disabled={isLoading}
            >
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </motion.form>

          {/* Sign up link */}
          <motion.div variants={fadeInUp} className="text-center lg:text-left mt-8">
            <span className={`text-sm ${THEME.textSoft}`}>
              New to Byte?{" "}
              <Link href="/register" className="text-[#FF9E75] font-bold hover:underline">
                Create an account
              </Link>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
