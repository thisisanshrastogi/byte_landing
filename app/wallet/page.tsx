"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { load } from "@cashfreepayments/cashfree-js";
import CountUp from "react-countup";
import { AnimatePresence, motion, Variants } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import {
  Wallet,
  Plus,
  CreditCard,
  Shield,
  AlertCircle,
  CheckCircle2,
  Lock,
  RefreshCw,
  Info,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  History,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import axi from "@/lib/axi";
import { BackgroundElements } from "@/components/background-element";

// --- TYPES ---
type TransactionType = "PAYOUT" | "DEPOSIT";
type TransactionStatus = "SUCCESS" | "PENDING" | "FAILED";

interface WalletTransaction {
  id: string;
  amount: number;
  transaction_type: TransactionType;
  transaction_status: TransactionStatus;
  created_at: string; // ISO String: "2025-12-30T08:45:12Z"
}

interface WalletProfile {
  user_id: string;
  email: string;
  available_balance: number;
  reserved_balance: number;
  previous_transactions: WalletTransaction[];
}

export default function WalletPage() {
  const router = useRouter();
  const { user, loading, updateWalletBalance } = useAuth();

  // 1. Calculate derived values cleanly at the start
  const [amount, setAmount] = useState("");

  const numAmount = parseFloat(amount) || 0;
  // fee percentage
  const gatewayFee = numAmount * 0;
  const totalPayable = numAmount + gatewayFee;
  const showReceipt = numAmount > 0;

  const [walletProfile, setWalletProfile] = useState<WalletProfile>({
    user_id: "",
    email: "",
    available_balance: 0,
    reserved_balance: 0,
    previous_transactions: [],
  });

  const [isPaying, setIsPaying] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const cashfreeRef = useRef<any>(null);

  // --- CLAY TOKENS ---
  const clayCard =
    "bg-white shadow-[8px_8px_16px_rgba(214,198,186,0.5),_-4px_-4px_12px_rgba(255,255,255,0.8)] rounded-[2rem] border border-transparent dark:bg-card dark:border-border dark:shadow-none";
  const clayInset =
    "bg-[#F5EFE8] shadow-[inset_4px_4px_8px_rgba(204,190,178,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-[1rem] border-none text-[#5C4D45] placeholder-[#B0A69E] focus:ring-0 focus:outline-none transition-all focus:shadow-[inset_6px_6px_12px_rgba(204,190,178,0.6),_inset_-6px_-6px_12px_rgba(255,255,255,1)] dark:bg-muted dark:shadow-none dark:text-foreground";
  const clayBtn =
    "bg-[#FF9E75] text-white shadow-[6px_6px_12px_rgba(255,158,117,0.4),_-2px_-2px_6px_rgba(255,255,255,0.4)] hover:bg-[#FF9E75]/90 hover:shadow-lg active:translate-y-[2px] active:shadow-none transition-all dark:bg-primary dark:text-primary-foreground dark:shadow-none";

  const textHeading =
    "text-[#5C4D45] dark:text-foreground font-black tracking-tight";
  const textBody = "text-[#9C8C84] dark:text-muted-foreground font-bold";

  // --- ANIMATION VARIANTS ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const clayPopVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
  };

  /* -------------------- Init Cashfree SDK -------------------- */
  useEffect(() => {
    const init = async () => {
      cashfreeRef.current = await load({
        mode: "production",
      });
    };
    init();
  }, []);

  /* -------------------- Auth Guard -------------------- */
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const PAYMENT_KEY = "wallet_payment_attempt_id";

  const getPaymentAttemptId = () => {
    let key = sessionStorage.getItem(PAYMENT_KEY);
    if (!key) {
      key = crypto.randomUUID();
      sessionStorage.setItem(PAYMENT_KEY, key);
    }
    return key;
  };

  const clearPaymentAttemptId = () => {
    sessionStorage.removeItem(PAYMENT_KEY);
  };

  /* -------------------- Wallet Balance -------------------- */
  const fetchWalletBalance = async () => {
    try {
      const res = await axi.get("/wallet/balance");
      const data: WalletProfile = res.data;

      const transactionsToShow = data.previous_transactions;

      setWalletProfile({
        ...data,
        previous_transactions: transactionsToShow,
      });

      const totalBalance = data.available_balance + data.reserved_balance;
      updateWalletBalance(totalBalance);
    } catch (err) {
      console.error("Failed to fetch wallet balance", err);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchWalletBalance();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  /* -------------------- Payments -------------------- */
  const getPaymentSession = async (amount: number) => {
    const idempotencyKey = getPaymentAttemptId();
    const res = await axi.post("/payments/create-payment", {
      order_amount: amount,
      idempotency_key: idempotencyKey,
    });
    return res.data.payment_session_id;
  };

  const handlePayment = async (amount: number) => {
    if (!cashfreeRef.current) {
      setMessage("Payment system not ready. Try again.");
      setMessageType("error");
      return;
    }
    setIsPaying(true);
    setMessage("");

    try {
      const sessionId = await getPaymentSession(amount);
      const result = await cashfreeRef.current.checkout({
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      });
      await fetchWalletBalance();
      clearPaymentAttemptId();

      if (result.status === "SUCCESS") {
        setMessage("Wallet recharged successfully");
        setMessageType("success");
      }
    } catch (err) {
      console.error(err);
      clearPaymentAttemptId();
      setMessage("Payment failed or cancelled");
      setMessageType("error");
    } finally {
      setIsPaying(false);
    }
  };

  const handleRecharge = (e: React.FormEvent) => {
    e.preventDefault();
    const value = Number(amount);
    if (!value || value <= 0) {
      setMessage("Enter a valid amount");
      setMessageType("error");
      return;
    }
    handlePayment(value);
  };

  const quickAmounts = [50, 100, 200, 500, 1000];

  const displayEmail = walletProfile.email || user?.email || "";
  const maskedId = walletProfile.user_id
    ? `...${walletProfile.user_id.slice(-8)}`
    : "****";

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (e) {
      return dateString;
    }
  };

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-[#FFFBF7] dark:bg-background selection:bg-orange-100 dark:selection:bg-primary/30 font-sans">
      <Navbar />
      <BackgroundElements />
      <main className="relative z-10 container mx-auto px-4 py-20 mt-20 lg:py-24 min-h-[90vh]">
        <motion.div
          className="max-w-5xl mx-auto space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ---------------- TOP ROW (Cards) ---------------- */}
          <div className="grid lg:grid-cols-2 gap-20">
            {/* ---------------- Wallet Card ---------------- */}
            <motion.div variants={clayPopVariants} className="w-full h-fit">
              <div
                className={`${clayCard} overflow-hidden h-full flex flex-col p-6`}
              >
                <div className="space-y-8 flex-1">
                  {/* Header */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#FFF0E6] rounded-[1rem] flex items-center justify-center text-[#FF9E75] dark:bg-primary/10 dark:text-primary shadow-sm">
                        <Wallet className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className={`text-xl ${textHeading}`}>
                          Byte Wallet
                        </h3>
                        <p
                          className={`text-xs uppercase tracking-wider ${textBody}`}
                        >
                          Digital Payments
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EAF8E6] rounded-full text-[#4CAF50] dark:bg-green-900/20 dark:text-green-400">
                      <Shield className="w-3.5 h-3.5" />
                      <span className="text-xs font-black uppercase tracking-wide">
                        Secured
                      </span>
                    </div>
                  </div>

                  {/* Balances Area */}
                  <div className="space-y-4">
                    {/* Available Balance (Hero) */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p
                          className={`text-sm font-black uppercase tracking-wide ${textBody}`}
                        >
                          Available Balance
                        </p>

                        {/* Refresh Button */}
                        <button
                          onClick={handleRefresh}
                          disabled={isRefreshing}
                          className="group p-1.5 rounded-full hover:bg-[#F5EFE8] dark:hover:bg-muted active:scale-95 transition-all outline-none focus:ring-2 focus:ring-[#FF9E75]"
                          title="Refresh Balance"
                        >
                          <motion.div
                            animate={{ rotate: isRefreshing ? 360 : 0 }}
                            transition={{
                              repeat: isRefreshing ? Infinity : 0,
                              duration: 1,
                              ease: "linear",
                            }}
                          >
                            <RefreshCw
                              className={`w-4 h-4 ${
                                isRefreshing
                                  ? "text-[#FF9E75]"
                                  : "text-[#9C8C84]"
                              }`}
                            />
                          </motion.div>
                        </button>
                      </div>

                      <div className="flex items-baseline gap-3">
                        <span className={`text-5xl font-black ${textHeading}`}>
                          <CountUp
                            start={0}
                            end={walletProfile.available_balance}
                            duration={1}
                            separator=","
                            prefix="₹ "
                          />
                        </span>
                      </div>
                    </div>

                    {/* Reserved Balance */}
                    <div className="flex items-center gap-2 pt-2">
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#F5EFE8] dark:bg-muted/50 text-[#9C8C84]">
                        <Lock className="w-3 h-3" />
                        <span className="text-[10px] uppercase font-black tracking-wider">
                          Reserved
                        </span>
                      </div>
                      <span
                        className={`text-lg font-bold text-[#9C8C84] dark:text-muted-foreground opacity-80`}
                      >
                        <CountUp
                          start={0}
                          end={walletProfile.reserved_balance}
                          duration={1}
                          separator=","
                          prefix="₹ "
                        />
                      </span>
                      <div className="group relative ml-auto">
                        <Info className="w-4 h-4 text-[#9C8C84]/50 cursor-help" />
                        <span className="absolute right-0 bottom-full mb-2 w-40 p-2 bg-[#5C4D45] text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          Funds temporarily locked for active orders. Released
                          on order completion or cancellation.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Account Footer with API Data */}
                  <div className="bg-[#F5EFE8] dark:bg-muted/50 rounded-[1.5rem] p-6 space-y-4 mt-auto">
                    <div className="flex justify-between items-center">
                      <div>
                        <p
                          className={`text-xs uppercase tracking-wide mb-1 opacity-70 ${textBody}`}
                        >
                          Account
                        </p>
                        <p
                          className={`text-sm font-black truncate max-w-40 text-[#5C4D45] dark:text-foreground`}
                          title={displayEmail}
                        >
                          {displayEmail}
                        </p>
                      </div>

                      <div className="text-right">
                        <p
                          className={`text-xs uppercase tracking-wide mb-1 opacity-70 ${textBody}`}
                        >
                          User ID
                        </p>
                        <p className="text-sm font-black font-mono text-[#5C4D45] dark:text-foreground">
                          {maskedId}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-[#D6C6BA]/20 dark:border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#FF9E75] rounded-full" />
                        <span className={`text-xs font-bold ${textBody}`}>
                          Instant
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#5C4D45] dark:bg-foreground rounded-full" />
                        <span className={`text-xs font-bold ${textBody}`}>
                          Secured
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ---------------- Recharge Card ---------------- */}
            {/* Added 'layout' prop here to fix layout shift on expansion */}
            <motion.div
              layout
              variants={clayPopVariants}
              className={`w-full ${clayCard} p-6`}
            >
              <div className="mb-8">
                <h2
                  className={`text-2xl flex items-center gap-3 mb-2 ${textHeading}`}
                >
                  <div className="w-10 h-10 bg-[#5C4D45] rounded-full flex items-center justify-center text-white dark:bg-primary dark:text-primary-foreground">
                    <Plus className="w-5 h-5" strokeWidth={3} />
                  </div>
                  Recharge Wallet
                </h2>
                <p className={`text-sm ${textBody}`}>
                  Add money to your Byte wallet instantly.
                </p>
              </div>

              <form onSubmit={handleRecharge} className="space-y-6">
                {/* Input Section */}
                <div className="space-y-3">
                  <label
                    className={`block text-xs font-black uppercase tracking-wide ml-1 ${textBody}`}
                  >
                    Enter Amount (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9C8C84] font-black text-lg">
                      ₹
                    </span>
                    <input
                      type="number"
                      min={1}
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                      className={`w-full pl-8 pr-4 py-5 text-xl font-black ${clayInset} transition-all focus:outline-none focus:ring-2 focus:ring-[#FF9E75]/50`}
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Quick Add Buttons (Visual Update: Bigger, Taller, more gap) */}

                <label
                  className={`block text-xs font-black uppercase tracking-wide ml-1 mb-3 ${textBody}`}
                >
                  Quick Add
                </label>
                <div className=" grid grid-cols-5 gap-3">
                  {quickAmounts.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setAmount(q.toString())}
                      // Updated classes for bigger buttons
                      className={`h-9 rounded-sm text-xs md:text-sm font-black transition-all duration-200 flex items-center justify-center
                        ${
                          amount === q.toString()
                            ? "bg-[#5C4D45] dark:bg-primary text-white shadow-md scale-105"
                            : "bg-[#F5EFE8] dark:bg-accent text-accent-foreground hover:bg-[#E8DED5] active:scale-95"
                        }
                      `}
                    >
                      ₹{q}
                    </button>
                  ))}
                </div>

                {/* --- SMOOTH FEE RECEIPT --- */}
                <AnimatePresence mode="sync">
                  {showReceipt && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        marginBottom: 24,
                        transition: { duration: 0.25, ease: "easeInOut" }, // Smoother timing
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        marginBottom: 0,
                        transition: { duration: 0.2, ease: "easeInOut" },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="bg-[#F5EFE8] dark:bg-white/5 rounded-[1.2rem] p-5 space-y-3 border border-white/50 dark:border-white/5">
                        <div className="flex justify-between items-center text-xs font-bold text-[#9C8C84]">
                          <span>Recharge Amount</span>
                          <span>₹{numAmount.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between items-center text-xs font-bold text-[#9C8C84]">
                          <div className="flex items-center gap-1.5">
                            <span>Payment Gateway Fee* (3%)</span>
                          </div>
                          <span className="text-[#FF9E75]">
                            + ₹{gatewayFee.toFixed(2)}
                          </span>
                        </div>

                        {/* Divider */}
                        <div className="w-full border-t-2 border-dashed border-[#D6C6BA]/30 dark:border-white/10 my-1"></div>

                        <div className="flex justify-between items-center text-sm font-black text-[#5C4D45] dark:text-white pt-1">
                          <span>Total Payable</span>
                          <span>₹{totalPayable.toFixed(2)}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* --- SUBMIT BUTTON --- */}
                <motion.button
                  layout
                  type="submit"
                  disabled={isPaying || !showReceipt}
                  className={`w-full h-14 rounded-[1.2rem] text-base font-black uppercase tracking-wide flex items-center justify-center gap-2 ${clayBtn} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isPaying ? (
                    "Processing..."
                  ) : (
                    <>
                      Add Money&nbsp;
                      <CreditCard className="w-5 h-5" strokeWidth={2.5} />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* ---------------- TRANSACTIONS HISTORY ---------------- */}
          <motion.div variants={clayPopVariants} className={`${clayCard} p-8`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#EAF8E6] dark:bg-transparent rounded-full flex items-center justify-center text-[#4CAF50]">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-xl ${textHeading}`}>Recent Activity</h3>
                <p className={`text-xs font-bold ${textBody}`}>
                  Your latest transactions
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {walletProfile.previous_transactions.length === 0 ? (
                <div className="text-center py-8 text-[#9C8C84] opacity-70 italic font-bold">
                  No transactions yet.
                </div>
              ) : (
                walletProfile.previous_transactions.map((tx) => {
                  const isCredit = tx.transaction_type === "DEPOSIT";
                  const isLocked = false;

                  return (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 rounded-[1.2rem] hover:bg-[#F5EFE8] dark:hover:bg-muted/50 transition-colors border-b border-[#F5EFE8] dark:border-muted/50 dark:rounded-none last:border-0"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center
                          ${
                            isCredit
                              ? "bg-[#EAF8E6] text-[#4CAF50] dark:bg-transparent"
                              : isLocked
                              ? "bg-[#F5EFE8] text-[#9C8C84] dark:bg-transparent"
                              : "bg-[#FFF0F0] text-[#FF6B6B] dark:bg-transparent"
                          }`}
                        >
                          {isCredit ? (
                            <ArrowDownLeft className="w-5 h-5" />
                          ) : isLocked ? (
                            <Lock className="w-4 h-4" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-black text-[#5C4D45] dark:text-foreground text-sm uppercase">
                            {tx.transaction_type}
                          </p>
                          <div className="flex items-center gap-1 text-[#9C8C84] text-xs font-bold">
                            <Clock className="w-3 h-3" />
                            {formatDate(tx.created_at)}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p
                          className={`text-lg font-black ${
                            isCredit
                              ? "text-[#4CAF50]"
                              : isLocked
                              ? "text-[#9C8C84]"
                              : "text-[#FF6B6B]"
                          }`}
                        >
                          {isCredit ? "+" : isLocked ? "" : "-"}₹
                          {tx.amount.toLocaleString()}
                        </p>
                        <p
                          className={`text-[10px] uppercase font-bold tracking-wide ${"text-[#9C8C84] opacity-70"}`}
                        >
                          {tx.transaction_status}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
