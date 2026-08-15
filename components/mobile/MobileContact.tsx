"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Copy,
  Check,
  FileText,
  Send,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/Icons";

export default function MobileContact() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const copyEmail = () => {
    navigator.clipboard.writeText("codermagesh@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormState({ name: "", email: "", subject: "", message: "" });
      setFormSubmitted(false);
    }, 4000);
  };

  const socials = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/mageshkanna/",
      icon: LinkedinIcon,
      label: "7K+ Network",
    },
    {
      name: "GitHub",
      url: "https://github.com/Magesh-kanna",
      icon: GithubIcon,
      label: "37+ Repos",
    },
    {
      name: "Twitter / X",
      url: "https://x.com/codermagesh",
      icon: TwitterIcon,
      label: "@codermagesh",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Mobile Section Header */}
      <div className="text-left">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
            08 / Let&apos;s Connect
          </span>
          <span className="w-8 h-[1px] bg-rose-500/40" />
        </div>
        <h2
          className="text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight leading-none mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          HAVE A VISION? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-400 to-indigo-400">
            LET&apos;S BUILD IT.
          </span>
        </h2>
        <p
          className="text-rose-400 text-lg font-normal select-none"
          style={{ fontFamily: "var(--font-cursive)" }}
        >
          Available for engineering roles & consultations
        </p>
      </div>

      {/* Direct Email Card */}
      <div className="p-6 rounded-3xl bg-[#131316] border border-white/[0.1] shadow-xl">
        <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
          Direct Email
        </span>

        <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-[#0e0e11] border border-white/[0.08] mb-4">
          <span className="text-xs sm:text-sm font-mono text-white truncate">
            codermagesh@gmail.com
          </span>
          <button
            onClick={copyEmail}
            className="px-3 py-1.5 rounded-xl bg-white text-black text-xs font-semibold flex items-center gap-1 flex-shrink-0 active:scale-95 transition-transform"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <a
            href="mailto:codermagesh@gmail.com"
            className="w-full py-2.5 rounded-full bg-rose-500 text-white font-medium text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-md"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Send Email</span>
          </a>

          <a
            href="/assets/resume.pdf"
            download
            className="w-full py-2.5 rounded-full bg-[#1e1e24] border border-white/[0.1] text-neutral-300 font-medium text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>Download CV</span>
          </a>
        </div>
      </div>

      {/* Social Chips 3-Col */}
      <div className="grid grid-cols-3 gap-2">
        {socials.map((soc) => {
          const Icon = soc.icon;
          return (
            <a
              key={soc.name}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl bg-[#131316] border border-white/[0.08] flex flex-col justify-between active:scale-95 transition-transform group"
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-4 h-4 text-neutral-400 group-hover:text-rose-400" />
                <ArrowUpRight className="w-3 h-3 text-neutral-500" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white truncate">{soc.name}</h4>
                <p className="text-[9px] font-mono text-neutral-500 truncate">{soc.label}</p>
              </div>
            </a>
          );
        })}
      </div>

      {/* Mobile Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-6 rounded-3xl bg-[#131316] border border-white/[0.1] shadow-2xl"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <h3 className="text-base font-bold text-white">Send a Message</h3>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-3">
          <div>
            <label className="block text-[11px] font-mono text-neutral-400 mb-1">Your Name *</label>
            <input
              type="text"
              required
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              placeholder="e.g. Sarah Connor"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0e11] border border-white/[0.08] text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-rose-500/60"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-400 mb-1">Your Email *</label>
            <input
              type="email"
              required
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              placeholder="sarah@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0e11] border border-white/[0.08] text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-rose-500/60"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-400 mb-1">
              Subject (Optional)
            </label>
            <input
              type="text"
              value={formState.subject}
              onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
              placeholder="Mobile Engineering Opportunity"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0e11] border border-white/[0.08] text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-rose-500/60"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-400 mb-1">
              Message or Project Scope *
            </label>
            <textarea
              required
              rows={3}
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              placeholder="Tell me about your app idea or role..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0e11] border border-white/[0.08] text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-rose-500/60 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Message</span>
          </button>

          <AnimatePresence>
            {formSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Thank you! Your message has been received.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
}
