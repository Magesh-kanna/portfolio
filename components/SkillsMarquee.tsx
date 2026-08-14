"use client";

import { motion } from "framer-motion";

const skillsRow1 = [
  "Flutter",
  "Dart",
  "iOS / Swift",
  "SwiftUI",
  "FinTech & UPI",
  "Riverpod",
  "BLoC",
  "Kotlin Multiplatform",
  "Voice AI SDK",
  "Firebase",
  "Clean Architecture",
  "Canara Bank (80M+ Users)",
];

const skillsRow2 = [
  "ZEGO SDK Video",
  "SQLite & Drift",
  "REST APIs",
  "PostgreSQL",
  "Isolates & Concurrency",
  "GoRouter",
  "Hive DB",
  "MCP AI Tooling",
  "App Store Deployment",
  "Google Play Console",
  "Figma",
  "Git & CI/CD",
];

export default function SkillsMarquee() {
  return (
    <section className="py-8 bg-[#070709] border-y border-white/[0.06] overflow-hidden select-none">
      <div className="flex flex-col gap-3">
        {/* Row 1 - Left Marquee */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-left flex items-center gap-3">
            {[...skillsRow1, ...skillsRow1].map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#131316] border border-white/[0.08] hover:border-rose-500/40 text-neutral-300 hover:text-white text-xs font-mono transition-all duration-300 group cursor-default shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 group-hover:scale-125 transition-transform" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Right Marquee */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-right flex items-center gap-3">
            {[...skillsRow2, ...skillsRow2].map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#131316] border border-white/[0.08] hover:border-purple-500/40 text-neutral-300 hover:text-white text-xs font-mono transition-all duration-300 group cursor-default shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:scale-125 transition-transform" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
