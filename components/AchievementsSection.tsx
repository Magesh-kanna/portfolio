"use client";

import { motion } from "framer-motion";
import { Award, Mic, Users, Sparkles, ArrowUpRight, GraduationCap, Globe } from "lucide-react";
import Image from "next/image";

interface HighlightItem {
  title: string;
  subtitle: string;
  date: string;
  image: string;
  description: string;
  badge: string;
  link?: string;
}

const highlights: HighlightItem[] = [
  {
    title: "Tech Talk Speaker & Keynote Guest Lecturer",
    subtitle: "Namma Flutter Chennai & S.A. Engineering College",
    date: "2025 – 2026",
    image: "/assets/guest-lecture-classroom.png",
    description:
      "Delivered keynote addresses and interactive workshops on 'From Classroom to Codebase: Building Apps That People Actually Use'. Mentored engineering students on modern mobile toolchains, Flutter state patterns, and production deployment.",
    badge: "Keynote Speaker",
    link: "https://www.linkedin.com/in/mageshkanna/",
  },
  {
    title: "Gold Medalist — Master of Computer Applications (MCA)",
    subtitle: "Academic Excellence Award | Anna University Affiliated",
    date: "2021 – 2023",
    image: "/assets/gold-medalist.jpg",
    description:
      "Secured the Gold Medal and University Rank 1 with a 9.0 GPA in Master of Computer Applications (MCA) at S.A. Engineering College for outstanding academic and software development excellence.",
    badge: "Rank 1 Gold Medalist",
    link: "https://www.linkedin.com/in/mageshkanna/",
  },
  {
    title: "Google I/O Connect India",
    subtitle: "Premier Developer Conference | #BuildWithGemini",
    date: "2025",
    image: "/assets/google-io-connect.png",
    description:
      "Attended Google I/O Connect India — collaborating with thousands of engineers on the forefront of Gemini Multimodal AI, Flutter 3.x releases, Android architecture, and AI-driven developer workflows.",
    badge: "Community & AI",
    link: "https://www.linkedin.com/in/mageshkanna/",
  },
];

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
                04 / Highlights & Speaking
              </span>
              <span className="w-12 h-[1px] bg-rose-500/40" />
            </div>
            <h2
              className="text-5xl sm:text-6xl md:text-7xl font-bold uppercase text-white tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              MOMENTS, <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500">TALKS</span> & AWARDS
            </h2>
          </div>

          <p
            className="text-rose-400 text-xl sm:text-2xl font-normal select-none"
            style={{ fontFamily: "var(--font-cursive)" }}
          >
            Giving back to the engineering community
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group flex flex-col justify-between rounded-3xl bg-[#131316] border border-white/[0.1] hover:border-white/20 transition-all duration-500 overflow-hidden shadow-xl"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900 border-b border-white/[0.08]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-transparent to-transparent opacity-80" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-rose-400">
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                    <span>{item.subtitle}</span>
                    <span className="text-neutral-500">{item.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-rose-400 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-6 pb-6 pt-2">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 group-hover:text-white transition-colors"
                >
                  <span>Read on LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-rose-400" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
