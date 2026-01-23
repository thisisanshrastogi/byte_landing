"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Smartphone,
  ArrowRight,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";
import axi from "@/lib/axi";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function VerifyPhonePage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // --- CLAY TOKENS ---
  const clayInset =
    "bg-[#F5EFE8] shadow-[inset_4px_4px_8px_rgba(204,190,178,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-[1rem] border-none text-[#5C4D45] placeholder-[#B0A69E] focus:ring-0 focus:outline-none transition-all focus:shadow-[inset_6px_6px_12px_rgba(204,190,178,0.6),_inset_-6px_-6px_12px_rgba(255,255,255,1)] dark:bg-muted dark:shadow-none dark:text-foreground";
  const clayBtnPrimary =
    "bg-[#FF9E75] text-white shadow-[6px_6px_12px_rgba(255,158,117,0.4),_-2px_-2px_6px_rgba(255,255,255,0.4)] hover:bg-[#FF9E75]/90 hover:shadow-lg active:translate-y-[2px] active:shadow-none transition-all dark:bg-primary dark:text-primary-foreground dark:shadow-none";
  const textHeading =
    "text-[#5C4D45] dark:text-foreground font-black tracking-tight";
  const textBody = "text-[#9C8C84] dark:text-muted-foreground font-bold";

  const validatePhoneNumber = (number: string) => {
    if (number.length !== 10) return false;
    if (!/^\d{10}$/.test(number)) return false;

    return true; // Indian phone number length
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhoneNumber(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    const inPhoneNumber = "+91" + phoneNumber; // Append country code for India

    setIsLoading(true);
    try {
      const resp = await axi.post("/auth/send-otp", {
        phone_number: inPhoneNumber,
      });
      // TODO: Call API to send OTP to `phoneNumber`
      setError(null);
      setIsLoading(false);
      setStep("otp");
    } catch (error) {
      setIsLoading(false);
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resp = await axi.post("/auth/verify-otp", {
        otp: otp,
      });

      await axi.post("/auth/refresh");
      router.push("/");
    } catch (error) {
      setIsLoading(false);
      setError("Failed to verify OTP. Please try again.");
      return;
    }
    setIsLoading(false);
  };

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
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#FF9E75]">
              <ShieldCheck size={24} />
            </div>
            <span>No spam. Ever.</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-24 relative">
        <div className="w-full max-w-md">
          <div className="w-16 h-16 bg-[#F5EFE8] rounded-[1.5rem] flex items-center justify-center text-[#FF9E75] mb-6 shadow-inner">
            <Smartphone size={32} strokeWidth={2.5} />
          </div>

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

                <form onSubmit={handleSendOtp} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      className={`block text-xs font-black uppercase tracking-wide ml-1 ${textBody}`}
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className={`w-full px-5 py-5 text-base ${clayInset}`}
                      placeholder="Enter 10-digit number"
                      required
                    />
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
                  We sent a verification code to <strong>{phoneNumber}</strong>.
                </p>
                <div className="text-accent-foreground/70 text-center m-4 text-md">
                  {" "}
                  The Default OTP is 123456
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
                      onChange={(e) => setOtp(e.target.value)}
                      className={`w-full px-5 py-5 text-xl tracking-[0.5em] text-center font-black ${clayInset}`}
                      placeholder="000000"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading || otp.length < 4}
                    className={`w-full h-16 rounded-[1.2rem] text-lg font-black uppercase tracking-wide ${clayBtnPrimary}`}
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Verify & Finish"
                    )}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setStep("phone")}
                    className="w-full text-center text-sm font-bold text-[#9C8C84] hover:text-[#FF9E75] mt-4"
                  >
                    Change phone number
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
