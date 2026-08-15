"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Star,
  Play,
  Flame,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import Image from "next/image";

interface Project {
  id: string;
  name: string;
  category: "fintech" | "mobile" | "ios" | "opensource";
  featured?: boolean;
  tagline: string;
  description: string;
  image: string;
  carouselImages?: string[];
  tags: string[];
  github?: string;
  live?: string;
  playstore?: string;
  stars?: number;
  badge?: string;
}

const allProjects: Project[] = [
  {
    id: "itineery-ai",
    name: "Itineery AI",
    category: "mobile",
    featured: true,
    tagline: "Personalized AI Travel Planner",
    description:
      "Plan smarter with AI itineraries, smart city guides, and offline discovery. Available on Google Play Store with a companion Next.js web application.",
    image: "/assets/itineery-ai.png",
    carouselImages: [
      "/assets/itineery-screen1.png",
      "/assets/itineery-screen2.png",
      "/assets/itineery-screen3.png",
      "/assets/itineery-screen4.png",
      "/assets/itineery-screen5.png",
    ],
    tags: ["Flutter", "AI Travel", "Play Store", "Next.js", "Firebase", "Dart"],
    playstore: "https://play.google.com/store/apps/details?id=com.universeappstudio.itineery",
    live: "https://itineery-ai.vercel.app/",
    badge: "Flagship App",
  },
  {
    id: "canara-fintech",
    name: "Canara FinTech Banking",
    category: "fintech",
    featured: true,
    tagline: "Enterprise UPI & Mobile Banking (60M+ Users)",
    description:
      "Engineered mobile banking features at NPST for Canara Bank. Integrated Voice Assistant 'TAM' with offline AI models, Video Call services with ZEGO SDK, and cognitive transaction dashboards.",
    image: "/assets/github-project-banner.png",
    tags: ["Flutter", "FinTech", "UPI (60M+ Users)", "Voice AI TAM", "ZEGO SDK", "IBM Maximo"],
    github: "https://github.com/Magesh-kanna",
    badge: "60M+ Users",
  },
  {
    id: "namma-wallet",
    name: "Namma Wallet",
    category: "opensource",
    featured: true,
    tagline: "Open-Source Community Flutter Wallet",
    description:
      "A modern mobile wallet architecture built with Flutter for the Namma Flutter community. Received 57 stars and 67 forks with seamless UI and offline transaction caching.",
    image: "/assets/nammawallet.png",
    tags: ["Flutter", "Open Source", "FinTech", "Dart", "Community"],
    github: "https://github.com/Namma-Flutter/namma_wallet",
    stars: 57,
    badge: "57 Stars / 67 Forks",
  },
  {
    id: "namma-flutter-web",
    name: "NammaFlutter.com",
    category: "opensource",
    featured: true,
    tagline: "Official Community Hub Platform",
    description:
      "Web and community portal for Namma Flutter Chennai — managing developer meetups, guest lectures, technical workshops, and open-source contributions.",
    image: "/assets/nammaflutter.png",
    tags: ["Flutter Web", "Dart", "Community", "Open Source"],
    github: "https://github.com/Namma-Flutter",
    live: "https://nammaflutter.com",
    badge: "Community Hub",
  },
  {
    id: "bulltech-crypto",
    name: "BullTech CryptoApp",
    category: "mobile",
    featured: false,
    tagline: "Real-Time Crypto Market & Trading App",
    description:
      "Cryptocurrency mobile application with Firebase Auth, Coinbase API integration for live crypto market pricing, interactive charts, and wishlist tracking.",
    image: "/assets/github-project-banner.png",
    tags: ["Flutter", "Firebase", "Coinbase API", "REST API", "Charts"],
    github: "https://github.com/Magesh-kanna/BullTech-CryptoApp-Flutter",
  },
  {
    id: "apple-maps-swiftui",
    name: "Apple Maps with SwiftUI",
    category: "ios",
    featured: false,
    tagline: "Native iOS Map Navigation & Tracking",
    description:
      "Native iOS application built in SwiftUI leveraging Apple MapKit, CoreLocation, and CoreData for persistent route management and location bookmarking.",
    image: "/assets/github-project-banner.png",
    tags: ["Swift", "SwiftUI", "Apple Maps", "Core Data", "MapKit"],
    github: "https://github.com/Magesh-kanna/Apple-Maps-with-SwiftUI",
  },
  {
    id: "expense-tracker-swiftui",
    name: "Expense Tracker (SwiftUI)",
    category: "ios",
    featured: false,
    tagline: "Native iOS Personal Finance Manager",
    description:
      "iOS native budgeting and personal finance application with category breakdowns, monthly income vs expenditure analytics, and CoreData local storage.",
    image: "/assets/github-project-banner.png",
    tags: ["Swift", "SwiftUI", "Core Data", "iOS Native"],
    github: "https://github.com/Magesh-kanna/Expense-Tracker-SwiftUI",
  },
  {
    id: "dashboard-charts",
    name: "Dashboard with Interactive Charts",
    category: "mobile",
    featured: false,
    tagline: "Flutter Real-Time Analytics UI",
    description:
      "High performance responsive analytics dashboard built in Flutter with dynamic graph renders, customizable filters, and smooth micro-interactions.",
    image: "/assets/github-project-banner.png",
    tags: ["Flutter", "Charts", "UI/UX", "Data Viz"],
    github: "https://github.com/Magesh-kanna/Dashboard-flutter-with-charts-graph",
  },
  {
    id: "flutter-daemon-cli",
    name: "Flutter Daemon CLI Utilities",
    category: "opensource",
    featured: false,
    tagline: "Developer Tooling for Flutter IDEs",
    description:
      "CLI tools and scripts exploring the Flutter Daemon protocol for IDE integrations, build automation, and debugging.",
    image: "/assets/github-project-banner.png",
    tags: ["Dart", "Flutter Daemon", "CLI", "Dev Tools"],
    github: "https://github.com/Magesh-kanna",
  },
];

const categories = [
  { id: "all", label: "All Works" },
  { id: "featured", label: "Featured" },
  { id: "fintech", label: "FinTech" },
  { id: "mobile", label: "Mobile" },
  { id: "ios", label: "iOS (Swift)" },
  { id: "opensource", label: "Open Source" },
];

export default function MobileProjects() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);

  const filteredProjects = allProjects.filter((p) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "featured") return p.featured;
    return p.category === selectedFilter;
  });

  const flagship = allProjects.find((p) => p.id === "itineery-ai");

  const nextSlide = () => {
    if (flagship?.carouselImages) {
      setActiveCarouselIndex((prev) => (prev + 1) % flagship.carouselImages!.length);
    }
  };

  const prevSlide = () => {
    if (flagship?.carouselImages) {
      setActiveCarouselIndex(
        (prev) => (prev - 1 + flagship.carouselImages!.length) % flagship.carouselImages!.length
      );
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Mobile Section Header */}
      <div className="text-left">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
            02 / Selected Works
          </span>
          <span className="w-8 h-[1px] bg-rose-500/40" />
        </div>
        <h2
          className="text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight leading-none mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          CRAFTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500">PROJECTS</span> & APPS
        </h2>
        <p
          className="text-rose-400 text-lg font-normal select-none"
          style={{ fontFamily: "var(--font-cursive)" }}
        >
          Engineering scalable mobile solutions with pixel perfection
        </p>
      </div>

      {/* Filter Horizontal Scroll Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-white text-black font-semibold shadow-md"
                  : "bg-[#141417] text-neutral-400 border border-white/[0.08]"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Mobile Flagship Showcase: Itineery AI */}
      {flagship && (selectedFilter === "all" || selectedFilter === "featured" || selectedFilter === "mobile") && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-5 rounded-3xl bg-gradient-to-br from-[#18181d] via-[#121215] to-[#0c0c0f] border border-rose-500/30 shadow-2xl relative overflow-hidden flex flex-col gap-4"
        >
          {/* Flagship Badge */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11px] font-mono">
              <Flame className="w-3.5 h-3.5 fill-rose-400" />
              <span>Flagship App</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">Play Store Live</span>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{flagship.name}</h3>
            <p className="text-xs text-rose-400 font-mono mb-2">{flagship.tagline}</p>
            <p className="text-neutral-300 text-xs leading-relaxed">{flagship.description}</p>
          </div>

          {/* Screenshot Carousel */}
          <div className="relative w-full h-[240px] sm:h-[280px] rounded-2xl overflow-hidden bg-[#09090b] border border-white/[0.1] flex items-center justify-center p-2">
            {flagship.carouselImages && (
              <Image
                src={flagship.carouselImages[activeCarouselIndex] || flagship.image}
                alt={flagship.name}
                fill
                className="object-contain p-2 transition-all duration-300 drop-shadow-xl"
                sizes="340px"
              />
            )}

            {/* Carousel Navigation Arrows */}
            {flagship.carouselImages && flagship.carouselImages.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white active:scale-90 transition-transform"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white active:scale-90 transition-transform"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Carousel Dots */}
          {flagship.carouselImages && (
            <div className="flex items-center justify-center gap-1.5">
              {flagship.carouselImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCarouselIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === activeCarouselIndex ? "w-6 bg-rose-500" : "w-1.5 bg-neutral-700"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {flagship.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-[10px] font-mono text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-2 pt-2">
            {flagship.playstore && (
              <a
                href={flagship.playstore}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>Google Play Store</span>
              </a>
            )}

            {flagship.live && (
              <a
                href={flagship.live}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full bg-[#1e1e24] border border-white/[0.1] text-white text-xs font-medium flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <span>Live Web Companion</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </motion.div>
      )}

      {/* Project Cards List */}
      <div className="flex flex-col gap-4">
        {filteredProjects.map((project, index) => {
          if (project.id === "itineery-ai" && selectedFilter === "all") return null;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="p-5 rounded-2xl bg-[#131316] border border-white/[0.08] shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  {project.badge ? (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-mono text-rose-400">
                      {project.badge}
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">
                      {project.category}
                    </span>
                  )}

                  {project.stars && (
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-mono">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{project.stars}</span>
                    </div>
                  )}
                </div>

                <h4 className="text-base font-bold text-white mb-1">{project.name}</h4>
                <p className="text-[11px] text-neutral-400 font-mono mb-2">{project.tagline}</p>
                <p className="text-neutral-300 text-xs leading-relaxed mb-4">{project.description}</p>
              </div>

              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-neutral-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-mono text-neutral-300 active:text-white"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-mono text-rose-400 active:underline ml-auto"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.playstore && (
                    <a
                      href={project.playstore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-mono text-emerald-400 active:underline ml-auto"
                    >
                      <span>Play Store</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
