"use client";

import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import Image from "next/image";

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
      "A deep dive into the Flutter Daemon protocol, exploring how IDE tools communicate with Flutter tooling under the hood when building mobile apps.",
    date: "May 2024",
    readTime: "6 min read",
    image: "/assets/flutter-daemon-blog.png",
    tags: ["Flutter", "Dart", "CLI Tools", "Medium"],
    url: "https://medium.com/nammaflutter/%EF%B8%8F-behind-the-scenes-of-flutter-meet-the-flutter-daemon-85d6d7e15f26",
    featured: true,
  },
  {
    title: "From Classroom to Codebase: Lessons from Shipping Real Products",
    excerpt:
      "Bridging the gap between academic CS theory and engineering 60M+ user fintech applications. Mobile memory & state lessons.",
    date: "2025",
    readTime: "5 min read",
    image: "/assets/guest-lecture-classroom.png",
    tags: ["Engineering", "Career"],
    url: "https://medium.com/@codermagesh",
  },
  {
    title: "Integrating Offline Voice AI in Production Flutter Apps",
    excerpt:
      "Architectural walkthrough of integrating local on-device Voice AI models in Flutter apps without constant cloud connectivity.",
    date: "2025",
    readTime: "8 min read",
    image: "/assets/github-project-banner.png",
    tags: ["Voice AI", "Flutter"],
    url: "https://medium.com/@codermagesh",
  },
];

export default function MobileBlogs() {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Mobile Section Header */}
      <div className="text-left">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
            06 / Thoughts & Writing
          </span>
          <span className="w-8 h-[1px] bg-rose-500/40" />
        </div>
        <h2
          className="text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight leading-none mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500">WRITING</span> & ESSAYS
        </h2>
        <p
          className="text-rose-400 text-lg font-normal select-none"
          style={{ fontFamily: "var(--font-cursive)" }}
        >
          Sharing architectural breakdowns & mobile learnings
        </p>
      </div>

      {/* Featured Blog Card */}
      {articles[0] && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="p-5 rounded-3xl bg-[#131316] border border-rose-500/30 shadow-xl flex flex-col justify-between"
        >
          <div>
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-900 mb-4 border border-white/[0.08]">
              <Image
                src={articles[0].image}
                alt={articles[0].title}
                fill
                className="object-cover"
                sizes="340px"
              />
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-mono font-semibold">
                Featured
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-400 mb-2">
              <span>{articles[0].date}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-rose-400" />
                <span>{articles[0].readTime}</span>
              </div>
            </div>

            <h3 className="text-base font-bold text-white mb-2 leading-snug">
              {articles[0].title}
            </h3>

            <p className="text-neutral-300 text-xs leading-relaxed mb-4">
              {articles[0].excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
            <div className="flex flex-wrap gap-1">
              {articles[0].tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-neutral-400"
                >
                  {t}
                </span>
              ))}
            </div>

            <a
              href={articles[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-rose-400 active:underline"
            >
              <span>Read</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      )}

      {/* Secondary Blog Cards */}
      <div className="flex flex-col gap-3">
        {articles.slice(1).map((art, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="p-5 rounded-2xl bg-[#131316] border border-white/[0.08] shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1.5">
                <span>{art.date}</span>
                <span className="text-neutral-500">{art.readTime}</span>
              </div>

              <h4 className="text-sm font-bold text-white mb-1.5 leading-snug">{art.title}</h4>
              <p className="text-neutral-300 text-xs leading-relaxed mb-3">{art.excerpt}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
              <div className="flex flex-wrap gap-1">
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
                className="inline-flex items-center gap-1 text-xs font-mono text-rose-400 active:underline"
              >
                <span>Read</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
