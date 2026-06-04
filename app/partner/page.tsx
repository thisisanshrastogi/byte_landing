"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Store,
  Phone,
  Mail,
  Check,
  Loader2,
  ArrowRight,
  Home,
} from "lucide-react";
import Link from "next/link";
import { THEME, CLAY } from "@/lib/design-tokens";

export default function VendorApplicationPage() {
  const [formData, setFormData] = useState({
    name: "",
    outletName: "",
    phone: "",
    email: "",
    college: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const inputClass = `w-full ${CLAY.color.inset} ${CLAY.shadow.inset} ${CLAY.shadowDark.inset} ${CLAY.radius.md} px-5 md:px-6 py-3 md:py-4 border-none text-[#5C4D45] dark:text-white placeholder:text-[#9C8C84] dark:placeholder:text-[#555] focus:ring-2 focus:ring-[#FF9E75]/50 focus:outline-none transition-all text-sm md:text-base`;
  const labelClass = `block text-xs font-bold uppercase tracking-widest ${THEME.textSoft} mb-2 pl-1`;

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 16 },
    },
  };

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
      setPhoneError("Phone number must be exactly 10 digits");
      return;
    }
    setPhoneError("");
    setIsSubmitting(true);

    fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLSd60-d9V_tBFF963_JvXvyjN6KhlSixcjvnqqEe9_3KCxWmeg/formResponse",
      {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "entry.2090857621": formData.name,
          "entry.339936328": formData.outletName,
          "entry.1535095666": formData.phone,
          "entry.322657064": formData.email,
          "entry.1022266614": formData.college,
        }),
      },
    )
      .then(() => setIsSuccess(true))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className={`min-h-screen flex font-sans overflow-hidden ${THEME.bg}`}>
      {/* --- LEFT PANEL --- */}
      <div className="hidden lg:flex w-1/2 relative bg-[#FFF0E6] dark:bg-gradient-to-br dark:from-[#120804] dark:to-[#050505] flex-col justify-between p-12 lg:p-20 overflow-hidden border-r border-[#EBE0D6] dark:border-white/5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FF9E75]/20 dark:bg-[#FF7E47]/20 rounded-full blur-3xl dark:blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#FFD166]/20 dark:bg-[#FF9E75]/15 rounded-full blur-3xl dark:blur-[120px]" />
        </div>

        <div className="relative z-10" />

        <motion.div
          className="relative z-10 max-w-lg"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 rounded-full mb-8"
          >
            <Store size={14} className="text-[#FF9E75]" />
            <span className={`text-[10px] font-bold uppercase tracking-wider ${THEME.textSoft}`}>
              Limited spots per campus
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className={`text-5xl xl:text-6xl font-black ${THEME.textDark} mb-6 leading-[1.1] tracking-tight`}
          >
            Partner with<br />
            <span className="text-[#FF9E75] dark:text-[#ff7c50]">
              Byte.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className={`text-lg ${THEME.textSoft} leading-relaxed`}
          >
            Streamline your operations, reduce food waste, and connect with hundreds of students ready to order.
          </motion.p>
        </motion.div>

        <div className="relative z-10 mt-auto pt-12 flex items-center justify-between">
          <p className={`text-sm ${THEME.textSoft} opacity-60`}>
            © {new Date().getFullYear()} Byte Technologies
          </p>
          <div className="w-20 h-10 overflow-hidden rounded-lg bg-white dark:bg-[#0a0a0a] flex items-center justify-center p-2">
            <img src="/byte-logo.png" alt="Byte" className="w-[160%] object-cover block dark:hidden" />
            <img src="/byte-logo-dark.png" alt="Byte" className="w-[160%] object-cover hidden dark:block" />
          </div>
        </div>
      </div>

      {/* --- RIGHT PANEL: Form --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-16 relative">
        <div className="absolute top-6 right-6 lg:top-10 lg:right-10 z-20">
          <Link
            href="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold ${THEME.textSoft} hover:text-[#FF9E75] hover:bg-[#F5EFE8] dark:hover:bg-white/5 transition-all`}
          >
            <Home size={18} />
            <span className="hidden sm:inline text-sm">Home</span>
          </Link>
        </div>

        <motion.div
          className="w-full max-w-md my-auto"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {isSuccess ? (
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center py-12">
              <div className={`w-20 h-20 ${THEME.cardInset} rounded-full flex items-center justify-center mb-6`}>
                <Check size={36} strokeWidth={2.5} className="text-[#4CAF50]" />
              </div>
              <h2 className={`text-3xl font-extrabold ${THEME.textDark} mb-3`}>
                Application Received!
              </h2>
              <p className={`text-base ${THEME.textSoft} mb-8 leading-relaxed`}>
                We&apos;ll review your details and reach out to <strong className={THEME.textDark}>{formData.email}</strong> shortly.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="text-[#FF9E75] font-bold text-sm hover:underline"
              >
                Submit another
              </button>
            </motion.div>
          ) : (
            <>
              <motion.div variants={fadeInUp} className="mb-8 text-center lg:text-left">
                <h2 className={`text-3xl font-extrabold ${THEME.textDark} tracking-tight mb-2`}>
                  Vendor Application
                </h2>
                <p className={`text-base ${THEME.textSoft} leading-relaxed`}>
                  Tell us about your outlet and we&apos;ll get you set up.
                </p>
              </motion.div>

              <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Contact Name</label>
                    <input
                      required
                      type="text"
                      className={inputClass}
                      placeholder="Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="relative">
                    <label className={labelClass}>Phone Number</label>
                    <input
                      required
                      type="tel"
                      className={inputClass}
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {phoneError && (
                      <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 absolute">{phoneError}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Business Name</label>
                    <input
                      required
                      type="text"
                      className={inputClass}
                      placeholder="Campus Bites"
                      value={formData.outletName}
                      onChange={(e) => setFormData({ ...formData, outletName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input
                      required
                      type="email"
                      className={inputClass}
                      placeholder="contact@cafe.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>College / University</label>
                  <input
                    required
                    type="text"
                    className={inputClass}
                    placeholder="State University"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${THEME.btnPrimary} w-full py-4 rounded-full font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 mt-4 group disabled:opacity-70`}
                >
                  {isSubmitting ? (
                    <><Loader2 size={18} className="animate-spin" /> Processing</>
                  ) : (
                    <>Submit Application <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </motion.form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
