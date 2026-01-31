"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Smartphone,
  Monitor,
  Store,
  Terminal,
  Code2,
} from "lucide-react";

// --- DESIGN TOKENS ---
const THEME = {
  // Backgrounds
  bg: "bg-[#FFFBF7] dark:bg-[#050505] transition-colors duration-500",

  // The Clay Card
  card: "bg-[#FFFBF7] dark:bg-[#121212] shadow-[8px_8px_16px_rgba(214,198,186,0.5),_-4px_-4px_12px_rgba(255,255,255,0.8)] dark:shadow-none border border-white dark:border-white/10 relative overflow-hidden",

  // The "Pressed" Well (for images)
  inset:
    "bg-[#F5EFE8] dark:bg-[#0a0a0a] shadow-[inset_4px_4px_8px_rgba(204,190,178,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.8)] dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.8)]",

  // Typography
  heading: "text-[#5C4D45] dark:text-[#E0E0E0] font-black tracking-tight",
  body: "text-[#9C8C84] dark:text-[#A1A1AA] font-bold",

  // Buttons
  socialBtn:
    "w-10 h-10 rounded-full bg-[#F5EFE8] dark:bg-[#1A1A1A] flex items-center justify-center text-[#9C8C84] dark:text-[#888] shadow-[4px_4px_8px_rgba(214,198,186,0.5),_-2px_-2px_6px_rgba(255,255,255,0.8)] dark:shadow-none dark:border dark:border-white/5 hover:text-[#FF9E75] dark:hover:text-[#FF9E75] hover:scale-110 active:scale-95 transition-all",
};

const teamMembers = [
  {
    id: 1,
    name: "Ansh Rastogi",
    role: "Backend Chef",
    bio: "The architect behind the infrastructure. Orchestrating the API and ensuring the kitchen runs without a hitch.",
    // Terracotta Theme
    color: "text-[#D68C75]",
    bg: "bg-[#FFF0EB] dark:bg-[#D68C75]/10",
    border: "border-[#D68C75]/20",
    icon: <Terminal size={18} />,
    image: "https://avatars.githubusercontent.com/u/138712510?v=4",
    links: {
      github: "https://github.com/thisisanshrastogi",
      linkedin: "https://www.linkedin.com/in/thisisanshrastogi/",
      twitter: null,
    },
  },
  {
    id: 2,
    name: "Mathew Manachery",
    role: "Vendor Ops Chef",
    bio: "Bridging the gap between the kitchen and the cloud. Building the tools that power our food partners.",
    // Sage Theme
    color: "text-[#81C784]",
    bg: "bg-[#F2F9F2] dark:bg-[#81C784]/10",
    border: "border-[#81C784]/20",
    icon: <Store size={18} />,
    image: "https://avatars.githubusercontent.com/u/69890484?v=4",
    links: {
      github: "https://github.com/mathew2103",
      linkedin: "https://www.linkedin.com/in/mathewmanachery",
      twitter: null,
    },
  },
  {
    id: 3,
    name: "Abhinav V S",
    role: "Web Experience Chef",
    bio: "Crafting the digital storefront. Ensuring our landing experience is as buttery smooth as the food.",
    // Honey/Gold Theme
    color: "text-[#EDAA55]",
    bg: "bg-[#FFF8E1] dark:bg-[#EDAA55]/10",
    border: "border-[#EDAA55]/20",
    icon: <Monitor size={18} />,
    image: "https://avatars.githubusercontent.com/u/68746325?v=4",
    links: {
      github: "https://github.com/vs-abhinav-dev",
      linkedin: "https://www.linkedin.com/in/vs-abhinav-dev",
      twitter: null,
    },
  },
  {
    id: 4,
    name: "Arjun Manjunath",
    role: "Mobile App Chef",
    bio: "The wizard behind the mobile experience. Turning caffeine into Flutter code.",
    // Lavender Theme (Distinct from background)
    color: "text-[#9575CD]",
    bg: "bg-[#F3E5F5] dark:bg-[#9575CD]/10",
    border: "border-[#9575CD]/20",
    icon: <Smartphone size={18} />,
    image: "https://avatars.githubusercontent.com/u/133084134?v=4",
    links: {
      github: "https://www.github.com/arjunmnath",
      linkedin: "https://www.linkedin.com/in/arjunmnath/",
      twitter: null,
    },
  },
];

export default function MeetTeamSection() {
  return (
    <div
      className={`min-h-screen ${THEME.bg} font-sans selection:bg-[#FF9E75]/30`}
    >
      <Navbar />

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#FF9E75]/10 dark:bg-[#FF9E75]/5 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-[#D6C6BA]/20 dark:bg-[#D6C6BA]/5 blur-[100px] rounded-full"></div>
      </div>

      <section className="relative z-10 w-full py-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20 space-y-6 mt-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-white/50 dark:border-white/10 shadow-sm"
            >
              <Code2 size={14} className="text-[#FF9E75]" />
              <span className="text-[#FF9E75] text-[10px] font-black uppercase tracking-widest">
                The Kitchen Crew
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-6xl ${THEME.heading}`}
            >
              Meet the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9E75] to-[#FF7043]">
                Chefs
              </span>{" "}
              behind the Code.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className={`max-w-xl mx-auto text-lg md:text-xl ${THEME.body} leading-relaxed`}
            >
              Trading aprons for IDEs to cook up the smoothest dining experience
              on campus. Powered by code, driven by hunger.
            </motion.p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  duration: 0.8,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className={`group rounded-[2.5rem] p-6 flex flex-col items-center text-center h-full ${THEME.card}`}
              >
                {/* Image Well */}
                <div
                  className={`w-28 h-28 rounded-full p-2 mb-6 relative ${THEME.inset}`}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover shadow-sm bg-white dark:bg-[#222]"
                  />
                  {/* Floating Icon Badge */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className={`absolute -bottom-1 -right-1 w-9 h-9 rounded-full flex items-center justify-center shadow-md border-2 border-white dark:border-[#121212] ${member.bg} ${member.color}`}
                  >
                    {member.icon}
                  </motion.div>
                </div>

                {/* Info */}
                <div className="w-full">
                  <h3 className={`text-xl mb-3 ${THEME.heading}`}>
                    {member.name}
                  </h3>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-4 border ${member.bg} ${member.color} ${member.border}`}
                  >
                    {member.role}
                  </span>
                </div>

                <p
                  className={`text-sm ${THEME.body} mb-8 leading-relaxed flex-grow`}
                >
                  {member.bio}
                </p>

                {/* Social Actions */}
                <div className="flex gap-3 mt-auto">
                  {member.links.github && (
                    <a
                      href={member.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={THEME.socialBtn}
                      aria-label={`${member.name}'s Github`}
                    >
                      <Github size={18} strokeWidth={2.5} />
                    </a>
                  )}
                  {member.links.linkedin && (
                    <a
                      href={member.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={THEME.socialBtn}
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin size={18} strokeWidth={2.5} />
                    </a>
                  )}
                  {member.links.twitter && (
                    <a
                      href={member.links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={THEME.socialBtn}
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <Twitter size={18} strokeWidth={2.5} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
