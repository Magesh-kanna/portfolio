"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<"text" | "opening" | "done">("text");

  useEffect(() => {
    // Stage 1: Text shows
    const textTimer = setTimeout(() => {
      setPhase("opening");
    }, 1400);

    // Stage 2: Curtain opens and unmounts
    const exitTimer = setTimeout(() => {
      setPhase("done");
      setIsVisible(false);
    }, 2200);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] pointer-events-none"
        >
          {/* Top Curtain */}
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: phase === "opening" ? 0 : 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#070708] z-50 origin-top"
          />

          {/* Bottom Curtain */}
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: phase === "opening" ? 0 : 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#070708] z-50 origin-bottom"
          />

          {/* Hello Text */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: phase === "text" ? 1 : 0,
              y: phase === "text" ? 0 : -15,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center pointer-events-none select-none"
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <p
                className="text-white text-3xl md:text-5xl lg:text-6xl font-normal tracking-wide"
                style={{ fontFamily: "var(--font-cursive)" }}
              >
                • hello
              </p>
            </div>
            <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest mt-4">
              Magesh Kanna • Portfolio
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
