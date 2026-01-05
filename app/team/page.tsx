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

export default function MeetTeamSection() {
  const clayBg = "bg-[#FFFBF7]";
  const textHeading = "text-[#5C4D45] font-black tracking-tight";
  const textBody = "text-[#9C8C84] font-bold";

  const clayCard =
    "bg-white shadow-[10px_10px_20px_rgba(214,198,186,0.4),_-8px_-8px_16px_rgba(255,255,255,0.8)] rounded-[2rem] border border-white/60 p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[14px_14px_28px_rgba(214,198,186,0.5),_-10px_-10px_20px_rgba(255,255,255,0.9)] h-full";

  const socialBtn =
    "w-10 h-10 rounded-full bg-[#F7F2ED] flex items-center justify-center text-[#9C8C84] shadow-[4px_4px_8px_rgba(214,198,186,0.4),_-2px_-2px_4px_rgba(255,255,255,0.8)] hover:text-[#FF9E75] hover:scale-110 transition-all cursor-pointer active:scale-95 active:shadow-inner";

  const roleBadge =
    "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider mb-3 shadow-sm border border-white/50";

  const teamMembers = [
    {
      id: 1,
      name: "Ansh Rastogi",
      role: "Backend Chef",
      bio: "The architect behind the infrastructure. Orchestrating the API and ensuring the kitchen runs without a hitch.",
      color: "text-[#FF9E75] bg-[#FFF0E6]",
      icon: <Terminal size={18} />,
      image: "https://avatars.githubusercontent.com/u/138712510?v=4",
      github: "",
      linkedin: "",
      x: "",
    },
    {
      id: 2,
      name: "Mathew Manachery",
      role: "Vendor Ops Chef",
      bio: "Bridging the gap between the kitchen and the cloud. Building the tools that power our food partners.",
      color: "text-[#81C784] bg-[#F1F8E9]",
      icon: <Store size={18} />,
      image: "https://avatars.githubusercontent.com/u/69890484?v=4",
      github: "",
      linkedin: "",
      x: "",
    },
    {
      id: 3,
      name: "Abhinav V S",
      role: "Web Experience Chef",
      bio: "Crafting the digital storefront. Ensuring our landing experience is as buttery smooth as the food.",
      color: "text-[#64B5F6] bg-[#E3F2FD]",
      icon: <Monitor size={18} />,
      image: "https://avatars.githubusercontent.com/u/68746325?v=4",
      github: "",
      linkedin: "",
      x: "",
    },
    {
      id: 4,
      name: "Arjun Manjunath",
      role: "Mobile App Chef",
      bio: "The wizard behind the mobile experience. Turning caffeine into Flutter code.",
      color: "text-[#9575CD] bg-[#EDE7F6]",
      icon: <Smartphone size={18} />,
      image: "https://avatars.githubusercontent.com/u/133084134?v=4",
      github: "https://www.github.com/arjunmnath",
      linkedin: "https://www.linkedin.com/in/arjunmnath/",
      x: "",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF7] dark:bg-background selection:bg-orange-100 dark:selection:bg-primary/30 font-sans">
      <Navbar />

      <section className={`w-full my-22 py-20 px-6 ${clayBg} font-sans`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-white shadow-sm text-[#FF9E75] text-xs font-black uppercase tracking-widest border border-[#F5EFE8]"
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
              Meet the <span className="text-[#FF9E75]">Chefs</span> behind the
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
                <div className="w-24 h-24 rounded-full bg-[#F7F2ED] p-1.5 shadow-inner mb-5 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover shadow-md bg-white"
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 border-white ${member.bg} ${member.color}`}
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
                        "noopener,noreferrer",
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
                        "noopener,noreferrer",
                      )
                    }
                  >
                    <Linkedin size={16} strokeWidth={2.5} />
                  </button>
                  <button
                    className={socialBtn}
                    onClick={() =>
                      window.open(member.x, "_blank", "noopener,noreferrer")
                    }
                  >
                    <Twitter size={16} strokeWidth={2.5} />
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
