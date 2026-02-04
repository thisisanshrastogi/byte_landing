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
  LogIn,
  AlertCircle,
  ArrowRight,
  Star,
  ChevronLeft,
  Mail,
  Home,
  EyeOff,
  Eye,
} from "lucide-react";
import GoogleLoginButton from "@/components/googleLoginButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, loading, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // --- CLAY TOKENS ---
  const clayInset =
    "bg-[#F5EFE8] shadow-[inset_4px_4px_8px_rgba(204,190,178,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-[1rem] border-none outline-none text-[#5C4D45] font-bold placeholder-[#B0A69E] focus:shadow-[inset_6px_6px_12px_rgba(204,190,178,0.6),_inset_-6px_-6px_12px_rgba(255,255,255,1)] transition-all dark:bg-muted dark:shadow-none dark:text-foreground dark:focus:ring-2 dark:focus:ring-primary";

  const clayBtnPrimary =
    "bg-[#FF9E75] text-white shadow-[6px_6px_12px_rgba(255,158,117,0.4),_-2px_-2px_6px_rgba(255,255,255,0.4)] hover:bg-[#FF9E75]/90 hover:shadow-lg active:translate-y-[2px] active:shadow-none transition-all dark:bg-[#FF9E75] dark:text-[#2C2420] dark:shadow-[6px_6px_12px_rgba(0,0,0,0.4),_-2px_-2px_6px_rgba(255,255,255,0.05)] dark:bg-primary";

  const textHeading =
    "text-[#5C4D45] dark:text-[#F5EFE8] font-black tracking-tight";
  const textBody = "text-[#9C8C84] dark:text-[#D6C6BA] font-bold";

  // --- ANIMATIONS ---
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push("/wallet");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex bg-[#FFFBF7] dark:bg-[#120F0D] selection:bg-orange-100 dark:selection:bg-primary/30 font-sans overflow-hidden transition-colors duration-500">
      {/* ---------------- LEFT SIDE: VISUAL SHOWCASE ---------------- */}
      <div className="hidden lg:flex w-1/2 relative bg-[#FFF0E6] dark:bg-[#181411] flex-col justify-between p-12 lg:p-20 overflow-hidden transition-colors duration-500 border-r border-[#EBE0D6] dark:border-[#2C2420]">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: [0, 50, 0], y: [0, 30, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FF9E75]/15 dark:bg-[#FF9E75]/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#FFD166]/15 dark:bg-[#FF9E75]/5 rounded-full blur-3xl"
          />
        </div>

        {/* Brand */}
        <div className="relative z-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-black text-[#5C4D45] dark:text-[#F5EFE8]"
          >
            <span className="w-3 h-3 rounded-full bg-[#FF9E75] shadow-[0_0_12px_rgba(255,158,117,0.6)]"></span>{" "}
            Byte
          </Link>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-[#2C2420]/60 backdrop-blur-sm border border-white/40 dark:border-[#3E342F] rounded-full mb-8 text-[#FF9E75] dark:text-primary font-black text-xs uppercase tracking-wide shadow-sm">
              <Star size={14} fill="currentColor" /> The #1 Campus Food App
            </div>

            <h1 className="text-6xl font-black text-[#5C4D45] dark:text-[#F5EFE8] mb-6 leading-[1.1] tracking-tight drop-shadow-sm">
              Skip the line,
              <br />
              <span className="text-[#FF9E75] dark:text-primary drop-shadow-[0_4px_20px_rgba(255,158,117,0.3)]">
                Enjoy the time.
              </span>
            </h1>
            <p className="text-xl text-[#9C8C84] dark:text-[#B0A69E] font-bold leading-relaxed mb-8">
              Join thousands of students ordering from their favorite campus
              canteens instantly. No cash, no waiting.
            </p>
          </motion.div>
        </div>

        {/* Footer Link */}
        <div className="relative z-10">
          <p className="text-sm font-bold text-[#9C8C84] dark:text-[#5C4D45]">
            © 2026 Byte Technologies
          </p>
        </div>
      </div>

      {/* ---------------- RIGHT SIDE: LOGIN FORM ---------------- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-24 relative bg-[#FFFBF7] dark:bg-[#120F0D] transition-colors duration-500">
        {/* === BACK TO HOME NAVIGATION === */}
        <Link
          href="/"
          className="flex items-center md:hidden gap-2 text-2xl font-black text-[#5C4D45] dark:text-[#F5EFE8]"
        ></Link>
        <div className="absolute top-6 right-6 lg:top-10 lg:right-10 z-20">
          <Link
            href="/"
            className="flex bg-white dark:bg-[#1E1915] items-center gap-2 px-4 py-2 rounded-full font-bold text-[#9C8C84] hover:text-[#FF9E75] hover:bg-[#F5EFE8] dark:text-[#887A72] dark:hover:text-[#E6DCD5] dark:hover:bg-[#1E1915] transition-all"
          >
            <Home size={20} />

            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>

        <motion.div
          className="w-full max-w-md my-auto pt-10 lg:pt-0"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {/* Header */}
          <div className="mb-8 text-center lg:text-left py-4">
            {/* <div className="w-16 h-16 bg-[#FFF0E6] dark:bg-[#1E1915] rounded-[1.5rem] flex items-center justify-center text-[#FF9E75] mb-6 shadow-sm mx-auto lg:mx-0">
              <LogIn size={20} strokeWidth={3} />
            </div> */}
            <h2 className={`text-4xl ${textHeading} mb-3`}>Welcome Back!</h2>
            <p className={`text-lg ${textBody}`}>
              Sign in to manage your wallet and view orders.
            </p>
          </div>

          {/* 1. GOOGLE LOGIN (PRIORITY) */}
          <div className="mb-8">
            <GoogleLoginButton
              intent="login"
              text="Sign In With Google"
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>

          {/* 2. DIVIDER */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5DCD5] dark:border-[#2C2420]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#FFFBF7] dark:bg-[#120F0D] px-4 font-black uppercase tracking-widest text-[#D6C6BA] dark:text-[#5C4D45]">
                Or via email
              </span>
            </div>
          </div>

          {/* 3. EMAIL FORM */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6"
            >
              <Alert
                variant="destructive"
                className="bg-[#FFF0F0] dark:bg-[#2C1515] border-none text-[#FF6B6B] dark:text-[#FF8080] rounded-[1rem] flex items-center p-4"
              >
                <AlertCircle size={20} className="mr-3 shrink-0" />
                <AlertDescription className="font-bold text-sm">
                  {error}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                className={`block text-xs font-black uppercase tracking-wide ml-1 ${textBody}`}
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-5 pr-5 py-5 text-base ${clayInset}`}
                  placeholder="name@college.edu"
                  required
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[#D6C6BA] pointer-events-none">
                  <Mail size={18} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
              <label
                className={`block text-xs font-black uppercase tracking-wide ${textBody}`}
                htmlFor="password"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-black text-[#FF9E75] hover:underline dark:text-primary"
              >
                Forgot Password?
              </Link>
              </div>
              <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-5 py-5 text-base ${clayInset}`}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute cursor-pointer right-5 top-1/2 -translate-y-1/2 text-[#D6C6BA] dark:text-[#B0A69E] focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                <EyeOff size={18} />
                ) : (
                <Eye size={18} />
                )}
              </button>
              </div>
            </div>

            <Button
              type="submit"
              className={`w-full h-16 rounded-[1.2rem] text-lg font-black uppercase tracking-wide flex items-center justify-center gap-2 group ${clayBtnPrimary}`}
              disabled={isLoading}
            >
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  Sign In{" "}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </Button>
          </form>

          <div className="text-center mt-10">
            <span className={`text-base ${textBody}`}>
              New to Byte?{" "}
              <Link
                href="/register"
                className="text-[#FF9E75] font-black hover:underline dark:text-primary ml-1"
              >
                Create an account
              </Link>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
