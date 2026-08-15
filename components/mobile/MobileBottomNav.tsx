"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, FolderGit2, Briefcase, Code2, Mail, Search } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: any;
}

export default function MobileBottomNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "projects", label: "Works", icon: FolderGit2 },
    { id: "experience", label: "Career", icon: Briefcase },
    { id: "skills", label: "Arsenal", icon: Code2 },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Detect active section
      const sectionIds = ["home", "about", "projects", "experience", "achievements", "skills", "blogs", "guestbook", "contact"];
      const scrollPosition = currentScrollY + 220;

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            // Map sub-sections to main bottom nav items
            if (sectionId === "about") setActiveSection("home");
            else if (sectionId === "achievements") setActiveSection("experience");
            else if (sectionId === "blogs" || sectionId === "guestbook") setActiveSection("contact");
            else setActiveSection(sectionId);
            break;
          }
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, { offset: -70, duration: 1.0 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const openSearch = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 flex justify-center px-4 md:hidden pointer-events-none">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="pointer-events-auto flex items-center justify-between gap-1 px-3 py-2 rounded-full bg-[#121215]/90 backdrop-blur-2xl border border-white/[0.12] shadow-[0_10px_35px_rgba(0,0,0,0.8)] max-w-sm w-full"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                isActive ? "text-rose-400" : "text-neutral-400 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeBottomTab"
                  className="absolute inset-0 bg-white/[0.08] rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <Icon className="w-4 h-4 relative z-10" />
              <span className="text-[9px] font-mono mt-0.5 relative z-10 leading-tight">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Search / Command trigger */}
        <button
          onClick={openSearch}
          className="flex flex-col items-center justify-center flex-1 py-1 text-neutral-400 hover:text-white rounded-full transition-colors cursor-pointer"
          title="Search"
        >
          <Search className="w-4 h-4" />
          <span className="text-[9px] font-mono mt-0.5 leading-tight">⌘K</span>
        </button>
      </motion.div>
    </div>
  );
}
