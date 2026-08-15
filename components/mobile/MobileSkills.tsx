"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Layers,
  Database,
  Cpu,
  Wrench,
} from "lucide-react";

interface SkillCategory {
  id: string;
  title: string;
  shortTitle: string;
  icon: any;
  skills: { name: string; level: number; tag?: string }[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "mobile",
    title: "Mobile & Core Languages",
    shortTitle: "Mobile",
    icon: Smartphone,
    skills: [
      { name: "Flutter & Dart", level: 95, tag: "Primary" },
      { name: "iOS / Swift / SwiftUI", level: 85, tag: "Native" },
      { name: "Kotlin / KMP", level: 78, tag: "Cross-platform" },
      { name: "Flutter Web", level: 88 },
    ],
  },
  {
    id: "arch",
    title: "State & Architecture",
    shortTitle: "Architecture",
    icon: Layers,
    skills: [
      { name: "Riverpod State Pattern", level: 92, tag: "Production" },
      { name: "Clean Architecture & SOLID", level: 90 },
      { name: "BLoC & Provider", level: 85 },
      { name: "GoRouter & Deep Linking", level: 88 },
      { name: "Dart Isolates & Concurrency", level: 84 },
    ],
  },
  {
    id: "fintech",
    title: "FinTech & AI Systems",
    shortTitle: "FinTech & AI",
    icon: Cpu,
    skills: [
      { name: "UPI Banking (60M+ Users)", level: 95, tag: "Enterprise" },
      { name: "Voice AI Assistant SDK", level: 88, tag: "Offline AI" },
      { name: "ZEGO Video Calling", level: 85 },
      { name: "Model Context Protocol (MCP)", level: 82 },
    ],
  },
  {
    id: "backend",
    title: "Backend, APIs & Cloud",
    shortTitle: "Cloud & APIs",
    icon: Database,
    skills: [
      { name: "Firebase (Auth, Firestore)", level: 90, tag: "Cloud" },
      { name: "REST APIs Integration", level: 92 },
      { name: "SQLite / Drift DB", level: 86, tag: "Offline" },
      { name: "PostgreSQL & NoSQL", level: 80 },
    ],
  },
  {
    id: "tools",
    title: "Toolchains & Deployment",
    shortTitle: "Toolchains",
    icon: Wrench,
    skills: [
      { name: "Git & Version Control", level: 90 },
      { name: "App Store Connect & TestFlight", level: 88 },
      { name: "Google Play Console Releases", level: 90 },
      { name: "Figma & UI/UX", level: 82 },
      { name: "Postman & API Debugging", level: 88 },
    ],
  },
];

export default function MobileSkills() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("mobile");

  const activeCategory =
    skillCategories.find((c) => c.id === selectedCategoryId) || skillCategories[0];
  const Icon = activeCategory.icon;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Mobile Section Header */}
      <div className="text-left">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
            05 / Arsenal & Tech
          </span>
          <span className="w-8 h-[1px] bg-rose-500/40" />
        </div>
        <h2
          className="text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight leading-none mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500">ARSENAL</span> & TOOLS
        </h2>
        <p
          className="text-rose-400 text-lg font-normal select-none"
          style={{ fontFamily: "var(--font-cursive)" }}
        >
          Battle-tested frameworks & mobile toolchains
        </p>
      </div>

      {/* Category Pills Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
        {skillCategories.map((cat) => {
          const isActive = cat.id === selectedCategoryId;
          const CatIcon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-white text-black font-semibold shadow-md"
                  : "bg-[#141417] text-neutral-400 border border-white/[0.08]"
              }`}
            >
              <CatIcon className="w-3.5 h-3.5" />
              <span>{cat.shortTitle}</span>
            </button>
          );
        })}
      </div>

      {/* Active Category Skills Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="p-6 rounded-3xl bg-[#131316] border border-white/[0.1] shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.08]">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{activeCategory.title}</h3>
              <p className="text-[11px] font-mono text-neutral-400">
                {activeCategory.skills.length} core competencies
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {activeCategory.skills.map((skill) => (
              <div key={skill.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-200">{skill.name}</span>
                  <div className="flex items-center gap-2">
                    {skill.tag && (
                      <span className="text-[10px] text-rose-400 px-1.5 py-0.2 rounded bg-rose-500/10 border border-rose-500/20">
                        {skill.tag}
                      </span>
                    )}
                    <span className="text-neutral-500">{skill.level}%</span>
                  </div>
                </div>

                <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-rose-500 to-purple-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
