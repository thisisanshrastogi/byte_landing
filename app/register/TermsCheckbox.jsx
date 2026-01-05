"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export default function TermsCheckbox({
  isChecked: controlledChecked,
  onChange,
}) {
  const [internalChecked, setInternalChecked] = useState(false);

  const isChecked =
    controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleToggle = () => {
    const newState = !isChecked;
    setInternalChecked(newState);
    if (onChange) onChange(newState);
  };

  const uncheckedStyle =
    "bg-[#F7F2ED] shadow-[inset_3px_3px_6px_rgba(214,198,186,0.5),_inset_-3px_-3px_6px_rgba(255,255,255,0.8)] border-transparent";

  // Checked: Popped "Out" (Button)
  const checkedStyle =
    "bg-[#FF9E75] shadow-[4px_4px_8px_rgba(255,158,117,0.4),_-2px_-2px_4px_rgba(255,255,255,0.4)] border-[#FF9E75]";

  return (
    <div
      onClick={handleToggle}
      className="flex items-center gap-3 cursor-pointer group select-none"
    >
      <div
        className={`relative w-6 h-6 rounded-[0.6rem] border-2 transition-all duration-300 flex items-center justify-center shrink-0 mt-0.5 ${isChecked ? checkedStyle : uncheckedStyle}`}
      >
        <AnimatePresence>
          {isChecked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Check size={14} strokeWidth={4} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-sm font-bold text-[#9C8C84] leading-tight">
        <span>I agree to the </span>
        <a
          href=""
          onClick={() =>
            window.open("/disclaimer", "_blank", "noopener,noreferrer")
          }
          className="text-[#FF9E75] hover:underline decoration-2 underline-offset-2"
        >
          Terms of Service
        </a>
        <span> and </span>
        <a
          href=""
          onClick={() =>
            window.open("/privacy", "_blank", "noopener,noreferrer")
          }
          className="text-[#FF9E75] hover:underline decoration-2 underline-offset-2"
        >
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
