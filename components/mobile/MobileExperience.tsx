"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Building2, ChevronDown, ChevronUp } from "lucide-react";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  type: string;
  duration: string;
  location: string;
  workType: string;
  intro: string;
  items?: string[];
  notes?: string[];
  footerNote?: string;
  tags: string[];
  current?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    id: "npst",
    role: "Software Development Engineer | Flutter",
    company: "NPST (Banking & Payment Solutions)",
    type: "Full-time",
    duration: "Sep 2025 – Present · 1 yr",
    location: "Bengaluru, India",
    workType: "On-site",
    intro:
      "At NPST, I develop Canara Bank's mobile fintech banking features 🏦 — keeping high-concurrency transaction flows fluid and secure.",
    items: [
      "Fixed Deposit & Recurring Deposit",
      "Goal Based Recurring Deposit",
      "Tax Based Deposit",
      "Block account & Locker Application",
      "Public Provident Fund & SSY Scheme",
      "Nominee Maintenance & Angel Family Banking",
      "Transaction Dispute Management",
      "Debit and Credit Card Controls",
      "Customer ReKYC Flow",
      "3-Factor Authentication for Payments",
    ],
    footerNote: "These features are actively used by 60 Million+ banking users 🥺✨",
    tags: [
      "Flutter",
      "Canara Bank (60M+ Users)",
      "FinTech & UPI",
      "3-Factor Auth",
      "Mobile Banking",
    ],
    current: true,
  },
  {
    id: "thiran",
    role: "Mobile Application Developer",
    company: "Thiran Technologies",
    type: "Full-time · 2 yrs 2 mos",
    duration: "Feb 2024 – Sep 2025 · 1 yr 8 mos",
    location: "Chennai, India",
    workType: "On-site",
    intro:
      "Engineered offline mobile capabilities and AI assistant integrations for enterprise products.",
    notes: [
      "Integrated and tuned offline Voice Assistant 'TAM' using on-device AI models.",
      "Engineered end-to-end Video Call services in Flutter with ZEGO SDK.",
      "Integrated IBM MAXIMO REST API backend services with Clean Architecture.",
      "Built Cognitive Dashboard with real-time GPS coordinate mapping.",
    ],
    tags: [
      "Flutter",
      "Offline Voice AI 'TAM'",
      "ZEGO SDK Video",
      "IBM MAXIMO",
      "Clean Architecture",
    ],
  },
  {
    id: "doodleblue",
    role: "Mobile Application Developer",
    company: "doodleblue Innovations",
    type: "Internship",
    duration: "Jan 2023 – Aug 2023 · 8 mos",
    location: "Chennai, India",
    workType: "On-site",
    intro: "Deep dive into production Flutter and native iOS (Swift) applications.",
    notes: [
      "Developed UI components and business logic for cross-platform apps across Android, iOS, and Web.",
      "Integrated REST APIs with robust error handling and local caching.",
    ],
    tags: ["Flutter", "iOS / Swift", "REST API", "Android & Web"],
  },
  {
    id: "bulltech",
    role: "Flutter Developer",
    company: "Bull Tech",
    type: "Internship",
    duration: "Sep 2022 – Dec 2022 · 4 mos",
    location: "Chennai, India",
    workType: "Remote",
    intro: "Built cryptocurrency portfolio and tracking application.",
    notes: [
      "Integrated Coinbase API for live cryptocurrency price feeds and interactive charts.",
      "Added real-time currency conversion and custom watchlist persistence with Firebase.",
    ],
    tags: ["Flutter", "Firebase Auth", "Coinbase API", "Wishlist"],
  },
];

export default function MobileExperience() {
  const [expandedFeatures, setExpandedFeatures] = useState(false);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Mobile Section Header */}
      <div className="text-left">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
            03 / Experience
          </span>
          <span className="w-8 h-[1px] bg-rose-500/40" />
        </div>
        <h2
          className="text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight leading-none mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          CAREER <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500">TIMELINE</span> & IMPACT
        </h2>
        <p
          className="text-rose-400 text-lg font-normal select-none"
          style={{ fontFamily: "var(--font-cursive)" }}
        >
          Real-world product engineering & LinkedIn verified history
        </p>
      </div>

      {/* Timeline Cards */}
      <div className="flex flex-col gap-4">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`p-5 rounded-2xl bg-[#131316] border shadow-md flex flex-col justify-between ${
              exp.current ? "border-rose-500/30" : "border-white/[0.08]"
            }`}
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-base font-bold text-white leading-snug">{exp.role}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-rose-400 font-medium mt-0.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{exp.company}</span>
                  </div>
                </div>

                {exp.current && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono whitespace-nowrap">
                    Current
                  </span>
                )}
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-neutral-400 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-rose-400" />
                  <span>{exp.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-neutral-500" />
                  <span>{exp.location}</span>
                </div>
              </div>

              {/* Intro */}
              <p className="text-neutral-300 text-xs leading-relaxed mb-3">{exp.intro}</p>

              {/* NPST Features Accordion */}
              {exp.items && (
                <div className="mb-3">
                  <button
                    onClick={() => setExpandedFeatures(!expandedFeatures)}
                    className="w-full p-3 rounded-xl bg-[#0c0c0f] border border-white/[0.06] flex items-center justify-between text-xs font-mono text-rose-400 cursor-pointer"
                  >
                    <span>
                      {expandedFeatures
                        ? "Hide Banking Features"
                        : `View ${exp.items.length} Banking Features (60M+ Users)`}
                    </span>
                    {expandedFeatures ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedFeatures && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="p-3 mt-2 rounded-xl bg-[#0a0a0c] border border-white/[0.04] space-y-1.5 text-xs text-neutral-300 font-mono"
                      >
                        {exp.items.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-rose-500 font-bold">{idx + 1}.</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Bullet Points for other roles */}
              {exp.notes && (
                <div className="space-y-2 mb-3">
                  {exp.notes.map((note, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0 mt-1.5" />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              )}

              {exp.footerNote && (
                <p className="text-[11px] font-mono text-neutral-400 italic mb-3 pt-2 border-t border-white/[0.04]">
                  {exp.footerNote}
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 pt-3 border-t border-white/[0.06]">
              {exp.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-neutral-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
