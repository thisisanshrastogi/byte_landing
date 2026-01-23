"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import axi from "@/lib/axi";

export default function AuthCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("Verifying your identity...");

  useEffect(() => {
    if (!code) {
      setStatus("error");
      setMessage("No code provided. Redirecting to login...");
      setTimeout(() => router.push("/login"), 1500);
      return;
    }
    const handleAuth = async () => {
      if (!code) {
        setStatus("error");
        setMessage("Authentication failed. No code provided.");
        return;
      }

      try {
        // REAL BACKEND CALL
        // const res = await fetch("http://localhost:8080/auth/google/exchange", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   credentials: "include", // IMPORTANT (for cookies)
        //   body: JSON.stringify({ code }),
        // });
        const res = await axi.post("/auth/google/exchange", { code });
        if (res.status !== 200) throw new Error("Auth failed");

        const data = res.data;

        /**
         * Backend should return something like:
         * {
         *   "phone_verified": true/false
         * }
         */
        console.log("Auth response data:", data);

        // setMessage("Successfully signed in!");
        // setTimeout(() => router.push("/"), 800);

        setMessage("Checking Phone number ...");
        setTimeout(() => router.push("/"), 800);
      } catch (err) {
        console.error(err);
        setStatus("error");
        setMessage("Something went wrong. Redirecting to login...");
        setTimeout(() => router.push("/login"), 1500);
      }
    };

    handleAuth();
  }, [code]);

  const textHeading =
    "text-[#5C4D45] dark:text-foreground font-black tracking-tight";
  const textBody = "text-[#9C8C84] dark:text-muted-foreground font-bold";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FFFBF7] dark:bg-background relative overflow-hidden">
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
