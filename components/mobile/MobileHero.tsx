"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, MapPin, Clock, FileText } from "lucide-react";
import Image from "next/image";

interface MobileHeroProps {
  name?: string;
  tagline?: string;
  description?: string;
  profileImage?: string;
}

export default function MobileHero({
  name = "Magesh K",
  tagline = "Mobile Engineer | Flutter & iOS Specialist",
  description = "Software Development Engineer with 3.5+ years experience building cross-platform mobile apps for Android & iOS. Powering Canara Bank's FinTech ecosystem (60M+ Users) at NPST.",
  profileImage = "/assets/mageshk-cover-v2.png",
}: MobileHeroProps) {
  const [timeIST, setTimeIST] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTimeIST(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, { offset: -70, duration: 1.0 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center text-center pt-24 pb-12 px-4 relative z-10">
      {/* Status Pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-md mb-6"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-[11px] text-neutral-300 font-mono tracking-tight">
          Available for roles & consultations
        </span>
      </motion.div>

      {/* Mobile Avatar & Badges Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative mb-6"
      >
        {/* Glow behind avatar */}
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/30 to-purple-600/30 rounded-full blur-2xl -z-10" />

        <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-[3px] bg-gradient-to-tr from-rose-500 via-purple-500 to-indigo-500 shadow-2xl">
          <div className="relative w-full h-full rounded-full overflow-hidden bg-neutral-900 border-2 border-[#0a0a0a]">
            <Image
              src={profileImage}
              alt={name}
              fill
              priority
              className="object-cover object-top"
              sizes="180px"
            />
          </div>
        </div>

        {/* Overlaid Floating Badge */}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#141417]/95 border border-white/20 backdrop-blur-xl shadow-lg flex items-center gap-1.5 whitespace-nowrap">
          <Sparkles className="w-3 h-3 text-rose-400" />
          <span className="text-[10px] font-mono font-semibold text-white">SDE @ NPST</span>
        </div>
      </motion.div>

      {/* Cursive Accent */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-rose-400 text-xl font-normal mb-1.5 select-none"
        style={{ fontFamily: "var(--font-cursive)" }}
      >
        Crafting fluid mobile experiences
      </motion.p>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="text-6xl sm:text-7xl font-bold tracking-tight uppercase text-white leading-none mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        MAGESH <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-400 to-indigo-400">K</span>
      </motion.h1>

      {/* Role Chips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-1.5 mb-4 max-w-sm"
      >
        <span className="px-2.5 py-1 rounded-lg bg-[#141418] border border-white/[0.08] text-[11px] font-mono text-neutral-300">
          ⚡ SDE • Mobile Engineer
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-[#141418] border border-white/[0.08] text-[11px] font-mono text-neutral-300">
          📱 Flutter & iOS
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-[#141418] border border-white/[0.08] text-[11px] font-mono text-neutral-300">
          🏦 FinTech (60M+ Users)
        </span>
      </motion.div>

      {/* Bio Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-md mb-6"
      >
        {description}
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col sm:flex-row w-full max-w-xs gap-2.5 mb-8"
      >
        <button
          onClick={() => scrollTo("projects")}
          className="w-full py-3 rounded-full bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-white/10 active:scale-95 transition-transform cursor-pointer"
        >
          <span>Explore Works</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <div className="flex gap-2 w-full">
          <button
            onClick={() => scrollTo("contact")}
            className="flex-1 py-2.5 rounded-full bg-[#18181c] border border-white/[0.12] text-white text-xs font-medium active:scale-95 transition-transform cursor-pointer"
          >
            <span>Let&apos;s Talk</span>
          </button>

          <a
            href="/assets/resume.pdf"
            download
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-transparent border border-white/[0.1] text-neutral-300 active:scale-95 transition-transform text-xs font-mono"
          >
            <FileText className="w-3.5 h-3.5 text-rose-400" />
            <span>CV</span>
          </a>
        </div>
      </motion.div>

      {/* Location & IST Clock Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="w-full max-w-sm pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-neutral-400"
      >
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-rose-400" />
          <span>India</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-purple-400" />
          <span suppressHydrationWarning>{timeIST ? `${timeIST} IST` : "India (IST)"}</span>
        </div>
      </motion.div>
    </div>
  );
}
