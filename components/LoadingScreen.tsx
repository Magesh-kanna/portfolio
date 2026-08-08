"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowContent(true), 100);
    const timer2 = setTimeout(() => setIsVisible(false), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100]"
      >
        {/* Top Curtain */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: showContent ? 1 : 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 bg-black z-50 origin-top"
          style={{ transformOrigin: "50% 0%" }}
        />

        {/* Bottom Curtain */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: showContent ? 1 : 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          className="fixed inset-0 bg-black z-50 origin-bottom"
          style={{ transformOrigin: "50% 100%" }}
        />

        {/* Hello Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="fixed inset-0 z-[60] flex items-center justify-center"
        >
          <div
            className="text-white text-xl md:text-3xl lg:text-5xl font-regular"
            style={{ fontFamily: "var(--font-cedarville)" }}
          >
            • hello
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
