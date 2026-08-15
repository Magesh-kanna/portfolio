"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, Sparkles, Check } from "lucide-react";
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
      "Magesh's keynotes on Flutter architectures and bridging classroom-to-codebase always inspire our community. Solid mobile talent!",
    date: "Aug 2026",
    avatarEmoji: "⚡",
    likes: 38,
  },
  {
    id: "2",
    name: "Engineering Colleague",
    role: "NPST Banking Team",
    message:
      "Handling Canara Bank's 60M+ user UPI scale requires razor-sharp attention to mobile performance. Magesh consistently ships clean, dependable code.",
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

export default function MobileGuestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(initialEntries);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("⚡");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
        role: role.trim() || "Visitor",
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
      setShowForm(false);

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
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
    <div className="w-full flex flex-col gap-6">
      {/* Mobile Section Header */}
      <div className="text-left">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
            07 / Interactive Guestbook
          </span>
          <span className="w-8 h-[1px] bg-rose-500/40" />
        </div>
        <h2
          className="text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight leading-none mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          LEAVE A <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500">SIGNATURE</span> & MESSAGE
        </h2>
        <p
          className="text-rose-400 text-lg font-normal select-none"
          style={{ fontFamily: "var(--font-cursive)" }}
        >
          Say hello, leave feedback, or drop an endorsement
        </p>
      </div>

      {/* Toggle Sign Button or Form */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 active:scale-95 transition-transform cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Write in Guestbook</span>
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-3xl bg-[#131316] border border-white/[0.1] shadow-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-bold text-white">Sign the Guestbook</h3>
            </div>
            <button
              onClick={() => setShowForm(false)}
              className="text-xs text-neutral-400 hover:text-white font-mono"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Emoji avatars */}
            <div>
              <label className="block text-[11px] font-mono text-neutral-400 mb-1.5">
                Choose Emoji
              </label>
              <div className="flex items-center gap-1.5 flex-wrap">
                {emojiAvatars.map((emoji) => (
                  <button
                    type="button"
                    key={emoji}
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all ${
                      selectedEmoji === emoji
                        ? "bg-rose-500/20 border-2 border-rose-500 scale-105"
                        : "bg-[#18181c] border border-white/[0.08]"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-400 mb-1">Your Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Alex Rivera"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0e11] border border-white/[0.08] text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-rose-500/60"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                Your Role or City (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Mobile Developer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0e11] border border-white/[0.08] text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-rose-500/60"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-400 mb-1">Message *</label>
              <textarea
                required
                rows={3}
                placeholder="Leave your signature..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0e11] border border-white/[0.08] text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-rose-500/60 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-full bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? "Posting..." : "Post Message"}</span>
            </button>
          </form>
        </motion.div>
      )}

      {/* Success Banner */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Message posted with confetti! 🎉</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entries Feed */}
      <div className="flex flex-col gap-3">
        {entries.map((entry) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-[#131316] border border-white/[0.08] shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#19191e] border border-white/[0.1] flex items-center justify-center text-sm">
                  {entry.avatarEmoji}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{entry.name}</h4>
                  {entry.role && (
                    <p className="text-[10px] font-mono text-neutral-400">{entry.role}</p>
                  )}
                </div>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">{entry.date}</span>
            </div>

            <p className="text-neutral-300 text-xs leading-relaxed mb-3 pl-1">
              &ldquo;{entry.message}&rdquo;
            </p>

            <div className="flex items-center justify-end pt-2 border-t border-white/[0.04]">
              <button
                onClick={() => toggleLike(entry.id)}
                className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono transition-colors ${
                  entry.isLiked
                    ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    : "bg-white/[0.03] text-neutral-400 border border-white/[0.06]"
                }`}
              >
                <Heart
                  className={`w-3 h-3 ${entry.isLiked ? "fill-rose-400 text-rose-400" : ""}`}
                />
                <span className="text-[11px]">{entry.likes}</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
