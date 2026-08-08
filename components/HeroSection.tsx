"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  greeting: string;
  name: string;
  tagline: string;
  description: string;
  profileImage: string;
  circularText: string;
}

export default function HeroSection({
  greeting,
  name,
  tagline,
  description,
  profileImage,
  circularText,
}: HeroSectionProps) {
  const circularTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = circularTextRef.current;
    if (!container) return;

    const text = container.querySelector(".circular-text");
    if (!text) return;

    const spans = text.querySelectorAll("span");
    const radius = 90;

    spans.forEach((span, index) => {
      const angle = (360 / spans.length) * index;
      span.style.transform = `rotate(${angle}deg) translate(0, -${radius}px)`;
    });
  }, [circularText]);

  const letters = circularText.split("");

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDEwaDQwTTEwIDB2NDAiIHN0cm9rZT0iIzI2MjYyNiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMyIvPgo8L3N2Zz4=')] opacity-30" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-lg mb-4"
            >
              {greeting}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
              style={{ fontFamily: "var(--font-big-shoulders)" }}
            >
              <span className="text-foreground">{name.split(" ")[0]}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500">
                {name.split(" ")[1]}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-rose-500 mb-6 font-mono"
            >
              {tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-muted-foreground text-lg max-w-lg leading-relaxed"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href="#projects"
                className="px-6 py-3 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 transition-colors"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-border text-foreground font-semibold rounded-xl hover:border-foreground/30 transition-colors"
              >
                Contact Me
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image with Circular Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Circular Text */}
            <div
              ref={circularTextRef}
              className="circular-text absolute inset-0 flex items-center justify-center"
              style={{ width: "280px", height: "280px" }}
            >
              <div className="circular-text relative w-full h-full animate-[spin_20s_linear_infinite]">
                {letters.map((letter, index) => (
                  <span
                    key={index}
                    className="absolute left-1/2 top-0 text-xs text-foreground font-mono"
                    style={{
                      transformOrigin: "0 140px",
                      transform: `rotate(${(360 / letters.length) * index}deg)`,
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>

            {/* Profile Image */}
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-border">
              <img
                src={profileImage}
                alt={name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="absolute -bottom-4 -right-4 px-4 py-2 bg-card border border-border rounded-xl flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs text-muted-foreground font-mono">Available for work</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-border rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-foreground rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
