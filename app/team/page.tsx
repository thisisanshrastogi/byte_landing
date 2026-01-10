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
} from "lucide-react";
import { bg } from "date-fns/locale";

export default function MeetTeamSection() {
  const clayBg = "bg-[#FFFBF7] dark:bg-background";
  const textHeading = "text-[#5C4D45] dark:text-foreground font-black tracking-tight";
  const textBody = "text-[#9C8C84] dark:text-muted-foreground font-bold";

  const clayCard =
    "bg-white dark:bg-card shadow-[10px_10px_20px_rgba(214,198,186,0.4),_-8px_-8px_16px_rgba(255,255,255,0.8)] dark:shadow-[10px_10px_20px_rgba(0,0,0,0.5),_-8px_-8px_16px_rgba(255,255,255,0.05)] rounded-[2rem] border border-white/60 dark:border-white/10 p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[14px_14px_28px_rgba(214,198,186,0.5),_-10px_-10px_20px_rgba(255,255,255,0.9)] dark:hover:shadow-[14px_14px_28px_rgba(0,0,0,0.6),_-10px_-10px_20px_rgba(255,255,255,0.08)] h-full";

  const socialBtn =
    "w-10 h-10 rounded-full bg-[#F7F2ED] dark:bg-muted flex items-center justify-center text-[#9C8C84] dark:text-muted-foreground shadow-[4px_4px_8px_rgba(214,198,186,0.4),_-2px_-2px_4px_rgba(255,255,255,0.8)] dark:shadow-[4px_4px_8px_rgba(0,0,0,0.4),_-2px_-2px_4px_rgba(255,255,255,0.05)] hover:text-[#FF9E75] dark:hover:text-primary hover:scale-110 transition-all cursor-pointer active:scale-95 active:shadow-inner dark:active:shadow-inner";

  const roleBadge =
    "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider mb-3 shadow-sm border border-white/50 dark:border-white/10";

  const teamMembers = [
    {
      id: 1,
      name: "Ansh Rastogi",
      role: "Backend Chef",
      bio: "The architect behind the infrastructure. Orchestrating the API and ensuring the kitchen runs without a hitch.",
      // Warm Clay/Terracotta - ties directly to your main brand color
      color: "text-[#D68C75]",
      bg: "bg-[#FFF0EB] dark:bg-[#D68C75]/10",
      icon: <Terminal size={18} />,
      image: "https://avatars.githubusercontent.com/u/138712510?v=4",
      github: "https://github.com/thisisanshrastogi",
      linkedin: "https://www.linkedin.com/in/thisisanshrastogi/",
    },
    {
      id: 2,
      name: "Mathew Manachery",
      role: "Vendor Ops Chef",
      bio: "Bridging the gap between the kitchen and the cloud. Building the tools that power our food partners.",
      // Dried Basil/Sage - an organic, earthy green that isn't "digital"
      color: "text-[#9AA88E]",
      bg: "bg-[#F2F5F0] dark:bg-[#9AA88E]/10",
      icon: <Store size={18} />,
      image: "https://avatars.githubusercontent.com/u/69890484?v=4",
      github: "https://github.com/mathew2103",
      linkedin: "https://www.linkedin.com/in/mathewmanachery/",
    },
    {
      id: 3,
      name: "Abhinav V S",
      role: "Web Experience Chef",
      bio: "Crafting the digital storefront. Ensuring our landing experience is as buttery smooth as the food.",
      // Toasted Wheat/Gold - warm and inviting for the "frontend"
      color: "text-[#C2A878]",
      bg: "bg-[#FBF8F0] dark:bg-[#C2A878]/10",
      icon: <Monitor size={18} />,
      image: "https://avatars.githubusercontent.com/u/68746325?v=4",
      github: "",
      linkedin: "",
    },
    {
      id: 4,
      name: "Arjun Manjunath",
      role: "Mobile App Chef",
      bio: "The wizard behind the mobile experience. Turning caffeine into Flutter code.",
      // Warm Stone/Taupe - neutral and grounded, avoids the "purple" cliché
      color: "text-[#A89F99]",
      bg: "bg-[#F4F2F0] dark:bg-[#A89F99]/10",
      icon: <Smartphone size={18} />,
      image: "https://avatars.githubusercontent.com/u/133084134?v=4",
      github: "https://www.github.com/arjunmnath",
      linkedin: "https://www.linkedin.com/in/arjunmnath/",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF7] dark:bg-background selection:bg-orange-100 dark:selection:bg-primary/30 font-sans transition-colors duration-300">
      <Navbar />

      <section className={`w-full my-22 py-20 px-6 ${clayBg} font-sans transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-white dark:bg-card shadow-sm text-[#FF9E75] text-xs font-black uppercase tracking-widest border border-[#F5EFE8] dark:border-white/10 dark:text-primary"
            >
              The Kitchen Crew
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-5xl ${textHeading}`}
            >
              Meet the <span className="text-[#FF9E75] dark:text-primary">Chefs</span> behind the
              Code.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className={`max-w-xl mx-auto text-lg ${textBody} font-medium`}
            >
              Trading aprons for IDEs to cook up the smoothest dining experience
              on campus. Powered by code, driven by hunger.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={clayCard}
              >
                <div className="w-24 h-24 rounded-full bg-[#F7F2ED] dark:bg-muted p-1.5 shadow-inner dark:shadow-inner mb-5 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover shadow-md bg-white dark:bg-card"
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 border-white dark:border-card ${member.bg} ${member.color}`}
                  >
                    {member.icon}
                  </div>
                </div>

                <div className={textHeading}>
                  <h3 className="text-lg mb-2">{member.name}</h3>
                  <span
                    className={`${roleBadge} ${member.bg} ${member.color} inline-block`}
                  >
                    {member.role}
                  </span>
                </div>

                <p
                  className={`text-xs ${textBody} mb-6 leading-relaxed flex-grow`}
                >
                  {member.bio}
                </p>

                <div className="flex gap-3 mt-auto">
                  <button
                    className={socialBtn}
                    onClick={() =>
                      window.open(
                        member.github,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  >
                    <Github size={16} strokeWidth={2.5} />
                  </button>
                  <button
                    className={socialBtn}
                    onClick={() =>
                      window.open(
                        member.linkedin,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  >
                    <Linkedin size={16} strokeWidth={2.5} />
                  </button>
                 
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
