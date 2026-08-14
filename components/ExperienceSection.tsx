"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Sparkles, Building2, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ExperienceItem {
  duration: string;
  role: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
  companyImage?: string;
  current?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    duration: "Sep 2025 – Present",
    role: "Software Development Engineer",
    company: "NPST (Network People Services Technologies Ltd.)",
    location: "Bengaluru, India",
    description:
      "Working on Canara Bank's flagship FinTech product with an active user base of 80 Million+ people. Architecting core UPI & Mobile banking modules, integrated Voice Assistant 'TAM' with offline AI model capabilities, implemented high-security Video Call banking via ZEGO SDK, and built cognitive dashboards.",
    tags: ["Flutter", "FinTech", "UPI (80M+ Users)", "Canara Bank", "Voice AI TAM", "ZEGO SDK", "IBM Maximo"],
    companyImage: "/assets/company-npst.png",
    current: true,
  },
  {
    duration: "Feb 2024 – Sep 2025",
    role: "Mobile Application Developer",
    company: "Thiran Technologies",
    location: "Chennai, India",
    description:
      "Key engineering role delivering high-reliability production Flutter apps. Integrated Voice Assistant 'TAM' using offline Voice SDKs, developed end-to-end video communication channels with ZEGO SDK, and built real-time geolocation cognitive mapping systems.",
    tags: ["Flutter", "Voice AI", "ZEGO SDK", "Clean Architecture", "REST APIs"],
    companyImage: "/assets/company-thiran.png",
  },
  {
    duration: "Aug 2023 – Feb 2024",
    role: "Trainee Mobile Developer",
    company: "Thiran Technologies",
    location: "Chennai, India",
    description:
      "Engineered cross-platform mobile apps for Android and iOS using Riverpod State Management, SQLite/Drift local databases, and GoRouter. Optimized data processing performance using Dart Isolates for background concurrency.",
    tags: ["Flutter", "Riverpod", "Drift / SQLite", "Isolates", "Adaptive UI"],
    companyImage: "/assets/company-thiran.png",
  },
  {
    duration: "Jan 2023 – Aug 2023",
    role: "Mobile Application Developer",
    company: "doodleblue Innovations",
    location: "Chennai, India",
    description:
      "Developed client-facing mobile applications for Android, iOS, and Web platforms using Flutter and native Swift with complex REST API integrations.",
    tags: ["Flutter", "iOS / Swift", "REST APIs", "State Management"],
    companyImage: "/assets/company-doodleblue.png",
  },
  {
    duration: "Sep 2022 – Dec 2022",
    role: "Flutter Developer",
    company: "Bull Tech Pvt Ltd",
    location: "Chennai, India",
    description:
      "Constructed Cryptocurrency mobile application with Firebase Authentication, Coinbase API integration for live crypto market pricing, currency exchange conversions, and interactive financial feeds.",
    tags: ["Flutter", "Firebase", "Coinbase API", "Crypto"],
    companyImage: "/assets/company-bulltech.png",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
                03 / Experience
              </span>
              <span className="w-12 h-[1px] bg-rose-500/40" />
            </div>
            <h2
              className="text-5xl sm:text-6xl md:text-7xl font-bold uppercase text-white tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              CAREER <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500">TIMELINE</span> & IMPACT
            </h2>
          </div>

          <p
            className="text-rose-400 text-xl sm:text-2xl font-normal select-none"
            style={{ fontFamily: "var(--font-cursive)" }}
          >
            Building products trusted by millions of users
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative pl-6 sm:pl-10 border-l border-white/[0.12] space-y-12 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline Indicator Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-6 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  exp.current
                    ? "bg-rose-500 border-white shadow-[0_0_12px_rgba(244,63,94,0.8)] scale-110"
                    : "bg-[#141417] border-white/30 group-hover:border-rose-400"
                }`}
              />

              {/* Experience Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#131316] border border-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors">
                      {exp.role}
                    </span>
                    {exp.current && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                        Current Role
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                    <Calendar className="w-3.5 h-3.5 text-rose-400" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 mb-4">
                  <div className="flex items-center gap-1 text-white">
                    <Building2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>{exp.company}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] font-mono text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
