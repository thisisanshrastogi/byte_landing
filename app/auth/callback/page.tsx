"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("Verifying your identity...");

  useEffect(() => {
    const handleAuth = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state"); // often used for security or passing back the invite token

      if (!code) {
        setStatus("error");
        setMessage("Authentication failed. No code provided.");
        return;
      }

      try {
        // --- MOCK BACKEND CALL ---
        // Replace this with your actual fetch call
        // const res = await fetch('/api/auth/google/callback', { ... })

        // Simulating API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // SIMULATED LOGIC:
        // Case 1: Success (User exists, phone verified) -> status 200
        // Case 2: Success (User created/exists, BUT phone NOT verified) -> status 428 (Precondition Required) or custom field

        const mockResponseStatus: number = 428; // CHANGE THIS TO TEST DIFFERENT FLOWS

        if (mockResponseStatus === 200) {
          setStatus("success");
          setMessage("Successfully signed in!");
          setTimeout(() => router.push("/dashboard"), 800);
        } else if (mockResponseStatus === 428) {
          // Or whatever code your backend sends for "Phone Needed"
          setMessage("Phone number verification required.");
          setTimeout(() => router.push("/verify-phone"), 800);
        } else {
          throw new Error("Authentication failed");
        }
      } catch (error) {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
        setTimeout(() => router.push("/login"), 2000);
      }
    };

    handleAuth();
  }, [searchParams, router]);

  // --- STYLES ---
  const textHeading =
    "text-[#5C4D45] dark:text-foreground font-black tracking-tight";
  const textBody = "text-[#9C8C84] dark:text-muted-foreground font-bold";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FFFBF7] dark:bg-background relative overflow-hidden">
      {/* Background Blobs (Reused for consistency) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-[#FF9E75]/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-sm text-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-[#FFF0E6] rounded-[2rem] flex items-center justify-center text-[#FF9E75] shadow-lg mb-8"
        >
          {status === "loading" && (
            <Loader2 size={40} className="animate-spin" />
          )}
          {status === "success" && <CheckCircle size={40} />}
          {status === "error" && (
            <AlertCircle size={40} className="text-red-500" />
          )}
        </motion.div>

        <h2 className={`text-3xl ${textHeading} mb-4`}>
          {status === "loading"
            ? "Just a moment"
            : status === "success"
              ? "Welcome back!"
              : "Oops!"}
        </h2>

        <p className={`text-lg ${textBody}`}>{message}</p>
      </div>
    </div>
  );
}
