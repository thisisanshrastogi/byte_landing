"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { Rocket, Lock, Ticket, Star, CheckCircle2 } from "lucide-react";
// import axi from "@/lib/axi"; // Keep your imports
// import { useGoogleLogin } from "@react-oauth/google"; // Keep your imports
import GoogleLoginButton from "@/components/googleLoginButton";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  // --- CLAY TOKENS ---
  // Updated for better dark mode visibility
  const clayInset =
    "bg-[#F5EFE8] shadow-[inset_4px_4px_8px_rgba(204,190,178,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-[1rem] border-none text-[#5C4D45] placeholder-[#B0A69E] focus:ring-0 focus:outline-none transition-all focus:shadow-[inset_6px_6px_12px_rgba(204,190,178,0.6),_inset_-6px_-6px_12px_rgba(255,255,255,1)] dark:bg-[#1E1915] dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4),_inset_-2px_-2px_4px_rgba(255,255,255,0.05)] dark:text-[#E6DCD5] dark:placeholder-[#5C4D45]";

  const clayBtnSecondary =
    "bg-white text-[#5C4D45] shadow-[6px_6px_12px_rgba(214,198,186,0.5),_-2px_-2px_6px_rgba(255,255,255,0.8)] hover:bg-[#F5EFE8] hover:shadow-lg active:translate-y-[2px] active:shadow-none transition-all dark:bg-[#2C2420] dark:text-[#E6DCD5] dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),_-2px_-2px_6px_rgba(255,255,255,0.05)] dark:hover:bg-[#362D28]";

  const clayBtnPrimary =
    "bg-[#FF9E75] text-white shadow-[6px_6px_12px_rgba(255,158,117,0.4),_-2px_-2px_6px_rgba(255,255,255,0.4)] hover:bg-[#FF9E75]/90 hover:shadow-lg active:translate-y-[2px] active:shadow-none transition-all dark:bg-primary dark:text-[#2C2420] dark:shadow-[6px_6px_12px_rgba(0,0,0,0.4),_-2px_-2px_6px_rgba(255,255,255,0.05)]";

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

  return (
    <div className="min-h-screen flex bg-[#FFFBF7] dark:bg-[#120F0D] selection:bg-orange-100 dark:selection:bg-primary/30 font-sans overflow-hidden transition-colors duration-500">
      {/* ---------------- LEFT SIDE: VISUAL SHOWCASE ---------------- */}
      <div className="hidden lg:flex w-1/2 relative bg-[#FFF0E6] dark:bg-[#181411] flex-col justify-between p-12 lg:p-20 overflow-hidden transition-colors duration-500 border-r border-[#EBE0D6] dark:border-[#2C2420]">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-15%] left-[-15%] w-[600px] h-[600px] bg-[#FF9E75]/15 dark:bg-[#FF9E75]/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -30, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FFD166]/15 dark:bg-[#FF9E75]/5 rounded-full blur-3xl"
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
        <div className="relative z-10 mt-6 max-w-lg">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-[#2C2420]/60 backdrop-blur-sm border border-white/40 dark:border-[#3E342F] rounded-full mb-8 text-[#FF9E75] dark:text-primary font-black text-xs uppercase tracking-wide shadow-sm">
              <Rocket size={14} fill="currentColor" /> Join the Revolution
            </div>

            {/* Headline */}
            <h1 className="text-6xl font-black text-[#5C4D45] dark:text-[#F5EFE8] mb-6 leading-[1.1] tracking-tight drop-shadow-sm">
              Your hunger,
              <br />
              <span className="text-[#FF9E75] dark:text-primary drop-shadow-[0_4px_20px_rgba(255,158,117,0.3)]">
                on your schedule.
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-[#9C8C84] dark:text-[#B0A69E] font-bold leading-relaxed mb-8">
              Create an account to join the exclusive closed beta, track your
              orders in real-time, and experience the future of campus dining.
            </p>

            {/* Visual Trust Badge */}
            <div className="flex items-center gap-3 bg-white/50 dark:bg-[#2C2420]/40 backdrop-blur-md p-4 rounded-[1.5rem] w-fit border border-white/20 dark:border-[#3E342F]">
              <div className="w-10 h-10 bg-[#FF9E75] dark:bg-primary rounded-full flex items-center justify-center text-white shadow-lg dark:shadow-[0_0_15px_rgba(255,158,117,0.2)]">
                <Star size={20} fill="currentColor" />
              </div>
              <div>
                <p className="text-xs font-black uppercase text-[#9C8C84] dark:text-[#887A72]">
                  Beta Access
                </p>
                <p className="text-sm font-black text-[#5C4D45] dark:text-[#E6DCD5]">
                  Priority Status Unlocked
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-4">
          <p className="text-sm font-bold text-[#9C8C84] dark:text-[#5C4D45]">
            © 2026 Byte Technologies
          </p>
        </div>
      </div>

      {/* ---------------- RIGHT SIDE: DYNAMIC CONTENT ---------------- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-24 relative overflow-y-auto bg-[#FFFBF7] dark:bg-[#120F0D] transition-colors duration-500">
        <motion.div
          className="w-full max-w-md my-auto"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <>
            <div className="mb-10 text-center lg:text-left">
              <div className="w-16 h-16 bg-[#FFF0E6] dark:bg-[#1E1915] rounded-[1.5rem] flex items-center justify-center text-[#FF9E75] mb-6 shadow-sm mx-auto lg:mx-0">
                <Ticket size={32} strokeWidth={3} />
              </div>
              <h2 className={`text-4xl ${textHeading} mb-3`}>
                Let's get started
              </h2>
              <p className={`text-lg ${textBody}`}>
                Sign up with Google to create your account instantly.
              </p>
            </div>

            {/* Verified Token Badge */}
            {/* <div className="bg-[#E6F4EA] dark:bg-[#132619] border border-[#CEEAD6] dark:border-[#1E3A27] p-4 rounded-[1rem] mb-8 flex items-center gap-3">
              <CheckCircle2
                size={20}
                className="text-[#34A853] dark:text-[#4ADE80]"
              />
              <span className="text-sm font-bold text-[#34A853] dark:text-[#4ADE80]">
                Invite code applied successfully
              </span>
            </div> */}

            <GoogleLoginButton
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            <div className="text-center mt-8">
              <span className={`text-base ${textBody}`}>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#FF9E75] font-black hover:underline ml-1"
                >
                  Sign in
                </Link>
              </span>
            </div>
          </>
        </motion.div>
      </div>
    </div>
  );
}
