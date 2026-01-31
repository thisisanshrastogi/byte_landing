"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { motion, Variants } from "framer-motion";
import {
  RefreshCcw,
  AlertCircle,
  Wallet,
  Clock,
  Ban,
  HelpCircle,
  ShieldAlert,
} from "lucide-react";

export default function RefundPage() {
  // --- CLAY TOKENS ---
  const clayCard =
    "bg-white shadow-[8px_8px_16px_rgba(214,198,186,0.5),_-4px_-4px_12px_rgba(255,255,255,0.8)] rounded-[2rem] border border-transparent dark:bg-card dark:border-border dark:shadow-none";
  const textHeading =
    "text-[#5C4D45] dark:text-foreground font-black tracking-tight";
  const textBody =
    "text-[#9C8C84] dark:text-muted-foreground font-bold leading-relaxed";

  const iconBox =
    "w-12 h-12 rounded-[1rem] flex items-center justify-center mb-4 bg-[#FFF0E6] text-[#FF9E75] dark:bg-primary/10 dark:text-primary shadow-sm";

  // --- ANIMATION ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemUpVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <div className="min-h-screen bg-[#FFFBF7] dark:bg-background selection:bg-orange-100 dark:selection:bg-primary/30 font-sans">
      <Navbar />

      <main className="py-20 mt-10 lg:py-24">
        <motion.div
          className="max-w-4xl mx-auto px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemUpVariants} className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-white dark:bg-secondary rounded-full text-[#FF9E75] dark:text-foreground font-black text-xs uppercase tracking-wider mb-6 shadow-sm border border-[#F5EFE8] dark:border-border">
              Last updated: January 2026
            </div>
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl mb-6 ${textHeading}`}
            >
              Refund & Wallet Policy
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${textBody}`}>
              Transparency regarding your Byte wallet, order cancellations, and
              withdrawals.
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* Automatic Order Refunds */}
            <motion.section
              variants={itemUpVariants}
              className={`p-8 md:p-10 ${clayCard}`}
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="shrink-0">
                  <div className={iconBox}>
                    <RefreshCcw size={24} strokeWidth={2.5} />
                  </div>
                </div>
                <div>
                  <h2 className={`text-2xl mb-4 ${textHeading}`}>
                    Automated Order Refunds
                  </h2>
                  <p className={`mb-4 ${textBody}`}>
                    When you place an order, money is held in your{" "}
                    <strong>Reserved Balance</strong>. Refunds back to your{" "}
                    <strong>Available Balance</strong> are automatic and instant
                    in these scenarios:
                  </p>
                  <ul className={`list-disc pl-5 space-y-2 mb-4 ${textBody}`}>
                    <li>
                      <strong>Vendor Timeout:</strong> If the vendor does not
                      accept your order within 7 minutes.
                    </li>
                    <li>
                      <strong>Vendor Rejection:</strong> If the vendor declines
                      the order.
                    </li>
                    <li>
                      <strong>Vendor Cancellation:</strong> If the vendor
                      cancels after accepting (e.g., due to stock issues).
                    </li>
                  </ul>
                  <div className="p-4 bg-[#E6FFF0] rounded-[1rem] border border-[#dcfce9] dark:bg-green-900/10 dark:border-green-900/20">
                    <p className="text-green-600 font-bold text-sm dark:text-green-400">
                      These refunds happen instantly within the app. No action
                      is required from you.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Wallet Recharge Policy */}
            <motion.section
              variants={itemUpVariants}
              className={`p-8 md:p-10 ${clayCard}`}
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="shrink-0">
                  <div className={iconBox}>
                    <Wallet size={24} strokeWidth={2.5} />
                  </div>
                </div>
                <div>
                  <h2 className={`text-2xl mb-4 ${textHeading}`}>
                    Wallet Recharge Policy
                  </h2>
                  <p className={`mb-4 ${textBody}`}>
                    Please recharge carefully. Once money is added to your Byte
                    Wallet,
                    <strong>
                      {" "}
                      it is non-refundable and non-transferable
                    </strong>{" "}
                    back to your bank account.
                  </p>
                  <p className={textBody}>
                    The balance in your wallet is meant solely for purchasing
                    items from vendors within the campus ecosystem. We do not
                    support casual withdrawals or balance transfers.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Emergency Exceptions */}
            <motion.section
              variants={itemUpVariants}
              className={`p-8 md:p-10 ${clayCard}`}
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="shrink-0">
                  <div className={iconBox}>
                    <ShieldAlert size={24} strokeWidth={2.5} />
                  </div>
                </div>
                <div>
                  <h2 className={`text-2xl mb-4 ${textHeading}`}>
                    Emergency Exceptions
                  </h2>
                  <p className={`mb-4 ${textBody}`}>
                    We understand that emergencies happen. We may consider a
                    manual refund to your source bank account only under strict
                    conditions:
                  </p>

                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF9E75] mt-2.5 shrink-0" />
                      <p className={textBody}>
                        The wallet balance to be refunded must be a significant
                        amount, strictly <strong>greater than ₹5,000</strong>.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF9E75] mt-2.5 shrink-0" />
                      <p className={textBody}>
                        The request is subject to Admin approval. The
                        administration will review the necessity and validity of
                        the situation.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF9E75] mt-2.5 shrink-0" />
                      <p className={textBody}>
                        Approved refunds are processed via{" "}
                        <strong>Cashfree</strong> and are subject to their
                        standard refund timelines (typically 5-7 business days).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Timeline */}
              <motion.section
                variants={itemUpVariants}
                className={`p-8 ${clayCard}`}
              >
                <div className={iconBox}>
                  <Clock size={24} strokeWidth={2.5} />
                </div>
                <h2 className={`text-2xl mb-4 ${textHeading}`}>Timelines</h2>
                <ul className={`list-disc pl-5 space-y-2 ${textBody}`}>
                  <li>
                    <strong>Order Refunds:</strong> Instant (to Byte Wallet).
                  </li>
                  <li>
                    <strong>Emergency Withdrawals:</strong> 5-7 Business Days
                    (via Cashfree).
                  </li>
                </ul>
              </motion.section>

              {/* Non-Refundable */}
              <motion.section
                variants={itemUpVariants}
                className={`p-8 ${clayCard}`}
              >
                <div className={iconBox}>
                  <Ban size={24} strokeWidth={2.5} />
                </div>
                <h2 className={`text-2xl mb-4 ${textHeading}`}>
                  Strictly Non-Refundable
                </h2>
                <ul className={`list-disc pl-5 space-y-2 ${textBody}`}>
                  <li>Wallet balances under ₹5,000.</li>
                  <li>Orders already in "Preparing" state.</li>
                  <li>
                    Food quality or taste discrepancies (must be resolved
                    directly with vendor).
                  </li>
                </ul>
              </motion.section>
            </div>

            {/* Contact */}
            <motion.section
              variants={itemUpVariants}
              className={`p-8 md:p-10 ${clayCard}`}
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="shrink-0">
                  <div className={iconBox}>
                    <HelpCircle size={24} strokeWidth={2.5} />
                  </div>
                </div>
                <div>
                  <h2 className={`text-2xl mb-4 ${textHeading}`}>
                    Requesting Support
                  </h2>
                  <p className={`mb-2 ${textBody}`}>
                    For emergency withdrawal requests meeting the criteria
                    above, please contact:
                  </p>
                  <a
                    href="mailto:support@byteapp.tech"
                    className="text-[#FF9E75] font-black hover:underline break-all dark:text-primary text-lg"
                  >
                    support@byteapp.tech
                  </a>
                </div>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
