"use client";

import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import MobileBlogs from "@/components/mobile/MobileBlogs";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  url: string;
  featured?: boolean;
}

const articles: BlogPost[] = [
  {
    title: "⚡️ Behind the Scenes of Flutter: Meet the Flutter Daemon",
    excerpt:
      "A deep dive into the Flutter Daemon protocol, exploring how IDE tools communicate with Flutter tooling under the hood when you build, debug, and hot-reload mobile apps.",
    date: "May 2024",
    readTime: "6 min read",
    image: "/assets/flutter-daemon-blog.png",
    tags: ["Flutter", "Dart", "CLI Tools", "Medium", "Namma Flutter"],
    url: "https://medium.com/nammaflutter/%EF%B8%8F-behind-the-scenes-of-flutter-meet-the-flutter-daemon-85d6d7e15f26",
    featured: true,
  },
  {
    title: "From Classroom to Codebase: Lessons from Shipping Real Products",
    excerpt:
      "Bridging the gap between academic CS theory and engineering 80M+ user fintech applications. What university doesn't teach you about mobile state and memory.",
    date: "2025",
    readTime: "5 min read",
    image: "/assets/guest-lecture-classroom.png",
    tags: ["Engineering", "Career", "Mentorship"],
    url: "https://medium.com/@codermagesh",
  },
  {
    title: "Integrating Offline Voice AI in Production Flutter Apps",
    excerpt:
      "Architectural walkthrough of integrating local Voice AI models in Flutter apps without relying on constant internet connectivity.",
    date: "2025",
    readTime: "8 min read",
    image: "/assets/github-project-banner.png",
    tags: ["Voice AI", "Flutter", "Architecture"],
    url: "https://medium.com/@codermagesh",
  },
];

export default function BlogsSection() {
  return (
    <section id="blogs" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Dedicated Mobile View (< 768px) */}
        <div className="block md:hidden">
          <MobileBlogs />
        </div>

        {/* Desktop Web View (>= 768px) */}
        <div className="hidden md:block">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
                  06 / Thoughts & Writing
                </span>
                <span className="w-12 h-[1px] bg-rose-500/40" />
              </div>
              <h2
                className="text-5xl sm:text-6xl md:text-7xl font-bold uppercase text-white tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500">WRITING</span> & ESSAYS
              </h2>
            </div>

            <p
              className="text-rose-400 text-xl sm:text-2xl font-normal select-none"
              style={{ fontFamily: "var(--font-cursive)" }}
            >
              Sharing deep dives, architectural breakdowns & learnings
            </p>
          </div>

          {/* Featured Card + List */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Featured Article (7 cols) */}
            {articles[0] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#131316] border border-rose-500/30 hover:border-rose-500/50 transition-all duration-300 group shadow-xl"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-900 mb-6 border border-white/[0.08]">
                    <Image
                      src={articles[0].image}
                      alt={articles[0].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-rose-500 text-white text-[10px] font-mono font-semibold">
                        Featured Publication
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 mb-3">
                    <span>{articles[0].date}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-rose-400" />
                      <span>{articles[0].readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-rose-400 transition-colors mb-3 leading-snug">
                    {articles[0].title}
                  </h3>

                  <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                    {articles[0].excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                  <div className="flex flex-wrap gap-1.5">
                    {articles[0].tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-md bg-white/[0.04] text-[10px] font-mono text-neutral-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={articles[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-mono text-rose-400 hover:underline"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            )}

            {/* Secondary Articles (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {articles.slice(1).map((art, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 rounded-3xl bg-[#131316] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                      <span>{art.date}</span>
                      <span className="text-neutral-500">{art.readTime}</span>
                    </div>

                    <h4 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors mb-2">
                      {art.title}
                    </h4>

                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <div className="flex flex-wrap gap-1.5">
                      {art.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-neutral-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={art.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-mono text-rose-400 hover:underline"
                    >
                      <span>Read</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
