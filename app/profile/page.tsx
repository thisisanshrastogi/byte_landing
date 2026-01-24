"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  User,
  ShieldCheck,
  Loader2,
  Info,
  Eye,
  EyeOff,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axi from "@/lib/axi";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  // --- STATES ---
  const [name, setName] = useState(user?.data.name || "");

  // Password States
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Visibility Toggles
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Loading & Feedback
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPass, setLoadingPass] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const router = useRouter();

  // --- CLAY TOKENS ---
  // A sleek, single-column container style
  const clayCard =
    "bg-[#FFFBF7] dark:bg-[#1E1915] rounded-[2rem] p-8 md:p-10 shadow-[8px_8px_20px_rgba(214,198,186,0.5),_-6px_-6px_20px_rgba(255,255,255,0.8)] dark:shadow-[8px_8px_20px_rgba(0,0,0,0.5),_-4px_-4px_12px_rgba(255,255,255,0.05)] border border-white dark:border-white/5 relative overflow-hidden mb-8";

  const clayInset =
    "bg-[#F5EFE8] shadow-[inset_3px_3px_6px_rgba(204,190,178,0.3),_inset_-3px_-3px_6px_rgba(255,255,255,0.8)] rounded-[1rem] border-none text-[#5C4D45] placeholder-[#B0A69E] focus:ring-0 focus:outline-none transition-all focus:shadow-[inset_4px_4px_8px_rgba(204,190,178,0.5),_inset_-4px_-4px_8px_rgba(255,255,255,1)] dark:bg-[#120F0D] dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8),_inset_-1px_-1px_2px_rgba(255,255,255,0.1)] dark:text-[#E6DCD5] dark:placeholder-[#5C4D45]";

  const clayBtnPrimary =
    "bg-[#FF9E75] dark:bg-primary text-white shadow-[4px_4px_8px_rgba(255,158,117,0.4),_-2px_-2px_4px_rgba(255,255,255,0.4)] hover:bg-[#FF9E75]/90 hover:shadow-lg active:translate-y-[1px] active:shadow-none transition-all  dark:text-[#2C2420] dark:shadow-[4px_4px_8px_rgba(0,0,0,0.4),_-2px_-2px_6px_rgba(255,255,255,0.05)]";

  const textHeading =
    "text-[#5C4D45] dark:text-[#F5EFE8] font-black tracking-tight";
  const textBody = "text-[#9C8C84] dark:text-[#D6C6BA] font-bold";

  // --- HANDLERS ---
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingProfile(true);
    setMessage(null);

    try {
      await axi.post("/auth/change-name", {
        new_name: name,
      });

      await axi.post("/auth/refresh");
      window.location.reload();
    } catch (error) {
      setLoadingProfile(false);
      setMessage({
        type: "error",
        text: "Failed to update profile. Please try again.",
      });
    }
    setLoadingProfile(false);
    setMessage({ type: "success", text: "Profile details updated." });
    router.refresh();
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    setLoadingPass(true);

    // send request to backend to update password

    try {
      await axi.post("/auth/change-password", {
        old_password: oldPassword,
        new_password: newPassword,
      });
      setMessage({ type: "success", text: "Password changed successfully." });
      router.push("/");
    } catch (error) {
      setLoadingPass(false);
      setMessage({
        type: "error",
        text: "Failed to change password. Please check your current password.",
      });
      return;
    } finally {
      setLoadingPass(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  useEffect(() => {
    setName(user?.data.name || "");
  }, [user]);

  /* -------------------- Auth Guard -------------------- */
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-[#FFFBF7] dark:bg-[#050505] transition-colors duration-500 font-sans pb-20">
      <Navbar />

      <main className="pt-28 md:pt-36 px-4 md:px-8 max-w-3xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center md:text-left"
        >
          <h1 className={`text-4xl md:text-5xl ${textHeading} mb-2`}>
            Settings
          </h1>
          <p className={`text-lg ${textBody}`}>
            Update your personal details and security.
          </p>
        </motion.div>

        {/* Feedback Alert */}
        {message && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-8"
          >
            <Alert
              className={`${
                message.type === "success"
                  ? "bg-[#E6F4EA] text-[#34A853] border-[#CEEAD6]"
                  : "bg-[#FFF0F0] text-[#FF6B6B] border-[#FFE4E4]"
              } border-none rounded-[1.5rem] shadow-sm`}
            >
              <AlertDescription className="font-bold flex items-center gap-2">
                {message.type === "success" ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <Info size={18} />
                )}
                {message.text}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* --- SECTION 1: IDENTITY --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={clayCard}
        >
          <div className="flex flex-col md:flex-row gap-8 md:items-start">
            {/* Visual Avatar (Left Side) */}
            <div className="flex flex-col items-center gap-3 shrink-0 mx-auto md:mx-0">
              <div className="w-24 h-24 rounded-[1.5rem] bg-[#F5EFE8] dark:bg-[#120F0D] shadow-inner flex items-center justify-center text-4xl font-black text-[#D6C6BA] dark:text-[#5C4D45] select-none border-4 border-white dark:border-[#2C2420]">
                {name ? name.charAt(0).toUpperCase() : "U"}
              </div>
              <span className="text-[10px] font-black uppercase text-[#9C8C84] tracking-wider">
                Public Avatar
              </span>
            </div>

            {/* Form Area */}
            <form onSubmit={handleUpdateProfile} className="flex-1 space-y-6">
              <div className="space-y-2">
                <label
                  className={`text-xs font-black uppercase tracking-wide ml-1 ${textBody}`}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-5 py-4 text-base font-bold ${clayInset}`}
                  placeholder="Your Name"
                />
              </div>

              <div className="space-y-2 opacity-60 pointer-events-none select-none">
                <label
                  className={`text-xs font-black uppercase tracking-wide ml-1 ${textBody}`}
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={user?.data?.email || "user@college.edu"}
                    readOnly
                    className={`w-full pl-5 pr-10 py-4 text-base font-bold ${clayInset}`}
                  />
                  <Mail
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#D6C6BA]"
                    size={18}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  disabled={loadingProfile}
                  className={`rounded-[1rem] font-bold px-8 h-12 ${clayBtnPrimary}`}
                >
                  {loadingProfile ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Save Profile"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* --- SECTION 2: SECURITY --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={clayCard}
        >
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#F5EFE8] dark:border-white/5">
            <div className="w-10 h-10 rounded-[1rem] bg-[#FFF0E6] dark:bg-[#2C2420] flex items-center justify-center text-[#FF9E75] shadow-sm">
              <ShieldCheck size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className={`text-xl ${textHeading}`}>Change Password</h2>
            </div>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-6">
            {/* Old Password */}
            <div className="space-y-2">
              <label
                className={`text-xs font-black uppercase tracking-wide ml-1 ${textBody}`}
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showOld ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className={`w-full px-5 py-4 text-base font-bold ${clayInset} pr-12`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D6C6BA] hover:text-[#FF9E75] transition-colors p-1"
                >
                  {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* The Hint */}
              <div className="flex items-start gap-2 p-4 bg-[#F5EFE8]/50 dark:bg-white/5  rounded-xl mt-2 border border-white/50 dark:border-white/5">
                <Info size={14} className="text-[#FF9E75] shrink-0" />
                <p className="text-xs font-bold text-[#9C8C84] dark:text-[#888] leading-tight">
                  Leaving "Current Password" empty allows you to set a password
                  if you logged in via Google.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* New Password */}
              <div className="space-y-2">
                <label
                  className={`text-xs font-black uppercase tracking-wide ml-1 ${textBody}`}
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`w-full px-5 py-4 text-base font-bold ${clayInset} pr-10`}
                    placeholder="Min 8 chars"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D6C6BA] hover:text-[#FF9E75] transition-colors p-1"
                  >
                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label
                  className={`text-xs font-black uppercase tracking-wide ml-1 ${textBody}`}
                >
                  Confirm New
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full px-5 py-4 text-base font-bold ${clayInset} pr-10`}
                    placeholder="Repeat"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D6C6BA] hover:text-[#FF9E75] transition-colors p-1"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={loadingPass || !newPassword}
                className={`rounded-[1rem] font-bold px-8 h-12 ${clayBtnPrimary}`}
              >
                {loadingPass ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Update Password"
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
