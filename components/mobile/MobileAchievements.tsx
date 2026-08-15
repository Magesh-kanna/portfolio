"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
    subtitle: "Namma Flutter & S.A. Engineering College",
    date: "2025 – 2026",
    image: "/assets/guest-lecture-classroom.png",
    description:
      "Delivered keynote addresses on 'From Classroom to Codebase: Building Apps That People Actually Use'. Mentored students on mobile architectures.",
    badge: "Keynote Speaker",
    link: "https://www.linkedin.com/in/mageshkanna/",
  },
  {
    title: "Gold Medalist — Master of Computer Applications (MCA)",
    subtitle: "Academic Excellence Award | Anna University Affiliated",
    date: "2021 – 2023",
    image: "/assets/gold-medalist.jpg",
    description:
      "Secured Gold Medal and Rank 1 with a 9.0 GPA in Master of Computer Applications (MCA) for outstanding software development and academic excellence.",
    badge: "Rank 1 Gold Medalist",
    link: "https://www.linkedin.com/in/mageshkanna/",
  },
  {
    title: "Google I/O Connect India",
    subtitle: "Premier Developer Conference | #BuildWithGemini",
    date: "2025",
    image: "/assets/google-io-connect.png",
    description:
      "Collaborated with thousands of engineers on Gemini Multimodal AI, Flutter releases, and next-gen mobile toolchains.",
    badge: "Community & AI",
    link: "https://www.linkedin.com/in/mageshkanna/",
  },
];

export default function MobileAchievements() {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Mobile Section Header */}
      <div className="text-left">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
            04 / Highlights & Speaking
          </span>
          <span className="w-8 h-[1px] bg-rose-500/40" />
        </div>
        <h2
          className="text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight leading-none mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          MOMENTS, <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500">TALKS</span> & AWARDS
        </h2>
        <p
          className="text-rose-400 text-lg font-normal select-none"
          style={{ fontFamily: "var(--font-cursive)" }}
        >
          Giving back to the engineering community
        </p>
      </div>

      {/* Highlights List */}
      <div className="flex flex-col gap-4">
        {highlights.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="rounded-2xl bg-[#131316] border border-white/[0.08] overflow-hidden shadow-md"
          >
            <div className="relative aspect-[16/9] w-full bg-neutral-900">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="340px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-transparent to-transparent opacity-80" />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-rose-400">
                {item.badge}
              </span>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1.5">
                <span>{item.subtitle}</span>
                <span className="text-neutral-500">{item.date}</span>
              </div>

              <h3 className="text-base font-bold text-white mb-2 leading-snug">{item.title}</h3>
              <p className="text-neutral-300 text-xs leading-relaxed mb-4">{item.description}</p>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-rose-400 active:underline"
              >
                <span>Read on LinkedIn</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
