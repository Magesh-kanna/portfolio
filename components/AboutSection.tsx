"use client";

import { motion } from "framer-motion";
import { MapPin, Sparkles, Award, Users, Smartphone, Code, Heart, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  bio?: string;
  stats?: { value: string; label: string }[];
}

export default function AboutSection({}: AboutSectionProps) {
  const statsList = [
    { value: "60M+", label: "Users Impacted", sub: "Canara Bank FinTech" },
    { value: "3.5+", label: "Years Experience", sub: "Mobile Engineering" },
    { value: "10+", label: "Production Apps", sub: "Android, iOS & Web" },
    { value: "9.0", label: "Gold Medalist GPA", sub: "MCA Anna University" },
  ];

  const highlights = [
    "Specialized in Flutter, Dart, Swift, SwiftUI & Riverpod",
    "Engineered Voice Assistant 'TAM' with Offline AI Models",
    "Built Video Calling & Real-Time Map Dashboards with ZEGO SDK",
    "Delivered Keynote Tech Talks & Workshops at Engineering Colleges",
  ];

  return (
    <section id="about" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
                01 / About Me
              </span>
              <span className="w-12 h-[1px] bg-rose-500/40" />
            </div>
            <h2
              className="text-5xl sm:text-6xl md:text-7xl font-bold uppercase text-white tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              DESIGNER. <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500">BUILDER.</span> MENTOR.
            </h2>
          </div>

          <p
            className="text-rose-400 text-xl sm:text-2xl font-normal select-none"
            style={{ fontFamily: "var(--font-cursive)" }}
          >
            Turning complex architectures into buttery-smooth apps
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Main Story Bio (8 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-8 p-8 sm:p-10 rounded-3xl bg-[#131316] border border-white/[0.1] relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-rose-500/10 via-purple-500/5 to-transparent rounded-bl-full pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-300 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>My Journey & Philosophy</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4 leading-snug">
                Hi, I&apos;m Magesh K — a Software Development Engineer passionate about crafting high-performance mobile architectures.
              </h3>

              <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
                <p>
                  With <span className="text-white font-semibold">3.5+ years of experience</span> across product startups and fintech enterprises, I specialize in building scalable cross-platform mobile apps for Android and iOS using Flutter, Dart, Swift, and modern mobile toolchains.
                </p>
                <p>
                  Currently at <span className="text-white font-semibold">NPST</span>, I develop enterprise UPI and Mobile banking features for <span className="text-rose-400 font-semibold">Canara Bank&apos;s 60 Million+ regular user base</span>. My work spans offline Voice AI assistants, ZEGO video banking SDKs, Riverpod state patterns, and high-throughput transaction pipelines.
                </p>
              </div>
            </div>

            {/* Checklist highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 mt-6 border-t border-white/[0.08]">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Stats Grid (4 cols) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            {statsList.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-3xl bg-[#131316] border border-white/[0.1] flex flex-col justify-between hover:border-white/20 transition-all duration-300 group"
              >
                <div className="text-3xl sm:text-4xl font-bold text-white group-hover:text-rose-400 transition-colors font-mono">
                  {stat.value}
                </div>
                <div className="mt-4">
                  <div className="text-sm font-semibold text-neutral-200">{stat.label}</div>
                  <div className="text-[11px] text-neutral-500 font-mono mt-0.5">{stat.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Card 3: Location / Map Base (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#131316] border border-white/[0.1] relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  <span>HQ Location</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <h4 className="text-xl font-bold text-white mb-1">Bengaluru & Chennai</h4>
              <p className="text-xs text-neutral-400 font-mono">India • GMT +5:30 (IST)</p>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-[#0d0d0f] border border-white/[0.06] text-xs text-neutral-400 space-y-2">
              <p className="flex items-center justify-between">
                <span className="text-neutral-500">Working Mode:</span>
                <span className="text-white font-mono">Hybrid & Remote</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-neutral-500">Languages:</span>
                <span className="text-white font-mono">English, Tamil, Hindi</span>
              </p>
            </div>
          </motion.div>

          {/* Card 4: Current Focus / Now Building (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#131316] border border-white/[0.1] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-4">
                <Smartphone className="w-4 h-4" />
                <span>Currently Exploring</span>
              </div>

              <h4 className="text-lg font-bold text-white mb-2">Advanced Flutter & Native Swift</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Diving deep into Kotlin Multiplatform, Model Context Protocol (MCP) integrations for mobile AI agents, and micro-animations with SwiftUI.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-neutral-300">
                #KMP
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-neutral-300">
                #SwiftUI
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-neutral-300">
                #VoiceAI
              </span>
            </div>
          </motion.div>

          {/* Card 5: Speaking & Gold Medalist Badge (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-950/40 via-[#131316] to-[#131316] border border-rose-500/20 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-rose-400 mb-4">
                <Award className="w-4 h-4" />
                <span>Academic & Community</span>
              </div>

              <h4 className="text-lg font-bold text-white mb-2">Gold Medalist & Speaker</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Rank 1 Gold Medalist in MCA with 9.0 GPA from Anna University affiliated college. Keynote speaker for Namma Flutter and engineering college workshops.
              </p>
            </div>

            <div className="mt-6">
              <a
                href="#achievements"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 transition-colors"
              >
                <span>View Speaking Highlights</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
