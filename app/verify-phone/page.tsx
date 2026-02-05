"use client";

import type React from "react";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Smartphone,
  ShieldCheck,
  Loader2,
  AlertCircle,
  Timer,
  RefreshCcw,
  ArrowLeft,
  MessageSquareText,
  Home,
} from "lucide-react";
import axi from "@/lib/axi";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/auth-context";

export default function VerifyPhonePage() {
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- STATE VARIABLES ---
  const [timeLeft, setTimeLeft] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(3);

  const router = useRouter();
  const { user, loading } = useAuth();

  // --- CLAY TOKENS ---
  const clayInset =
    "bg-[#F5EFE8] shadow-[inset_4px_4px_8px_rgba(204,190,178,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-[1rem] border-none text-[#5C4D45] placeholder-[#B0A69E] focus:ring-0 focus:outline-none transition-all focus:shadow-[inset_6px_6px_12px_rgba(204,190,178,0.6),_inset_-6px_-6px_12px_rgba(255,255,255,1)] dark:bg-muted dark:shadow-none dark:text-foreground";
  const clayBtnPrimary =
    "bg-[#FF9E75] text-white shadow-[6px_6px_12px_rgba(255,158,117,0.4),_-2px_-2px_6px_rgba(255,255,255,0.4)] hover:bg-[#FF9E75]/90 hover:shadow-lg active:translate-y-[2px] active:shadow-none transition-all dark:bg-primary dark:text-primary-foreground dark:shadow-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none";
  const textHeading =
    "text-[#5C4D45] dark:text-foreground font-black tracking-tight";
  const textBody = "text-[#9C8C84] dark:text-muted-foreground font-bold";

  // --- 1. CORE SYNC FUNCTION ---
  const fetchOtpInfo = useCallback(async () => {
    try {
      const resp = await axi.get("/auth/otp-info");
      const { phone_number, reattempt_time, attempts_left } = resp.data;

      if (typeof attempts_left === "number") {
        setAttemptsLeft(attempts_left);
      }

      // Sync Timer Logic
      if (reattempt_time) {
        const reattemptDate = new Date(reattempt_time);
        const now = new Date();
        const diffInSeconds = Math.ceil(
          (reattemptDate.getTime() - now.getTime()) / 1000,
        );

        // If server time is in the future, set it. Otherwise 0.
        setTimeLeft(diffInSeconds > 0 ? diffInSeconds : 0);
      } else {
        // If server sends nothing, assume 0 (allow resend)
        // Note: We don't force 0 here if we just set it optimistically,
        // but usually server is authority.
      }

      if (phone_number) {
        const rawNumber = phone_number.replace("+91", "");
        setPhoneNumber(rawNumber);
        setStep("otp");
      } else {
        setStep("phone");
      }
    } catch (err) {
      console.error("Failed to sync OTP state:", err);
      // On network error, don't change step, just stop loading
    } finally {
      setCheckingStatus(false);
    }
  }, []);

  // --- 2. INITIAL MOUNT ---
  useEffect(() => {
    fetchOtpInfo();
  }, [fetchOtpInfo]);

  // --- 3. LOCAL TIMER TICK ---
  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const validatePhoneNumber = (number: string) => {
    return /^\d{10}$/.test(number);
  };

  // --- 4. SEND OTP ---
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhoneNumber(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await axi.post("/auth/send-otp", {
        phone_number: "+91" + phoneNumber,
      });

      // OPTIMISTIC UPDATE:
      // Instantly show timer (2 mins) while background fetch confirms exact server time
      setTimeLeft(120);
      setStep("otp");

      // Background Sync
      await fetchOtpInfo();
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to send OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- 5. RESEND OTP ---
  const handleResendOtp = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await axi.post("/auth/send-otp", {
        phone_number: "+91" + phoneNumber,
      });

      // OPTIMISTIC UPDATE
      setTimeLeft(120);
      setOtp("");
      setAttemptsLeft(3); // Reset attempts locally for UX

      // Background Sync
      await fetchOtpInfo();
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to resend OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeNumber = () => {
    setStep("phone");
    setOtp("");
    setError(null);
    setAttemptsLeft(3);
    setTimeLeft(0);
  };

  // --- 6. VERIFY OTP ---
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (attemptsLeft <= 0) {
      setError("Max attempts reached. Please wait for the timer to resend.");
      return;
    }

    setIsLoading(true);
    try {
      await axi.post("/auth/verify-otp", {
        otp: otp,
      });

      await axi.post("/auth/refresh");
      router.push("/");
    } catch (error: any) {
      setIsLoading(false);
      setOtp("");
      setError(error?.response?.data?.error || "Please try again.");

      // Re-fetch to update attempts from server
      await fetchOtpInfo();
    }
  };

  /* -------------------- Auth Guard -------------------- */
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (!loading && user && user.data.phone_verified) {
      router.push("/");
    }
  }, [user, loading, router]);

  // /me to check

  if (checkingStatus || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBF7]">
        <Loader2 className="w-10 h-10 text-[#FF9E75] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#FFFBF7] dark:bg-background font-sans overflow-hidden">
      {/* LEFT SIDE: CONTEXT */}
      <div className="hidden lg:flex w-1/2 relative bg-[#FFF0E6] dark:bg-primary/5 flex-col justify-center p-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="absolute -right-20 -top-20 w-[600px] h-[600px] border-[60px] border-[#FF9E75]/10 rounded-full border-dashed"
          />
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-black text-[#5C4D45] dark:text-foreground mb-6 leading-tight">
            Secure your
            <br /> <span className="text-[#FF9E75]">Dining Experience.</span>
          </h1>
          <p className="text-xl text-[#9C8C84] font-bold leading-relaxed mb-8">
            We use your phone number to update you on order status and ensure
            real students are using the platform.
          </p>
          <div className="flex items-center gap-4 text-[#5C4D45] font-black">
            <div className="w-12 h-12 bg-white dark:bg-transparent rounded-2xl flex items-center justify-center shadow-sm text-[#FF9E75]">
              <ShieldCheck size={24} />
            </div>
            <span>No spam. Ever.</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12 relative">
        <div className="w-full max-w-md h-full py-10 mt-5 lg:mt-10">
          <div className="absolute top-6 right-6 lg:top-10 lg:right-10 z-20">
            <Link
              href="/"
              className="flex bg-white dark:bg-[#1E1915] items-center gap-2 px-4 py-2 rounded-full font-bold text-[#9C8C84] hover:text-[#FF9E75] hover:bg-[#F5EFE8] dark:text-[#887A72] dark:hover:text-[#E6DCD5] dark:hover:bg-[#1E1915] transition-all"
            >
              <Home size={20} />

              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>
          {/* <div className="w-16 h-16 bg-[#F5EFE8] rounded-[1.5rem] flex items-center justify-center text-[#FF9E75] mb-6 shadow-inner">
            <Smartphone size={32} strokeWidth={2.5} />
          </div> */}

          <AnimatePresence mode="wait">
            {step === "phone" ? (
              <motion.div
                key="phone-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className={`text-4xl ${textHeading} mb-3`}>
                  Add Phone Number
                </h2>
                <p className={`text-lg ${textBody} mb-8`}>
                  Please enter your mobile number to verify your account.
                </p>
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

                <form onSubmit={handleSendOtp} className="space-y-6 ">
                  <div className="space-y-2">
                    <label
                      className={`block text-xs font-black uppercase tracking-wide ml-1 ${textBody}`}
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <div
                        className={`${clayInset}  flex items-center justify-center px-4 font-black text-accent-foreground`}
                      >
                        +91
                      </div>
                      <input
                        id="phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          if (val.length <= 10) setPhoneNumber(val);
                        }}
                        className={`flex-1 px-5 py-5 text-base ${clayInset}`}
                        placeholder="00000-00000"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading || phoneNumber.length < 5}
                    className={`w-full h-16 rounded-[1.2rem] text-lg font-black uppercase tracking-wide ${clayBtnPrimary}`}
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Send Code"
                    )}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className={`text-4xl ${textHeading} mb-3`}>Enter Code</h2>
                <p className={`text-lg ${textBody} mb-8`}>
                  We sent a verification code to{" "}
                  <strong>+91 {phoneNumber}</strong>.
                </p>
                {/* SENDER INFO ADDED HERE */}
                <div className="flex items-center gap-2 mb-8 text-sm text-[#9C8C84]/80 dark:text-foreground font-bold bg-white/50 dark:bg-transparent p-2 rounded-lg w-fit">
                  <MessageSquareText size={16} className="text-[#FF9E75]" />
                  <span>
                    Sender ID:{" "}
                    <span className="font-mono text-[#5C4D45] dark:text-foreground">
                      8559022055
                    </span>
                  </span>
                </div>

                {/* STATUS ALERT: Attempts or Error */}
                {(error || attemptsLeft < 3) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8"
                  >
                    <Alert
                      variant={attemptsLeft === 0 ? "destructive" : "default"}
                      className={`${attemptsLeft === 0 ? "bg-[#FFF0F0] text-[#FF6B6B]" : "bg-stone-100 text-[#5C4D45]"} border-none rounded-[1rem] flex items-center p-4`}
                    >
                      <AlertCircle size={20} className="mr-3 shrink-0" />
                      <AlertDescription className="font-bold text-sm">
                        {error ? error : ""}{" "}
                        {attemptsLeft > 0
                          ? `${attemptsLeft} attempts remaining.`
                          : "Please request a new code."}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      className={`block text-xs font-black uppercase tracking-wide ml-1 ${textBody}`}
                      htmlFor="otp"
                    >
                      One-Time Password
                    </label>
                    <input
                      id="otp"
                      type="text"
                      maxLength={6}
                      value={otp}
                      disabled={attemptsLeft <= 0}
                      onChange={(e) => setOtp(e.target.value)}
                      className={`w-full px-5 py-5 text-xl tracking-[0.5em] text-center font-black ${clayInset} ${attemptsLeft <= 0 ? "opacity-50" : ""}`}
                      placeholder="000000"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || otp.length < 4 || attemptsLeft <= 0}
                    className={`w-full h-16 rounded-[1.2rem] text-lg font-black uppercase tracking-wide ${clayBtnPrimary}`}
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Verify & Finish"
                    )}
                  </Button>

                  {/* TIMER AND CONTROLS */}
                  <div className="flex flex-col items-center justify-center gap-4 mt-6">
                    {timeLeft > 0 ? (
                      <div className="w-full flex flex-col items-center gap-3">
                        <div className="flex items-center gap-2 text-[#9C8C84] font-bold text-sm bg-stone-100 dark:bg-accent px-4 py-2 rounded-full shadow-inner">
                          <Timer size={16} />
                          <span>
                            Wait {formatTime(timeLeft)} to resend or change
                            number
                          </span>
                        </div>
                        {/* <button
                          type="button"
                          disabled
                          className="hover:cursor-pointer text-sm font-bold text-[#9C8C84]/40 cursor-not-allowed flex items-center gap-1"
                        >
                          <ArrowLeft size={14} /> Change Number
                        </button> */}
                      </div>
                    ) : (
                      <div className="flex w-full gap-4">
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          disabled={isLoading}
                          className="hover:cursor-pointer dark:bg-primary  flex-1 flex items-center justify-center gap-2 h-12 rounded-[1rem] text-sm font-bold text-white bg-[#FF9E75] hover:bg-[#FF9E75]/90 transition-all  active:translate-y-[1px] active:shadow-none"
                        >
                          <RefreshCcw size={16} />
                          Resend OTP
                        </button>
                        <button
                          type="button"
                          onClick={handleChangeNumber}
                          disabled={isLoading}
                          className="hover:cursor-pointer flex-1 flex items-center justify-center h-12 rounded-[1rem] text-sm font-bold text-[#9C8C84] bg-white border-2  border-[#F5EFE8] hover:border-[#FF9E75] hover:text-[#FF9E75] transition-all"
                        >
                          Change Number
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
