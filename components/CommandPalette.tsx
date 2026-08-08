"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CommandItem {
  id: string;
  label: string;
  shortcut?: string;
  section?: string;
}

interface CommandPaletteProps {
  sections: CommandItem[];
}

export default function CommandPalette({ sections }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = sections.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.section?.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
        break;
      case "Enter":
        e.preventDefault();
        if (filtered[selectedIndex]) {
          const element = document.getElementById(filtered[selectedIndex].id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsOpen(false);
          }
        }
        break;
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 md:bottom-auto md:top-1/2 md:left-auto md:translate-x-0 md:fixed md:right-20 md:-translate-y-1/2 z-40 flex items-center gap-2 px-4 py-2 bg-secondary/80 backdrop-blur-sm rounded-xl text-muted-foreground text-sm border border-border hover:border-foreground/30 transition-colors"
      >
        <span className="text-foreground">⌘</span>
        <span>Press</span>
        <kbd className="px-2 py-0.5 bg-card rounded text-xs font-mono">K</kbd>
        <span>to search</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg"
            >
              <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                  <span className="text-foreground text-xl">🔍</span>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search sections..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-card-foreground placeholder:text-muted-foreground outline-none"
                  />
                  <kbd className="px-2 py-0.5 bg-secondary rounded text-xs text-muted-foreground font-mono">
                    ESC
                  </kbd>
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {filtered.length === 0 ? (
                    <div className="px-4 py-8 text-center text-muted-foreground">No results found</div>
                  ) : (
                    <ul className="py-2">
                      {filtered.map((item, index) => (
                        <li key={item.id}>
                          <button
                            onClick={() => {
                              const element = document.getElementById(item.id);
                              if (element) {
                                element.scrollIntoView({ behavior: "smooth" });
                                setIsOpen(false);
                              }
                            }}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors ${
                              index === selectedIndex
                                ? "bg-secondary text-foreground"
                                : "text-muted-foreground hover:bg-secondary/50"
                            }`}
                          >
                            <div>
                              <p className="font-medium">{item.label}</p>
                              {item.section && (
                                <p className="text-xs text-muted-foreground mt-0.5">{item.section}</p>
                              )}
                            </div>
                            {item.shortcut && (
                              <kbd className="px-2 py-0.5 bg-secondary rounded text-xs font-mono">
                                {item.shortcut}
                              </kbd>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="px-4 py-2 border-t border-border text-xs text-muted-foreground flex items-center gap-4">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>ESC Close</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
