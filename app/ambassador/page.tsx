"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackgroundElements } from "@/components/background-element";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, Users, Handshake, Gift, Send, ArrowRight, ArrowLeft, ChevronDown } from "lucide-react";
import { THEME, CLAY } from "@/lib/design-tokens";

export default function AmbassadorPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [currentStep, setCurrentStep] = useState(1);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const totalSteps = 4;

  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 11 }, (_, i) => (currentYear + i).toString());

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", college: "", year: "", major: "", address: "",
    clubs: "", social: [] as string[], influence: "", campaign: "", availability: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleSocial = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      social: prev.social.includes(platform)
        ? prev.social.filter((p) => p !== platform)
        : [...prev.social, platform],
    }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const isStepValid = () => {
    if (currentStep === 1) {
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      return formData.name.trim() !== "" && isEmailValid && formData.phone.trim() !== "";
    }
    if (currentStep === 2) {
      return formData.college.trim() !== "" && formData.year !== "" && formData.major.trim() !== "" && formData.address.trim() !== "";
    }
    if (currentStep === 3) {
      return formData.social.length > 0 && formData.influence !== "" && formData.campaign.trim().length > 10;
    }
    if (currentStep === 4) return formData.availability !== "";
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid()) return;

    setStatus("submitting");

    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScTg5eCL4k71u5jRXiPTsCOx3wrxOFCR3gntAUstd33XOWJHA/formResponse";
    const body = new FormData();
    body.append("entry.2098593041", formData.name);
    body.append("entry.1517419128", formData.email);
    body.append("entry.307616345", formData.phone);
    body.append("entry.520470293", formData.college);
    body.append("entry.937625584", formData.year);
    body.append("entry.1712569869", formData.major);
    body.append("entry.463250361", formData.address);
    body.append("entry.1515080314", formData.clubs);

    formData.social.forEach((p) => {
      body.append("entry.433416672", p);
    });

    body.append("entry.1009556505", formData.influence);
    body.append("entry.1037635041", formData.campaign);
    body.append("entry.548532366", formData.availability);

    try {
      await fetch(GOOGLE_FORM_URL, { method: "POST", body, mode: "no-cors" });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("success");
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 }),
  };

  const inputClass = `w-full ${CLAY.color.inset} ${CLAY.shadow.inset} ${CLAY.shadowDark.inset} ${CLAY.radius.md} px-5 py-3 md:py-4 outline-none focus:ring-2 focus:ring-[#FF9E75]/50 transition-all text-[#5C4D45] dark:text-[#EDEDED] placeholder:text-[#9C8C84] dark:placeholder:text-[#555] text-sm md:text-base border-none`;

  const labelClass = `block text-[10px] md:text-xs font-bold uppercase tracking-widest ${THEME.textSoft} mb-2 md:mb-3 pl-1`;

  const selectableBase = `cursor-pointer transition-all border ${CLAY.radius.sm}`;
  const selectableOff = "bg-white dark:bg-[#1a1a1a] text-[#5C4D45] dark:text-[#E0E0E0] border-white dark:border-white/10 hover:bg-[#F5EFE8] dark:hover:bg-[#252525]";
  const selectableOn = "bg-[#FF9E75] dark:bg-[#ff7c50] text-white border-transparent shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)]";
  const selectableCheckOn = "bg-[#FFF0E6] dark:bg-[#3a2015] text-[#FF9E75] dark:text-[#ff7c50] border-[#FF9E75] dark:border-[#ff7c50]";

  return (
    <div className={`min-h-screen font-sans relative ${THEME.bg} overflow-hidden`}>
      <Navbar />
      <BackgroundElements />

      <main className="relative z-10 pt-32 md:pt-36 pb-24 px-4 md:px-10 lg:px-16 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">

        {/* LEFT COLUMN */}
        <div className="lg:w-5/12 lg:sticky lg:top-36 h-fit flex flex-col gap-8">
          <div>
            <p className={`text-lg md:text-xl font-semibold ${THEME.brand} italic tracking-tight mb-2`}>
              Looking for
            </p>
            <h1 className={`text-4xl md:text-6xl font-black ${THEME.textDark} leading-[0.95] tracking-tight uppercase`}>
              Campus <br /> Ambassadors
            </h1>
            <p className={`mt-6 text-base md:text-lg ${THEME.textSoft} leading-relaxed`}>
              Help Byte grow on your campus and make an impact. Be a part of the Byte team!
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { icon: Users, title: "Bring Byte to Your Campus", desc: "Lead the launch, collaborate on ops, marketing, and tech." },
              { icon: Handshake, title: "Actual Startup Experience", desc: "Run campus operations, own outcomes, ship things that matter." },
              { icon: Gift, title: "Perks & Early Access", desc: "Exclusive rewards, swag, and direct line to the founding team." },
            ].map((item, i) => (
              <div
                key={i}
                className={`${CLAY.spacing.cardSmall} ${CLAY.radius.md} ${THEME.card} flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300`}
              >
                <div className={`w-12 h-12 ${CLAY.radius.sm} ${THEME.cardInset} flex items-center justify-center shrink-0`}>
                  <item.icon size={22} className={THEME.textDark} />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${THEME.textDark} mb-0.5`}>{item.title}</h3>
                  <p className={`text-xs ${THEME.textSoft}`}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN - Multi-step Form */}
        <div className="lg:w-7/12 flex flex-col justify-center">
          <div className={`${CLAY.spacing.cardLarge} ${CLAY.radius.xl} ${THEME.card} flex flex-col min-h-[520px] relative overflow-hidden`}>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center my-auto py-16"
                >
                  <div className={`w-20 h-20 ${THEME.cardInset} rounded-full flex items-center justify-center mb-6`}>
                    <CheckCircle size={36} strokeWidth={2.5} className="text-[#4CAF50]" />
                  </div>
                  <h2 className={`text-3xl md:text-4xl font-extrabold ${THEME.textDark} mb-4`}>Application Sent!</h2>
                  <p className={`text-base ${THEME.textSoft} max-w-sm leading-relaxed`}>
                    Welcome to the pipeline! We will review your application and be in touch soon.
                  </p>
                </motion.div>
              ) : (
                <div key="form-container" className="flex flex-col h-full flex-1">

                  {/* Progress Bar */}
                  <div className="mb-6 md:mb-8">
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-end gap-2 sm:gap-4 mb-4">
                      <h3 className={`text-xl md:text-2xl font-bold ${THEME.textDark}`}>
                        {currentStep === 1 && "1. Personal Info"}
                        {currentStep === 2 && "2. Academic Profile"}
                        {currentStep === 3 && "3. Influence & Strategy"}
                        {currentStep === 4 && "4. Final Details"}
                      </h3>
                      <span className={`w-fit text-[10px] md:text-xs font-bold ${THEME.textSoft} uppercase tracking-widest ${CLAY.color.inset} px-3 py-1.5 rounded-full`}>
                        Step {currentStep} of {totalSteps}
                      </span>
                    </div>
                    <div className={`w-full h-2 ${CLAY.color.inset} rounded-full overflow-hidden`}>
                      <motion.div
                        className="h-full bg-[#FF9E75] dark:bg-[#ff7c50] rounded-full"
                        initial={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
                        animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Form Steps */}
                  <div className="flex-1 relative overflow-hidden flex flex-col px-1">
                    <AnimatePresence custom={1} mode="wait">
                      <motion.form
                        key={`step-${currentStep}`}
                        custom={1}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="space-y-5 md:space-y-6 flex-1 py-2"
                        onSubmit={handleSubmit}
                      >

                        {currentStep === 1 && (
                          <div className="space-y-5 md:space-y-6">
                            <div><label className={labelClass}>Full Name *</label><input required type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="John Doe" /></div>
                            <div><label className={labelClass}>Email Address *</label><input required type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="john@example.com" /></div>
                            <div><label className={labelClass}>Phone Number *</label><input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="10 digit phone number" /></div>
                          </div>
                        )}

                        {currentStep === 2 && (
                          <div className="space-y-5 md:space-y-6">
                            <div><label className={labelClass}>College / University *</label><input required type="text" name="college" value={formData.college} onChange={handleChange} className={inputClass} placeholder="University Name" /></div>
                            <div className="relative">
                              <label className={labelClass}>Expected Graduation Year *</label>
                              <div
                                onClick={() => setShowYearDropdown(!showYearDropdown)}
                                className={`${inputClass} cursor-pointer flex justify-between items-center`}
                              >
                                <span className={!formData.year ? "text-[#9C8C84] dark:text-[#555]" : ""}>
                                  {formData.year || "Select Year"}
                                </span>
                                <motion.div animate={{ rotate: showYearDropdown ? 180 : 0 }}>
                                  <ChevronDown size={18} />
                                </motion.div>
                              </div>

                              <AnimatePresence>
                                {showYearDropdown && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className={`absolute z-50 w-full mt-2 p-3 grid grid-cols-3 md:grid-cols-4 gap-2 ${CLAY.radius.lg} ${THEME.cardInset} border border-white/50 dark:border-white/5 shadow-xl`}
                                  >
                                    {graduationYears.map(yr => (
                                      <div
                                        key={yr}
                                        onClick={() => {
                                          setFormData({ ...formData, year: yr });
                                          setShowYearDropdown(false);
                                        }}
                                        className={`${selectableBase} px-2 py-2 font-bold text-xs text-center ${formData.year === yr ? selectableOn : selectableOff
                                          }`}
                                      >
                                        {yr}
                                      </div>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                            <div><label className={labelClass}>Major / Department *</label><input required type="text" name="major" value={formData.major} onChange={handleChange} className={inputClass} placeholder="e.g. Computer Science" /></div>
                            <div><label className={labelClass}>Campus Address / Hostel *</label><input required type="text" name="address" value={formData.address} onChange={handleChange} className={inputClass} placeholder="Room 404, North Campus" /></div>
                          </div>
                        )}

                        {currentStep === 3 && (
                          <div className="space-y-5 md:space-y-6">
                            <div>
                              <label className={labelClass}>Social Media Platforms *</label>
                              <div className="grid grid-cols-2 gap-2">
                                {["Instagram", "Twitter/X", "LinkedIn", "Other"].map((platform) => (
                                  <div key={platform} onClick={() => toggleSocial(platform)} className={`${selectableBase} p-3 font-bold text-xs text-center ${formData.social.includes(platform) ? selectableCheckOn : selectableOff}`}>{platform}</div>
                                ))}
                              </div>
                            </div>
                            <div><label className={labelClass}>Active Clubs / Societies</label><input type="text" name="clubs" value={formData.clubs} onChange={handleChange} className={inputClass} placeholder="Debate Club, Tech Society..." /></div>
                            <div>
                              <label className={labelClass}>Peer Influence Rating (1-10) *</label>
                              <div className="flex flex-wrap gap-2">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                  <div key={num} onClick={() => setFormData({ ...formData, influence: num.toString() })} className={`${selectableBase} w-9 h-9 flex items-center justify-center font-bold text-xs rounded-full ${formData.influence === num.toString() ? selectableOn : selectableOff}`}>{num}</div>
                                ))}
                              </div>
                            </div>
                            <div><label className={labelClass}>Creative Campaign Idea *</label><textarea required name="campaign" value={formData.campaign} onChange={handleChange} className={`${inputClass} min-h-[100px] resize-y`} placeholder="Describe an event to promote Byte..." /></div>
                          </div>
                        )}

                        {currentStep === 4 && (
                          <div className="space-y-5 md:space-y-6">
                            <div>
                              <label className={labelClass}>Weekly Availability *</label>
                              <div className="flex flex-col gap-2">
                                {["Less than 3 hours", "3 - 5 hours", "5 - 7 hours", "7+ hours"].map((avail) => (
                                  <div key={avail} onClick={() => setFormData({ ...formData, availability: avail })} className={`${selectableBase} px-5 py-3 font-bold text-sm ${formData.availability === avail ? selectableOn : selectableOff}`}>{avail}</div>
                                ))}
                              </div>
                            </div>
                            <div className={`${CLAY.spacing.cardSmall} ${CLAY.color.inset} ${CLAY.radius.md} border border-white/50 dark:border-white/5`}>
                              <h4 className={`text-sm font-bold ${THEME.textDark} mb-1`}>Ready to Submit?</h4>
                              <p className={`text-xs ${THEME.textSoft} leading-relaxed`}>
                                By submitting this application, you agree to our program terms. We&apos;re excited to see what you can bring to the campus!
                              </p>
                            </div>
                          </div>
                        )}

                      </motion.form>
                    </AnimatePresence>
                  </div>

                  {/* Navigation */}
                  <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-[#F5EFE8] dark:border-white/10 flex justify-between gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={currentStep === 1 || status === "submitting"}
                      className={`${THEME.btnSecondary} h-12 px-5 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${currentStep === 1 ? "opacity-0 pointer-events-none" : ""}`}
                    >
                      <ArrowLeft size={16} /> Back
                    </button>

                    {currentStep < totalSteps ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStepValid()}
                        className={`${THEME.btnPrimary} h-12 px-6 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 flex-1 sm:flex-none disabled:opacity-50 disabled:active:scale-100`}
                      >
                        Next <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!isStepValid() || status === "submitting"}
                        className={`${THEME.btnPrimary} h-12 px-6 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 flex-1 sm:flex-none disabled:opacity-50 disabled:active:scale-100`}
                      >
                        {status === "submitting" ? (
                          <><Loader2 size={16} className="animate-spin" /> Submitting</>
                        ) : (
                          <>Submit <Send size={16} /></>
                        )}
                      </button>
                    )}
                  </div>

                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
