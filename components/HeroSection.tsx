"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles, MapPin, Clock, FileText } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  greeting?: string;
  name?: string;
  tagline?: string;
  description?: string;
  profileImage?: string;
  circularText?: string;
}

export default function HeroSection({
  name = "Magesh K",
  tagline = "Mobile Engineer | Flutter & iOS Specialist",
  description = "Software Development Engineer with 3.5+ years experience building cross-platform mobile apps for Android & iOS. Currently powering Canara Bank's FinTech ecosystem (60M+ Users) at NPST.",
  profileImage = "/assets/mageshk-cover-v2.png",
  circularText = "• MOBILE ENGINEER • FLUTTER & IOS SPECIALIST • FINTECH 60M+ USERS ",
}: HeroSectionProps) {
  const [timeIST, setTimeIST] = useState<string>("");

  // Live India Time Clock
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

  // 3D Card Tilt Parallax State
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 250,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, { offset: -80, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const letters = circularText.split("");

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Decorative Grids and Radial Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-rose-500/10 via-purple-600/10 to-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-96 h-96 bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Typography & Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-6 hover:border-white/20 transition-all">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs text-neutral-300 font-mono tracking-tight">
                Available for full-time roles & consultations
              </span>
            </div>

            {/* Cursive Subtitle Accent */}
            <p
              className="text-rose-400 text-2xl sm:text-3xl font-normal mb-2 tracking-wide select-none"
              style={{ fontFamily: "var(--font-cursive)" }}
            >
              Crafting fluid mobile experiences
            </p>

            {/* Main Display Headline */}
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight uppercase text-white leading-none mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              MAGESH <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-400 to-indigo-400">K</span>
            </h1>

            {/* Role & Bio */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
              <span className="px-3 py-1 rounded-lg bg-[#18181b] border border-white/[0.08] text-xs font-mono text-neutral-300">
                ⚡ SDE • Mobile Engineer
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#18181b] border border-white/[0.08] text-xs font-mono text-neutral-300">
                📱 Flutter & iOS
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#18181b] border border-white/[0.08] text-xs font-mono text-neutral-300">
                🏦 FinTech (60M+ Users)
              </span>
            </div>

            <p className="text-neutral-400 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
              {description}
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => scrollTo("projects")}
                className="group relative px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer"
              >
                <span>Explore Works</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className="px-6 py-3.5 rounded-full bg-[#18181b]/90 hover:bg-[#222226] border border-white/[0.12] text-white font-medium text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Get in Touch</span>
              </button>

              <a
                href="/assets/resume.pdf"
                download
                className="px-5 py-3.5 rounded-full bg-transparent hover:bg-white/[0.05] border border-white/[0.08] text-neutral-400 hover:text-white font-mono text-xs transition-all flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-rose-400" />
                <span>Resume.pdf</span>
              </a>
            </div>

            {/* Live IST Info Strip */}
            <div className="mt-10 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Bengaluru & Chennai, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>{timeIST ? `${timeIST} IST` : "India Standard Time"}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive Tilted Portrait Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center items-center"
            style={{ perspective: 1000 }}
          >
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-[300px] sm:w-[340px] md:w-[380px] p-4 rounded-3xl bg-[#141417]/90 border border-white/[0.12] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] cursor-grab active:cursor-grabbing group transition-shadow duration-500 hover:shadow-[0_20px_70px_rgba(244,63,94,0.15)]"
            >
              {/* Rotating Circular Badge in Top Corner */}
              <div className="absolute -top-10 -right-8 w-28 h-28 pointer-events-none z-20 hidden sm:block">
                <div className="relative w-full h-full animate-[spin_22s_linear_infinite]">
                  {letters.map((letter, index) => (
                    <span
                      key={index}
                      className="absolute left-1/2 top-0 text-[9px] font-mono uppercase font-semibold text-neutral-400"
                      style={{
                        transformOrigin: "0 56px",
                        transform: `rotate(${(360 / letters.length) * index}deg)`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>

              {/* Portrait Image Container */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/[0.08]">
                <Image
                  src={profileImage}
                  alt={name}
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 380px"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-70" />

                {/* Status Overlay at bottom */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/[0.1] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-neutral-200">SDE @ NPST</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">Canara Bank</span>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="mt-4 flex items-center justify-between px-1">
                <div>
                  <h3 className="text-sm font-semibold text-white">Magesh K</h3>
                  <p className="text-xs text-neutral-400 font-mono">Mobile Application Engineer</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08]">
                  <Sparkles className="w-3 h-3 text-rose-400" />
                  <span className="text-[10px] font-mono text-neutral-300">Gold Medalist</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Apple-Style Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
          Scroll to explore
        </span>
        <div className="w-5 h-9 rounded-full border-2 border-white/20 flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-rose-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
