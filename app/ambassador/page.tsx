"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackgroundElements } from "@/components/background-element";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, Users, Handshake, Gift, Megaphone, Send, ArrowRight, ArrowLeft } from "lucide-react";

const THEME = {
  bg: "bg-[#FFFBF7] dark:bg-[#050505]",
  card: "bg-[#FFFBF7] dark:bg-[#121212] shadow-[8px_8px_16px_rgba(214,198,186,0.5),_-4px_-4px_12px_rgba(255,255,255,0.8)] dark:shadow-none border border-white dark:border-white/10",
  cardInset: "bg-[#F5EFE8] dark:bg-[#0a0a0a] shadow-[inset_4px_4px_8px_rgba(204,190,178,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.8)] dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8)]",
  input:
    "w-full bg-[#F5EFE8] dark:bg-[#0a0a0a] shadow-[inset_4px_4px_8px_rgba(204,190,178,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.8)] dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8)] rounded-[1.5rem] px-5 md:px-6 py-3 md:py-4 outline-none focus:ring-2 focus:ring-[#FF9E75]/50 transition-all text-[#5C4D45] dark:text-[#EDEDED] font-bold placeholder:text-[#9C8C84] dark:placeholder:text-[#555] text-sm md:text-base",
  btnPrimary:
    "bg-[#FF9E75] dark:bg-[#ff7c50] text-white shadow-[6px_6px_12px_rgba(255,158,117,0.4),_-2px_-2px_6px_rgba(255,255,255,0.4)] dark:shadow-none hover:bg-[#FF9E75]/90 active:scale-95 transition-all rounded-full h-12 px-5 md:px-6 text-sm md:text-base font-black uppercase tracking-wider flex items-center justify-center gap-2",
  btnSecondary:
    "bg-[#F5EFE8] dark:bg-[#1a1a1a] text-[#5C4D45] dark:text-[#E0E0E0] border border-white dark:border-white/10 hover:bg-[#ebe0d6] dark:hover:bg-[#252525] active:scale-95 transition-all rounded-full h-12 px-5 md:px-6 text-sm md:text-base font-black uppercase tracking-wider flex items-center justify-center gap-2",
  textDark: "text-[#5C4D45] dark:text-[#EDEDED]",
  textSoft: "text-[#9C8C84] dark:text-[#A1A1AA]",
  selectableUnselected: "bg-white dark:bg-[#1a1a1a] text-[#5C4D45] dark:text-[#E0E0E0] border-white dark:border-white/10 hover:bg-[#F5EFE8] dark:hover:bg-[#252525]",
  selectableSelected: "bg-[#FF9E75] dark:bg-[#ff7c50] text-white border-transparent shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)] dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4)]",
  selectableCheckboxSelected: "bg-[#FFF0E6] dark:bg-[#3a2015] text-[#FF9E75] dark:text-[#ff7c50] border-[#FF9E75] dark:border-[#ff7c50] shadow-[inset_2px_2px_5px_rgba(255,158,117,0.2)]",
};

export default function AmbassadorPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

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
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <div className={`min-h-screen font-sans relative ${THEME.bg} overflow-hidden`}>
      <Navbar />
      <BackgroundElements />

      {/* Abstract Poster Background Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFCCBC]/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#81C784]/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <main className="relative z-10 pt-32 md:pt-36 pb-24 px-4 md:px-16 lg:px-24 max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* LEFT COLUMN - Poster Aesthetic */}
        <div className="lg:w-5/12 lg:sticky lg:top-36 h-fit flex flex-col gap-8">
          <div className="relative">
            <div className="absolute -top-6 -left-6 text-[#FF9E75] opacity-50 rotate-[-15deg]">
              <Megaphone size={40} strokeWidth={1.5} />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-serif text-[#FF9E75] dark:text-[#ff7c50] italic tracking-tight mb-2">
              Looking for
            </h2>
            <h1 className={`text-[2.8rem] leading-[1] md:text-7xl font-black ${THEME.textDark} md:leading-[0.9] tracking-tighter uppercase`}>
              Student <br /> Ambassadors
            </h1>
            <p className={`mt-6 text-base md:text-lg font-medium ${THEME.textSoft}`}>
              Help Byte grow on your campus and make an impact. Be a part of the Byte team!
            </p>
          </div>

          <div className="flex flex-col gap-4 md:gap-5 mt-2 md:mt-4">
            <div className={`p-4 md:p-5 rounded-[2rem] ${THEME.card} flex items-center gap-4 md:gap-5 hover:-translate-y-1 transition-transform`}>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#FFE0B2] dark:bg-[#4a2e0a] text-[#F57C00] dark:text-[#ffb74d] shadow-[4px_4px_8px_rgba(255,152,0,0.3)] dark:shadow-none flex items-center justify-center shrink-0">
                <Users size={24} />
              </div>
              <div>
                <h3 className={`text-xs md:text-sm font-black uppercase ${THEME.textDark} tracking-widest mb-1`}>Bring Byte to Your Campus</h3>
                <p className={`text-[11px] md:text-xs font-bold ${THEME.textSoft} leading-snug`}>Be the bridge between Byte and your peers.</p>
              </div>
            </div>
            <div className={`p-4 md:p-5 rounded-[2rem] ${THEME.card} flex items-center gap-4 md:gap-5 hover:-translate-y-1 transition-transform`}>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#C8E6C9] dark:bg-[#1b3e20] text-[#388E3C] dark:text-[#81c784] shadow-[4px_4px_8px_rgba(76,175,80,0.3)] dark:shadow-none flex items-center justify-center shrink-0">
                <Handshake size={24} />
              </div>
              <div>
                <h3 className={`text-xs md:text-sm font-black uppercase ${THEME.textDark} tracking-widest mb-1`}>Build Your Network</h3>
                <p className={`text-[11px] md:text-xs font-bold ${THEME.textSoft} leading-snug`}>Connect with amazing people and opportunities.</p>
              </div>
            </div>
            <div className={`p-4 md:p-5 rounded-[2rem] ${THEME.card} flex items-center gap-4 md:gap-5 hover:-translate-y-1 transition-transform`}>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#C5CAE9] dark:bg-[#1a237e] text-[#3F51B5] dark:text-[#7986cb] shadow-[4px_4px_8px_rgba(63,81,181,0.3)] dark:shadow-none flex items-center justify-center shrink-0">
                <Gift size={24} />
              </div>
              <div>
                <h3 className={`text-xs md:text-sm font-black uppercase ${THEME.textDark} tracking-widest mb-1`}>Access Exclusive Perks</h3>
                <p className={`text-[11px] md:text-xs font-bold ${THEME.textSoft} leading-snug`}>Enjoy rewards, swag, and special privileges.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Multi-step Form */}
        <div className="lg:w-7/12 flex flex-col justify-center min-h-[600px] mt-6 lg:mt-0">
          <div className={`px-5 py-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] ${THEME.card} flex flex-col min-h-[520px] h-full relative overflow-hidden`}>
            
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center my-auto py-20"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-[#EAF8E6] dark:bg-[#1b3e20] text-[#4CAF50] dark:text-[#81c784] rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <CheckCircle size={40} strokeWidth={3} className="md:w-12 md:h-12" />
                  </div>
                  <h2 className={`text-3xl md:text-4xl font-black ${THEME.textDark} mb-4`}>Application Sent!</h2>
                  <p className={`text-base md:text-lg font-medium ${THEME.textSoft} max-w-sm`}>
                    Welcome to the pipeline! We will review your application and be in touch soon.
                  </p>
                </motion.div>
              ) : (
                <div key="form-container" className="flex flex-col h-full flex-1">
                  
                  {/* Progress Bar Header */}
                  <div className="mb-6 md:mb-8">
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-end gap-2 sm:gap-4 mb-4">
                      <h3 className={`text-xl md:text-2xl font-black ${THEME.textDark}`}>
                        {currentStep === 1 && "1. Personal Info"}
                        {currentStep === 2 && "2. Academic Profile"}
                        {currentStep === 3 && "3. Influence & Strategy"}
                        {currentStep === 4 && "4. Final Details"}
                      </h3>
                      <span className={`w-fit text-[10px] md:text-xs font-black ${THEME.textSoft} uppercase tracking-widest bg-[#F5EFE8] dark:bg-[#1a1a1a] px-3 py-1.5 rounded-full`}>
                        Step {currentStep} of {totalSteps}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#F5EFE8] dark:bg-[#1a1a1a] rounded-full overflow-hidden shadow-inner">
                      <motion.div
                        className="h-full bg-[#FF9E75] dark:bg-[#ff7c50] rounded-full shadow-[0_0_10px_#FF9E75]"
                        initial={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
                        animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Form Steps Carousel */}
                  <div className="flex-1 relative overflow-hidden flex flex-col -mx-4 px-4 py-2 -my-2">
                    <AnimatePresence custom={1} mode="wait">
                      <motion.form
                        key={`step-${currentStep}`}
                        custom={1}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="space-y-5 md:space-y-6 flex-1 py-2 px-2"
                        onSubmit={handleSubmit}
                      >
                        
                        {/* STEP 1 */}
                        {currentStep === 1 && (
                          <div className="space-y-5 md:space-y-6">
                            <div>
                              <label className={`block text-[10px] md:text-xs font-black uppercase tracking-widest ${THEME.textDark} mb-2 md:mb-3 pl-2`}>Full Name *</label>
                              <input required type="text" name="name" value={formData.name} onChange={handleChange} className={THEME.input} placeholder="John Doe" />
                            </div>
                            <div>
                              <label className={`block text-[10px] md:text-xs font-black uppercase tracking-widest ${THEME.textDark} mb-2 md:mb-3 pl-2`}>Email Address *</label>
                              <input required type="email" name="email" value={formData.email} onChange={handleChange} className={THEME.input} placeholder="john@example.com" />
                            </div>
                            <div>
                              <label className={`block text-[10px] md:text-xs font-black uppercase tracking-widest ${THEME.textDark} mb-2 md:mb-3 pl-2`}>Phone Number *</label>
                              <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className={THEME.input} placeholder="+1 234 567 8900" />
                            </div>
                          </div>
                        )}

                        {/* STEP 2 */}
                        {currentStep === 2 && (
                          <div className="space-y-5 md:space-y-6">
                            <div>
                              <label className={`block text-[10px] md:text-xs font-black uppercase tracking-widest ${THEME.textDark} mb-2 md:mb-3 pl-2`}>College / University *</label>
                              <input required type="text" name="college" value={formData.college} onChange={handleChange} className={THEME.input} placeholder="University Name" />
                            </div>

                            <div>
                              <label className={`block text-[10px] md:text-xs font-black uppercase tracking-widest ${THEME.textDark} mb-2 md:mb-3 pl-2`}>Year of Study *</label>
                              <div className="flex flex-wrap gap-2 md:gap-3">
                                {["First Year", "Second Year", "Third Year", "Final Year (Undergraduate)", "Postgraduate Student"].map((yr) => (
                                  <div
                                    key={yr}
                                    onClick={() => setFormData({ ...formData, year: yr })}
                                    className={`cursor-pointer px-3 md:px-4 py-2 rounded-xl md:rounded-[1rem] font-bold text-xs md:text-sm transition-all shadow-sm border ${
                                      formData.year === yr ? THEME.selectableSelected : THEME.selectableUnselected
                                    }`}
                                  >
                                    {yr}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className={`block text-[10px] md:text-xs font-black uppercase tracking-widest ${THEME.textDark} mb-2 md:mb-3 pl-2`}>Major / Department *</label>
                              <input required type="text" name="major" value={formData.major} onChange={handleChange} className={THEME.input} placeholder="e.g. Computer Science" />
                            </div>
                            
                            <div>
                              <label className={`block text-[10px] md:text-xs font-black uppercase tracking-widest ${THEME.textDark} mb-2 md:mb-3 pl-2`}>Campus Address / Hostel *</label>
                              <input required type="text" name="address" value={formData.address} onChange={handleChange} className={THEME.input} placeholder="Room 404, North Campus" />
                            </div>
                          </div>
                        )}

                        {/* STEP 3 */}
                        {currentStep === 3 && (
                          <div className="space-y-5 md:space-y-6">
                            <div>
                              <label className={`block text-[10px] md:text-xs font-black uppercase tracking-widest ${THEME.textDark} mb-2 md:mb-3 pl-2`}>Social Media Platforms *</label>
                              <div className="grid grid-cols-2 gap-2 md:gap-3">
                                {["Instagram", "Twitter/X", "LinkedIn", "Other"].map((platform) => (
                                  <div
                                    key={platform}
                                    onClick={() => toggleSocial(platform)}
                                    className={`cursor-pointer p-3 rounded-[1rem] md:rounded-[1.2rem] font-bold text-xs md:text-sm flex items-center justify-center transition-all shadow-sm border ${
                                      formData.social.includes(platform) ? THEME.selectableCheckboxSelected : THEME.selectableUnselected
                                    }`}
                                  >
                                    {platform}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className={`block text-[10px] md:text-xs font-black uppercase tracking-widest ${THEME.textDark} mb-2 md:mb-3 pl-2`}>Active Clubs / Societies</label>
                              <input type="text" name="clubs" value={formData.clubs} onChange={handleChange} className={THEME.input} placeholder="Debate Club, Tech Society..." />
                            </div>

                            <div>
                              <label className={`block text-[10px] md:text-xs font-black uppercase tracking-widest ${THEME.textDark} mb-2 md:mb-3 pl-2`}>Peer Influence Rating (1-10) *</label>
                              <div className="flex flex-wrap gap-1.5 md:gap-2">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                  <div
                                    key={num}
                                    onClick={() => setFormData({ ...formData, influence: num.toString() })}
                                    className={`cursor-pointer w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-black text-xs md:text-sm transition-all shadow-sm border ${
                                      formData.influence === num.toString() ? THEME.selectableSelected + " scale-110" : THEME.selectableUnselected
                                    }`}
                                  >
                                    {num}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className={`block text-[10px] md:text-xs font-black uppercase tracking-widest ${THEME.textDark} mb-2 md:mb-3 pl-2`}>Creative Campaign Idea (Min. 100 words) *</label>
                              <textarea required name="campaign" value={formData.campaign} onChange={handleChange} className={`${THEME.input} min-h-[100px] md:min-h-[120px] resize-y py-3 md:py-4`} placeholder="Describe an event to promote Byte..." />
                            </div>
                          </div>
                        )}

                        {/* STEP 4 */}
                        {currentStep === 4 && (
                          <div className="space-y-5 md:space-y-6">
                            <div>
                              <label className={`block text-[10px] md:text-xs font-black uppercase tracking-widest ${THEME.textDark} mb-2 md:mb-3 pl-2`}>Weekly Availability *</label>
                              <div className="flex flex-col gap-2 md:gap-3">
                                {["Less than 3 hours", "3 - 5 hours", "5 - 7 hours", "7+ hours"].map((avail) => (
                                  <div
                                    key={avail}
                                    onClick={() => setFormData({ ...formData, availability: avail })}
                                    className={`cursor-pointer px-4 md:px-6 py-3 md:py-4 rounded-[1.2rem] md:rounded-[1.5rem] font-bold text-xs md:text-sm transition-all shadow-sm border ${
                                      formData.availability === avail ? THEME.selectableSelected : THEME.selectableUnselected
                                    }`}
                                  >
                                    {avail}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="p-4 md:p-6 bg-[#F5EFE8] dark:bg-[#1a1a1a] rounded-[1.5rem] md:rounded-[2rem] shadow-inner border border-white/50 dark:border-white/5 mt-4 md:mt-6">
                              <h4 className={`text-sm md:text-base font-black ${THEME.textDark} mb-1 md:mb-2`}>Ready to Submit?</h4>
                              <p className={`text-xs md:text-sm font-bold ${THEME.textSoft} leading-relaxed`}>
                                By submitting this application, you agree to our program terms. We're excited to see what you can bring to the campus!
                              </p>
                            </div>
                          </div>
                        )}

                      </motion.form>
                    </AnimatePresence>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t-2 border-[#F5EFE8] dark:border-[#252525] flex justify-between gap-3 md:gap-4 shrink-0">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={currentStep === 1 || status === "submitting"}
                      className={`${THEME.btnSecondary} ${currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                    >
                      <ArrowLeft size={16} className="md:w-[18px] md:h-[18px]" /> Back
                    </button>

                    {currentStep < totalSteps ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStepValid()}
                        className={`${THEME.btnPrimary} flex-1 sm:flex-none disabled:opacity-50 disabled:active:scale-100`}
                      >
                        Next <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!isStepValid() || status === "submitting"}
                        className={`${THEME.btnPrimary} flex-1 sm:flex-none disabled:opacity-50 disabled:active:scale-100`}
                      >
                        {status === "submitting" ? (
                          <><Loader2 size={16} className="animate-spin md:w-[18px] md:h-[18px]" /> Submitting</>
                        ) : (
                          <>Submit <Send size={16} className="md:w-[18px] md:h-[18px]" /></>
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
