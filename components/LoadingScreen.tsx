"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = [
  "• Hello",
  "• Bonjour",
  "• Ciao",
  "• Olá",
  "• こんにちは",
  "• வணக்கம்",
  "• नमस्ते",
  "• Hallo",
  "• Hola",
  "• Hello",
];

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"greeting" | "opening" | "done">("greeting");

  useEffect(() => {
    // Cycle through languages
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < greetings.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setPhase("opening");
          return prev;
        }
      });
    }, 180);

    // Unmount after curtain opens
    const exitTimer = setTimeout(() => {
      setPhase("done");
      setIsVisible(false);
    }, greetings.length * 180 + 700);

    return () => {
      clearInterval(interval);
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

          {/* Multilingual Hello Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: phase === "greeting" ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center pointer-events-none select-none"
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="text-white text-3xl md:text-5xl lg:text-6xl font-normal tracking-wide min-w-[200px] text-center"
                style={{ fontFamily: "var(--font-cursive)" }}
              >
                {greetings[currentIndex]}
              </motion.p>
            </div>
            <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest mt-4">
              Magesh K • Portfolio
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
