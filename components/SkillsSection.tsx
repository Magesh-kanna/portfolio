"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Layers,
  Database,
  Cpu,
  Wrench,
  Sparkles,
  Terminal,
  Code2,
} from "lucide-react";

interface SkillCategory {
  title: string;
  icon: any;
  skills: { name: string; level: number; tag?: string }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Mobile & Core Languages",
    icon: Smartphone,
    skills: [
      { name: "Flutter & Dart", level: 95, tag: "Primary" },
      { name: "iOS / Swift / SwiftUI", level: 85, tag: "Native" },
      { name: "Kotlin / KMP", level: 78, tag: "Cross-platform" },
      { name: "Flutter Web", level: 88 },
    ],
  },
  {
    title: "State & Architecture",
    icon: Layers,
    skills: [
      { name: "Riverpod State Management", level: 92, tag: "Production" },
      { name: "Clean Architecture & SOLID", level: 90 },
      { name: "BLoC & Provider", level: 85 },
      { name: "GoRouter & Deep Linking", level: 88 },
      { name: "Dart Isolates & Concurrency", level: 84 },
    ],
  },
  {
    title: "Backend, APIs & Cloud",
    icon: Database,
    skills: [
      { name: "Firebase (Auth, Firestore)", level: 90, tag: "Cloud" },
      { name: "REST APIs Integration", level: 92 },
      { name: "SQLite / Drift DB", level: 86, tag: "Offline" },
      { name: "PostgreSQL & NoSQL", level: 80 },
    ],
  },
  {
    title: "Specialized FinTech & AI",
    icon: Cpu,
    skills: [
      { name: "FinTech & UPI (80M+ Users)", level: 95, tag: "Enterprise" },
      { name: "Voice AI Assistant SDK", level: 88, tag: "Offline AI" },
      { name: "ZEGO SDK Video Calling", level: 85 },
      { name: "Model Context Protocol (MCP)", level: 82 },
    ],
  },
  {
    title: "Toolchains & Deployment",
    icon: Wrench,
    skills: [
      { name: "Git & Version Control", level: 90 },
      { name: "App Store Connect & TestFlight", level: 88 },
      { name: "Google Play Console Releases", level: 90 },
      { name: "Figma & UI/UX Prototyping", level: 82 },
      { name: "Postman & API Debugging", level: 88 },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
                05 / Arsenal & Tech
              </span>
              <span className="w-12 h-[1px] bg-rose-500/40" />
            </div>
            <h2
              className="text-5xl sm:text-6xl md:text-7xl font-bold uppercase text-white tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500">ARSENAL</span> & TOOLS
            </h2>
          </div>

          <p
            className="text-rose-400 text-xl sm:text-2xl font-normal select-none"
            style={{ fontFamily: "var(--font-cursive)" }}
          >
            Battle-tested frameworks and development toolchains
          </p>
        </div>

        {/* Bento Grid Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-7 rounded-3xl bg-[#131316] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors">
                      {cat.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {cat.skills.map((s) => (
                      <div key={s.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-neutral-200">{s.name}</span>
                          <div className="flex items-center gap-2">
                            {s.tag && (
                              <span className="text-[10px] text-rose-400 px-1.5 py-0.5 rounded bg-rose-500/10">
                                {s.tag}
                              </span>
                            )}
                            <span className="text-neutral-500">{s.level}%</span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${s.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-rose-500 to-purple-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
