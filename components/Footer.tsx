"use client";

import { ArrowUp, Heart, Sparkles } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-[#070709] border-t border-white/[0.08] relative select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white tracking-tight">Magesh Kanna</span>
            <span className="text-xs text-neutral-500 font-mono">• Portfolio 2026</span>
          </div>
          <p
            className="text-neutral-500 text-sm font-normal"
            style={{ fontFamily: "var(--font-cursive)" }}
          >
            Crafted with passion for fluid mobile architectures
          </p>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#131316] border border-white/[0.1] hover:border-white/30 text-neutral-300 hover:text-white text-xs font-mono transition-all cursor-pointer shadow-md group"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-rose-400" />
        </button>
      </div>
    </footer>
  );
}
