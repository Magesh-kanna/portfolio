"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Heart, Send, Sparkles, User, Check, Quote } from "lucide-react";
import confetti from "canvas-confetti";

interface GuestbookEntry {
  id: string;
  name: string;
  role?: string;
  message: string;
  date: string;
  avatarEmoji: string;
  likes: number;
  isLiked?: boolean;
}

const initialEntries: GuestbookEntry[] = [
  {
    id: "1",
    name: "Namma Flutter Community",
    role: "Chennai Flutter Devs",
    message:
      "Magesh's keynotes on Flutter architectures and bridging classroom-to-codebase always inspire our community. Solid mobile engineering talent!",
    date: "Aug 2026",
    avatarEmoji: "⚡",
    likes: 38,
  },
  {
    id: "2",
    name: "Engineering Colleague",
    role: "NPST Banking Team",
    message:
      "Handling Canara Bank's 80M+ user UPI scale requires razor-sharp attention to mobile performance and security. Magesh consistently ships clean, dependable code.",
    date: "Jul 2026",
    avatarEmoji: "🚀",
    likes: 29,
  },
  {
    id: "3",
    name: "App Studio User",
    role: "Itineery AI Explorer",
    message:
      "Itineery AI is so buttery smooth! The offline day-by-day planner saved our family trip. Love the UI micro-animations.",
    date: "Jun 2026",
    avatarEmoji: "✈️",
    likes: 42,
  },
];

const emojiAvatars = ["⚡", "🚀", "💻", "🔥", "✨", "🎯", "❤️", "🌟", "💡"];

export default function GuestbookSection() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(initialEntries);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("⚡");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mk_guestbook_entries");
      if (saved) {
        setEntries(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newEntry: GuestbookEntry = {
        id: Date.now().toString(),
        name: name.trim(),
        role: role.trim() || "Visitor / Developer",
        message: message.trim(),
        date: "Just now",
        avatarEmoji: selectedEmoji,
        likes: 1,
      };

      const updated = [newEntry, ...entries];
      setEntries(updated);
      try {
        localStorage.setItem("mk_guestbook_entries", JSON.stringify(updated));
      } catch (e) {}

      setName("");
      setRole("");
      setMessage("");
      setIsSubmitting(false);
      setSuccessMessage(true);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#f43f5e", "#a855f7", "#3b82f6", "#10b981"],
        });
      } catch (e) {}

      setTimeout(() => setSuccessMessage(false), 4000);
    }, 400);
  };

  const toggleLike = (id: string) => {
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id === id) {
          const isLiked = entry.isLiked;
          return {
            ...entry,
            likes: isLiked ? entry.likes - 1 : entry.likes + 1,
            isLiked: !isLiked,
          };
        }
        return entry;
      })
    );
  };

  return (
    <section id="guestbook" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
                07 / Interactive Guestbook
              </span>
              <span className="w-12 h-[1px] bg-rose-500/40" />
            </div>
            <h2
              className="text-5xl sm:text-6xl md:text-7xl font-bold uppercase text-white tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              LEAVE A <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500">SIGNATURE</span> & MESSAGE
            </h2>
          </div>

          <p
            className="text-rose-400 text-xl sm:text-2xl font-normal select-none"
            style={{ fontFamily: "var(--font-cursive)" }}
          >
            Say hello, leave feedback, or drop an endorsement
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Column (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 p-7 sm:p-8 rounded-3xl bg-[#131316] border border-white/[0.1] shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <h3 className="text-lg font-bold text-white">Sign the Guestbook</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-2">
                  Choose Avatar Emoji
                </label>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {emojiAvatars.map((emoji) => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-base transition-all cursor-pointer ${
                        selectedEmoji === emoji
                          ? "bg-rose-500/20 border-2 border-rose-500 scale-110 shadow-lg shadow-rose-500/20"
                          : "bg-[#18181c] border border-white/[0.08] hover:border-white/20"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#0e0e11] border border-white/[0.08] text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-rose-500/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Your Role or City (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mobile Engineer, Bangalore"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#0e0e11] border border-white/[0.08] text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-rose-500/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Leave your signature, feedback or message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#0e0e11] border border-white/[0.08] text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-rose-500/60 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all cursor-pointer shadow-lg hover:shadow-white/20 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Signing..." : "Post Message"}</span>
              </button>

              <AnimatePresence>
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Your message was posted with confetti! 🎉</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Entries Feed Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4 max-h-[600px] overflow-y-auto pr-2">
            <AnimatePresence>
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-3xl bg-[#131316] border border-white/[0.08] hover:border-white/15 transition-all shadow-md flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#19191e] border border-white/[0.1] flex items-center justify-center text-xl">
                        {entry.avatarEmoji}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{entry.name}</h4>
                        {entry.role && (
                          <p className="text-[11px] font-mono text-neutral-400">{entry.role}</p>
                        )}
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-neutral-500">{entry.date}</span>
                  </div>

                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-4 pl-1">
                    &ldquo;{entry.message}&rdquo;
                  </p>

                  <div className="flex items-center justify-end pt-3 border-t border-white/[0.04]">
                    <button
                      onClick={() => toggleLike(entry.id)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                        entry.isLiked
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          : "bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.06]"
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          entry.isLiked ? "fill-rose-400 text-rose-400" : ""
                        }`}
                      />
                      <span>{entry.likes}</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
