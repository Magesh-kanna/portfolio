"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Sparkles, Award, Smartphone, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

export default function MobileAbout() {
  const [showFullBio, setShowFullBio] = useState(false);

  const statsList = [
    { value: "60M+", label: "Users Impacted", sub: "Canara Bank" },
    { value: "3.5+", label: "Years Exp", sub: "Mobile SDE" },
    { value: "10+", label: "Apps Shipped", sub: "Android & iOS" },
    { value: "9.0", label: "Gold Medal GPA", sub: "Anna Univ Rank 1" },
  ];

  const highlights = [
    "Specialized in Flutter, Dart, Swift, SwiftUI & Riverpod",
    "Engineered Voice Assistant 'TAM' with Offline AI Models",
    "Built Video Calling & Real-Time Map Dashboards with ZEGO SDK",
    "Delivered Keynote Tech Talks & Workshops at Engineering Colleges",
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Mobile Section Header */}
      <div className="text-left">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
            01 / About Me
          </span>
          <span className="w-8 h-[1px] bg-rose-500/40" />
        </div>
        <h2
          className="text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight leading-none mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          DESIGNER. <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500">BUILDER.</span> MENTOR.
        </h2>
        <p
          className="text-rose-400 text-lg font-normal select-none"
          style={{ fontFamily: "var(--font-cursive)" }}
        >
          Turning complex architectures into fluid mobile apps
        </p>
      </div>

      {/* 2x2 Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {statsList.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="p-4 rounded-2xl bg-[#131316] border border-white/[0.08] shadow-md flex flex-col justify-between"
          >
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono text-rose-400">
              {stat.value}
            </div>
            <div className="mt-2">
              <div className="text-xs font-semibold text-neutral-200">{stat.label}</div>
              <div className="text-[10px] text-neutral-500 font-mono">{stat.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Story Bio Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-6 rounded-3xl bg-[#131316] border border-white/[0.1] shadow-xl relative overflow-hidden"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-neutral-300 mb-4">
          <Sparkles className="w-3 h-3 text-rose-400" />
          <span>My Journey & Impact</span>
        </div>

        <h3 className="text-lg font-bold text-white mb-3 leading-snug">
          Hi, I&apos;m Magesh K — building high-performance mobile architectures.
        </h3>

        <div className="text-neutral-300 text-xs sm:text-sm leading-relaxed space-y-3">
          <p>
            With <span className="text-white font-semibold">3.5+ years of experience</span> across product startups and fintech enterprises, I specialize in building scalable cross-platform mobile apps for Android and iOS using Flutter, Dart, and Swift.
          </p>
          <p>
            Currently at <span className="text-white font-semibold">NPST</span>, I develop enterprise UPI and Mobile banking features for <span className="text-rose-400 font-semibold">Canara Bank&apos;s 60M+ user base</span>.
          </p>

          <AnimatePresence>
            {showFullBio && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 pt-2"
              >
                <div className="p-3.5 rounded-2xl bg-[#0d0d10] border border-white/[0.06] space-y-2">
                  <div className="text-[11px] font-mono font-semibold text-rose-400 uppercase tracking-wider">
                    Key Highlights
                  </div>
                  {highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-300 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Read More / Less Toggle */}
        <button
          onClick={() => setShowFullBio(!showFullBio)}
          className="mt-4 pt-3 border-t border-white/[0.06] w-full flex items-center justify-between text-xs font-mono text-rose-400 cursor-pointer"
        >
          <span>{showFullBio ? "Show Less" : "View Key Highlights"}</span>
          {showFullBio ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </motion.div>

      {/* Location & Exploration Stack */}
      <div className="grid grid-cols-1 gap-3">
        {/* Location Card */}
        <div className="p-5 rounded-2xl bg-[#131316] border border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-neutral-400">Location Base</div>
              <div className="text-sm font-bold text-white">Bengaluru & Chennai, India</div>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Academic Gold Medalist Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 to-[#131316] border border-rose-500/20 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 flex-shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Rank 1 Gold Medalist (MCA)</div>
            <div className="text-[11px] text-neutral-400 font-mono">
              Anna Univ Affiliated • 9.0 GPA & Keynote Speaker
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
