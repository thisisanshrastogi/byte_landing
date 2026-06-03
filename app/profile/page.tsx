"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, Variants } from "framer-motion";
import {
  User,
  ShieldCheck,
  Loader2,
  Info,
  Eye,
  EyeOff,
  Mail,
  CheckCircle2,
  Camera,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axi from "@/lib/axi";
import { useRouter } from "next/navigation";
import { BackgroundElements } from "@/components/background-element";
import { Footer } from "@/components/layout/footer";
import { THEME, CLAY } from "@/lib/design-tokens";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState(user?.data.name || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPass, setLoadingPass] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 16 },
    },
  };

  const inputClass = `w-full ${CLAY.color.inset} ${CLAY.shadow.inset} ${CLAY.shadowDark.inset} ${CLAY.radius.md} px-6 py-4 text-base border-none text-[#5C4D45] dark:text-white placeholder-[#B0A69E] focus:ring-2 focus:ring-[#FF9E75]/50 focus:outline-none transition-all`;
  const labelClass = `text-xs font-bold uppercase tracking-wider ml-1 ${THEME.textSoft}`;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingProfile(true);
    setMessage(null);
    try {
      await axi.post("/auth/change-name", { new_name: name });
      await axi.post("/auth/refresh");
      setMessage({ type: "success", text: "Profile details updated." });
      window.location.reload();
    } catch {
      setMessage({ type: "error", text: "Failed to update profile." });
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }
    setLoadingPass(true);
    try {
      await axi.post("/auth/change-password", {
        old_password: oldPassword,
        new_password: newPassword,
      });
      setMessage({ type: "success", text: "Password changed successfully." });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setMessage({ type: "error", text: "Failed to change password." });
    } finally {
      setLoadingPass(false);
    }
  };

  useEffect(() => {
    setName(user?.data.name || "");
  }, [user]);
  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <div className={`min-h-screen font-sans relative ${THEME.bg}`}>
      <Navbar />
      <BackgroundElements />

      <main className="relative z-10 container mx-auto px-4 py-20 mt-10 lg:py-24 max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center md:text-left mb-10">
            <h1 className={`text-4xl md:text-5xl font-black ${THEME.textDark} tracking-tight mb-2`}>
              Settings
            </h1>
            <p className={`text-lg ${THEME.textSoft}`}>
              Manage your identity and security.
            </p>
          </motion.div>

          {/* Feedback Alert */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6"
              >
                <Alert
                  className={`${
                    message.type === "success"
                      ? "bg-[#EAF8E6] text-[#4CAF50] dark:bg-transparent dark:text-[#81C784]"
                      : "bg-[#FFF0F0] text-[#FF6B6B] dark:bg-transparent dark:text-[#FF8080]"
                  } ${CLAY.radius.md} border-none shadow-sm transition-colors duration-300`}
                >
                  <AlertDescription className="font-bold flex items-center gap-2 uppercase text-xs tracking-wider">
                    {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    {message.text}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid md:grid-cols-1 gap-8">
            {/* Section 1: Identity */}
            <motion.div variants={itemVariants} className={`${THEME.card} ${CLAY.spacing.cardSmall}`}>
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#F5EFE8] dark:border-white/10">
                <div className={`w-12 h-12 ${CLAY.radius.sm} ${THEME.cardInset} flex items-center justify-center`}>
                  <User className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <h2 className={`text-2xl font-extrabold ${THEME.textDark} tracking-tight`}>Account Profile</h2>
              </div>

              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex flex-col items-center gap-4 shrink-0">
                  <div className={`w-32 h-32 ${CLAY.radius.lg} ${CLAY.color.inset} shadow-inner flex items-center justify-center text-5xl font-bold text-[#D6C6BA] dark:text-white/20 border-4 border-white dark:border-white/10 relative group`}>
                    {name ? name.charAt(0).toUpperCase() : "U"}
                    <div className={`absolute inset-0 bg-black/5 ${CLAY.radius.lg} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer`}>
                      <Camera className="text-white w-8 h-8" />
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase ${THEME.textSoft} tracking-[0.2em]`}>
                    Member
                  </span>
                </div>

                <form onSubmit={handleUpdateProfile} className="flex-1 space-y-6">
                  <div className="space-y-2">
                    <label className={labelClass}>Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="space-y-2 opacity-50">
                    <label className={labelClass}>Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={user?.data?.email}
                        readOnly
                        className={`${inputClass} pr-12 cursor-not-allowed`}
                      />
                      <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-[#9C8C84]" size={18} />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      disabled={loadingProfile}
                      className={`${THEME.btnPrimary} h-14 px-10 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2`}
                    >
                      {loadingProfile ? <Loader2 className="animate-spin" /> : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Section 2: Security */}
            <motion.div variants={itemVariants} className={`${THEME.card} ${CLAY.spacing.cardSmall}`}>
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#F5EFE8] dark:border-white/10">
                <div className={`w-12 h-12 ${CLAY.radius.sm} bg-[#5C4D45] dark:bg-white/10 flex items-center justify-center text-white dark:text-white/80`}>
                  <ShieldCheck className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <h2 className={`text-2xl font-extrabold ${THEME.textDark} tracking-tight`}>Security Settings</h2>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-6">
                <div className="space-y-2">
                  <label className={labelClass}>Current Password</label>
                  <div className="relative">
                    <input
                      type={showOld ? "text" : "password"}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className={`${inputClass} pr-14`}
                      placeholder="old password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOld(!showOld)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9C8C84] hover:text-[#FF9E75] transition-colors"
                    >
                      {showOld ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <div className={`flex items-center gap-2 p-4 ${CLAY.color.inset} ${CLAY.radius.sm} mt-3 border border-white/50 dark:border-white/5`}>
                    <Info size={16} className={`${THEME.brand} shrink-0`} />
                    <p className={`text-[11px] font-bold ${THEME.textSoft} leading-tight`}>
                      Leave current password empty if you originally signed in with Google.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={labelClass}>New Password</label>
                    <div className="relative">
                      <input
                        type={showNew ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={`${inputClass} pr-12`}
                        placeholder="8+ characters"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9C8C84] hover:text-[#FF9E75]"
                      >
                        {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={labelClass}>Confirm New</label>
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`${inputClass} pr-12`}
                        placeholder="Repeat password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9C8C84] hover:text-[#FF9E75]"
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
                    className={`${THEME.btnPrimary} h-14 px-10 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2`}
                  >
                    {loadingPass ? <Loader2 className="animate-spin" /> : "Update Password"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
