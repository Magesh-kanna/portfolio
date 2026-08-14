"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Command,
  FileText,
  Copy,
  ExternalLink,
  Code2,
  Briefcase,
  FolderGit2,
  Award,
  BookOpen,
  MessageSquare,
  Mail,
  User,
  Sparkles,
  Check,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/Icons";

interface CommandOption {
  id: string;
  title: string;
  subtitle?: string;
  category: "Navigation" | "Actions" | "Socials";
  icon: any;
  action: () => void;
  shortcut?: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, { offset: -80, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("codermagesh@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      setIsOpen(false);
    }, 1200);
  };

  const options: CommandOption[] = [
    // Navigation
    {
      id: "nav-about",
      title: "About Me",
      subtitle: "Background, stats, and journey",
      category: "Navigation",
      icon: User,
      action: () => scrollTo("about"),
      shortcut: "⌘1",
    },
    {
      id: "nav-projects",
      title: "Selected Works",
      subtitle: "Production Flutter & iOS projects",
      category: "Navigation",
      icon: FolderGit2,
      action: () => scrollTo("projects"),
      shortcut: "⌘2",
    },
    {
      id: "nav-experience",
      title: "Experience Timeline",
      subtitle: "NPST (80M+ users), Thiran, doodleblue",
      category: "Navigation",
      icon: Briefcase,
      action: () => scrollTo("experience"),
      shortcut: "⌘3",
    },
    {
      id: "nav-achievements",
      title: "Highlights & Speaking",
      subtitle: "Gold Medalist, Keynotes & Tech Talks",
      category: "Navigation",
      icon: Award,
      action: () => scrollTo("achievements"),
      shortcut: "⌘4",
    },
    {
      id: "nav-skills",
      title: "Arsenal & Technologies",
      subtitle: "Flutter, Swift, Riverpod, Voice AI",
      category: "Navigation",
      icon: Code2,
      action: () => scrollTo("skills"),
      shortcut: "⌘5",
    },
    {
      id: "nav-blogs",
      title: "Thoughts & Writing",
      subtitle: "Flutter Daemon deep dive & blogs",
      category: "Navigation",
      icon: BookOpen,
      action: () => scrollTo("blogs"),
      shortcut: "⌘6",
    },
    {
      id: "nav-guestbook",
      title: "Interactive Guestbook",
      subtitle: "Leave a signature / message",
      category: "Navigation",
      icon: MessageSquare,
      action: () => scrollTo("guestbook"),
      shortcut: "⌘7",
    },
    {
      id: "nav-contact",
      title: "Get In Touch",
      subtitle: "Start a project or send a hello",
      category: "Navigation",
      icon: Mail,
      action: () => scrollTo("contact"),
      shortcut: "⌘8",
    },

    // Actions
    {
      id: "act-email",
      title: copiedEmail ? "Email Copied!" : "Copy Email Address",
      subtitle: "codermagesh@gmail.com",
      category: "Actions",
      icon: copiedEmail ? Check : Copy,
      action: copyEmail,
    },
    {
      id: "act-resume",
      title: "Download Resume / CV",
      subtitle: "View latest PDF resume",
      category: "Actions",
      icon: FileText,
      action: () => {
        setIsOpen(false);
        window.open("/assets/resume.pdf", "_blank");
      },
    },

    // Socials
    {
      id: "soc-linkedin",
      title: "LinkedIn Profile",
      subtitle: "7,000+ developer connections",
      category: "Socials",
      icon: LinkedinIcon,
      action: () => {
        setIsOpen(false);
        window.open("https://www.linkedin.com/in/mageshkanna/", "_blank");
      },
    },
    {
      id: "soc-github",
      title: "GitHub Profile",
      subtitle: "Open source repos and contributions",
      category: "Socials",
      icon: GithubIcon,
      action: () => {
        setIsOpen(false);
        window.open("https://github.com/Magesh-kanna", "_blank");
      },
    },
    {
      id: "soc-twitter",
      title: "Twitter / X",
      subtitle: "@codermagesh",
      category: "Socials",
      icon: TwitterIcon,
      action: () => {
        setIsOpen(false);
        window.open("https://x.com/codermagesh", "_blank");
      },
    },
  ];

  const filtered = options.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-20">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Palette Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-[#121215] border border-white/[0.12] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]"
          >
            {/* Header Search Box */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.08] bg-white/[0.02]">
              <Search className="w-5 h-5 text-neutral-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyNavigation}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-white text-sm placeholder:text-neutral-500 focus:outline-none"
              />
              <span className="px-2 py-0.5 rounded-lg bg-neutral-800 border border-white/10 text-[10px] text-neutral-400 font-mono">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div className="overflow-y-auto p-3 flex-1 divide-y divide-white/[0.04]">
              {filtered.length === 0 ? (
                <div className="p-12 text-center text-neutral-500 text-sm">
                  No matching results for &ldquo;{query}&rdquo;
                </div>
              ) : (
                <div className="space-y-1">
                  {filtered.map((item, index) => {
                    const Icon = item.icon;
                    const isSelected = index === selectedIndex;

                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all cursor-pointer text-left ${
                          isSelected
                            ? "bg-white/[0.08] text-white"
                            : "text-neutral-400 hover:text-neutral-200"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-xl border transition-colors ${
                              isSelected
                                ? "bg-rose-500/20 border-rose-500/40 text-rose-400"
                                : "bg-neutral-900 border-white/[0.06] text-neutral-400"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="truncate">
                            <p className="text-sm font-medium text-white truncate">
                              {item.title}
                            </p>
                            {item.subtitle && (
                              <p className="text-xs text-neutral-500 truncate">
                                {item.subtitle}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 px-2 py-0.5 rounded-full bg-white/[0.03]">
                            {item.category}
                          </span>
                          {item.shortcut && (
                            <span className="text-[11px] font-mono text-neutral-400 px-1.5 py-0.5 rounded bg-white/[0.05]">
                              {item.shortcut}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Tip Bar */}
            <div className="px-5 py-3 border-t border-white/[0.08] bg-[#0c0c0e] flex items-center justify-between text-xs text-neutral-500 font-mono">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-rose-400" />
                Magesh Kanna Portfolio
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
