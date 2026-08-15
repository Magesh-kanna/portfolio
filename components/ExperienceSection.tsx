"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Building2,
} from "lucide-react";
import MobileExperience from "@/components/mobile/MobileExperience";

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
    role: "Software Development Engineer | Flutter Developer",
    company: "Network People Services Technologies Ltd. (NPST- Banking and Payment Solutions)",
    type: "Full-time",
    duration: "Sep 2025 – Present · 1 yr",
    location: "Bengaluru, Karnataka, India",
    workType: "On-site",
    intro:
      "In NPST, I'm currently working on Canara Bank's fintech product 🏦 — building Mobile banking features and keeping the existing ones running smooth like butter. 🧈✨",
    items: [
      "Fixed Deposit",
      "Recurring Deposit",
      "Goal Based Recurring Deposit",
      "Tax Based Deposit",
      "Block account",
      "Apply for Bank Locker",
      "Public Profident Fund",
      "Nominee Maintenance",
      "Angel Family Banking",
      "Transaction Dispute",
      "SSY Scheme",
      "Debit and Credit Card",
      "Customer ReKYC",
      "3 factor authentication for making Payments.",
    ],
    footerNote: "These features will be used by 60 million+ users regularly 🥺✨",
    tags: [
      "Flutter",
      "Canara Bank (60M+ Users)",
      "FinTech & UPI",
      "3-Factor Auth",
      "Mobile Banking",
      "Clean Architecture",
    ],
    current: true,
  },
  {
    id: "thiran",
    role: "Mobile Application Developer",
    company: "Thiran Technologies",
    type: "Full-time · 2 yrs 2 mos",
    duration: "Feb 2024 – Sep 2025 · 1 yr 8 mos",
    location: "Chennai, Tamil Nadu, India",
    workType: "On-site",
    intro:
      "As a Flutter developer, I'm working on a Product of Thiran and worked on OFFLINE Capability of product.",
    notes: [
      "Handled every user transaction in the app with help of having different databases on Mobile as well as Cloud.",
      "And importantly, i have integrated and improved VOICE ASSISTANT called 'TAM' in TEAM Product Application with the help of Voice SDK. This AI assistant will work on OFFLINE mode as well with the help of AI Model in local mobile app itself.",
      "Worked on Narrow Weak AI for above functionality.",
      "And worked on the Video Call services in Flutter App with the help of ZEGO SDK for End to End user Video Call functionality.",
      "With Clean Architecture and Feature based Architecture for Flutter App.",
      "T-EAM Mobile App purely based on IBM MAXIMO for the BE Services ( REST API ) and Flutter is used for FE Services.",
      "Worked on Cognitive Dashboard, a web app which works similar to Google Maps with real-time latitude longitude integration and its specifically for a client.",
      "I have functional knowledge of IBM Maximo for the Mobile Application Implementation.",
    ],
    tags: [
      "Flutter",
      "Offline Voice AI 'TAM'",
      "ZEGO SDK Video",
      "IBM MAXIMO",
      "Cognitive Dashboard",
      "Clean Architecture",
    ],
  },
  {
    id: "doodleblue",
    role: "Mobile Application Developer",
    company: "doodleblue Innovations",
    type: "Internship",
    duration: "Jan 2023 – Aug 2023 · 8 mos",
    location: "Chennai, Tamil Nadu, India",
    workType: "On-site",
    intro: "Took deep dive into Mobile development.",
    notes: [
      "And having an in-hand experience in Flutter and IOS (swift) real time projects.",
      "Worked on both UI and Functionality part of the app.",
      "Especially for Flutter, worked on three platforms Android, IOS, and Web. with REST API integration and BE.",
    ],
    tags: ["Flutter", "iOS / Swift", "REST API Integration", "Android & Web"],
  },
  {
    id: "bulltech",
    role: "Flutter Developer",
    company: "Bull Tech",
    type: "Internship",
    duration: "Sep 2022 – Dec 2022 · 4 mos",
    location: "Chennai, Tamil Nadu, India",
    workType: "Remote",
    intro: "Worked on Crypto Currency Application for Bull Tech Pvt Ltd.",
    notes: [
      "And i have integrated Firebase for Authentication and Data fetching.",
      "Used Coinbase Open source network for fetching the Cryptocurrency related data by REST APIs.",
      "Added functionality to realtime Currency Converter from any currency to USD.",
      "Added User profile and settings functionality to control the app like Dark mode, Profile Picture and etc.,",
      "Added the functionality to add any Cryptocurrency to Wishlist and access whenever the user wants and i have handled the majority of edge cases.",
      "Added the NEWS App functionality to show only the Cryptocurrency related news to the user with the 10mins delay news.",
    ],
    tags: ["Flutter", "Firebase Auth", "Coinbase API", "Currency Converter", "Wishlist"],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Dedicated Mobile View (< 768px) */}
        <div className="block md:hidden">
          <MobileExperience />
        </div>

        {/* Desktop Web View (>= 768px) */}
        <div className="hidden md:block">
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
              Real-world product engineering & LinkedIn verified history
            </p>
          </div>

          {/* Timeline List */}
          <div className="relative pl-6 sm:pl-10 border-l border-white/[0.12] space-y-10 max-w-4xl mx-auto">
            {experiences.map((exp, index) => {
              return (
                <motion.div
                  key={exp.id}
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
                        ? "bg-rose-500 border-white shadow-[0_0_14px_rgba(244,63,94,0.9)] scale-110"
                        : "bg-[#141417] border-white/30 group-hover:border-rose-400"
                    }`}
                  />

                  {/* Experience Card */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#131316] border border-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-xl">
                    {/* Top Role & Duration Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors">
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-semibold">
                            Current Role
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                        <Calendar className="w-3.5 h-3.5 text-rose-400" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>

                    {/* Company & Location Info Strip */}
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 mb-5">
                      <div className="flex items-center gap-1.5 text-white">
                        <Building2 className="w-3.5 h-3.5 text-purple-400" />
                        <span>{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                        <span>
                          {exp.location} · {exp.workType}
                        </span>
                      </div>
                    </div>

                    {/* Intro Text */}
                    <p className="text-neutral-200 text-sm sm:text-base leading-relaxed mb-4">
                      {exp.intro}
                    </p>

                    {/* NPST Feature Checklist */}
                    {exp.items && (
                      <div className="mt-4 mb-4 p-5 rounded-2xl bg-[#0c0c0f] border border-white/[0.06]">
                        <div className="text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider mb-3">
                          I have developed and worked on:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-neutral-300 font-mono">
                          {exp.items.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-rose-500 font-bold">{idx + 1}.</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Bullet Points */}
                    {exp.notes && (
                      <div className="mt-3 mb-4 space-y-2.5">
                        {exp.notes.map((note, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0 mt-2" />
                            <span>{note}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Footer Note */}
                    {exp.footerNote && (
                      <p className="text-xs sm:text-sm text-neutral-300 font-mono italic mt-4 pt-3 border-t border-white/[0.06]">
                        {exp.footerNote}
                      </p>
                    )}

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-white/[0.06]">
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
