"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Volume2, VolumeX, Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
}

interface NavbarProps {
  navigation?: NavItem[];
  onOpenCommandPalette?: () => void;
}

export default function Navbar({ navigation, onOpenCommandPalette }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const navItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "achievements", label: "Highlights" },
    { id: "skills", label: "Arsenal" },
    { id: "guestbook", label: "Guestbook" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sectionIds = ["home", ...navItems.map((i) => i.id)];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, { offset: -80, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    // Trigger sound synthesized feedback via Web Audio API
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(isPlayingAudio ? 320 : 540, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);
    } catch (e) {}
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand / Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
          >
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 p-[1px] shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0a0a0a] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs tracking-wider">MK</span>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0a0a0a] animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white tracking-tight group-hover:text-rose-400 transition-colors">
                Magesh Kanna
              </span>
              <span className="text-[10px] text-neutral-400 font-mono flex items-center gap-1">
                SDE • Mobile <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block" />
              </span>
            </div>
          </button>

          {/* Desktop Center Navigation Pill */}
          <nav className="hidden md:flex items-center gap-1 bg-[#141416]/85 backdrop-blur-2xl px-3 py-1.5 rounded-full border border-white/[0.1] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-white/[0.12] rounded-full border border-white/[0.15] shadow-inner"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Sound, Command Palette, Contact */}
          <div className="flex items-center gap-2.5">
            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className={`relative flex items-center justify-center w-9 h-9 rounded-full border transition-all cursor-pointer ${
                isPlayingAudio
                  ? "bg-rose-500/20 border-rose-500/40 text-rose-400"
                  : "bg-[#141416]/80 border-white/[0.1] text-neutral-400 hover:text-white hover:border-white/20"
              }`}
              title={isPlayingAudio ? "Mute audio vibe" : "Play audio vibe"}
            >
              {isPlayingAudio ? (
                <div className="flex items-end gap-[2px] h-3.5">
                  <span className="w-[2px] bg-rose-400 rounded-full sound-bar-1" />
                  <span className="w-[2px] bg-rose-400 rounded-full sound-bar-2" />
                  <span className="w-[2px] bg-rose-400 rounded-full sound-bar-3" />
                </div>
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                if (onOpenCommandPalette) {
                  onOpenCommandPalette();
                } else {
                  window.dispatchEvent(new CustomEvent("open-command-palette"));
                }
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141416]/80 hover:bg-[#1f1f23] border border-white/[0.1] hover:border-white/20 text-neutral-300 hover:text-white transition-all cursor-pointer group"
              title="Open Command Palette (⌘K)"
            >
              <Command className="w-3.5 h-3.5 text-neutral-400 group-hover:text-rose-400 transition-colors" />
              <span className="text-xs hidden sm:inline font-mono">⌘K</span>
            </button>

            {/* Let's Talk CTA button */}
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all cursor-pointer shadow-lg hover:shadow-white/10"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-[#141416] border border-white/[0.1] text-neutral-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-50 md:hidden bg-[#121215]/95 backdrop-blur-2xl border border-white/[0.12] rounded-3xl p-6 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest px-3 mb-2">
                Navigation
              </div>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/[0.06] text-left transition-colors cursor-pointer"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500" />
                </button>
              ))}

              <div className="pt-4 mt-2 border-t border-white/[0.08] flex items-center justify-between">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.dispatchEvent(new CustomEvent("open-command-palette"));
                  }}
                  className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white"
                >
                  <Command className="w-3.5 h-3.5" />
                  Search (⌘K)
                </button>

                <a
                  href="/assets/resume.pdf"
                  download
                  className="text-xs font-medium text-rose-400 hover:underline flex items-center gap-1"
                >
                  Download CV <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
