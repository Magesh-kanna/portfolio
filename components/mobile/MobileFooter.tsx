"use client";

import { ArrowUp } from "lucide-react";

export default function MobileFooter() {
  const scrollToTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="pb-24 pt-10 px-4 bg-[#070709] border-t border-white/[0.08] relative select-none md:hidden">
      <div className="flex flex-col items-center text-center gap-4">
        <div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-sm font-bold text-white">Magesh K</span>
            <span className="text-xs text-neutral-500 font-mono">• 2026</span>
          </div>
          <p
            className="text-neutral-400 text-xs font-normal"
            style={{ fontFamily: "var(--font-cursive)" }}
          >
            Crafted with passion for fluid mobile architectures
          </p>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#131316] border border-white/[0.1] text-neutral-300 active:scale-95 text-xs font-mono transition-transform"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5 text-rose-400" />
        </button>
      </div>
    </footer>
  );
}
