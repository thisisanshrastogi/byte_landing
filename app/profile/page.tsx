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
  Settings,
  Camera,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axi from "@/lib/axi";
import { useRouter } from "next/navigation";
import { BackgroundElements } from "@/components/background-element";
import { Footer } from "@/components/layout/footer";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // --- STATES ---
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

  // --- CLAY TOKENS (Synchronized with Wallet Page) ---
  const clayCard =
    "bg-white dark:bg-card shadow-[8px_8px_16px_rgba(214,198,186,0.5),_-4px_-4px_12px_rgba(255,255,255,0.8)] dark:shadow-none rounded-[2rem] border border-transparent dark:border-border p-6 md:p-8";

  const clayInset =
    "bg-[#F5EFE8] dark:bg-muted shadow-[inset_4px_4px_8px_rgba(204,190,178,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.8)] dark:shadow-none rounded-[1.2rem] border-none text-[#5C4D45] dark:text-foreground placeholder-[#B0A69E] focus:ring-2 focus:ring-[#FF9E75]/50 focus:outline-none transition-all";

  const clayBtnPrimary =
    "bg-[#FF9E75] dark:bg-primary text-white dark:text-primary-foreground shadow-[6px_6px_12px_rgba(255,158,117,0.4),_-2px_-2px_6px_rgba(255,255,255,0.4)] dark:shadow-none hover:bg-[#FF9E75]/90 hover:shadow-lg active:translate-y-[2px] active:shadow-none transition-all font-black uppercase tracking-wide";

  const textHeading =
    "text-[#5C4D45] dark:text-foreground font-black tracking-tight";
  const textBody = "text-[#9C8C84] dark:text-muted-foreground font-bold";

  // --- ANIMATION VARIANTS ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
  };

  // --- HANDLERS ---
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingProfile(true);
    setMessage(null);
    try {
      await axi.post("/auth/change-name", { new_name: name });
      await axi.post("/auth/refresh");
      setMessage({ type: "success", text: "Profile details updated." });
      window.location.reload();
    } catch (error) {
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
    } catch (error) {
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
    <div className="min-h-screen bg-[#FFFBF7] dark:bg-background selection:bg-orange-100 dark:selection:bg-primary/30 font-sans">
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
          <motion.div
            variants={itemVariants}
            className="text-center md:text-left mb-10"
          >
            <h1 className={`text-4xl md:text-5xl ${textHeading} mb-2`}>
              Settings
            </h1>
            <p className={`text-lg ${textBody}`}>
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
                  className={`
  ${
    message.type === "success"
      ? "bg-[#EAF8E6] text-[#4CAF50] dark:bg-transparent dark:text-[#81C784]"
      : "bg-[#FFF0F0] text-[#FF6B6B] dark:bg-transparent dark:text-[#FF8080]"
  } 
  rounded-[1.5rem] border-none shadow-sm 
  dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3)] 
  transition-colors duration-300
`}
                >
                  <AlertDescription className="font-black flex items-center gap-2 uppercase text-xs tracking-wider">
                    {message.type === "success" ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <AlertCircle size={18} />
                    )}
                    {message.text}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid md:grid-cols-1 gap-8">
            {/* Section 1: Identity */}
            <motion.div variants={itemVariants} className={clayCard}>
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#F5EFE8] dark:border-border">
                <div className="w-12 h-12 bg-[#FFF0E6] dark:bg-primary/10 rounded-[1rem] flex items-center justify-center text-[#FF9E75] dark:text-primary">
                  <User className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <h2 className={`text-2xl ${textHeading}`}>Account Profile</h2>
              </div>

              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex flex-col items-center gap-4 shrink-0">
                  <div className="w-32 h-32 rounded-[2rem] bg-[#F5EFE8] dark:bg-muted shadow-inner flex items-center justify-center text-5xl font-black text-[#D6C6BA] dark:text-muted-foreground border-4 border-white dark:border-border relative group">
                    {name ? name.charAt(0).toUpperCase() : "U"}
                    <div className="absolute inset-0 bg-black/5 rounded-[2rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="text-white w-8 h-8" />
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase text-[#9C8C84] tracking-[0.2em]">
                    Member
                  </span>
                </div>

                <form
                  onSubmit={handleUpdateProfile}
                  className="flex-1 space-y-6"
                >
                  <div className="space-y-2">
                    <label
                      className={`text-xs font-black uppercase tracking-wider ml-1 ${textBody}`}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-6 py-4 text-base font-black ${clayInset}`}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="space-y-2 opacity-50">
                    <label
                      className={`text-xs font-black uppercase tracking-wider ml-1 ${textBody}`}
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={user?.data?.email}
                        readOnly
                        className={`w-full pl-6 pr-12 py-4 text-base font-black ${clayInset} cursor-not-allowed`}
                      />
                      <Mail
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-[#9C8C84]"
                        size={18}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      disabled={loadingProfile}
                      className={`h-14 px-10 rounded-[1.2rem] ${clayBtnPrimary}`}
                    >
                      {loadingProfile ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Section 2: Security */}
            <motion.div variants={itemVariants} className={clayCard}>
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#F5EFE8] dark:border-border">
                <div className="w-12 h-12 bg-[#5C4D45] dark:bg-primary rounded-[1rem] flex items-center justify-center text-white dark:text-primary-foreground">
                  <ShieldCheck className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <h2 className={`text-2xl ${textHeading}`}>Security Settings</h2>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-6">
                <div className="space-y-2">
                  <label
                    className={`text-xs font-black uppercase tracking-wider ml-1 ${textBody}`}
                  >
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showOld ? "text" : "password"}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className={`w-full px-6 py-4 text-base font-black ${clayInset} pr-14`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOld(!showOld)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9C8C84] hover:text-[#FF9E75] transition-colors"
                    >
                      {showOld ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 p-4 bg-[#F5EFE8]/50 dark:bg-muted/30 rounded-xl mt-3 border border-white/50 dark:border-border/50">
                    <Info size={16} className="text-[#FF9E75] shrink-0" />
                    <p className="text-[11px] font-bold text-[#9C8C84] leading-tight">
                      Leave current password empty if you originally signed in
                      with Google.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      className={`text-xs font-black uppercase tracking-wider ml-1 ${textBody}`}
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNew ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={`w-full px-6 py-4 text-base font-black ${clayInset} pr-12`}
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
                    <label
                      className={`text-xs font-black uppercase tracking-wider ml-1 ${textBody}`}
                    >
                      Confirm New
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full px-6 py-4 text-base font-black ${clayInset} pr-12`}
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
                    className={`h-14 px-10 rounded-[1.2rem] ${clayBtnPrimary}`}
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
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
