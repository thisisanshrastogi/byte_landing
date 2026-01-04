"use client";

import type React from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/auth-context"; // Assuming you have a resetPassword method here
import { motion, Variants } from "framer-motion";
import {
  KeyRound,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function ResetClient() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // If you don't have this in your context yet, you can mock it or add it
  const { resetPassword } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  // --- CLAY TOKENS (Identical to Register Page) ---
  const clayInset =
    "bg-[#F5EFE8] shadow-[inset_4px_4px_8px_rgba(204,190,178,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-[1rem] border-none text-[#5C4D45] placeholder-[#B0A69E] focus:ring-0 focus:outline-none transition-all focus:shadow-[inset_6px_6px_12px_rgba(204,190,178,0.6),_inset_-6px_-6px_12px_rgba(255,255,255,1)] dark:bg-muted dark:shadow-none dark:text-foreground";
  const clayBtnPrimary =
    "bg-[#FF9E75] text-white shadow-[6px_6px_12px_rgba(255,158,117,0.4),_-2px_-2px_6px_rgba(255,255,255,0.4)] hover:bg-[#FF9E75]/90 hover:shadow-lg active:translate-y-[2px] active:shadow-none transition-all dark:bg-primary dark:text-primary-foreground dark:shadow-none";
  const clayBtnSecondary =
    "bg-white text-[#5C4D45] shadow-[6px_6px_12px_rgba(214,198,186,0.5),_-2px_-2px_6px_rgba(255,255,255,0.8)] hover:bg-[#F5EFE8] hover:shadow-lg active:translate-y-[2px] active:shadow-none transition-all dark:bg-secondary dark:text-secondary-foreground dark:shadow-none";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!token) {
      setError("Invalid reset token.");
      setIsLoading(false);
      return;
    }

    try {
      // Replace with your actual API call
      // await resetPassword(token, password);
      const success = await resetPassword(token, password);

      if (!success) {
        throw new Error("Password reset failed");
      }

      setSuccess(true);
    } catch (error) {
      setError("Failed to reset password. Please request a new link.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FFFBF7] dark:bg-background selection:bg-orange-100 dark:selection:bg-primary/30 font-sans overflow-hidden">
      {/* ---------------- LEFT SIDE: VISUAL SHOWCASE ---------------- */}

      {/* ---------------- LEFT SIDE: VISUAL SHOWCASE (IMPROVED) ---------------- */}
      <div className="hidden lg:flex w-1/2 relative bg-[#FFF0E6] dark:bg-primary/5 flex-col p-12 lg:p-20 overflow-hidden isolate">
        {/* Animated Background Blobs (Softened) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <motion.div
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-gradient-to-br from-[#FF9E75]/20 to-[#FFD166]/20 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -40, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#5C4D45]/5 rounded-full blur-[80px]"
          />
        </div>

        {/* 1. Header / Logo Area - Strictly Aligned Top */}
        <div className="flex-none h-20 flex items-center">
          <Link
            href="/"
            className="flex items-center gap-3 text-2xl font-black text-[#5C4D45] dark:text-foreground group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FF9E75] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="w-3 h-3 bg-white rounded-full"></span>
            </div>
            Byte
          </Link>
        </div>

        {/* 2. Center Content - Anchored in a Glass Card */}
        <div className="flex-1 flex flex-col justify-center max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-white/50 dark:border-white/10 p-10 rounded-[2.5rem] shadow-[0_8px_32px_rgba(92,77,69,0.05)]"
          >
            {/* Visual Icon Composition */}
            <div className="mb-8 relative w-20 h-20">
              <div className="absolute inset-0 bg-[#FF9E75] rounded-2xl rotate-6 opacity-20"></div>
              <div className="absolute inset-0 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#FF9E75]">
                <ShieldCheck size={40} strokeWidth={2} />
              </div>
              <div className="absolute -top-2 -right-2 bg-[#5C4D45] text-white p-2 rounded-full shadow-md">
                <Lock size={14} />
              </div>
            </div>

            <h1 className="text-5xl font-black text-[#5C4D45] dark:text-foreground mb-6 leading-[1.1] tracking-tight">
              Fortify your
              <br />
              <span className="text-[#FF9E75]">digital slice.</span>
            </h1>

            <p className="text-lg text-[#8A7A73] font-medium leading-relaxed mb-8">
              A strong password is the best ingredient for a secure account.
              Update your credentials to get back to ordering in seconds.
            </p>

            {/* Security Features List */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#4CAF50]">
                  <CheckCircle2 size={14} strokeWidth={4} />
                </div>
                <span className="text-sm font-bold text-[#5C4D45]/80">
                  End-to-end encryption
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#4CAF50]">
                  <CheckCircle2 size={14} strokeWidth={4} />
                </div>
                <span className="text-sm font-bold text-[#5C4D45]/80">
                  Secure session management
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3. Footer Area - Strictly Aligned Bottom */}
        <div className="flex-none h-20 flex items-end">
          <div className="flex items-center gap-2 text-sm font-bold text-[#9C8C84]">
            <span>© 2026 Byte Technologies</span>
            <span className="w-1 h-1 rounded-full bg-[#FF9E75]"></span>
            <span>Security Team</span>
          </div>
        </div>
      </div>

      {/* ---------------- RIGHT SIDE: DYNAMIC CONTENT ---------------- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-24 relative overflow-y-auto">
        <div className="absolute top-6 right-6 lg:hidden">
          <Link
            href="/"
            className="text-sm font-black text-[#9C8C84] hover:text-[#FF9E75]"
          >
            Home
          </Link>
        </div>

        <motion.div
          className="w-full max-w-md my-auto"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {token ? (
            !success ? (
              /* --- STATE 1: FORM INPUT --- */
              <>
                <div className="mb-10">
                  <div className="w-16 h-16 bg-[#FFF0E6] rounded-[1.5rem] flex items-center justify-center text-[#FF9E75] dark:bg-primary/10 dark:text-primary mb-6 shadow-sm">
                    <KeyRound size={32} strokeWidth={3} />
                  </div>
                  <h2 className={`text-4xl ${textHeading} mb-3`}>
                    Reset Password
                  </h2>
                  <p className={`text-lg ${textBody}`}>
                    Enter your new password below.
                  </p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8"
                  >
                    <Alert
                      variant="destructive"
                      className="bg-[#FFF0F0] border-none text-[#FF6B6B] rounded-[1rem] flex items-center p-4"
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
                      htmlFor="password"
                    >
                      New Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full px-5 py-5 text-base ${clayInset}`}
                      placeholder="••••••••"
                      required
                      minLength={8}
                    />
                  </div>

                  <Button
                    type="submit"
                    className={`w-full h-16 rounded-[1.2rem] text-lg font-black uppercase tracking-wide flex items-center justify-center gap-2 group ${clayBtnPrimary}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Updating..."
                    ) : (
                      <>
                        Update Password{" "}
                        <ArrowRight
                          size={20}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </Button>
                </form>

                <div className="text-center mt-10">
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="text-[#9C8C84] font-bold hover:text-[#FF9E75] hover:bg-transparent"
                    >
                      Cancel and return to login
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              /* --- STATE 2: SUCCESS --- */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-[#E8F5E9] rounded-[2rem] flex items-center justify-center text-[#4CAF50] mb-8 shadow-inner mx-auto">
                  <CheckCircle2 size={40} strokeWidth={3} />
                </div>

                <h2 className={`text-4xl ${textHeading} mb-4`}>All Set!</h2>
                <p className={`text-lg ${textBody} mb-8`}>
                  Your password has been successfully updated. You can now log
                  in with your new credentials.
                </p>

                <Link href="/login">
                  <Button
                    className={`w-full h-16 rounded-[1.2rem] text-base font-black uppercase tracking-wide flex items-center justify-center gap-2 group ${clayBtnPrimary}`}
                  >
                    Proceed to Login <ArrowRight size={20} />
                  </Button>
                </Link>
              </motion.div>
            )
          ) : (
            /* --- STATE 3: INVALID/MISSING TOKEN --- */
            <div className="text-center">
              <div className="w-20 h-20 bg-[#F5EFE8] dark:bg-secondary rounded-[2rem] flex items-center justify-center text-[#9C8C84] dark:text-muted-foreground mb-8 shadow-inner mx-auto">
                <AlertCircle size={40} strokeWidth={2.5} />
              </div>

              <h2 className={`text-4xl ${textHeading} mb-4`}>Link Expired</h2>

              <p className={`text-lg ${textBody} mb-8 leading-relaxed`}>
                This password reset link is invalid. Please request a new one.
              </p>

              <Link href="/forgot-password">
                <Button
                  className={`w-full h-16 rounded-[1.2rem] text-base font-black uppercase tracking-wide flex items-center justify-center gap-2 ${clayBtnSecondary}`}
                >
                  Request New Link
                </Button>
              </Link>

              <div className="mt-4">
                <Link
                  href="/login"
                  className="text-sm font-bold text-[#9C8C84] hover:text-[#FF9E75]"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
