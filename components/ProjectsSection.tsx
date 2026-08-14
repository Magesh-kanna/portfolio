"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Sparkles,
  Smartphone,
  Layers,
  ArrowUpRight,
  Star,
  Play,
  Flame,
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
      "Plan smarter and explore further with day-by-day AI itineraries, smart city guides, and offline discovery. Available on Google Play Store with a companion Next.js web application.",
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
      "Engineered high-concurrency mobile banking features at NPST for Canara Bank. Integrated Voice Assistant 'TAM' with offline AI models, Video Call services using ZEGO SDK, and cognitive transaction dashboards.",
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
      "Cryptocurrency mobile application with Firebase Authentication, Coinbase API integration for live crypto market pricing, interactive chart analytics, and wishlist tracking.",
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
  { id: "fintech", label: "FinTech & Banking" },
  { id: "mobile", label: "Mobile / Flutter" },
  { id: "ios", label: "iOS (Swift)" },
  { id: "opensource", label: "Open Source" },
];

export default function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);

  const filteredProjects = allProjects.filter((p) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "featured") return p.featured;
    return p.category === selectedFilter;
  });

  const flagship = allProjects.find((p) => p.id === "itineery-ai");

  return (
    <section id="projects" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
                02 / Selected Works
              </span>
              <span className="w-12 h-[1px] bg-rose-500/40" />
            </div>
            <h2
              className="text-5xl sm:text-6xl md:text-7xl font-bold uppercase text-white tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              CRAFTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500">PROJECTS</span> & APPS
            </h2>
          </div>

          <p
            className="text-rose-400 text-xl sm:text-2xl font-normal select-none"
            style={{ fontFamily: "var(--font-cursive)" }}
          >
            Engineering scalable mobile solutions with pixel perfection
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                    : "bg-[#141417] text-neutral-400 border border-white/[0.08] hover:text-white hover:border-white/20"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Flagship Hero Showcase Card (Itineery AI) */}
        {flagship && (selectedFilter === "all" || selectedFilter === "featured" || selectedFilter === "mobile") && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#16161a] via-[#111114] to-[#0d0d0f] border border-rose-500/30 mb-12 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Flagship Details */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono mb-4">
                    <Flame className="w-3.5 h-3.5 fill-rose-400" />
                    <span>Flagship Production Product</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                    {flagship.name}
                  </h3>
                  <p className="text-rose-400 font-mono text-sm mb-4">{flagship.tagline}</p>

                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
                    {flagship.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {flagship.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4">
                  {flagship.playstore && (
                    <a
                      href={flagship.playstore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm flex items-center gap-2 hover:bg-neutral-200 transition-all shadow-lg hover:shadow-white/20"
                    >
                      <Play className="w-4 h-4 fill-black" />
                      <span>Google Play Store</span>
                    </a>
                  )}

                  {flagship.live && (
                    <a
                      href={flagship.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full bg-[#1e1e24] hover:bg-[#282830] border border-white/[0.12] text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-all"
                    >
                      <span>Live Web App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Full Screenshot View with Proper Ratio */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] rounded-2xl overflow-hidden bg-[#0a0a0d] border border-white/[0.12] shadow-2xl flex items-center justify-center p-2">
                  {flagship.carouselImages && (
                    <Image
                      src={flagship.carouselImages[activeCarouselIndex] || flagship.image}
                      alt={flagship.name}
                      fill
                      className="object-contain p-2 transition-all duration-500 drop-shadow-2xl"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                  )}
                </div>

                {/* Carousel navigation dots */}
                {flagship.carouselImages && (
                  <div className="flex items-center gap-2 mt-4">
                    {flagship.carouselImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveCarouselIndex(idx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          idx === activeCarouselIndex
                            ? "w-8 bg-rose-500"
                            : "w-2 bg-neutral-700 hover:bg-neutral-500"
                        }`}
                        title={`View preview ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              if (project.id === "itineery-ai" && selectedFilter === "all") return null;

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group flex flex-col justify-between p-6 rounded-3xl bg-[#131316] border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden"
                >
                  <div>
                    {/* Top Meta Bar */}
                    <div className="flex items-center justify-between mb-4">
                      {project.badge ? (
                        <span className="px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-mono text-rose-400">
                          {project.badge}
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                          {project.category}
                        </span>
                      )}

                      {project.stars && (
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-mono">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{project.stars}</span>
                        </div>
                      )}
                    </div>

                    {/* Project Title */}
                    <h4 className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors mb-1">
                      {project.name}
                    </h4>
                    <p className="text-xs text-neutral-400 font-mono mb-3">{project.tagline}</p>

                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono text-neutral-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Links Strip */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Source</span>
                        </a>
                      )}

                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-mono text-rose-400 hover:underline transition-colors ml-auto"
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
                          className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:underline transition-colors ml-auto"
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
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
