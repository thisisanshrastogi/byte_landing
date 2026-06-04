"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Mail, Briefcase, Send, Check, Loader2 } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { BackgroundElements } from "@/components/background-element";
import { THEME, CLAY } from "@/lib/design-tokens";

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: { y: 12, opacity: 0, filter: "blur(4px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { type: "spring", duration: 0.45, bounce: 0 },
    },
  };

  const inputClass = `w-full px-4 py-4 ${CLAY.color.inset} ${CLAY.shadow.inset} ${CLAY.shadowDark.inset} ${CLAY.radius.sm} border-none text-[#5C4D45] dark:text-white placeholder-[#B0A69E] focus:outline-none focus:ring-2 focus:ring-[#FF9E75]/50 transition-all`;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Enter a valid email";
    if (!subject.trim()) newErrors.subject = "Subject is required";
    if (!message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setFormState("sending");

    fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLSd60-d9V_tBFF963_JvXvyjN6KhlSixcjvnqqEe9_3KCxWmeg/formResponse",
      {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "entry.2090857621": name,
          "entry.339936328": subject,
          "entry.1535095666": email,
          "entry.322657064": message,
        }),
      },
    )
      .then(() => setFormState("sent"))
      .catch(() => setFormState("sent"));
  };

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden relative ${THEME.bg}`}>
      <Navbar />
      <BackgroundElements />

      <main className="py-20 mt-10 lg:py-24 z-10 relative">
        <motion.div
          className="max-w-4xl mx-auto px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className={`text-center ${CLAY.spacing.headingGap}`}>
            <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-full border border-white/50 dark:border-white/10 ${CLAY.shadow.sm} dark:shadow-none mb-6`}>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${THEME.textSoft}`}>
                Get in Touch
              </span>
            </div>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black ${THEME.textDark} tracking-tight mb-6`}>
              Contact Us
            </h1>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto ${THEME.textSoft} leading-relaxed`}>
              Have questions or need support? We&apos;re here to help make your Byte
              experience better.
            </p>
          </motion.div>

          <div className={`grid md:grid-cols-2 ${CLAY.spacing.gridGap} mb-12`}>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className={`${THEME.card} ${CLAY.spacing.cardSmall} transition-all duration-300`}
            >
              <div className={`w-12 h-12 ${CLAY.radius.sm} ${THEME.cardInset} flex items-center justify-center mb-4`}>
                <Mail size={22} strokeWidth={2.5} className={THEME.textDark} />
              </div>
              <h3 className={`text-xl font-bold ${THEME.textDark} mb-3`}>General Support</h3>
              <p className={`text-sm ${THEME.textSoft} leading-relaxed mb-4`}>
                For general questions, account issues, or technical support. We typically respond within 24 hours.
              </p>
              <a
                href="mailto:support@byteapp.tech"
                className={`${THEME.brand} font-bold hover:underline break-all transition-colors`}
              >
                support@byteapp.tech
              </a>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className={`${THEME.card} ${CLAY.spacing.cardSmall} transition-all duration-300`}
            >
              <div className={`w-12 h-12 ${CLAY.radius.sm} ${THEME.cardInset} flex items-center justify-center mb-4`}>
                <Briefcase size={22} strokeWidth={2.5} className={THEME.textDark} />
              </div>
              <h3 className={`text-xl font-bold ${THEME.textDark} mb-3`}>
                Business Inquiries
              </h3>
              <p className={`text-sm ${THEME.textSoft} leading-relaxed mb-4`}>
                Interested in partnering with Byte or bringing us to your campus? We&apos;ll set up a call within 48 hours.
              </p>
              <a
                href="mailto:support@byteapp.tech"
                className={`${THEME.brand} font-bold hover:underline break-all transition-colors`}
              >
                support@byteapp.tech
              </a>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            variants={fadeInUp}
            className={`${THEME.cardElevated} ${CLAY.spacing.cardLarge}`}
          >
            {formState === "sent" ? (
              <div className="flex flex-col items-center text-center py-8">
                <div className={`w-16 h-16 ${THEME.cardInset} rounded-full flex items-center justify-center mb-5`}>
                  <Check size={28} strokeWidth={2.5} className="text-[#4CAF50]" />
                </div>
                <h3 className={`text-2xl font-extrabold ${THEME.textDark} mb-3`}>
                  Message sent
                </h3>
                <p className={`text-base ${THEME.textSoft} leading-relaxed`}>
                  We&apos;ll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <>
                <h3 className={`text-2xl font-extrabold text-center ${THEME.textDark} tracking-tight mb-8`}>
                  Send us a message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className={`block text-xs font-bold uppercase tracking-wide mb-2 ml-1 ${THEME.textSoft}`}
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className={inputClass}
                        placeholder="Riya Menon"
                        required
                      />
                      {errors.name && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className={`block text-xs font-bold uppercase tracking-wide mb-2 ml-1 ${THEME.textSoft}`}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={inputClass}
                        placeholder="riya@college.edu"
                        required
                      />
                      {errors.email && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className={`block text-xs font-bold uppercase tracking-wide mb-2 ml-1 ${THEME.textSoft}`}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className={inputClass}
                      placeholder="Feedback about..."
                      required
                    />
                    {errors.subject && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.subject}</p>}
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className={`block text-xs font-bold uppercase tracking-wide mb-2 ml-1 ${THEME.textSoft}`}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className={`${inputClass} resize-none`}
                      placeholder="Tell us how we can help..."
                      required
                    />
                    {errors.message && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.message}</p>}
                  </div>
                  <div className="text-center pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={formState === "sending"}
                      className={`w-full sm:w-auto px-8 py-6 ${CLAY.radius.md} text-base font-bold uppercase tracking-wide flex items-center justify-center gap-2 ${THEME.btnPrimary} disabled:opacity-60 disabled:cursor-not-allowed`}
                    >
                      {formState === "sending" ? (
                        <><Loader2 size={18} className="animate-spin" /> Sending...</>
                      ) : (
                        <>Send Message <Send size={18} strokeWidth={2.5} /></>
                      )}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
