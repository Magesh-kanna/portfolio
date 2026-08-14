"use client";

const allSkills = [
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
    <section className="py-6 bg-[#070709] border-y border-white/[0.06] overflow-hidden select-none">
      <div className="flex overflow-hidden">
        <div className="animate-marquee-left flex items-center gap-3 whitespace-nowrap flex-nowrap">
          {[...allSkills, ...allSkills].map((skill, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#131316] border border-white/[0.08] hover:border-rose-500/40 text-neutral-300 hover:text-white text-xs font-mono transition-all duration-300 group cursor-default shadow-sm flex-shrink-0 whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0 group-hover:scale-125 transition-transform" />
              <span className="whitespace-nowrap">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
